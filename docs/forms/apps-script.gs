/**
 * KeshavCo website forms → Google Sheet + email (decision log #8).
 *
 * One web app receives all three website forms:
 *   - enquiry    (/api/enquiry: the contact page form; no `form` field)
 *   - careers    (/api/careers: open applications)
 *   - subscribe  (/api/subscribe: the Insights newsletter)
 *
 * Each submission is appended to a tab named after its form (created on first
 * use, with a header row that grows when new fields appear) and emailed to
 * NOTIFY_EMAIL. Submissions with the honeypot field filled are dropped.
 *
 * Setup: docs/forms/README.md. Deploy as a web app ("Execute as: Me",
 * "Who has access: Anyone") and put the /exec URL, with ?key=SECRET, in
 * Vercel as ENQUIRY_WEBHOOK_URL (and optionally FORMS_WEBHOOK_URL).
 */

// Set these two in Project Settings → Script properties:
//   SECRET        a long random string; must match ?key= in the web app URL
//   NOTIFY_EMAIL  where notifications go (hello@keshavco.com)
var props = PropertiesService.getScriptProperties();

var FORMS = {
  enquiry: { tab: "Enquiries", subject: "New enquiry" },
  careers: { tab: "Careers", subject: "New open application" },
  subscribe: { tab: "Subscribers", subject: "New Insights subscriber" },
};

function doPost(e) {
  var secret = props.getProperty("SECRET");
  if (!secret || !e || !e.parameter || e.parameter.key !== secret) {
    return json({ ok: false, error: "unauthorised" });
  }

  var data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: "invalid json" });
  }

  // Honeypot: people never see this field, bots fill it.
  if (data.website && String(data.website).trim() !== "") {
    return json({ ok: true });
  }
  delete data.website;

  var formName = FORMS[data.form] ? data.form : "enquiry";
  var form = FORMS[formName];
  delete data.form;

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    appendRow(form.tab, data);
  } finally {
    lock.releaseLock();
  }

  notify(form.subject, data);
  return json({ ok: true });
}

/** Append `data` under matching headers, adding columns for new fields. */
function appendRow(tabName, data) {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(tabName) || book.insertSheet(tabName);

  var fields = Object.keys(data);
  var lastColumn = sheet.getLastColumn();
  var headers = lastColumn > 0 ? sheet.getRange(1, 1, 1, lastColumn).getValues()[0] : [];
  if (headers.length === 0) {
    headers = ["receivedAt"];
  }
  fields.forEach(function (field) {
    if (headers.indexOf(field) === -1) headers.push(field);
  });
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
  sheet.setFrozenRows(1);

  var row = headers.map(function (header) {
    var value = data[header];
    if (header === "receivedAt" && !value) value = new Date().toISOString();
    // Stop spreadsheet formula injection from form text.
    if (typeof value === "string" && /^[=+\-@]/.test(value)) value = "'" + value;
    return value === undefined || value === null ? "" : value;
  });
  sheet.appendRow(row);
}

function notify(subject, data) {
  var to = props.getProperty("NOTIFY_EMAIL");
  if (!to) return;
  var lines = Object.keys(data).map(function (key) {
    return key + ": " + data[key];
  });
  var options = { name: "KeshavCo website" };
  if (data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) options.replyTo = data.email;
  var who = data.name ? " from " + data.name : data.email ? " from " + data.email : "";
  MailApp.sendEmail(to, "[KeshavCo] " + subject + who, lines.join("\n"), options);
}

function json(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(ContentService.MimeType.JSON);
}
