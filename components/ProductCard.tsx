"use client";

import Link from "next/link";
import { availabilityLabel, type Product } from "@/lib/catalogue";
import { formatPrice } from "@/lib/format";
import { Media } from "./Media";
import { useStore } from "./StoreProvider";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { add } = useStore();
  const [first, second] = product.images;
  const href = `/products/${product.slug}`;
  const sizes = "(max-width: 760px) 50vw, (max-width: 1100px) 33vw, 25vw";

  return (
    <article className="card">
      <div className="card__media">
        <div className="card__img">
          <Media src={first?.src} alt={first?.alt ?? product.name} tone="product" mark={product.name} showBrief={false} sizes={sizes} priority={priority} style={{ height: "100%" }} />
        </div>
        {second && (
          <div className="card__img card__img--alt" aria-hidden="true">
            <Media src={second.src} alt="" brief={second.brief} tone="light" sizes={sizes} style={{ height: "100%" }} />
          </div>
        )}
        {product.availability !== "sold_out" && (
          <button type="button" className="card__quick" onClick={() => add(product.slug)} aria-label={`Add ${product.name} to bag`}>
            Add to bag
          </button>
        )}
      </div>
      <div className="card__info">
        <div className="card__row">
          <h3 className="card__name">
            <Link href={href}>{product.name}</Link>
          </h3>
          <span className="card__price">{formatPrice(product.price)}</span>
        </div>
        {product.availability !== "in_stock" && <span className="card__status">{availabilityLabel[product.availability]}</span>}
      </div>
    </article>
  );
}
