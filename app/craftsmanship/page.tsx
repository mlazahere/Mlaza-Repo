import type { Metadata } from "next";
import Link from "next/link";
import { Media } from "@/components/Media";
import { EditorNote } from "@/components/EditorNote";

export const metadata: Metadata = {
  title: "Craftsmanship",
  description: "The craft behind MLAZA: natural cane, skilled hands and pieces made one at a time.",
};

const steps = [
  {
    title: "Preparing the cane",
    body: "Natural cane is selected, sorted and prepared so that it can be worked. Its tone and texture vary — part of what makes each piece individual.",
    image: { alt: "Cane being sorted and prepared", brief: "Documentary — sorting and preparing cane, natural light, unposed" },
  },
  {
    title: "Weaving",
    body: "The body of each bag is woven by hand. Tension, rhythm and patience give the weave its strength and its quiet regularity.",
    image: { alt: "Hands weaving cane", brief: "Documentary — hands mid-weave, close crop, warm daylight" },
  },
  {
    title: "Shaping & finishing",
    body: "Handles and edges are formed and finished with care, so that the piece holds its shape for years.",
    image: { alt: "Finishing the handle of a cane bag", brief: "Detail — handle being shaped and finished" },
  },
];

export default function CraftsmanshipPage() {
  return (
    <>
      <section className="hero" style={{ height: "92svh" }} aria-labelledby="craft-title">
        <div className="hero__media" data-parallax="0.08">
          <div data-parallax-inner>
            <Media
              tone="dark"
              priority
              alt="Artisans weaving natural cane together in Malawi"
              brief="Documentary — artisans in Malawi weaving and talking together; women in wrapped chitenges, men in simple work clothing; dignified, natural light"
            />
          </div>
        </div>
        <div className="hero__scrim" />
        <div className="hero__content">
          <div className="container">
            <p className="eyebrow hero__brand">Craftsmanship</p>
            <h1 id="craft-title" className="hero__title" data-reveal style={{ maxWidth: "13ch" }}>
              Made by hand. <span className="italic">Rooted in place.</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container two-col" style={{ alignItems: "start" }}>
          <p className="eyebrow muted" data-reveal>
            The craft
          </p>
          <div style={{ display: "grid", gap: 20 }}>
            <p className="h3" data-reveal style={{ lineHeight: 1.3 }}>
              Every MLAZA piece begins with natural material and the skill of human hands.
            </p>
            <p className="lede" data-reveal>
              Our designs celebrate the beauty of woven cane, the knowledge of artisans and the individuality of objects made
              through considered craftsmanship.
            </p>
            <EditorNote>
              Add verified details about the artisans, workshop, sourcing and production methods here. Do not publish
              partnership, sustainability or working-condition claims until they are confirmed.
            </EditorNote>
          </div>
        </div>
      </section>

      {steps.map((s, i) => (
        <section key={s.title} style={{ paddingBottom: "var(--section)" }}>
          <div className={`container split ${i % 2 ? "split--reverse" : ""}`}>
            <div className="split__media" data-reveal="image">
              <Media alt={s.image.alt} brief={s.image.brief} style={{ aspectRatio: "4 / 5" }} />
            </div>
            <div className="split__text">
              <span className="story-chapter__num" data-reveal>
                0{i + 1}
              </span>
              <h2 className="h2" data-reveal>
                {s.title}
              </h2>
              <p className="lede" data-reveal>
                {s.body}
              </p>
            </div>
          </div>
        </section>
      ))}

      <section className="section dark-band" style={{ textAlign: "center" }}>
        <div className="container" style={{ display: "grid", gap: 28, justifyItems: "center" }}>
          <p className="manifesto__text" style={{ color: "var(--text-on-dark)" }} data-reveal>
            Small variations are not flaws. <span className="italic" style={{ color: "var(--cane)" }}>They are the mark of the hand.</span>
          </p>
          <Link href="/shop" className="btn btn--light" data-reveal>
            Explore the collection
          </Link>
        </div>
      </section>
    </>
  );
}
