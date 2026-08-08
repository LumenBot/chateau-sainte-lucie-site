/**
 * Génère les déclinaisons raster de la marque à partir des SVG vectoriels
 * définitifs (aucun redessin — simple rastérisation nette pour le web).
 *   - blason or / encre (transparent) → hero, header (via astro:assets)
 *   - favicon + apple-touch (tuile encre)
 * Usage : node scripts/make-brand.mjs
 */
import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const BRAND = join(ROOT, "src", "assets", "brand");
const PUBLIC = join(ROOT, "public");

const ENCRE = "#141F26";

async function raster(svg, out, width) {
  await sharp(join(BRAND, svg), { density: 384 })
    .resize({ width })
    .png()
    .toFile(join(BRAND, out));
  console.log("  ✓", out, width + "w");
}

// Blason haute résolution (transparent) — optimisé ensuite par astro:assets.
await raster("blason-definitif-or.svg", "blason-or.png", 1400);
await raster("blason-definitif-encre.svg", "blason-encre.png", 1400);

// Favicon & apple-touch : blason or centré sur tuile encre.
async function icon(size, out, pad) {
  const inner = Math.round(size * (1 - pad));
  const crest = await sharp(join(BRAND, "blason-definitif-or.svg"), { density: 384 })
    .resize({ width: inner, height: inner, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await sharp({
    create: { width: size, height: size, channels: 4, background: ENCRE },
  })
    .composite([{ input: crest, gravity: "center" }])
    .png()
    .toFile(join(PUBLIC, out));
  console.log("  ✓", out, size + "px");
}

await icon(48, "favicon-48.png", 0.12);
await icon(180, "apple-touch-icon.png", 0.16);
await icon(512, "icon-512.png", 0.16);

console.log("Terminé.");
