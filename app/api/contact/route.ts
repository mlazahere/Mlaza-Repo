import { NextResponse } from "next/server";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Sends contact-form enquiries by email through Resend. Configure via RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 254);
  const topic = String(body.topic ?? "").trim().slice(0, 60);
  const order = String(body.order ?? "").trim().slice(0, 60);
  const message = String(body.message ?? "").trim().slice(0, 5000);
  // honeypot
  if (body.website) return NextResponse.json({ ok: true });

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email address.";
  if (message.length < 10) errors.message = "Please write a little more so we can help.";
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const { RESEND_API_KEY: key, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL: from } = process.env;
  if (!key || !to || !from) {
    return NextResponse.json({ error: "Our contact form isn’t connected yet. Please try again soon." }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `MLAZA enquiry${topic ? ` · ${topic}` : ""} — ${name}`,
      html: `<p><strong>${esc(name)}</strong> &lt;${esc(email)}&gt;</p>${topic ? `<p>Topic: ${esc(topic)}</p>` : ""}${
        order ? `<p>Order: ${esc(order)}</p>` : ""
      }<p style="white-space:pre-wrap">${esc(message)}</p>`,
    }),
  });
  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return NextResponse.json({ error: "We couldn’t send your message just now. Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
