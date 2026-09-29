import { Resend } from "resend";

/**
 * Form submissions by email, sent through Resend (decision log #26).
 *
 * `RESEND_API_KEY` turns it on. Until keshavco.com is verified in Resend, the
 * sender is Resend's shared test address, which may only write to the Resend
 * account's own inbox, so mail goes to the first recipient alone. Once the
 * domain is verified, set `FORMS_EMAIL_FROM` (for example
 * `KeshavCo Website <website@keshavco.com>`) and every recipient gets a copy.
 * `FORMS_EMAIL_TO` (comma separated) overrides the recipient list.
 */

const DEFAULT_TO = ["shubhamthakkar1701@gmail.com", "shubham@keshavco.com", "hello@keshavco.com"];
const TEST_FROM = "KeshavCo Website <onboarding@resend.dev>";

export type FormName = "enquiry" | "careers" | "subscribe";

const LABELS: Record<string, string> = {
  name: "Name",
  email: "Email",
  phone: "Phone",
  company: "Company",
  intent: "Enquiry type",
  package: "Package",
  industry: "Industry",
  interest: "Needs help with",
  service: "Service",
  city: "City",
  area: "Area",
  join: "Interested in",
  link: "CV or portfolio",
  message: "Message",
  source: "Source",
};

const TITLES: Record<FormName, string> = {
  enquiry: "New website enquiry",
  careers: "New open application",
  subscribe: "New newsletter sign-up",
};

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const labelFor = (key: string) => LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1);

function subjectFor(form: FormName, fields: Record<string, string>) {
  const who = fields.name || fields.email || "Website visitor";
  if (form === "enquiry") return `${fields.intent || "Enquiry"}: ${who}${fields.company ? `, ${fields.company}` : ""}`;
  if (form === "careers") return `Open application: ${who}${fields.area ? ` (${fields.area})` : ""}`;
  return `Newsletter sign-up: ${fields.email}`;
}

function render(form: FormName, fields: Record<string, string>, receivedAt: string) {
  const rows = Object.entries(fields).filter(([, value]) => value.trim() !== "");
  const when = new Date(receivedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

  const text = [
    TITLES[form],
    "",
    ...rows.map(([key, value]) => `${labelFor(key)}: ${value}`),
    "",
    `Received ${when} IST from keshavco.com`,
  ].join("\n");

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px">
<tr><td style="padding:24px 24px 8px;font-size:20px;font-weight:bold">${escape(TITLES[form])}</td></tr>
<tr><td style="padding:0 24px 16px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">
${rows
  .map(
    ([key, value]) =>
      `<tr><td style="padding:8px 12px 8px 0;border-top:1px solid #e8ebf1;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#47608e;vertical-align:top;width:140px">${escape(labelFor(key))}</td><td style="padding:8px 0;border-top:1px solid #e8ebf1;font-size:15px;line-height:1.5;white-space:pre-wrap">${escape(value)}</td></tr>`,
  )
  .join("\n")}
</table></td></tr>
<tr><td style="padding:0 24px 24px;font-size:12px;color:#47608e">Received ${escape(when)} IST from keshavco.com. Reply to this email to answer the sender.</td></tr>
</table></body></html>`;

  return { text, html };
}

export const emailConfigured = () => Boolean(process.env.RESEND_API_KEY);

export async function sendFormEmail(form: FormName, fields: Record<string, string>, receivedAt: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const from = process.env.FORMS_EMAIL_FROM?.trim() || TEST_FROM;
  const configuredTo = process.env.FORMS_EMAIL_TO?.split(",").map((item) => item.trim()).filter(Boolean);
  const recipients = configuredTo?.length ? configuredTo : DEFAULT_TO;
  const to = from.includes("@resend.dev") ? recipients.slice(0, 1) : recipients;
  const replyTo = fields.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) ? fields.email : undefined;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to,
      replyTo,
      subject: subjectFor(form, fields),
      ...render(form, fields, receivedAt),
    });
    if (error) throw new Error(`${error.name}: ${error.message}`);
    return true;
  } catch (error) {
    console.error(`[${form}] email delivery failed`, error);
    return false;
  }
}
