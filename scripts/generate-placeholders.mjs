/**
 * Génère des visuels de remplacement élégants (registre nuit, cadre or) tant
 * que les photographies définitives du château ne sont pas fournies.
 *
 * ⚠️ BLOCAGE DOCUMENTÉ : les maquettes référencent des photos (`../img/*.jpeg`)
 * absentes du dépôt. Ces placeholders préservent la mise en page, les ratios et
 * la qualité perçue. À remplacer par les vraies photos (mêmes noms de fichier
 * dans `src/assets/images/`) avant la mise en ligne.
 *
 * Usage : `npm run placeholders`
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const IMG_DIR = join(ROOT, "src", "assets", "images");
const PUBLIC_DIR = join(ROOT, "public");

const FONT = "'DejaVu Serif', Georgia, 'Times New Roman', serif";

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Construit le SVG d'un visuel de remplacement. */
function placeholderSVG({ w, h, label, sub, glowX = 50, glowY = 32 }) {
  const m = Math.round(Math.min(w, h) * 0.045); // marge du cadre
  const titleSize = Math.max(20, Math.round(Math.min(w, h) * 0.07));
  const subSize = Math.max(11, Math.round(Math.min(w, h) * 0.026));
  const markSize = Math.max(10, Math.round(Math.min(w, h) * 0.022));
  const cx = w / 2;
  const cy = h / 2;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0c0c0b"/>
      <stop offset="0.55" stop-color="#15130f"/>
      <stop offset="1" stop-color="#0a0a09"/>
    </linearGradient>
    <radialGradient id="glow" cx="${glowX}%" cy="${glowY}%" r="62%">
      <stop offset="0" stop-color="#e7cd92" stop-opacity="0.20"/>
      <stop offset="0.45" stop-color="#c8a45c" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#c8a45c" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <rect x="${m}" y="${m}" width="${w - 2 * m}" height="${h - 2 * m}"
        fill="none" stroke="#c8a45c" stroke-opacity="0.34" stroke-width="1.25"/>
  <rect x="${m + 6}" y="${m + 6}" width="${w - 2 * m - 12}" height="${h - 2 * m - 12}"
        fill="none" stroke="#c8a45c" stroke-opacity="0.14" stroke-width="1"/>
  <g text-anchor="middle" font-family="${FONT}">
    <text x="${cx}" y="${cy - titleSize * 0.95}" fill="#e7cd92"
          font-size="${markSize}" letter-spacing="6" font-style="normal">✦</text>
    <text x="${cx}" y="${cy + titleSize * 0.22}" fill="#ece4d4"
          font-size="${titleSize}" font-style="italic">${esc(label)}</text>
    <line x1="${cx - 34}" y1="${cy + titleSize * 0.7}" x2="${cx + 34}" y2="${cy + titleSize * 0.7}"
          stroke="#c8a45c" stroke-opacity="0.5"/>
    <text x="${cx}" y="${cy + titleSize * 1.35}" fill="#b0a68f"
          font-size="${subSize}" letter-spacing="3">${esc(sub)}</text>
  </g>
  <text x="${cx}" y="${h - m - 14}" text-anchor="middle" font-family="${FONT}"
        fill="#6f6757" font-size="${markSize}" letter-spacing="4">VISUEL À VENIR</text>
</svg>`;
}

async function render(file, opts, dir = IMG_DIR, q = 82) {
  const svg = placeholderSVG(opts);
  await sharp(Buffer.from(svg))
    .jpeg({ quality: q, mozjpeg: true })
    .toFile(join(dir, file));
  console.log("  ✓", file, `${opts.w}×${opts.h}`);
}

// Liste des visuels (clé de fichier, dimensions, libellés).
const IMAGES = [
  ["01_facade_nuit.jpg", 2400, 1500, "Façade illuminée", "RAMBERVILLERS · NUIT"],
  ["02_piscine_jour_chateau.jpg", 2000, 1200, "Le château depuis le parc", "VOSGES · JOUR"],
  ["03_facade_jour_piscine.jpg", 1200, 800, "Façade & parc", "SÉMINAIRES"],
  ["04_perron_noel.jpg", 1200, 800, "Le perron, soir de fête", "ÉVÉNEMENTS"],
  ["05_blason.jpg", 1200, 900, "Blason sculpté", "PATRIMOINE"],
  ["06_vue_aerienne.jpg", 1280, 960, "Vue aérienne du domaine", "LE PARC"],
  ["07_perron_illumine.jpg", 1000, 1000, "Le perron illuminé", "GALERIE"],
  ["08_chene_centenaire.jpg", 1280, 960, "Chênes centenaires", "LE PARC"],
  ["09_piscine_nuit.jpg", 1600, 900, "Piscine naturelle", "CRÉPUSCULE"],
  ["10_piscine_salon.jpg", 1000, 1000, "Salon au bord de l'eau", "ART DE VIVRE"],
  ["11_daims.jpg", 1000, 1000, "Daims dans le parc", "LE DOMAINE"],
  ["12_salon_interieur.jpg", 1200, 900, "Salon · boiseries d'origine", "INTÉRIEURS"],
  ["13_escalier.jpg", 1000, 1300, "Escalier monumental", "PATRIMOINE"],
  ["14_parc_allee.jpg", 1280, 853, "Allée du parc", "EXTÉRIEURS"],
  ["15_table_maison.jpg", 1200, 800, "La table maison", "DU PARC À L'ASSIETTE"],
  ["16_facade_jour.jpg", 1280, 853, "Façade · grès rose", "LE CHÂTEAU"],
];

async function main() {
  await mkdir(IMG_DIR, { recursive: true });
  await mkdir(PUBLIC_DIR, { recursive: true });

  console.log("Génération des visuels de remplacement…");
  let i = 0;
  for (const [file, w, h, label, sub] of IMAGES) {
    const glowX = 30 + ((i * 13) % 41); // léger décalage du halo
    const glowY = 24 + ((i * 7) % 22);
    await render(file, { w, h, label, sub, glowX, glowY });
    i++;
  }

  // Image OpenGraph (partage social) — 1200×630.
  await render(
    "og-default.jpg",
    { w: 1200, h: 630, label: "Château de Sainte-Lucie", sub: "SÉMINAIRES · ÉVÉNEMENTS · TOURNAGES", glowX: 50, glowY: 30 },
    PUBLIC_DIR,
    86,
  );

  // Apple touch icon — monogramme sur fond nuit.
  const touch = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#0c0c0b"/>
  <circle cx="90" cy="84" r="46" fill="none" stroke="#c8a45c" stroke-opacity="0.5" stroke-width="2"/>
  <text x="90" y="104" text-anchor="middle" font-family="${FONT}" font-style="italic"
        font-size="64" fill="#e7cd92">SL</text>
  <text x="90" y="150" text-anchor="middle" font-family="${FONT}" font-size="13"
        letter-spacing="4" fill="#b0a68f">SAINTE-LUCIE</text>
</svg>`;
  await sharp(Buffer.from(touch)).png().toFile(join(PUBLIC_DIR, "apple-touch-icon.png"));
  console.log("  ✓ apple-touch-icon.png 180×180");

  console.log("Terminé.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
