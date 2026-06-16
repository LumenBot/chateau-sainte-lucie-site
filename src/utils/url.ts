/**
 * Préfixe un chemin interne par le `base` du site (ex. GitHub Pages :
 * « /chateau-sainte-lucie-site/ »). Indispensable car Astro ne préfixe PAS
 * automatiquement les `href`/`src` écrits à la main.
 *
 * Les URLs absolues, ancres, mailto/tel sont renvoyées telles quelles.
 */
const BASE = import.meta.env.BASE_URL; // "/" ou "/chateau-sainte-lucie-site/"

export function withBase(path = "/"): string {
  if (!path) return BASE;
  if (/^(https?:)?\/\//i.test(path) || /^(mailto:|tel:|#|data:)/i.test(path)) {
    return path;
  }
  const base = BASE.endsWith("/") ? BASE.slice(0, -1) : BASE; // "" ou "/chateau-sainte-lucie-site"
  if (path === "/") return base + "/";
  return base + (path.startsWith("/") ? path : "/" + path);
}

/** Variante pour comparer un chemin courant (sans slash final, hors racine). */
export function normalizePath(path: string): string {
  const p = path.replace(/\/+$/, "");
  return p === "" ? "/" : p;
}
