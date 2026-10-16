"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/format";
import { shippingZones } from "@/lib/shipping";
import { BagLines } from "./BagLines";
import { useStore } from "./StoreProvider";

export function BagView() {
  const { lines, subtotal, ready } = useStore();
  if (!ready) return <div style={{ minHeight: 320 }} aria-busy="true" />;

  if (!lines.length) {
    return (
      <div className="empty">
        <p className="h3">Your bag is empty</p>
        <p className="muted">Discover sculptural pieces made by hand.</p>
        <Link href="/shop" className="btn">
          Explore the collection
        </Link>
      </div>
    );
  }

  const local = shippingZones.find((z) => z.id === "za")?.methods[0];

  return (
    <div className="bag-page">
      <div>
        <BagLines />
        <Link href="/shop" className="link" style={{ marginTop: 32 }}>
          Continue shopping
        </Link>
      </div>
      <aside className="summary-box" aria-label="Order summary">
        <h2 className="h3">Summary</h2>
        <div className="totals">
          <div className="totals__row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="totals__row">
            <span>Delivery</span>
            <span className="muted">{local ? `From ${formatPrice(local.price)}` : "At checkout"}</span>
          </div>
          <div className="totals__row totals__row--total">
            <span>Estimated total</span>
            <span>{formatPrice(subtotal + (local?.price ?? 0))}</span>
          </div>
        </div>
        <p className="field__hint">Final delivery cost depends on your destination and is confirmed at checkout.</p>
        <Link href="/checkout" className="btn btn--block">
          Proceed to checkout
        </Link>
      </aside>
    </div>
  );
}
