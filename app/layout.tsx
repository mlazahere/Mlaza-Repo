import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { StoreProvider } from "@/components/StoreProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileMenu } from "@/components/MobileMenu";
import { BagDrawer } from "@/components/BagDrawer";
import { SearchPanel } from "@/components/SearchPanel";
import { MotionProvider } from "@/components/MotionProvider";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-jost", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.fullName} · Sculptural cane handbags`, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { type: "website", siteName: site.fullName, locale: "en_ZA" },
  // No app links, smart banners or install prompts — this is a website-only experience.
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#38271f",
  width: "device-width",
  initialScale: 1,
};

// Enables motion classes before first paint, only when the visitor allows motion.
const motionScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.fullName,
    url: site.url,
    logo: `${site.url}/brand/mlaza-logo.png`,
    ...(Object.values(site.social).some(Boolean) && { sameAs: Object.values(site.social).filter(Boolean) }),
  };
  return (
    <html lang="en-ZA" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <StoreProvider>
          <Header />
          <main id="main" className="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <MobileMenu />
          <SearchPanel />
          <BagDrawer />
          <MotionProvider />
        </StoreProvider>
      </body>
    </html>
  );
}
