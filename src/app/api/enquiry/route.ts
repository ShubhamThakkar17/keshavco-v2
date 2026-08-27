import { NextResponse } from "next/server";

/**
 * Enquiry endpoint.
 *
 * By default this validates the payload and records it in the server log so no
 * enquiry is silently dropped in development. Set `ENQUIRY_WEBHOOK_URL` to
 * forward submissions to a CRM, an inbox automation or a form service before
 * launch — see the README.
 */

const MAX_FIELD_LENGTH = 5000;

type Payload = Record<string, unknown>;

function isValid(payload: Payload) {
  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!name || !email || !message) return false;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  return Object.values(payload).every(
    (value) => typeof value !== "string" || value.length <= MAX_FIELD_LENGTH,
  );
}

export async function POST(request: Request) {
  let payload: Payload;
  try {
    payload = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!isValid(payload)) {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 422 });
  }

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, receivedAt: new Date().toISOString() }),
      });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    } catch (error) {
      console.error("[enquiry] webhook delivery failed", error);
      return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
    }
  } else {
    console.warn(
      "[enquiry] ENQUIRY_WEBHOOK_URL is not set — enquiry recorded to the server log only.",
      { receivedAt: new Date().toISOString(), payload },
    );
  }

  return NextResponse.json({ ok: true });
}
