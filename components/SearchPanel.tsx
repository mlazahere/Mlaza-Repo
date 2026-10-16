"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { searchProducts } from "@/lib/search";
import { ProductCard } from "./ProductCard";
import { useStore } from "./StoreProvider";
import { useDialog } from "./useDialog";
import { Close } from "./MobileMenu";

export function SearchPanel() {
  const { panel, closePanel } = useStore();
  const open = panel === "search";
  const ref = useDialog<HTMLDivElement>(open, closePanel);
  const [q, setQ] = useState("");
  const router = useRouter();
  const results = useMemo(() => (q.trim() ? searchProducts(q).slice(0, 4) : []), [q]);

  return (
    <>
      <div className={`overlay ${open ? "is-open" : ""}`} onClick={closePanel} aria-hidden="true" />
      <div ref={ref} className={`search-panel ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Search" aria-hidden={!open} data-lenis-prevent>
        <div className="container">
          <form
            role="search"
            className="search-panel__form"
            onSubmit={(e) => {
              e.preventDefault();
              closePanel();
              router.push(`/shop?q=${encodeURIComponent(q.trim())}`);
            }}
          >
            <label htmlFor="site-search" className="sr-only">
              Search the collection
            </label>
            <input
              id="site-search"
              data-autofocus
              className="search-panel__input"
              type="search"
              placeholder="Search the collection"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              autoComplete="off"
            />
            <button type="button" className="icon-btn" onClick={closePanel} aria-label="Close search">
              <Close />
            </button>
          </form>
          <div aria-live="polite">
            {q.trim() && (
              <>
                <p className="result-count" style={{ paddingTop: 20 }}>
                  {results.length ? `Showing ${results.length} of ${searchProducts(q).length} — press Enter to see all` : `Nothing matches “${q.trim()}”.`}
                </p>
                {results.length > 0 && (
                  <div className="search-results" onClick={(e) => (e.target as HTMLElement).closest("a") && closePanel()}>
                    {results.map((p) => (
                      <ProductCard key={p.slug} product={p} />
                    ))}
                  </div>
                )}
              </>
            )}
            {!q.trim() && <div style={{ height: 32 }} />}
          </div>
        </div>
      </div>
    </>
  );
}
