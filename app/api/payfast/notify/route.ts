import { NextResponse } from "next/server";
import { orderSeal, paramString, payfastConfig, safeEqual, sign } from "@/lib/payfast";

/**
 * PayFast Instant Transaction Notification (ITN) handler.
 * PayFast calls this server-to-server when a payment's status changes.
 * Checks performed (per PayFast docs): signature, server confirmation, amount.
 *
 * TODO before launch: persist confirmed orders (database / order-management
 * system) and send the customer confirmation email at the marked point below.
 */
export async function POST(req: Request) {
  const pf = payfastConfig();
  if (!pf.configured) return new NextResponse(null, { status: 503 });

  const text = await req.text();
  const params = new URLSearchParams(text);
  const pairs: [string, string][] = [];
  params.forEach((v, k) => k !== "signature" && pairs.push([k, v]));
  const received = params.get("signature") ?? "";

  // 1. Signature
  if (!safeEqual(sign(pairs, pf.passphrase, true), received)) {
    console.warn("[payfast] ITN rejected: bad signature");
    return new NextResponse(null, { status: 400 });
  }

  // 2. Amount matches the amount this server sealed when the order was created
  const reference = params.get("m_payment_id") ?? "";
  const gross = Number(params.get("amount_gross") ?? "NaN").toFixed(2);
  if (!safeEqual(orderSeal(reference, gross, pf.passphrase), params.get("custom_str1") ?? "")) {
    console.warn(`[payfast] ITN rejected: amount mismatch for ${reference}`);
    return new NextResponse(null, { status: 400 });
  }

  // 3. Confirm with PayFast that the notification is genuine
  try {
    const res = await fetch(pf.validateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: paramString(pairs, true),
    });
    if ((await res.text()).trim() !== "VALID") {
      console.warn(`[payfast] ITN rejected by PayFast validation for ${reference}`);
      return new NextResponse(null, { status: 400 });
    }
  } catch (err) {
    console.error("[payfast] could not reach validation endpoint", err);
    return new NextResponse(null, { status: 502 });
  }

  const status = params.get("payment_status");
  console.info(`[payfast] ITN ${reference}: ${status} (pf_payment_id ${params.get("pf_payment_id")}, R${gross})`);

  if (status === "COMPLETE") {
    // ➜ Persist the paid order and send the confirmation email here.
  }

  return new NextResponse(null, { status: 200 });
}
