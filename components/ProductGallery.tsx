"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/lib/catalogue";
import { Media } from "./Media";
import { Close } from "./MobileMenu";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [zoom, setZoom] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setActive(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (zoom === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
      if (e.key === "ArrowRight") setZoom((z) => (z === null ? z : (z + 1) % images.length));
      if (e.key === "ArrowLeft") setZoom((z) => (z === null ? z : (z - 1 + images.length) % images.length));
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [zoom, images.length]);

  return (
    <div>
      <div className="gallery" ref={track} aria-label={`${name} images`}>
        {images.map((img, i) => (
          <div key={i} className="gallery__item">
            <button type="button" onClick={() => setZoom(i)} aria-label={`Enlarge image ${i + 1} of ${images.length}: ${img.alt}`}>
              <Media
                src={img.src}
                alt={img.alt}
                brief={img.brief}
                tone="product"
                mark={i === 0 ? name : undefined}
                priority={i === 0}
                sizes="(max-width: 960px) 100vw, 58vw"
                style={{ height: "100%" }}
              />
            </button>
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <div className="gallery-dots" aria-hidden="true">
          {images.map((_, i) => (
            <span key={i} className={i === active ? "is-active" : ""} />
          ))}
        </div>
      )}
      {zoom !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${name} — image ${zoom + 1} of ${images.length}`} onClick={() => setZoom(null)}>
          <div className="lightbox__frame" onClick={(e) => e.stopPropagation()}>
            <Media src={images[zoom].src} alt={images[zoom].alt} brief={images[zoom].brief} tone="product" sizes="92vw" style={{ height: "100%" }} />
          </div>
          <button ref={closeRef} type="button" className="icon-btn lightbox__close" onClick={() => setZoom(null)} aria-label="Close enlarged image">
            <Close />
          </button>
        </div>
      )}
    </div>
  );
}
