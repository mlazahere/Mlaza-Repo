import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { orderSeal, payfastConfig, sign } from "@/lib/payfast";
import { quote, type LineInput } from "@/lib/pricing";
import { site } from "@/lib/site";

const clip = (v: unknown, n = 100) => String(v ?? "").trim().slice(0, n);

/**
 * Creates a signed PayFast payment request from the server-side catalogue.
 * Returns the hosted-checkout URL and the signed fields; the browser posts them
 * to PayFast, where the customer pays. No payment is ever simulated here.
 */
export async function POST(req: Request) {
  const pf = payfastConfig();
  if (!pf.configured) {
    return NextResponse.json(
      { errors: ["Online payments are not yet enabled on this store. Please contact us to place your order."] },
      { status: 503 },
    );
  }

  let body: { lines?: LineInput[]; customer?: Record<string, string>; shippingMethod?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ errors: ["Invalid request."] }, { status: 400 });
  }

  const c = body.customer ?? {};
  const email = clip(c.email, 100);
  const errors: string[] = [];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Please enter a valid email address.");
  for (const k of ["firstName", "lastName", "address1", "city", "postalCode", "country", "phone"]) {
    if (!clip(c[k])) errors.push("Please complete all required delivery details.");
  }

  const lines = Array.isArray(body.lines) ? body.lines.slice(0, 50) : [];
  const q = quote(lines, clip(c.country, 2), clip(body.shippingMethod, 40));
  errors.push(...q.errors);
  if (errors.length) return NextResponse.json({ errors: [...new Set(errors)] }, { status: 422 });

  const reference = `MLZ-${Date.now().toString(36).toUpperCase()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
  const amount = (q.total / 100).toFixed(2);
  const itemName = `MLAZA order ${reference}`;
  const description = q.lines.map((l) => `${l.quantity} × ${l.product.name}`).join(", ").slice(0, 255);
  const phone = clip(c.phone, 20).replace(/[^\d]/g, "");
  const address = [c.address1, c.address2, c.city, c.province, c.postalCode, c.country].map((v) => clip(v, 80)).filter(Boolean).join(", ");
  const base = site.url.replace(/\/$/, "");

  // Field order matters for the PayFast signature — keep the documented order.
  const fields: [string, string][] = [
    ["merchant_id", pf.merchantId],
    ["merchant_key", pf.merchantKey],
    ["return_url", `${base}/checkout/complete?ref=${reference}`],
    ["cancel_url", `${base}/checkout/cancelled`],
    ["notify_url", `${base}/api/payfast/notify`],
    ["name_first", clip(c.firstName, 100)],
    ["name_last", clip(c.lastName, 100)],
    ["email_address", email],
    // PayFast validates SA mobile numbers only
    ["cell_number", c.country === "ZA" && /^0\d{9}$/.test(phone) ? phone : ""],
    ["m_payment_id", reference],
    ["amount", amount],
    ["item_name", itemName],
    ["item_description", description],
    ["custom_str1", orderSeal(reference, amount, pf.passphrase)],
    ["custom_str2", `${q.method?.id ?? ""}`],
    ["custom_str3", address.slice(0, 255)],
  ];
  const signature = sign(fields, pf.passphrase);

  return NextResponse.json({
    action: pf.processUrl,
    fields: [...fields.filter(([, v]) => v !== ""), ["signature", signature]],
    reference,
  });
}
