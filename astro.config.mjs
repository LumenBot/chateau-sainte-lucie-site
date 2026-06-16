// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// URL canonique du site — surchargée par la variable d'environnement SITE_URL.
const SITE_URL = process.env.SITE_URL ?? "https://chateau-saintelucie.fr";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // URLs propres en français, sans slash final.
  trailingSlash: "never",
  integrations: [
    mdx(),
    sitemap({
      // On exclut du sitemap les pages de confirmation et utilitaires.
      filter: (page) => !page.includes("/merci"),
    }),
  ],
  vite: {
    // cast : les deux versions de Vite (Astro + standalone) ont des types
    // de Plugin légèrement divergents ; sans effet à l'exécution.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
