import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Payment cancelled", robots: { index: false } };

export default function CancelledPage() {
  return (
    <section className="container empty" style={{ paddingTop: "calc(var(--header-h) + 96px)", paddingBottom: "var(--section)" }}>
      <h1 className="h1">Payment cancelled</h1>
      <p className="lede" style={{ marginInline: "auto" }}>
        No payment was taken. Your bag has been saved, so you can return to checkout whenever you’re ready.
      </p>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <Link href="/checkout" className="btn">
          Return to checkout
        </Link>
        <Link href="/bag" className="btn btn--ghost">
          View bag
        </Link>
      </div>
    </section>
  );
}
