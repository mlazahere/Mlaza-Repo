"use client";

import { useState } from "react";
import type { Product } from "@/lib/catalogue";
import { MAX_QTY } from "@/lib/pricing";
import { useStore } from "./StoreProvider";

export function AddToBag({ product }: { product: Product }) {
  const { add } = useStore();
  const [qty, setQty] = useState(1);
  const soldOut = product.availability === "sold_out";

  return (
    <div className="buy">
      <div className="buy__row">
        <div className="qty" role="group" aria-label="Quantity">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1 || soldOut} aria-label="Decrease quantity">
            −
          </button>
          <output aria-live="polite" aria-label="Quantity">
            {qty}
          </output>
          <button type="button" onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))} disabled={qty >= MAX_QTY || soldOut} aria-label="Increase quantity">
            +
          </button>
        </div>
        <button type="button" className="btn" disabled={soldOut} onClick={() => add(product.slug, qty)}>
          {soldOut ? "Sold out" : "Add to bag"}
        </button>
      </div>
      {product.availability === "made_to_order" && (
        <p className="field__hint">Made to order — each piece is woven after your order is placed. Lead times are confirmed by email.</p>
      )}
      {soldOut && (
        <p className="field__hint">
          This piece is currently sold out. <a href="/contact" style={{ textDecoration: "underline" }}>Contact us</a> to ask about availability.
        </p>
      )}
    </div>
  );
}
