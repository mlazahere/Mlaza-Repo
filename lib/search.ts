import { collections, products, type Product } from "./catalogue";

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  const terms = q.split(/\s+/);
  return products.filter((p) => {
    const hay = [
      p.name,
      p.summary,
      p.materials,
      ...p.collections.map((c) => collections.find((x) => x.slug === c)?.title ?? ""),
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}
