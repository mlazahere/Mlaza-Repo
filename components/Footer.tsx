import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

export function Footer() {
  const social = [
    { label: "Instagram", href: site.social.instagram },
    { label: "Pinterest", href: site.social.pinterest },
  ].filter((s) => s.href);

  const cols = [
    {
      title: "Explore",
      links: [
        { label: "Shop All", href: "/shop" },
        { label: "Collections", href: "/collections" },
        { label: "Our Story", href: "/our-story" },
        { label: "Craftsmanship", href: "/craftsmanship" },
      ],
    },
    {
      title: "Customer Care",
      links: [
        { label: "Contact", href: "/contact" },
        { label: "FAQs", href: "/faq" },
        { label: "Shipping", href: "/shipping" },
        { label: "Returns", href: "/returns" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms and Conditions", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo className="footer__logo" />
            <p>Objects of nature. Made to be kept.</p>
            <Link href="/#newsletter" className="link" style={{ justifySelf: "start" }}>
              Letters from MLAZA
            </Link>
          </div>
          {cols.map((col) => (
            <nav key={col.title} className="footer__col" aria-label={col.title}>
              <h2>{col.title}</h2>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          {social.length > 0 && (
            <nav className="footer__col" aria-label="Follow">
              <h2>Follow</h2>
              <ul>
                {social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} MLAZA — House of Cane</span>
          <span>
            {site.market} · Prices in Rand (ZAR)
          </span>
        </div>
      </div>
    </footer>
  );
}
