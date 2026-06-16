import type { APIRoute } from "astro";
import { withBase } from "../utils/url";

/**
 * robots.txt généré dynamiquement : pointe vers le sitemap à l'URL canonique
 * configurée (astro.config `site` + `base`).
 */
const body = (sitemapURL: URL) => `User-agent: *
Allow: /
Disallow: ${withBase("/merci")}

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? "https://lumenbot.github.io";
  const sitemapURL = new URL(withBase("/sitemap-index.xml"), origin);
  return new Response(body(sitemapURL), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
