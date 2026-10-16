import crypto from "node:crypto";
import { NextResponse } from "next/server";

/** Adds a subscriber to Mailchimp (double opt-in). Configure via MAILCHIMP_* env vars. */
export async function POST(req: Request) {
  const { MAILCHIMP_API_KEY: key, MAILCHIMP_SERVER_PREFIX: dc, MAILCHIMP_AUDIENCE_ID: list } = process.env;
  const { email } = await req.json().catch(() => ({ email: "" }));
  const clean = String(email ?? "").trim().toLowerCase().slice(0, 254);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }
  if (!key || !dc || !list) {
    return NextResponse.json(
      { error: "Our mailing list isn’t open just yet. Please check back soon." },
      { status: 503 },
    );
  }

  const hash = crypto.createHash("md5").update(clean).digest("hex");
  const res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${list}/members/${hash}`, {
    method: "PUT",
    headers: {
      Authorization: `Basic ${Buffer.from(`mlaza:${key}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: clean, status_if_new: "pending" }),
  });
  if (!res.ok) {
    console.error("[newsletter] Mailchimp error", res.status, await res.text());
    return NextResponse.json({ error: "We couldn’t add you just now. Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
