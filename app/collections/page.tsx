import type { Metadata } from "next";
import Link from "next/link";
import { collections, productsInCollection } from "@/lib/catalogue";
import { Media } from "@/components/Media";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = { title: "Collections", description: "Explore the MLAZA collections." };

export default function CollectionsPage() {
  return (
    <>
      <PageHead title="Collections" crumbs={[{ label: "Collections" }]} intro="Three ways into the House of Cane." />
      <section className="container" style={{ paddingBottom: "var(--section)", display: "grid", gap: "var(--section)" }}>
        {collections.map((c, i) => (
          <article key={c.slug} className={`split ${i % 2 ? "split--reverse" : ""}`}>
            <Link href={`/collections/${c.slug}`} className="split__media tile" data-reveal="image" aria-hidden="true" tabIndex={-1}>
              <div className="media" style={{ aspectRatio: "4 / 3" }}>
                <div className="media__inner">
                  <Media tone="dark" src={c.image.src} alt={c.image.alt} brief={c.image.brief} sizes="(max-width: 960px) 100vw, 60vw" style={{ height: "100%" }} />
                </div>
              </div>
            </Link>
            <div className="split__text">
              <p className="eyebrow muted" data-reveal>
                {productsInCollection(c.slug).length} pieces
              </p>
              <h2 className="h2" data-reveal>
                {c.title}
              </h2>
              <p className="lede" data-reveal>
                {c.intro}
              </p>
              <div data-reveal>
                <Link href={`/collections/${c.slug}`} className="link">
                  Explore {c.title}
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
