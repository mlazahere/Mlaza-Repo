"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { formatPrice } from "@/lib/format";
import { getProduct } from "@/lib/catalogue";
import { BagLines } from "./BagLines";
import { Close } from "./MobileMenu";
import { useStore } from "./StoreProvider";
import { useDialog } from "./useDialog";

export function BagDrawer() {
  const { panel, closePanel, lines, count, subtotal, lastAdded } = useStore();
  const open = panel === "bag";
  const ref = useDialog<HTMLDivElement>(open, closePanel);
  const pathname = usePathname();
  const justAdded = lastAdded && Date.now() - lastAdded.at < 4000 ? getProduct(lastAdded.slug) : null;

  useEffect(() => {
    closePanel();
  }, [pathname, closePanel]);

  return (
    <>
      <div className={`overlay ${open ? "is-open" : ""}`} onClick={closePanel} aria-hidden="true" />
      <div
        ref={ref}
        className={`drawer drawer--right ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        aria-hidden={!open}
        data-lenis-prevent
      >
        <div className="drawer__head">
          <span className="eyebrow">Your bag ({count})</span>
          <button type="button" className="icon-btn" onClick={closePanel} aria-label="Close shopping bag">
            <Close />
          </button>
        </div>
        <div className="drawer__body">
          {open && justAdded && (
            <p className="toast" role="status" key={lastAdded?.at}>
              <span aria-hidden="true">✓</span> {justAdded.name} has been added to your bag.
            </p>
          )}
          {lines.length ? (
            <BagLines onNavigate={closePanel} />
          ) : (
            <div className="empty" style={{ paddingBlock: 64 }}>
              <p className="h3">Your bag is empty</p>
              <p className="muted">Discover sculptural pieces made by hand.</p>
              <Link href="/shop" className="btn btn--ghost" onClick={closePanel}>
                Explore the collection
              </Link>
            </div>
          )}
        </div>
        {lines.length > 0 && (
          <div className="drawer__foot">
            <div className="totals" style={{ marginBottom: 20 }}>
              <div className="totals__row totals__row--total" style={{ borderTop: 0, paddingTop: 0 }}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="muted" style={{ fontSize: "var(--fs-sm)" }}>
                Delivery is calculated at checkout.
              </p>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              <Link href="/checkout" className="btn btn--block" onClick={closePanel}>
                Proceed to checkout
              </Link>
              <Link href="/bag" className="btn btn--ghost btn--block" onClick={closePanel}>
                View bag
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
