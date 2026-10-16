"use client";

import Link from "next/link";
import { availabilityLabel } from "@/lib/catalogue";
import { formatPrice } from "@/lib/format";
import { MAX_QTY } from "@/lib/pricing";
import { Media } from "./Media";
import { useStore } from "./StoreProvider";

export function BagLines({ onNavigate }: { onNavigate?: () => void }) {
  const { lines, setQuantity, remove } = useStore();
  return (
    <ul style={{ listStyle: "none" }}>
      {lines.map(({ product, quantity, lineTotal }) => (
        <li key={product.slug} className="bag-line">
          <Link href={`/products/${product.slug}`} onClick={onNavigate} className="bag-line__media" tabIndex={-1} aria-hidden="true">
            <Media src={product.images[0]?.src} alt="" tone="product" showBrief={false} sizes="96px" style={{ height: "100%" }} />
          </Link>
          <div className="bag-line__info">
            <Link href={`/products/${product.slug}`} onClick={onNavigate} className="bag-line__name">
              {product.name}
            </Link>
            <span className="bag-line__meta">
              {formatPrice(product.price)}
              {product.availability === "made_to_order" && ` · ${availabilityLabel.made_to_order}`}
            </span>
            <div className="bag-line__actions">
              <div className="qty qty--sm" role="group" aria-label={`Quantity for ${product.name}`}>
                <button type="button" onClick={() => setQuantity(product.slug, quantity - 1)} aria-label="Decrease quantity">
                  −
                </button>
                <span aria-live="polite">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(product.slug, quantity + 1)}
                  disabled={quantity >= MAX_QTY}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button type="button" className="text-btn" onClick={() => remove(product.slug)}>
                Remove<span className="sr-only"> {product.name}</span>
              </button>
            </div>
          </div>
          <span className="bag-line__price">{formatPrice(lineTotal)}</span>
        </li>
      ))}
    </ul>
  );
}
