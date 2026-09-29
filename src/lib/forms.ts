import { sendFormEmail, type FormName } from "@/lib/email";

/**
 * Server-side delivery for all three forms: enquiry, careers and newsletter.
 *
 * Two channels, either or both:
 * - Email through Resend when `RESEND_API_KEY` is set (src/lib/email.ts).
 * - The Google Apps Script web app when `FORMS_WEBHOOK_URL` or
 *   `ENQUIRY_WEBHOOK_URL` is set: a row in the Google Sheet (a tab per form).
 *   The shared secret travels in the URL (`…/exec?key=…`), because Apps
 *   Script cannot read request headers. See docs/forms/README.md.
 *
 * A submission counts as delivered when at least one configured channel took
 * it. With neither configured, it is written to the server log; on the live
 * site that also returns a failure, so the visitor is shown the email address
 * instead of a thank-you for a message nobody will read.
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

async function postWebhook(form: FormName, webhook: string, body: Record<string, string>) {
  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // Enquiries carry no `form` field: the Apps Script files them on the first tab.
      body: JSON.stringify(form === "enquiry" ? body : { ...body, form }),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    return true;
  } catch (error) {
    console.error(`[${form}] webhook delivery failed`, error);
    return false;
  }
}

export async function deliver(form: FormName, payload: Payload) {
  const fields: Record<string, string> = {};
  for (const [key, value] of Object.entries(payload)) {
    if (key !== "website") fields[key] = String(value ?? "").trim(); // `website` is the honeypot
  }
  const receivedAt = new Date().toISOString();

  const webhook =
    form === "enquiry" ? process.env.ENQUIRY_WEBHOOK_URL : process.env.FORMS_WEBHOOK_URL || process.env.ENQUIRY_WEBHOOK_URL;
  const channels: Promise<boolean>[] = [];
  if (process.env.RESEND_API_KEY) channels.push(sendFormEmail(form, fields, receivedAt));
  if (webhook) channels.push(postWebhook(form, webhook, { ...fields, receivedAt }));

  if (channels.length === 0) {
    console.warn(`[${form}] no delivery configured (RESEND_API_KEY or a webhook URL): recorded to the server log only.`, {
      ...fields,
      receivedAt,
    });
    return process.env.VERCEL_ENV !== "production";
  }

  const results = await Promise.all(channels);
  return results.some(Boolean);
}
