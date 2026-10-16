import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { PageHead } from "@/components/PageHead";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with MLAZA — House of Cane." };

export default function ContactPage() {
  return (
    <>
      <PageHead title="Contact" crumbs={[{ label: "Contact" }]} intro="Questions about a piece, an order or a collaboration — we’d be glad to hear from you." />
      <section className="container two-col" style={{ paddingBottom: "var(--section)", alignItems: "start" }}>
        <div style={{ display: "grid", gap: 28, alignContent: "start" }}>
          {site.email && (
            <div style={{ display: "grid", gap: 6 }}>
              <p className="eyebrow muted">Email</p>
              <a href={`mailto:${site.email}`} className="h3">
                {site.email}
              </a>
            </div>
          )}
          <div style={{ display: "grid", gap: 6 }}>
            <p className="eyebrow muted">Before you write</p>
            <p className="lede">
              You may find your answer in our <Link href="/faq" style={{ textDecoration: "underline" }}>FAQs</Link>, or in our{" "}
              <Link href="/shipping" style={{ textDecoration: "underline" }}>shipping</Link> and{" "}
              <Link href="/returns" style={{ textDecoration: "underline" }}>returns</Link> information.
            </p>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
