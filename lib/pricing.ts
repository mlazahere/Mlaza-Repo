import { getProduct, type Product } from "./catalogue";
import { findMethod, zoneForCountry } from "./shipping";

export type LineInput = { slug: string; quantity: number };
export type QuoteLine = { product: Product; quantity: number; lineTotal: number };

export const MAX_QTY = 10;

/**
 * Prices an order from the server-side catalogue. Client-submitted prices are
 * never trusted — only slugs and quantities are read from the request.
 */
export function quote(lines: LineInput[], country: string, methodId: string) {
  const errors: string[] = [];
  const quoted: QuoteLine[] = [];

  for (const line of lines) {
    const product = getProduct(String(line.slug));
    const quantity = Math.floor(Number(line.quantity));
    if (!product) {
      errors.push("One of the pieces in your bag is no longer available.");
      continue;
    }
    if (product.availability === "sold_out") {
      errors.push(`${product.name} is sold out.`);
      continue;
    }
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > MAX_QTY) {
      errors.push(`Please choose a quantity between 1 and ${MAX_QTY} for ${product.name}.`);
      continue;
    }
    quoted.push({ product, quantity, lineTotal: product.price * quantity });
  }

  const zone = zoneForCountry(country);
  const found = findMethod(methodId);
  if (!zone) errors.push("We don't currently ship to the selected country.");
  else if (!found || found.zone.id !== zone.id) errors.push("Please choose a delivery method.");

  const subtotal = quoted.reduce((s, l) => s + l.lineTotal, 0);
  const shipping = found && zone && found.zone.id === zone.id ? found.method.price : 0;

  if (!quoted.length && !errors.length) errors.push("Your bag is empty.");

  return {
    ok: errors.length === 0,
    errors,
    lines: quoted,
    subtotal,
    shipping,
    total: subtotal + shipping,
    method: found?.method,
    zone,
  };
}
