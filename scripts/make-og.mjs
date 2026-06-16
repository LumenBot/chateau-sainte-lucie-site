/**
 * Génère l'image OpenGraph (partage social) à partir d'une vraie photo :
 * la façade de nuit, assombrie par un dégradé + signature de marque.
 *
 * Usage : `npm run og`
 */
import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "src", "assets", "images", "01_facade_nuit.jpeg");
const OUT = join(ROOT, "public", "og-default.jpg");

const W = 1200;
const H = 630;
const FONT = "'DejaVu Serif', Georgia, serif";

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#08070500" />
      <stop offset="0.45" stop-color="#0807058c" />
      <stop offset="1" stop-color="#080705f0" />
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)" />
  <g text-anchor="middle" font-family="${FONT}">
    <text x="${W / 2}" y="${H - 132}" fill="#e7cd92" font-size="22" letter-spacing="6">✦</text>
    <text x="${W / 2}" y="${H - 78}" fill="#ece4d4" font-size="58" font-style="italic">Château de Sainte-Lucie</text>
    <text x="${W / 2}" y="${H - 40}" fill="#c8a45c" font-size="20" letter-spacing="4">SÉMINAIRES · ÉVÉNEMENTS · TOURNAGES · VOSGES</text>
  </g>
</svg>`;

const base = await sharp(SRC)
  .resize(W, H, { fit: "cover", position: "centre" })
  .toBuffer();

await sharp(base)
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(OUT);

console.log("✓ og-default.jpg généré depuis 01_facade_nuit.jpeg");
