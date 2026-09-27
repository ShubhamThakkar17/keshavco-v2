import { NextResponse } from "next/server";
import { deliver, EMAIL_PATTERN, isBot, readPayload, withinLimits } from "@/lib/forms";

/** Insights newsletter sign-ups (decision log #9). Delivery: src/lib/forms.ts. */
export async function POST(request: Request) {
  const payload = await readPayload(request);
  if (!payload) return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  if (isBot(payload)) return NextResponse.json({ ok: true });

  const email = String(payload.email ?? "").trim();
  if (!EMAIL_PATTERN.test(email) || !withinLimits(payload)) {
    return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 422 });
  }

  const delivered = await deliver("subscribe", { email, source: String(payload.source ?? "insights") });
  if (!delivered) return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
