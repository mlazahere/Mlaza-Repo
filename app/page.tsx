import Link from "next/link";
import { collections, featuredSlugs, getProduct, type Product } from "@/lib/catalogue";
import { Media } from "@/components/Media";
import { ProductCard } from "@/components/ProductCard";
import { NewsletterForm } from "@/components/NewsletterForm";

const d = (ms: number) => ({ ["--reveal-delay" as string]: ms }) as React.CSSProperties;

export default function HomePage() {
  const featured = featuredSlugs.map(getProduct).filter((p): p is Product => Boolean(p));

  return (
    <>
      {/* B — Hero campaign */}
      <section className="hero" aria-label="MLAZA — House of Cane">
        <div className="hero__media" data-parallax="0.08">
          <div data-parallax-inner>
            <Media
              tone="dark"
              priority
              alt="A model in ivory linen carrying a sculptural natural cane handbag in a sunlit plaster courtyard"
              brief="Hero campaign — Black model in cream linen, sculptural cane bag in hand as focal point; textured plaster, natural stone, golden-hour shadows"
            />
          </div>
        </div>
        <div className="hero__scrim" />
        <div className="hero__content">
          <div className="container">
            <p className="eyebrow hero__brand" data-reveal="fade">
              MLAZA — House of Cane
            </p>
            <h1 className="hero__title" data-reveal style={d(120)}>
              Objects of nature. <span className="italic">Made to be kept.</span>
            </h1>
            <div data-reveal style={d(260)}>
              <Link href="/shop" className="btn btn--light">
                Explore the collection
              </Link>
            </div>
          </div>
        </div>
        <span className="hero__scroll" aria-hidden="true">
          Scroll
        </span>
      </section>

      {/* C — Featured collection */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-head__text">
              <h2 className="h2" data-reveal>
                The Collection
              </h2>
              <p className="lede" data-reveal style={d(100)}>
                Sculptural forms. Natural materials. Considered design.
              </p>
            </div>
            <Link href="/shop" className="link" data-reveal style={d(200)}>
              Shop all
            </Link>
          </div>
          <ul className="product-grid">
            {featured.map((p, i) => (
              <li key={p.slug} data-reveal style={d(i * 90)}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* D — Campaign */}
      <section className="campaign" aria-labelledby="campaign-title">
        <div className="campaign__media" data-parallax="0.1">
          <div data-parallax-inner>
            <Media
              tone="dark"
              alt="A model walks through a sunlit architectural courtyard carrying a cane handbag"
              brief="Campaign — model walking through a sunlit courtyard, bag at her side; different angle and setting from the hero"
            />
          </div>
        </div>
        <div className="campaign__scrim" />
        <div className="campaign__content">
          <div className="container">
            <div className="campaign__text">
              <h2 id="campaign-title" className="h1" data-reveal>
                A Study in Natural Form
              </h2>
              <p data-reveal style={d(120)}>
                Rooted in natural materials and shaped by skilled hands, each piece brings together thoughtful design,
                timeless form and the beauty of considered craftsmanship.
              </p>
              <div data-reveal style={d(220)}>
                <Link href="/our-story" className="link">
                  Discover MLAZA
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* E — Craftsmanship and origin */}
      <section className="section" aria-labelledby="craft-title">
        <div className="container craft-grid">
          <div className="craft-grid__a" data-reveal="image">
            <Media
              alt="Artisan hands weaving natural cane"
              brief="Documentary — artisan’s hands mid-weave, natural daylight; dignified, unposed"
              style={{ aspectRatio: "4 / 5" }}
            />
          </div>
          <div className="craft-grid__b" data-reveal="image" style={d(150)}>
            <Media
              alt="Women in wrapped chitenges sorting cane together"
              brief="Documentary — women in wrapped chitenges sorting cane, mid-conversation"
              style={{ aspectRatio: "3 / 4" }}
            />
          </div>
          <div className="craft-grid__c" data-reveal="image" style={d(300)}>
            <Media
              alt="Bundles of prepared cane drying in the sun"
              brief="Material — prepared cane bundles in sunlight"
              style={{ aspectRatio: "3 / 4" }}
            />
          </div>
          <div className="craft-grid__text">
            <p className="eyebrow muted" data-reveal>
              Craft &amp; origin
            </p>
            <h2 id="craft-title" className="h2" data-reveal style={d(80)}>
              Made by Hand. <span className="italic">Rooted in Place.</span>
            </h2>
            <p className="lede" data-reveal style={d(160)}>
              Every MLAZA piece begins with natural material and the skill of human hands. Our designs celebrate the beauty
              of woven cane, the knowledge of artisans and the individuality of objects made through considered
              craftsmanship.
            </p>
            <div data-reveal style={d(240)}>
              <Link href="/craftsmanship" className="link">
                Discover our craft
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* F — Shop by collection */}
      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="collections-title">
        <div className="container">
          <div className="section-head">
            <h2 id="collections-title" className="h2" data-reveal>
              Shop by Collection
            </h2>
            <Link href="/collections" className="link" data-reveal style={d(100)}>
              All collections
            </Link>
          </div>
          <div className="tiles">
            {collections.map((c, i) => (
              <Link key={c.slug} href={`/collections/${c.slug}`} className="tile" data-reveal="image" style={d(i * 120)}>
                <div className="media">
                  <div className="media__inner">
                    <Media tone="dark" src={c.image.src} alt={c.image.alt} brief={c.image.brief} sizes="(max-width: 760px) 100vw, 33vw" style={{ height: "100%" }} />
                  </div>
                </div>
                <div className="tile__scrim" />
                <div className="tile__text">
                  <h3 className="tile__title">{c.title}</h3>
                  <span className="link" style={{ justifySelf: "start" }}>
                    Explore
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* G — Manifesto */}
      <section className="section manifesto" aria-label="Manifesto">
        <div className="container">
          <p className="manifesto__text">
            <span data-reveal>Nature gives the material.</span>
            <span data-reveal style={d(180)}>
              Human hands give it form.
            </span>
            <span data-reveal style={d(360)}>
              Design gives it a life beyond the moment.
            </span>
          </p>
        </div>
      </section>

      {/* H — Editorial detail */}
      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="detail-title">
        <div className="container split">
          <div className="split__media" data-reveal="image" data-parallax="0.05" style={{ aspectRatio: "5 / 6" }}>
            <div data-parallax-inner>
              <Media
                alt="Close-up of the cane weave in raking light"
                brief="Macro — the true weave of an MLAZA piece in raking light, photographed from the actual product"
                style={{ height: "100%" }}
              />
            </div>
          </div>
          <div className="split__text">
            <h2 id="detail-title" className="h2" data-reveal>
              The Beauty Is in the Detail
            </h2>
            <p className="lede" data-reveal style={d(120)}>
              Considered forms. Tactile materials. Details that reveal themselves slowly.
            </p>
            <div data-reveal style={d(220)}>
              <Link href="/shop" className="link">
                Shop all
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* I — Newsletter */}
      <section id="newsletter" className="section newsletter" aria-labelledby="newsletter-title">
        <div className="container newsletter__inner">
          <div style={{ display: "grid", gap: 16 }}>
            <h2 id="newsletter-title" className="h2" data-reveal>
              Letters from MLAZA
            </h2>
            <p className="lede" data-reveal style={d(100)}>
              New collections, considered objects and stories from the hands behind the craft.
            </p>
          </div>
          <div data-reveal style={d(180)}>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
