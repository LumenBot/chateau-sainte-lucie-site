# Les Nuits au Château — Les Suites de Sainte-Lucie

Site vitrine de **pré-ouverture** de la maison d'hôtes haut de gamme
**« Les Nuits au Château »** (signature *Les Suites de Sainte-Lucie*), au
Château de Sainte-Lucie — Rambervillers, Vosges. **Ouverture prévue en avril 2027.**

> Refonte v2 du dépôt : l'ancienne vitrine « réception » (séminaires, événements,
> tournages) est remplacée par le projet de maison d'hôtes à deux suites.
> Documentation de reprise et d'exploitation : `docs/00-…` à `docs/08-…` et
> `CLAUDE.md`.

## Stack

**Astro 5** (statique) · **Tailwind v4** · **TypeScript strict** · contenu en
**content collections** (`suites`, `histoire`) + données centralisées (`src/data/`)
· images via **astro:assets** · polices auto-hébergées (Fontsource).

## Lancer en local
```bash
npm ci                 # installe avec le lockfile
npm run dev            # http://localhost:4321
npm run build          # build de production → dist/
npm run preview        # prévisualise le build
npm run check          # vérification TypeScript / Astro
npm run brand          # (re)génère les rasters du blason + favicons
npm run og             # (re)génère l'image OpenGraph
```

## Pages livrées
Accueil (`/`) · Les Suites (`/les-suites`) · Suite Lumière (`/suite-lumiere`) ·
Suite Feuillage (`/suite-feuillage`) · L'Expérience (`/experience`) ·
Le Château (`/le-chateau`) · Histoire (`/histoire`) · Galerie (`/galerie`) ·
Contact de pré-ouverture (`/contact`, + `/merci`) · Mentions légales ·
Confidentialité · 404.

**Redirections** (base-aware) des anciennes routes v1 → accueil :
`/seminaires`, `/evenements-prives`, `/tournages`.

**SEO** : métas + OpenGraph/Twitter par page, `sitemap.xml`, `robots.txt`,
JSON-LD **`BedAndBreakfast` / `LodgingBusiness`** (sans adresse précise ni
téléphone). Favicon et image sociale = identité définitive (blason).

## Identité
- Logo maître : `src/assets/brand/blason-definitif-encre.svg` (et `-or.svg`).
- Rasters web : `blason-or.png` / `blason-encre.png` (via `npm run brand`).
- Référence de composition : `references/flyer/flyer-reference-validee.jpeg`.
- Encre `#141F26` · Or `#C8A45B` · Blanc `#FFFFFF` · Ivoire `#F2EBDD` ·
  Cormorant Garamond + EB Garamond.

## Déploiement (base configurable)
| Variable | GitHub Pages (preview) | Netlify / domaine propre |
|---|---|---|
| `SITE_URL` | `https://lumenbot.github.io` | URL canonique définitive |
| `BASE_PATH` | `/chateau-sainte-lucie-site` | `/` (racine) |

Preview Pages via `.github/workflows/deploy.yml` (build sur `main`). Tous les
liens internes passent par `withBase()` (`src/utils/url.ts`). Le formulaire
nécessite un backend (Netlify Forms / Web3Forms) : sur Pages (statique) la
soumission n'est pas traitée.

## Référentiel opérationnel

- `docs/07-referentiel-offre-et-regles-v3.md` centralise les tarifs, horaires,
  conditions de séjour, restauration et règles du spa.
- `docs/08-cahier-des-charges-fonctionnel-si-v1.md` définit le futur système de
  réservation, le portail client et l'applicatif gestionnaire.
- `docs/06-points-a-confirmer.md` ne contient plus que les validations externes
  ou paramètres réellement ouverts.

## ⚠️ À confirmer avant l'ouverture (cf. `docs/06-points-a-confirmer.md`)

- **Photographies des suites** : remplacement des projections sélectionnées par
  les photographies réalisées après travaux, en mars 2027.
- **Coordonnées** : e-mail (`contact@chateau-saintelucie.fr`), téléphone
  (aucun affiché), nom de domaine et URL canonique.
- **Suites** : surfaces, couchages et équipements définitifs.
- **Table d'hôtes** : boissons comprises et validation du régime applicable.
- **Société d'exploitation** : identité, fiscalité et paramètres comptables.
- **Prestataires** : PMS, channel manager, paiement et futur hébergement.
- **Légal** : mentions légales, responsable de publication, confidentialité
  (gabarits à compléter), hébergeur de production et traitement du formulaire.

## Statut
- [x] Cadrage & docs de reprise (v2)
- [x] Refonte « Les Nuits au Château » (backlog T0 → T12)
- [x] Validation et publication du site vitrine sur GitHub Pages
- [x] Référentiel d'offre et cahier des charges fonctionnel du SI
- [ ] Sélection des solutions et conception détaillée du MVP
