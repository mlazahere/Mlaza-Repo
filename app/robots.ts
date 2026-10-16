import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/checkout", "/bag", "/account"] },
    sitemap: `${site.url.replace(/\/$/, "")}/sitemap.xml`,
  };
}
