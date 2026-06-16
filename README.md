# Château de Sainte-Lucie — Site vitrine

Site vitrine du lieu de réception **Château de Sainte-Lucie** (Rambervillers, Vosges).
Objectif : présenter le lieu et générer des demandes qualifiées — **séminaires d'entreprise**, **événements privés**, **tournages & prises de vues**.

## Organisation du projet — trois rôles
- **Stratégie & orchestration** — cadrage, cahier des charges, caractérisation des tâches.
- **Claude Design** — maquettes visuelles → `docs/brief-claude-design.md`.
- **Claude Code** — implémentation → `CLAUDE.md` + `docs/backlog.md`.

## Structure du dépôt
```
.
├── CLAUDE.md                    # Manuel de l'agent Claude Code (à lire en premier)
├── docs/                        # Cadrage stratégique & contenu
│   ├── cahier-des-charges.md    # Spécification détaillée du site
│   ├── brief-claude-design.md   # Brief des maquettes (pour mémoire)
│   ├── contenu-redactionnel.md  # Copie finale des pages (textes + métas SEO)
│   └── backlog.md               # Tâches priorisées + critères d'acceptation
├── maquettes/                   # Références visuelles validées (NE PAS déployer)
│   ├── Maquettes_Site.html      # Planche maître : 4 écrans desktop + mobile
│   ├── Composants.html          # Planche des composants
│   └── site/                    # Pages réelles + site.css = référence d'implémentation
└── livrables/                   # Documents annexes (NE PAS déployer)
    └── plaquette-associes.pdf   # Plaquette de présentation aux associés
```
(Le site Astro + Tailwind est échafaudé par Claude Code à la racine.)

## Démarrage rapide
1. Cahier des charges, contenu et **maquettes validés** — tout est dans le dépôt.
2. Le dépôt GitHub est créé par le propriétaire ; on lance **une seule session Claude Code** avec accès au dépôt.
3. **Claude Code gère git, les commits, et déroule l'intégralité du backlog en un run.**

### Prompt de lancement Claude Code — run complet (à coller en début de session)
> Tu travailles dans ce dépôt (Château de Sainte-Lucie — site vitrine). Lis d'abord `CLAUDE.md`, puis `docs/cahier-des-charges.md`, `docs/contenu-redactionnel.md` et `docs/backlog.md`, et inspecte `maquettes/` — la planche `Maquettes_Site.html`, `Composants.html`, et **surtout les pages `maquettes/site/*.html` + `maquettes/site/site.css`**, qui sont la référence d'implémentation principale.
>
> Réalise le site **en un seul run** : commits du cadrage (T0), échafaudage **Astro + Tailwind + TypeScript**, puis déroule **tout le backlog (T0 → T12)**, un commit par tâche. **Transpose fidèlement les maquettes** (registres nuit/jour, tokens, composants) et intègre le contenu depuis `docs/contenu-redactionnel.md`.
>
> Exigences non négociables : responsive mobile-first, accessibilité AA, Lighthouse ≥ 95 (4 axes), SEO (métas par page, OpenGraph, `sitemap.xml`, `robots.txt`, schema.org `EventVenue`/`LocalBusiness`), **aucun secret committé**, et **ne jamais publier l'adresse précise** du château (résidence habitée). Les dossiers `maquettes/` et `livrables/` sont des **références, à ne pas déployer**.
>
> Travaille de façon **autonome jusqu'au bout** ; en cas de blocage, documente-le et poursuis les autres tâches plutôt que t'arrêter. Termine par un récapitulatif : ce qui est fait, ce qui reste, comment lancer en local et déployer sur Netlify.

## Le site (Astro + Tailwind + TypeScript)

Site statique généré avec **Astro 5**, **Tailwind CSS v4**, **TypeScript (strict)**.
Contenu centralisé (prêt pour l'i18n) dans `src/data/` et la content collection
`src/content/offres/` (pages d'offre pilotées par le contenu).

### Lancer en local
```bash
npm install            # installe les dépendances
npm run dev            # serveur de dev  → http://localhost:4321
npm run build          # build de production → dist/
npm run preview        # prévisualise le build
npm run check          # vérification TypeScript / Astro
npm run placeholders   # (re)génère les visuels de remplacement
```

### Arborescence du site
```
src/
├── assets/images/     # visuels (optimisés via astro:assets)
├── components/        # Header, Footer, Button, Icon, CtaFinal, offers/*
├── content/offres/    # Séminaires, Événements privés, Tournages (MD + frontmatter)
├── content.config.ts  # schéma Zod de la collection « offres »
├── data/              # contenu centralisé (site, home, chateau, contact, gallery, images)
├── layouts/           # BaseLayout, LegalLayout
├── pages/             # index, le-chateau, [offre], galerie, contact, merci,
│                      #   mentions-legales, confidentialite, 404, robots.txt
└── styles/global.css  # système de design (tokens nuit/jour) + Tailwind
```

### Pages livrées (MVP)
Accueil · Le Château · Séminaires · Événements privés · Tournages · Galerie
(lightbox) · Contact (+ /merci) · Mentions légales · Confidentialité · 404.
SEO : métas par page, OpenGraph/Twitter, `sitemap.xml`, `robots.txt`,
JSON-LD `EventVenue`/`LocalBusiness`.

### Déploiement — chemin de base configurable
Le site supporte deux cibles via deux variables d'environnement de build :

| Variable | Pages (preview) | Netlify / domaine propre |
|---|---|---|
| `SITE_URL` | `https://lumenbot.github.io` | URL canonique définitive |
| `BASE_PATH` | `/chateau-sainte-lucie-site` | `/` (racine) |

Tous les liens internes passent par `withBase()` (`src/utils/url.ts`) : ils
s'adaptent automatiquement au `base`.

**GitHub Pages (preview en ligne)** → <https://lumenbot.github.io/chateau-sainte-lucie-site/>
1. Le workflow `.github/workflows/deploy.yml` construit et publie le site à
   chaque push sur `main` (build avec `BASE_PATH=/chateau-sainte-lucie-site`).
2. Une fois : **Settings → Pages → Source = « GitHub Actions »** (le workflow
   tente de l'activer automatiquement). L'ancien workflow « deploy from a
   branch » est alors remplacé.

**Netlify (production)** → build auto via `netlify.toml` (`npm run build`,
publish `dist`, Node 22, `BASE_PATH` non défini → racine). Définir `SITE_URL`.
**Formulaire** : Netlify Forms est détecté automatiquement ; e-mail de
notification configuré dans Netlify (Forms → Notifications), **hors dépôt**.
*Alternative* : `PUBLIC_WEB3FORMS_KEY` (voir `.env.example`).
> ⚠️ Le formulaire de contact nécessite un backend (Netlify Forms / Web3Forms) :
> sur GitHub Pages (statique pur) la soumission n'est pas traitée — la preview
> Pages reste une vitrine, la production se fait sur Netlify.

`maquettes/` et `livrables/` ne sont pas déployés.

### ⚠️ À compléter avant mise en ligne (points ouverts / blocages)
- **Photographies** : ✅ vraies photos intégrées. Volontairement **non
  utilisées** car hors ton « vitrine » : `02_crypte*` (caveau familial) et
  `03_pierre_tombale*` (pierre tombale d'enfant) — à réserver à une éventuelle
  page « Histoire » au traitement sensible. Le mapping image→emplacement est
  centralisé dans `src/data/images.ts` (clés = contenu réel, les noms de
  fichiers d'origine étant parfois trompeurs).
- **Coordonnées** : e-mail, téléphone, domaine (placeholders dans `src/data/site.ts`).
- **Mentions légales & confidentialité** : gabarits à compléter (champs `[…]`)
  et à faire valider juridiquement.
- **Tarifs séminaires** : fourchettes indicatives reprises des maquettes — à
  arbitrer (cf. `docs/contenu-redactionnel.md`, « Notes éditoriales »).
- **Plaquette PDF** : non fournie ; les CTA « Recevoir la plaquette » pointent
  vers le formulaire (logique lead magnet).
- **Lighthouse** : à mesurer sur l'URL de preview. Les libellés en or sur fond
  parchemin (style de marque issu des maquettes) sont proches du seuil AA pour
  le très petit texte — à arbitrer si un audit l'exige.

## Statut
- [x] Cahier des charges
- [x] Brief maquettes
- [x] Maquettes validées (Claude Design)
- [x] Implémentation (Claude Code) — backlog T0 → T12
- [ ] Mise en ligne (photos, coordonnées & légal à finaliser)
