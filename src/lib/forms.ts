/**
 * Server-side delivery for the careers and subscribe forms (decision log #8).
 *
 * Submissions go to the same Google Apps Script web app as enquiries: it
 * appends a row to a Google Sheet (a tab per form) and emails
 * hello@keshavco.com. See docs/forms/README.md for the setup.
 *
 * `FORMS_WEBHOOK_URL` wins when set; otherwise `ENQUIRY_WEBHOOK_URL` is used,
 * so one Apps Script deployment can serve all three forms. The shared secret
 * travels in the web app URL (`…/exec?key=…`), because Apps Script cannot read
 * request headers. With neither variable set, the submission is written to
 * the server log so nothing is silently dropped in development.
 */

export const MAX_FIELD_LENGTH = 5000;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type Payload = Record<string, unknown>;

export async function readPayload(request: Request): Promise<Payload | null> {
  try {
    const payload = (await request.json()) as unknown;
    return payload && typeof payload === "object" && !Array.isArray(payload) ? (payload as Payload) : null;
  } catch {
    return null;
  }
}

/** Every value is a string within the length limit. */
export function withinLimits(payload: Payload) {
  return Object.values(payload).every(
    (value) => typeof value === "string" && value.length <= MAX_FIELD_LENGTH,
  );
}

/** A filled honeypot means a bot: accept quietly, deliver nothing. */
export const isBot = (payload: Payload) => String(payload.website ?? "").trim() !== "";

export async function deliver(form: "careers" | "subscribe", payload: Payload) {
  const webhook = process.env.FORMS_WEBHOOK_URL || process.env.ENQUIRY_WEBHOOK_URL;
  const fields = { ...payload };
  delete fields.website; // the honeypot
  const body = { ...fields, form, receivedAt: new Date().toISOString() };

  if (!webhook) {
    console.warn(`[${form}] FORMS_WEBHOOK_URL / ENQUIRY_WEBHOOK_URL not set — recorded to the server log only.`, body);
    return true;
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    return true;
  } catch (error) {
    console.error(`[${form}] webhook delivery failed`, error);
    return false;
  }
}
