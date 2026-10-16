import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = { title: "Frequently Asked Questions", description: "Answers to common questions about MLAZA pieces, orders, delivery and care." };

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "What are MLAZA pieces made from?",
    a: <p>Our handbags and accessories are woven from natural cane. Each product page lists the materials for that piece.</p>,
  },
  {
    q: "Why does my piece look slightly different from the photographs?",
    a: <p>Every piece is made by hand from a natural material, so tone, texture and weave vary slightly. These variations are part of its character.</p>,
  },
  {
    q: "How do I care for my bag?",
    a: (
      <p>
        Wipe it gently with a soft, dry cloth, keep it away from prolonged moisture and direct heat, and store it stuffed with tissue in its dust bag to
        hold its shape. Care notes are also on every product page.
      </p>
    ),
  },
  {
    q: "What does “made to order” mean?",
    a: <p>Made-to-order pieces are woven after you place your order. We’ll confirm the expected lead time by email.</p>,
  },
  {
    q: "Which payment methods do you accept?",
    a: <p>Payments are made securely through PayFast, which supports card and other South African payment methods. We never see or store your card details.</p>,
  },
  {
    q: "Do you ship internationally?",
    a: (
      <p>
        We deliver within South Africa and to selected international destinations. Available options and costs appear at checkout. International orders
        may be subject to import duties and taxes — see <Link href="/shipping">Shipping and Delivery</Link>.
      </p>
    ),
  },
  {
    q: "Can I return or exchange my order?",
    a: (
      <p>
        Please read our <Link href="/returns">Returns and Exchanges</Link> policy, then contact us with your order reference.
      </p>
    ),
  },
  {
    q: "How do I contact you?",
    a: (
      <p>
        Use the form on our <Link href="/contact">contact page</Link> and we’ll reply by email.
      </p>
    ),
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHead title="Frequently Asked Questions" crumbs={[{ label: "FAQs" }]} />
      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <div className="accordion accordion--faq" style={{ maxWidth: "56rem" }}>
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div className="accordion__body">{f.a}</div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
