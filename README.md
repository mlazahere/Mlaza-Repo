# MLAZA — House of Cane

The e-commerce website for MLAZA, makers of sculptural, handcrafted cane handbags and accessories.

Built with **Next.js 15 (App Router) + TypeScript**, plain CSS design tokens, [Lenis](https://github.com/darkroomengineering/lenis) smooth scrolling and **PayFast** hosted checkout. The site works fully in a mobile browser; there is no app, and no app promotion anywhere.

```bash
npm install
cp .env.example .env.local   # fill in credentials (see below)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

---

## Launch checklist

The site is built end to end. These items need **your** information or accounts before real customers can buy:

### Payments: required to take orders
- [ ] Create a PayFast merchant account and complete verification.
- [ ] Set `PAYFAST_MERCHANT_ID`, `PAYFAST_MERCHANT_KEY` and `PAYFAST_PASSPHRASE` (the passphrase is set in the PayFast dashboard → Settings → Security).
- [ ] Test the full flow with `PAYFAST_SANDBOX=true` on a public URL (PayFast must be able to reach `/api/payfast/notify`).
- [ ] Set `PAYFAST_SANDBOX=false` and `SITE_URL=https://your-domain` for live payments.
- [ ] **Store confirmed orders.** `app/api/payfast/notify/route.ts` verifies each payment (signature, amount, PayFast server check) and logs it. Connect it to a database or order system and send the customer's confirmation email at the marked line.

Until PayFast is configured, checkout clearly tells customers that online payments aren't enabled yet. No payment is ever simulated.

### Products and photography
- [ ] Replace the 10 **sample products** in `lib/catalogue.ts` with the real catalogue (names, prices, copy, materials, dimensions, weight, availability) and set `sample: false`. Product structured data (JSON-LD) is emitted only for non-sample products.
- [ ] Add real product photographs (front, back, side, weave detail) under `public/products/<slug>/` and set each image's `src`.
- [ ] Add campaign, collection and artisan photography (the `brief` text on each placeholder describes the intended shot).

### Content that needs verified facts
- [ ] Our Story: founder story, year and studio details.
- [ ] Craftsmanship: artisan, workshop, sourcing and production details. Publish no partnership, sustainability or ethical claims until they are verified.
- [ ] Shipping (`lib/shipping.ts`): **current rates are placeholders.** Set real courier rates, delivery estimates and the destination list, then set `PLACEHOLDER_RATES = false`.
- [ ] Returns, Privacy (POPIA) and Terms (CPA / ECT Act s43): fill every `[bracketed]` item and have them legally reviewed.
- [ ] VAT: set `site.vat` in `lib/site.ts` once registration status is confirmed.

### Brand settings (`lib/site.ts`)
- [ ] `email`: customer-care address (shown on Contact once set).
- [ ] `social.instagram` and `social.pinterest`: verified profile URLs. The footer "Follow" column appears only when at least one is set, so it never links to an invented destination.

### Forms
- [ ] Newsletter: Mailchimp (`MAILCHIMP_API_KEY`, `MAILCHIMP_SERVER_PREFIX`, `MAILCHIMP_AUDIENCE_ID`). Subscribers are added with double opt-in.
- [ ] Contact form: Resend (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` on a verified domain).

Both forms show a polite "not connected yet" message until configured.

### Hosting
- [ ] Deploy to a Node host such as Vercel. Set the environment variables there, never in source code.

Editor notes (dashed callouts on Our Story, Craftsmanship and the policy pages) appear in development only and are hidden in production builds.

---

## Managing products

All products and collections live in **`lib/catalogue.ts`**:

| Field | Notes |
|---|---|
| `slug` | URL: `/products/<slug>` |
| `price` | **Cents**, ZAR. R2 450 = `245000` |
| `collections` | Any of `everyday-icons`, `sculptural-forms`, `resort-edit` |
| `availability` | `in_stock` · `made_to_order` · `sold_out` (sold-out pieces can't be added to the bag) |
| `dimensions`, `weight` | `null` shows "to be confirmed" |
| `images[]` | `{ src, alt, brief }`. The first image is the card image and the second is the hover image. Leave `src` empty for a labelled placeholder |
| `sample` | Set to `false` for real products |

Prices are always recalculated on the server from this file at checkout, so a tampered browser can't change what a customer pays.

To move product management to a CMS later (e.g. Sanity, Shopify Storefront API), keep the `Product` type and replace the exports in `lib/catalogue.ts` with fetches. Pages and components only use these helpers.

## Brand mark

`public/brand/mlaza-logo.png` is the supplied logo with only its empty transparent margin trimmed. The artwork, colour and proportions are untouched (`mlaza-logo-original.png` is kept for reference). The mark is cream on transparent, so it is always placed on a dark surface: campaign imagery, the chocolate header, the footer, or the favicon's chocolate tile. It would disappear on ivory.

## Structure

```
app/                  routes (home, shop, collections, products, story, craft, bag, checkout, policies)
app/api/checkout      validates bag, prices server-side, returns signed PayFast request
app/api/payfast/notify  PayFast ITN: signature + amount + server validation
app/api/newsletter    Mailchimp
app/api/contact       Resend
components/           Header, Footer, Logo, Media (image/placeholder), ProductCard, BagDrawer, …
lib/catalogue.ts      products & collections
lib/shipping.ts       zones, methods, rates
lib/site.ts           brand settings, social, VAT
app/globals.css       design tokens, motion system, all styles
```

## Motion and accessibility

- One motion system (`components/MotionProvider.tsx`): Lenis smooth scroll, IntersectionObserver reveals (`data-reveal`), restrained parallax (`data-parallax`), and a 450 ms page entrance (`app/template.tsx`). All of it uses transform and opacity only.
- `prefers-reduced-motion` disables smooth scrolling, parallax and reveals; content is always visible without JavaScript.
- Skip link, visible focus, focus-trapped drawers (Esc closes them), labelled forms with inline errors, and AA-contrast text tokens.
