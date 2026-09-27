import { NextResponse } from "next/server";
import { deliver, EMAIL_PATTERN, isBot, readPayload, withinLimits } from "@/lib/forms";

/** Careers open applications (decision log #7). Delivery: src/lib/forms.ts. */
export async function POST(request: Request) {
  const payload = await readPayload(request);
  if (!payload) return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  if (isBot(payload)) return NextResponse.json({ ok: true });

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const link = String(payload.link ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const valid =
    Boolean(name && message) &&
    EMAIL_PATTERN.test(email) &&
    /^https?:\/\/\S+$/i.test(link) &&
    withinLimits(payload);
  if (!valid) return NextResponse.json({ ok: false, error: "Invalid submission" }, { status: 422 });

  const delivered = await deliver("careers", payload);
  if (!delivered) return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
