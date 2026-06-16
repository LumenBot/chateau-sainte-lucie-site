import type { APIRoute } from "astro";

/**
 * robots.txt généré dynamiquement pour pointer vers le sitemap à l'URL
 * canonique configurée (astro.config `site` / variable SITE_URL).
 */
const body = (sitemapURL: URL) => `User-agent: *
Allow: /
Disallow: /merci

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site ?? "https://chateau-saintelucie.fr");
  return new Response(body(sitemapURL), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
