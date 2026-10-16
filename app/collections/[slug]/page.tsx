import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { collections, getCollection, productsInCollection } from "@/lib/catalogue";
import { Media } from "@/components/Media";
import { ShopBrowser } from "@/components/ShopBrowser";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCollection((await params).slug);
  return c ? { title: c.title, description: c.intro } : {};
}

export default async function CollectionPage({ params }: Props) {
  const collection = getCollection((await params).slug);
  if (!collection) notFound();

  return (
    <>
      <section className="hero" style={{ height: "78svh", minHeight: 520 }} aria-labelledby="collection-title">
        <div className="hero__media" data-parallax="0.08">
          <div data-parallax-inner>
            <Media tone="dark" priority src={collection.image.src} alt={collection.image.alt} brief={collection.image.brief} />
          </div>
        </div>
        <div className="hero__scrim" />
        <div className="hero__content">
          <div className="container">
            <nav aria-label="Breadcrumb">
              <ol className="breadcrumb" style={{ color: "var(--text-on-dark-soft)" }}>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/collections">Collections</Link>
                </li>
                <li>
                  <span aria-current="page">{collection.title}</span>
                </li>
              </ol>
            </nav>
            <h1 id="collection-title" className="hero__title" data-reveal style={{ maxWidth: "none" }}>
              {collection.title}
            </h1>
            <p data-reveal style={{ maxWidth: "34rem", color: "var(--text-on-dark-soft)", fontSize: "var(--fs-md)" }}>
              {collection.intro}
            </p>
          </div>
        </div>
      </section>
      <section className="container section">
        <Suspense>
          <ShopBrowser products={productsInCollection(collection.slug)} showCollections={false} />
        </Suspense>
      </section>
    </>
  );
}
