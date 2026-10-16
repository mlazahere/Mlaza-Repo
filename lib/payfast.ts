import "server-only";
import crypto from "node:crypto";

/**
 * PayFast hosted-checkout integration (https://developers.payfast.co.za/docs).
 * Customers enter card details on PayFast's own secure pages — this site never
 * sees or stores card data. All credentials stay on the server.
 */

export function payfastConfig() {
  const merchantId = process.env.PAYFAST_MERCHANT_ID || "";
  const merchantKey = process.env.PAYFAST_MERCHANT_KEY || "";
  const passphrase = process.env.PAYFAST_PASSPHRASE || "";
  const sandbox = process.env.PAYFAST_SANDBOX !== "false";
  const host = sandbox ? "sandbox.payfast.co.za" : "www.payfast.co.za";
  return {
    configured: Boolean(merchantId && merchantKey && passphrase),
    merchantId,
    merchantKey,
    passphrase,
    sandbox,
    processUrl: `https://${host}/eng/process`,
    validateUrl: `https://${host}/eng/query/validate`,
  };
}

/** Mirrors PHP's urlencode(), which PayFast uses when computing signatures. */
function phpEncode(value: string) {
  return encodeURIComponent(value)
    .replace(/[!'()*~]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase())
    .replace(/%20/g, "+");
}

/**
 * Outgoing requests omit empty fields and trim values; incoming ITN data is
 * signed by PayFast exactly as posted, empties included (`asReceived`).
 */
export function paramString(fields: [string, string][], asReceived = false) {
  return fields
    .filter(([, v]) => asReceived || v !== "")
    .map(([k, v]) => `${k}=${phpEncode(asReceived ? v : v.trim())}`)
    .join("&");
}

export function sign(fields: [string, string][], passphrase: string, asReceived = false) {
  let str = paramString(fields, asReceived);
  if (passphrase) str += `&passphrase=${phpEncode(passphrase.trim())}`;
  return crypto.createHash("md5").update(str).digest("hex");
}

/** Binds an order reference to its expected amount so the ITN can be checked without a database. */
export function orderSeal(reference: string, amount: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(`${reference}|${amount}`).digest("hex").slice(0, 40);
}

export function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}
