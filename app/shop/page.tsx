import type { Metadata } from "next";
import { Suspense } from "react";
import { products } from "@/lib/catalogue";
import { PageHead } from "@/components/PageHead";
import { ShopBrowser } from "@/components/ShopBrowser";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Shop sculptural, handcrafted cane handbags and accessories from MLAZA — House of Cane.",
};

export default function ShopPage() {
  return (
    <>
      <PageHead title="Shop All" crumbs={[{ label: "Shop All" }]} intro="Sculptural forms. Natural materials. Considered design." />
      <section className="container" style={{ paddingBottom: "var(--section)" }}>
        <Suspense>
          <ShopBrowser products={products} />
        </Suspense>
      </section>
    </>
  );
}
