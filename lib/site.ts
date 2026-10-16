/**
 * Brand-wide settings. Edit these values before launch.
 * Empty strings are treated as "not configured" and the related UI is hidden,
 * so the site never links to an invented destination.
 */
export const site = {
  name: "MLAZA",
  fullName: "MLAZA — House of Cane",
  tagline: "Objects of nature. Made to be kept.",
  description:
    "MLAZA — House of Cane. Sculptural, handcrafted cane handbags and accessories shaped by skilled hands.",
  url: process.env.SITE_URL || "http://localhost:3000",
  currency: "ZAR",
  locale: "en-ZA",
  market: "South Africa",
  /** Customer-care email shown on Contact and policy pages. */
  email: "",
  /** Verified social profiles only. Leave blank until the real URLs are confirmed. */
  social: {
    instagram: "",
    pinterest: "",
  },
  /**
   * VAT handling. Leave as null until your accountant confirms registration status;
   * no VAT line or "VAT included" claim is shown while it is null.
   */
  vat: null as null | { rate: number; inclusive: boolean },
};

export const nav = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Our Story", href: "/our-story" },
  { label: "Craftsmanship", href: "/craftsmanship" },
  { label: "Contact", href: "/contact" },
];
