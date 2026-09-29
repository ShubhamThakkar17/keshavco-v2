import { NextResponse } from "next/server";
import { deliver, EMAIL_PATTERN, isBot, readPayload, withinLimits } from "@/lib/forms";

/**
 * Enquiry endpoint. Validates the payload, drops honeypot submissions and
 * hands the rest to src/lib/forms.ts, which emails it through Resend and/or
 * forwards it to the Google Sheet (see the README).
 */

function isValid(payload: Record<string, unknown>) {
  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (!name || !email || !message) return false;
  if (!EMAIL_PATTERN.test(email)) return false;
  return withinLimits(payload);
}

export async function POST(request: Request) {
  const payload = await readPayload(request);
  if (!payload) return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  if (isBot(payload)) return NextResponse.json({ ok: true });

  if (!isValid(payload)) {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 422 });
  }

  const delivered = await deliver("enquiry", payload);
  if (!delivered) return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
