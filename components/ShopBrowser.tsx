"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { collections, type Availability, type Product } from "@/lib/catalogue";
import { searchProducts } from "@/lib/search";
import { ProductCard } from "./ProductCard";

const PAGE = 8;
const sorts = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price: low to high",
  "price-desc": "Price: high to low",
} as const;
type Sort = keyof typeof sorts;

const availabilityOptions: { value: "" | Availability; label: string }[] = [
  { value: "", label: "All" },
  { value: "in_stock", label: "Available" },
  { value: "made_to_order", label: "Made to order" },
];

export function ShopBrowser({ products, showCollections = true }: { products: Product[]; showCollections?: boolean }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [limit, setLimit] = useState(PAGE);

  const q = params.get("q") ?? "";
  const collection = params.get("collection") ?? "";
  const availability = (params.get("availability") ?? "") as "" | Availability;
  const sort = ((params.get("sort") as Sort) in sorts ? params.get("sort") : "featured") as Sort;
  const [query, setQuery] = useState(q);

  function update(next: Record<string, string>) {
    const sp = new URLSearchParams(params.toString());
    for (const [k, v] of Object.entries(next)) (v ? sp.set(k, v) : sp.delete(k));
    setLimit(PAGE);
    router.replace(`${pathname}${sp.size ? `?${sp}` : ""}`, { scroll: false });
  }

  const filtered = useMemo(() => {
    const matches = new Set(searchProducts(q).map((p) => p.slug));
    let list = products.filter((p) => matches.has(p.slug));
    if (collection) list = list.filter((p) => p.collections.includes(collection as Product["collections"][number]));
    if (availability) list = list.filter((p) => p.availability === availability);
    const sorted = [...list];
    if (sort === "newest") sorted.sort((a, b) => b.addedAt.localeCompare(a.addedAt));
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    // sold-out pieces sit at the end unless explicitly filtered
    if (sort === "featured") sorted.sort((a, b) => Number(a.availability === "sold_out") - Number(b.availability === "sold_out"));
    return sorted;
  }, [products, q, collection, availability, sort]);

  const visible = filtered.slice(0, limit);

  return (
    <>
      <div className="toolbar">
        {showCollections && (
          <div className="toolbar__group" role="group" aria-label="Filter by collection">
            <button type="button" className="chip" aria-pressed={!collection} onClick={() => update({ collection: "" })}>
              All
            </button>
            {collections.map((c) => (
              <button
                key={c.slug}
                type="button"
                className="chip"
                aria-pressed={collection === c.slug}
                onClick={() => update({ collection: c.slug })}
              >
                {c.title}
              </button>
            ))}
          </div>
        )}
        <div className="toolbar__group">
          <form
            role="search"
            className="toolbar__group--search"
            onSubmit={(e) => {
              e.preventDefault();
              update({ q: query.trim() });
            }}
          >
            <label htmlFor="shop-search" className="sr-only">
              Search products
            </label>
            <input
              id="shop-search"
              className="input"
              type="search"
              placeholder="Search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!e.target.value) update({ q: "" });
              }}
            />
          </form>
          <label className="sr-only" htmlFor="shop-availability">
            Availability
          </label>
          <select
            id="shop-availability"
            className="select"
            value={availability}
            onChange={(e) => update({ availability: e.target.value })}
          >
            {availabilityOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.value ? o.label : "Availability: all"}
              </option>
            ))}
          </select>
          <label className="sr-only" htmlFor="shop-sort">
            Sort by
          </label>
          <select id="shop-sort" className="select" value={sort} onChange={(e) => update({ sort: e.target.value === "featured" ? "" : e.target.value })}>
            {Object.entries(sorts).map(([v, l]) => (
              <option key={v} value={v}>
                {v === "featured" ? "Sort: featured" : l}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="result-count" aria-live="polite" style={{ marginBottom: 28 }}>
        {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
        {q && <> for “{q}”</>}
      </p>

      {visible.length ? (
        <ul className="product-grid">
          {visible.map((p, i) => (
            <li key={p.slug} data-reveal style={{ ["--reveal-delay" as string]: (i % 4) * 80 }}>
              <ProductCard product={p} priority={i < 4} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p className="h3">No pieces match your selection</p>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setQuery("");
              update({ q: "", collection: "", availability: "" });
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      {filtered.length > limit && (
        <div style={{ display: "grid", justifyItems: "center", gap: 14, marginTop: 72 }}>
          <p className="result-count">
            Showing {visible.length} of {filtered.length}
          </p>
          <button type="button" className="btn btn--ghost" onClick={() => setLimit((n) => n + PAGE)}>
            Load more
          </button>
        </div>
      )}
    </>
  );
}
