/**
 * SHIPPING RULES — edit before launch.
 *
 * ⚠ The rates and timeframes below are PLACEHOLDERS so checkout can be developed and
 * tested end to end. They are not quotes. Replace them with your confirmed courier
 * rates, and only list destinations you actually ship to.
 */

export type ShippingMethod = {
  id: string;
  label: string;
  /** Shown beside the label, e.g. "3–5 working days". Keep empty until confirmed. */
  estimate: string;
  /** Cents (ZAR). */
  price: number;
};

export type ShippingZone = {
  id: string;
  label: string;
  /** ISO 3166-1 alpha-2 codes. */
  countries: string[];
  methods: ShippingMethod[];
  /** Duties/import tax note shown at checkout for this zone. */
  dutiesNote?: string;
};

export const PLACEHOLDER_RATES = true;

export const shippingZones: ShippingZone[] = [
  {
    id: "za",
    label: "South Africa",
    countries: ["ZA"],
    methods: [
      { id: "za-standard", label: "Standard courier", estimate: "", price: 15000 },
      { id: "za-express", label: "Express courier", estimate: "", price: 25000 },
    ],
  },
  {
    id: "intl",
    label: "International",
    countries: ["BW", "NA", "MW", "ZM", "ZW", "KE", "GB", "FR", "DE", "NL", "IT", "US", "CA", "AU", "AE"],
    methods: [{ id: "intl-tracked", label: "International tracked courier", estimate: "", price: 95000 }],
    dutiesNote:
      "Orders shipped outside South Africa may be subject to import duties and taxes charged by the destination country. These are not included in your order total and are payable by the recipient.",
  },
];

export const countries: { code: string; name: string }[] = [
  { code: "ZA", name: "South Africa" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "AU", name: "Australia" },
  { code: "BW", name: "Botswana" },
  { code: "CA", name: "Canada" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "GB", name: "United Kingdom" },
  { code: "IT", name: "Italy" },
  { code: "KE", name: "Kenya" },
  { code: "MW", name: "Malawi" },
  { code: "NA", name: "Namibia" },
  { code: "NL", name: "Netherlands" },
  { code: "US", name: "United States" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" },
];

export function zoneForCountry(code: string) {
  return shippingZones.find((z) => z.countries.includes(code));
}

export function findMethod(id: string) {
  for (const z of shippingZones) {
    const m = z.methods.find((m) => m.id === id);
    if (m) return { zone: z, method: m };
  }
  return undefined;
}
