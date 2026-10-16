"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { useStore } from "./StoreProvider";

const left = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Our Story", href: "/our-story" },
  { label: "Craftsmanship", href: "/craftsmanship" },
];

export function Header() {
  const pathname = usePathname();
  const { count, openPanel, ready, lastAdded } = useStore();
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const el = countRef.current;
    if (!el || !lastAdded) return;
    el.classList.remove("is-bumped");
    void el.offsetWidth;
    el.classList.add("is-bumped");
  }, [lastAdded]);

  const solid = !overHero || scrolled;
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className={`header ${solid ? "is-solid" : ""}`}>
      <div className="container header__inner">
        <nav className="header__nav" aria-label="Primary">
          <button
            type="button"
            className="header__burger"
            aria-label="Open menu"
            aria-haspopup="dialog"
            onClick={() => openPanel("menu")}
          >
            <span className="burger-lines" aria-hidden="true" />
          </button>
          {left.map((l) => (
            <Link key={l.href} href={l.href} className="header__link" aria-current={isActive(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>

        <Logo className="header__logo" priority />

        <div className="header__tools">
          <Link href="/contact" className="header__link hide-tablet" aria-current={isActive("/contact") ? "page" : undefined}>
            Contact
          </Link>
          <button type="button" className="header__link" onClick={() => openPanel("search")} aria-haspopup="dialog">
            Search
          </button>
          <Link href="/account" className="header__link" aria-current={isActive("/account") ? "page" : undefined}>
            Account
          </Link>
          <button type="button" className="icon-btn mobile-only" aria-label="Search" onClick={() => openPanel("search")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5L21 21" />
            </svg>
          </button>
          <button
            type="button"
            className="header__link icon-btn"
            onClick={() => openPanel("bag")}
            aria-haspopup="dialog"
            aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
            style={{ display: "inline-flex" }}
          >
            Bag&nbsp;
            <span className="bag-count" ref={countRef} aria-hidden="true">
              ({ready ? count : 0})
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
