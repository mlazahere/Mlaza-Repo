import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";
import { payfastConfig } from "@/lib/payfast";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const { configured, sandbox } = payfastConfig();
  return (
    <section className="container" style={{ paddingTop: "calc(var(--header-h) + 56px)", paddingBottom: "var(--section)" }}>
      <h1 className="h1" style={{ marginBottom: 48 }}>
        Checkout
      </h1>
      <CheckoutForm paymentsReady={configured} sandbox={sandbox} />
    </section>
  );
}
