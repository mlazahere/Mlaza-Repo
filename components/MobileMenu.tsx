"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { nav } from "@/lib/site";
import { useStore } from "./StoreProvider";
import { useDialog } from "./useDialog";

export function MobileMenu() {
  const { panel, closePanel } = useStore();
  const open = panel === "menu";
  const ref = useDialog<HTMLDivElement>(open, closePanel);
  const pathname = usePathname();

  useEffect(() => {
    closePanel();
  }, [pathname, closePanel]);

  return (
    <>
      <div className={`overlay ${open ? "is-open" : ""}`} onClick={closePanel} aria-hidden="true" />
      <div
        ref={ref}
        className={`drawer drawer--left ${open ? "is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        data-lenis-prevent
      >
        <div className="drawer__head">
          <span className="eyebrow">Menu</span>
          <button type="button" className="icon-btn" onClick={closePanel} aria-label="Close menu">
            <Close />
          </button>
        </div>
        <div className="drawer__body">
          <ul className="mobile-nav">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} tabIndex={open ? 0 : -1}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mobile-nav__secondary">
            {[
              { label: "Account", href: "/account" },
              { label: "Shopping Bag", href: "/bag" },
              { label: "FAQs", href: "/faq" },
              { label: "Shipping", href: "/shipping" },
              { label: "Returns", href: "/returns" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} tabIndex={open ? 0 : -1}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export function Close() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}
