// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// URL canonique du site — surchargée par la variable d'environnement SITE_URL.
// Par défaut : l'URL de preview GitHub Pages.
const SITE_URL = process.env.SITE_URL ?? "https://lumenbot.github.io";
// Chemin de base. GitHub Pages (projet) sert le site sous /chateau-sainte-lucie-site/.
// Laisser "/" pour un déploiement à la racine (Netlify, domaine propre).
const BASE_PATH = process.env.BASE_PATH ?? "/";

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  // URLs propres en français, sans slash final.
  trailingSlash: "never",
  // Redirections des anciennes routes v1 : pages explicites (base-aware) dans
  // src/pages/{seminaires,evenements-prives,tournages}.astro.
  integrations: [
    mdx(),
    sitemap({
      // On exclut du sitemap les confirmations et les redirections.
      filter: (page) =>
        !/\/(merci|demo|seminaires|evenements-prives|tournages)(\/|$)/.test(page),
    }),
  ],
  vite: {
    // cast : les deux versions de Vite (Astro + standalone) ont des types
    // de Plugin légèrement divergents ; sans effet à l'exécution.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
