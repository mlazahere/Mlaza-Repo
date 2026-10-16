import type { Metadata } from "next";
import Link from "next/link";
import { Media } from "@/components/Media";
import { EditorNote } from "@/components/EditorNote";

export const metadata: Metadata = {
  title: "Our Story",
  description: "MLAZA — House of Cane: natural materials, cane craftsmanship and contemporary design, made to be kept.",
};

const d = (ms: number) => ({ ["--reveal-delay" as string]: ms }) as React.CSSProperties;

const chapters = [
  {
    title: "Material",
    body: "Everything begins with cane — a natural material with its own grain, tone and resilience. We let its character lead, and we design so that it can be seen.",
  },
  {
    title: "Hands",
    body: "Each piece is shaped by skilled hands. The weave carries the rhythm of the person who made it, so no two pieces are quite the same.",
  },
  {
    title: "Form",
    body: "Our silhouettes are drawn as sculptures first: architectural lines, soft curves and handles conceived as part of the whole.",
  },
  {
    title: "Kept",
    body: "We make objects intended to stay — to be carried, cared for and returned to over many seasons.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      <section className="hero" style={{ height: "92svh" }} aria-labelledby="story-title">
        <div className="hero__media" data-parallax="0.08">
          <div data-parallax-inner>
            <Media
              tone="dark"
              priority
              alt="A model holding a sculptural cane bag against a warm stone wall"
              brief="Campaign — model holding an MLAZA bag against warm stone in soft side light"
            />
          </div>
        </div>
        <div className="hero__scrim" />
        <div className="hero__content">
          <div className="container">
            <p className="eyebrow hero__brand">Our Story</p>
            <h1 id="story-title" className="hero__title" data-reveal style={{ maxWidth: "14ch" }}>
              A house built on <span className="italic">natural form.</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col" style={{ alignItems: "start" }}>
          <h2 className="h2" data-reveal>
            Objects of nature, <span className="italic">made to be kept.</span>
          </h2>
          <div style={{ display: "grid", gap: 20 }}>
            <p className="lede" data-reveal style={d(100)}>
              MLAZA — House of Cane creates sculptural handbags and accessories from woven cane. We bring together the
              warmth of a natural material, the knowledge of the hands that weave it and a contemporary, architectural
              approach to design.
            </p>
            <p className="lede" data-reveal style={d(180)}>
              Our work is rooted in African artistry and made for a life beyond the moment: quiet pieces with presence,
              designed to be carried for years.
            </p>
            <EditorNote>Add the founder’s story, founding year and studio location once confirmed. Nothing has been invented here.</EditorNote>
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: "var(--section)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(12, minmax(0,1fr))", gap: "var(--gutter)" }}>
          <div style={{ gridColumn: "1 / span 7" }} data-reveal="image" className="story-wide">
            <Media alt="Close-up of the cane weave" brief="Material — close-up of the woven surface, natural light" style={{ aspectRatio: "4 / 3" }} />
          </div>
          <div style={{ gridColumn: "9 / span 4", alignSelf: "end" }} data-reveal="image" className="story-narrow">
            <Media alt="Finished cane bag on a plaster plinth" brief="Still life — finished piece on a plaster plinth" style={{ aspectRatio: "3 / 4" }} />
          </div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container">
          <p className="eyebrow" style={{ color: "var(--text-on-dark-soft)", marginBottom: 32 }}>
            What guides us
          </p>
          {chapters.map((c, i) => (
            <div key={c.title} className="story-chapter" style={{ borderColor: "rgba(247,244,238,0.14)" }} data-reveal>
              <span className="story-chapter__num" style={{ color: "var(--cane)" }}>
                0{i + 1}
              </span>
              <div className="story-chapter__body">
                <h3 className="h3">{c.title}</h3>
                <p className="lede">{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container split split--reverse">
          <div className="split__media" data-reveal="image">
            <Media alt="Artisans at work with natural cane" brief="Behind the scenes — artisans at work, documentary style" style={{ aspectRatio: "4 / 5" }} />
          </div>
          <div className="split__text">
            <h2 className="h2" data-reveal>
              The hands behind the craft
            </h2>
            <p className="lede" data-reveal>
              Our pieces are made by hand, and the people who make them are at the heart of what we do.
            </p>
            <div data-reveal>
              <Link href="/craftsmanship" className="link">
                Discover our craft
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
