import type { MetadataRoute } from "next";
import { collections, products } from "@/lib/catalogue";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const pages = ["", "/shop", "/collections", "/our-story", "/craftsmanship", "/contact", "/faq", "/shipping", "/returns", "/privacy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...collections.map((c) => ({ url: `${base}/collections/${c.slug}` })),
    ...products.map((p) => ({ url: `${base}/products/${p.slug}` })),
  ];
}
