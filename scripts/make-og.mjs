/**
 * Génère l'image OpenGraph (partage social) « Les Nuits au Château » :
 * façade de nuit assombrie + blason or + titre éditorial. Photo réelle
 * uniquement (aucun rendu de projection).
 * Usage : npm run og
 */
import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SRC = join(ROOT, "src", "assets", "images", "01_facade_nuit.jpeg");
const CREST = join(ROOT, "src", "assets", "brand", "blason-definitif-or.svg");
const OUT = join(ROOT, "public", "og-default.jpg");

const W = 1200;
const H = 630;
const FONT = "'DejaVu Serif', Georgia, serif";

const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#141F26" stop-opacity="0.82"/>
      <stop offset="0.5" stop-color="#141F26" stop-opacity="0.6"/>
      <stop offset="1" stop-color="#141F26" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)" />
  <g text-anchor="middle" font-family="${FONT}">
    <text x="${W / 2}" y="365" fill="#F2EBDD" font-size="56">Les Nuits au Château</text>
    <text x="${W / 2}" y="415" fill="#C8A45B" font-size="30" font-style="italic">Les Suites de Sainte-Lucie</text>
    <text x="${W / 2}" y="470" fill="#C6C2B4" font-size="17" letter-spacing="4">OUVERTURE AVRIL 2027 · RAMBERVILLERS · VOSGES</text>
  </g>
</svg>`;

const crestW = 150;
const crest = await sharp(CREST, { density: 384 })
  .resize({ width: crestW })
  .png()
  .toBuffer();

const base = await sharp(SRC).resize(W, H, { fit: "cover", position: "centre" }).toBuffer();

await sharp(base)
  .composite([
    { input: Buffer.from(overlay) },
    { input: crest, top: 62, left: Math.round((W - crestW) / 2) },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(OUT);

console.log("✓ og-default.jpg régénéré (Les Nuits au Château)");
