import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { availabilityLabel, getCollection, getProduct, products, relatedProducts } from "@/lib/catalogue";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";
import { AddToBag } from "@/components/AddToBag";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    openGraph: { title: p.name, description: p.summary, images: p.images[0]?.src ? [p.images[0].src] : undefined },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const collection = getCollection(product.collections[0]);
  const related = relatedProducts(product);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    brand: { "@type": "Brand", name: site.fullName },
    ...(product.images.some((i) => i.src) && { image: product.images.filter((i) => i.src).map((i) => site.url + i.src) }),
    offers: {
      "@type": "Offer",
      priceCurrency: "ZAR",
      price: (product.price / 100).toFixed(2),
      url: `${site.url}/products/${product.slug}`,
      availability:
        product.availability === "sold_out"
          ? "https://schema.org/OutOfStock"
          : product.availability === "made_to_order"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/InStock",
    },
  };

  return (
    <>
      {/* Structured data is only emitted for real catalogue entries. */}
      {!product.sample && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <div className="container pdp">
        <ProductGallery images={product.images} name={product.name} />

        <div className="pdp__panel">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              {collection && (
                <li>
                  <Link href={`/collections/${collection.slug}`}>{collection.title}</Link>
                </li>
              )}
            </ol>
          </nav>
          <div style={{ display: "grid", gap: 12 }}>
            <h1 className="pdp__title">{product.name}</h1>
            <p className="pdp__price">{formatPrice(product.price)}</p>
            <p className="muted" style={{ fontSize: "var(--fs-sm)" }}>
              {availabilityLabel[product.availability]}
            </p>
            {product.sample && <span className="sample-flag" style={{ justifySelf: "start" }}>Sample product · details to be confirmed</span>}
          </div>

          <div className="pdp__desc">
            {product.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <AddToBag product={product} />

          <div className="accordion">
            <details open>
              <summary>Materials</summary>
              <div className="accordion__body">
                <p>{product.materials}</p>
              </div>
            </details>
            <details>
              <summary>Dimensions</summary>
              <div className="accordion__body">
                <p>{product.dimensions ?? "Dimensions to be confirmed."}</p>
                {product.weight && <p>Weight: {product.weight}</p>}
              </div>
            </details>
            <details>
              <summary>Care</summary>
              <div className="accordion__body">
                <ul>
                  {product.care.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <p>Natural cane varies piece to piece; small differences in tone and weave are part of its character.</p>
              </div>
            </details>
            <details>
              <summary>Shipping</summary>
              <div className="accordion__body">
                <p>We deliver within South Africa and to selected international destinations. Delivery options and costs are shown at checkout.</p>
                <p>
                  <Link href="/shipping">Shipping and delivery</Link>
                </p>
              </div>
            </details>
            <details>
              <summary>Returns</summary>
              <div className="accordion__body">
                <p>Read our returns and exchanges policy before ordering, particularly for made-to-order pieces.</p>
                <p>
                  <Link href="/returns">Returns and exchanges</Link>
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      <section className="section" aria-labelledby="related-title">
        <div className="container">
          <div className="section-head">
            <h2 id="related-title" className="h2" data-reveal>
              You may also consider
            </h2>
            <Link href="/shop" className="link">
              Shop all
            </Link>
          </div>
          <ul className="product-grid">
            {related.map((p, i) => (
              <li key={p.slug} data-reveal style={{ ["--reveal-delay" as string]: i * 80 }}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
