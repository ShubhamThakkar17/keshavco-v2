# Website forms: Google Sheet + email

Decision log #8. The three website forms (enquiry, careers, Insights subscribe)
all end up in one Google Sheet, one tab per form, and each submission also
sends an email to hello@keshavco.com. No new packages or paid services.

```
Browser form ──► /api/enquiry   ─┐
             ──► /api/careers   ─┼─► Google Apps Script web app ─► Sheet tab + email
             ──► /api/subscribe ─┘
```

- `/api/enquiry` is unchanged from v2: it forwards the enquiry JSON to
  `ENQUIRY_WEBHOOK_URL`. Enquiries carry no `form` field, so the script files
  them under **Enquiries**.
- `/api/careers` and `/api/subscribe` (new) forward to `FORMS_WEBHOOK_URL`, or
  to `ENQUIRY_WEBHOOK_URL` when that is not set, adding `form: "careers"` or
  `form: "subscribe"`. Code: `src/lib/forms.ts`.
- Without either variable, submissions are written to the server log (Vercel
  runtime logs) so nothing is silently lost during development.

## One-time setup (about 10 minutes)

Already done: a Google Drive folder **"KeshavCo website forms"** holds the
sheet (tabs Enquiries, Careers and Subscribers with their header rows), a
copy of the script, and these steps as a Google Doc. Start at step 2 in that
sheet.

1. **Create the sheet.** In the Google account that owns hello@keshavco.com,
   create a new Google Sheet, for example "KeshavCo website forms". You do not
   need to create the tabs; the script creates **Enquiries**, **Careers** and
   **Subscribers** on first use.
2. **Add the script.** In the sheet: Extensions → Apps Script. Replace the
   contents of `Code.gs` with [`apps-script.gs`](./apps-script.gs) and save.
3. **Set two script properties.** Project Settings (gear icon) → Script
   properties → Add:
   - `SECRET`: a long random string (for example 40 random letters and
     numbers). Keep it private.
   - `NOTIFY_EMAIL`: `hello@keshavco.com`
4. **Deploy.** Deploy → New deployment → type **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone** (the secret below is what keeps it private)
   - Authorise the permissions it asks for (Sheets and sending email as you).
   - Copy the **Web app URL** (ends in `/exec`).
5. **Add the URL to Vercel.** Project → Settings → Environment Variables:
   - `ENQUIRY_WEBHOOK_URL` = `https://script.google.com/macros/s/…/exec?key=YOUR_SECRET`
   - Optional: `FORMS_WEBHOOK_URL` with the same value, only if careers and
     subscribe should go somewhere different from enquiries.
   - Apply to Production and Preview, then redeploy.
6. **Test** each form on the preview: a row should appear in the right tab and
   an email should arrive within a minute.

## Notes

- **Spam.** Every form has a hidden honeypot field (`website`). The API routes
  drop careers and subscribe submissions that fill it; the script drops any
  submission (including enquiries) that fills it.
- **Security.** Apps Script cannot read request headers, so the shared secret
  travels as `?key=` in the URL, which is only ever stored in Vercel's
  encrypted environment variables and used server-side. Rotate it by changing
  `SECRET` and the URL together.
- **Formula injection.** Text starting with `=`, `+`, `-` or `@` is stored
  with a leading apostrophe so the sheet never evaluates it.
- **Email quota.** A consumer Google account can send about 100 emails a day
  from Apps Script; Google Workspace allows about 1,500. That is well above
  expected volume.
- **Updating the script.** After editing the code: Deploy → Manage
  deployments → edit → Version: New version. The URL stays the same.
- **New fields** (for example the enquiry form's `intent` and `package`)
  appear as new columns automatically.
