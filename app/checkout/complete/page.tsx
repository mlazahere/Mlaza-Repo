import type { Metadata } from "next";
import Link from "next/link";
import { ClearBag } from "@/components/ClearBag";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

export default async function CompletePage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await searchParams;
  const reference = ref && /^MLZ-[A-Z0-9-]{4,40}$/.test(ref) ? ref : null;
  return (
    <section className="container empty" style={{ paddingTop: "calc(var(--header-h) + 96px)", paddingBottom: "var(--section)" }}>
      <ClearBag />
      <p className="eyebrow muted">Thank you</p>
      <h1 className="h1">Your order has been received</h1>
      <p className="lede" style={{ marginInline: "auto" }}>
        We’re confirming your payment with PayFast. Once it’s confirmed you’ll receive an email with your order details.
        {reference && (
          <>
            {" "}
            Your reference is <strong style={{ color: "var(--text)" }}>{reference}</strong>.
          </>
        )}
      </p>
      <Link href="/shop" className="btn btn--ghost">
        Continue shopping
      </Link>
    </section>
  );
}
