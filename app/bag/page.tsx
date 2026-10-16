import type { Metadata } from "next";
import { BagView } from "@/components/BagView";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = { title: "Shopping Bag", robots: { index: false } };

export default function BagPage() {
  return (
    <>
      <PageHead title="Shopping Bag" crumbs={[{ label: "Shopping Bag" }]} />
      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <BagView />
      </section>
    </>
  );
}
