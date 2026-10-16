/**
 * PRODUCT CATALOGUE — the single source of truth for products and collections.
 *
 * Every product below is SAMPLE DATA for development (`sample: true`).
 * Names, prices, copy and availability are placeholders, not confirmed retail
 * information. Replace them with the real catalogue before launch; see README.md
 * ("Managing products") for the full field reference.
 *
 * Images: add files under /public/products/<slug>/ and set `src`. While `src` is
 * empty, a clearly labelled placeholder is rendered instead of an invented photo.
 */

export type Availability = "in_stock" | "made_to_order" | "sold_out";

export type ProductImage = {
  /** Path under /public, e.g. "/products/sculptural-tote/front.jpg". Empty = placeholder. */
  src: string;
  alt: string;
  /** Shot description shown on the placeholder until the real photo is supplied. */
  brief: string;
};

export type Product = {
  slug: string;
  name: string;
  /** Price in cents (ZAR). R2 450,00 = 245000 */
  price: number;
  collections: CollectionSlug[];
  availability: Availability;
  summary: string;
  description: string[];
  materials: string;
  /** Leave null until measured from the finished piece. */
  dimensions: string | null;
  weight: string | null;
  care: string[];
  images: ProductImage[];
  /** Used for "newest" sorting. ISO date. */
  addedAt: string;
  sample: boolean;
};

export type CollectionSlug = "everyday-icons" | "sculptural-forms" | "resort-edit";

export type Collection = {
  slug: CollectionSlug;
  title: string;
  intro: string;
  image: { src: string; alt: string; brief: string };
};

export const collections: Collection[] = [
  {
    slug: "everyday-icons",
    title: "Everyday Icons",
    intro: "Pieces made for daily ritual — easy to carry, quietly sculptural, made to be kept.",
    image: {
      src: "",
      alt: "Model carrying a natural cane bag along a sunlit plaster wall",
      brief: "Model in ivory linen walking past a plaster wall, bag held at the hip, late-afternoon light",
    },
  },
  {
    slug: "sculptural-forms",
    title: "Sculptural Forms",
    intro: "Architectural silhouettes where the weave becomes form, shadow and structure.",
    image: {
      src: "",
      alt: "Sculptural cane bag on a stone plinth with long shadows",
      brief: "Single bag on a stone plinth, hard side light, long architectural shadow",
    },
  },
  {
    slug: "resort-edit",
    title: "Resort Edit",
    intro: "Light, open and sun-warmed — for long days, coastlines and slow evenings.",
    image: {
      src: "",
      alt: "Cane bag resting on a linen chair in a sunlit courtyard",
      brief: "Bag on a linen-draped chair in a whitewashed courtyard, dappled shade",
    },
  },
];

const care = [
  "Wipe gently with a soft, dry cloth.",
  "Keep away from prolonged moisture and direct heat.",
  "Store stuffed with tissue in the dust bag provided to hold its shape.",
];

const img = (slug: string, views: [string, string][]): ProductImage[] =>
  views.map(([alt, brief]) => ({ src: "", alt, brief }));

export const products: Product[] = [
  {
    slug: "the-sculptural-tote",
    name: "The Sculptural Tote",
    price: 345000,
    collections: ["sculptural-forms", "everyday-icons"],
    availability: "in_stock",
    summary: "A generous, architectural tote with a softly structured body.",
    description: [
      "A generous tote whose woven body holds its shape like a sculpture, yet carries with ease.",
      "Sample description — replace with the final product copy.",
    ],
    materials: "Natural cane. (Confirm full material list, lining and hardware before launch.)",
    dimensions: null,
    weight: null,
    care,
    images: img("the-sculptural-tote", [
      ["The Sculptural Tote, front view", "Front view on ivory seamless background"],
      ["The Sculptural Tote, side view", "Side profile on ivory seamless background"],
      ["The Sculptural Tote, weave detail", "Macro close-up of the weave and handle join"],
      ["The Sculptural Tote, carried", "Carried by model, cropped at shoulder"],
    ]),
    addedAt: "2026-09-01",
    sample: true,
  },
  {
    slug: "the-circle-handle-bag",
    name: "The Circle Handle Bag",
    price: 289000,
    collections: ["sculptural-forms"],
    availability: "in_stock",
    summary: "A rounded silhouette finished with a sculptural circular handle.",
    description: [
      "A rounded form finished with a single circular handle — an object as much as a bag.",
      "Sample description — replace with the final product copy.",
    ],
    materials: "Natural cane. (Confirm full material list before launch.)",
    dimensions: null,
    weight: null,
    care,
    images: img("the-circle-handle-bag", [
      ["The Circle Handle Bag, front view", "Front view on ivory seamless background"],
      ["The Circle Handle Bag, back view", "Back view on ivory seamless background"],
      ["The Circle Handle Bag, handle detail", "Close-up of the circular handle"],
    ]),
    addedAt: "2026-09-08",
    sample: true,
  },
  {
    slug: "the-everyday-cane-bag",
    name: "The Everyday Cane Bag",
    price: 245000,
    collections: ["everyday-icons"],
    availability: "in_stock",
    summary: "A considered everyday shape with a comfortable carry.",
    description: [
      "The bag you reach for first — a clean, considered shape that settles into daily life.",
      "Sample description — replace with the final product copy.",
    ],
    materials: "Natural cane. (Confirm full material list before launch.)",
    dimensions: null,
    weight: null,
    care,
    images: img("the-everyday-cane-bag", [
      ["The Everyday Cane Bag, front view", "Front view on ivory seamless background"],
      ["The Everyday Cane Bag, side view", "Side profile on ivory seamless background"],
      ["The Everyday Cane Bag, weave detail", "Macro close-up of the weave"],
    ]),
    addedAt: "2026-08-20",
    sample: true,
  },
  {
    slug: "the-woven-evening-bag",
    name: "The Woven Evening Bag",
    price: 215000,
    collections: ["resort-edit", "sculptural-forms"],
    availability: "made_to_order",
    summary: "A compact evening form, finely woven.",
    description: [
      "A compact form for evenings — finely woven, light in the hand.",
      "Sample description — replace with the final product copy.",
    ],
    materials: "Natural cane. (Confirm full material list before launch.)",
    dimensions: null,
    weight: null,
    care,
    images: img("the-woven-evening-bag", [
      ["The Woven Evening Bag, front view", "Front view on ivory seamless background"],
      ["The Woven Evening Bag, detail", "Close-up of the fine weave in raking light"],
    ]),
    addedAt: "2026-09-15",
    sample: true,
  },
  {
    slug: "the-arc-clutch",
    name: "The Arc Clutch",
    price: 175000,
    collections: ["resort-edit"],
    availability: "in_stock",
    summary: "A gentle arc held in the hand.",
    description: ["A gentle arc of woven cane, held in the hand.", "Sample description — replace with the final product copy."],
    materials: "Natural cane. (Confirm full material list before launch.)",
    dimensions: null,
    weight: null,
    care,
    images: img("the-arc-clutch", [
      ["The Arc Clutch, front view", "Front view on ivory seamless background"],
      ["The Arc Clutch, in hand", "Held in hand against warm stone"],
    ]),
    addedAt: "2026-07-30",
    sample: true,
  },
  {
    slug: "the-market-basket",
    name: "The Market Basket",
    price: 265000,
    collections: ["everyday-icons", "resort-edit"],
    availability: "in_stock",
    summary: "An open, generous basket for markets and long days.",
    description: ["An open, generous form for markets, beaches and long days.", "Sample description — replace with the final product copy."],
    materials: "Natural cane. (Confirm full material list before launch.)",
    dimensions: null,
    weight: null,
    care,
    images: img("the-market-basket", [
      ["The Market Basket, front view", "Front view on ivory seamless background"],
      ["The Market Basket, interior", "Top-down view showing the interior"],
    ]),
    addedAt: "2026-06-12",
    sample: true,
  },
  {
    slug: "the-crescent-shoulder-bag",
    name: "The Crescent Shoulder Bag",
    price: 315000,
    collections: ["sculptural-forms"],
    availability: "sold_out",
    summary: "A crescent silhouette that sits close under the arm.",
    description: ["A crescent silhouette that sits close beneath the arm.", "Sample description — replace with the final product copy."],
    materials: "Natural cane. (Confirm full material list before launch.)",
    dimensions: null,
    weight: null,
    care,
    images: img("the-crescent-shoulder-bag", [
      ["The Crescent Shoulder Bag, front view", "Front view on ivory seamless background"],
      ["The Crescent Shoulder Bag, worn", "Worn on the shoulder, cropped at waist"],
    ]),
    addedAt: "2026-05-02",
    sample: true,
  },
  {
    slug: "the-mini-vessel",
    name: "The Mini Vessel",
    price: 145000,
    collections: ["everyday-icons"],
    availability: "in_stock",
    summary: "A small, vessel-like form for the essentials.",
    description: ["A small, vessel-like form for the essentials.", "Sample description — replace with the final product copy."],
    materials: "Natural cane. (Confirm full material list before launch.)",
    dimensions: null,
    weight: null,
    care,
    images: img("the-mini-vessel", [
      ["The Mini Vessel, front view", "Front view on ivory seamless background"],
      ["The Mini Vessel, detail", "Close-up of the rim and weave"],
    ]),
    addedAt: "2026-09-20",
    sample: true,
  },
  {
    slug: "the-courtyard-tote",
    name: "The Courtyard Tote",
    price: 325000,
    collections: ["resort-edit", "everyday-icons"],
    availability: "made_to_order",
    summary: "A broad, open tote with long handles.",
    description: ["A broad, open tote with long handles, made for sunlit days.", "Sample description — replace with the final product copy."],
    materials: "Natural cane. (Confirm full material list before launch.)",
    dimensions: null,
    weight: null,
    care,
    images: img("the-courtyard-tote", [
      ["The Courtyard Tote, front view", "Front view on ivory seamless background"],
      ["The Courtyard Tote, carried", "Carried in a whitewashed courtyard"],
    ]),
    addedAt: "2026-08-02",
    sample: true,
  },
  {
    slug: "the-pillar-bag",
    name: "The Pillar Bag",
    price: 299000,
    collections: ["sculptural-forms"],
    availability: "in_stock",
    summary: "A tall, columnar form with a top handle.",
    description: ["A tall, columnar form — quiet, upright and architectural.", "Sample description — replace with the final product copy."],
    materials: "Natural cane. (Confirm full material list before launch.)",
    dimensions: null,
    weight: null,
    care,
    images: img("the-pillar-bag", [
      ["The Pillar Bag, front view", "Front view on ivory seamless background"],
      ["The Pillar Bag, shadow study", "Side light study with cast shadow"],
    ]),
    addedAt: "2026-09-25",
    sample: true,
  },
];

export const availabilityLabel: Record<Availability, string> = {
  in_stock: "Available",
  made_to_order: "Made to order",
  sold_out: "Sold out",
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCollection(slug: string) {
  return collections.find((c) => c.slug === slug);
}

export function productsInCollection(slug: CollectionSlug) {
  return products.filter((p) => p.collections.includes(slug));
}

export function relatedProducts(product: Product, count = 4) {
  const shared = products.filter(
    (p) => p.slug !== product.slug && p.collections.some((c) => product.collections.includes(c)),
  );
  const rest = products.filter((p) => p.slug !== product.slug && !shared.includes(p));
  return [...shared, ...rest].slice(0, count);
}

export const featuredSlugs = [
  "the-sculptural-tote",
  "the-circle-handle-bag",
  "the-everyday-cane-bag",
  "the-woven-evening-bag",
];
