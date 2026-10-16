import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = { title: "Account", robots: { index: false } };

export default function AccountPage() {
  return (
    <>
      <PageHead
        title="Account"
        crumbs={[{ label: "Account" }]}
        intro="You don’t need an account to shop with MLAZA — checkout as a guest and we’ll email your order details."
      />
      <section className="container two-col" style={{ paddingBottom: "var(--section)" }}>
        <div className="summary-box" style={{ position: "static" }}>
          <h2 className="h3">Your orders</h2>
          <p className="muted">
            For help with an existing order, send us your order reference (it starts with “MLZ-” and appears in your confirmation email).
          </p>
          <Link href="/contact" className="btn btn--ghost" style={{ justifySelf: "start" }}>
            Contact customer care
          </Link>
        </div>
        <div className="summary-box" style={{ position: "static" }}>
          <h2 className="h3">Your bag</h2>
          <p className="muted">Your shopping bag is saved on this device, so it will be here when you return.</p>
          <Link href="/bag" className="btn btn--ghost" style={{ justifySelf: "start" }}>
            View bag
          </Link>
        </div>
      </section>
    </>
  );
}
