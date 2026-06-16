# CLAUDE.md — Manuel de l'agent (site vitrine Château de Sainte-Lucie)

Tu es l'agent d'implémentation de ce dépôt. Mission : construire le **site vitrine** du Château de Sainte-Lucie, conforme à `docs/cahier-des-charges.md` et aux **maquettes validées** (Claude Design).

## Stack imposée
- **Astro** (site statique, zéro JS par défaut) + **TypeScript** (strict)
- **Tailwind CSS** (tokens ci-dessous)
- Contenu éditorial via **content collections** Astro (Markdown / MDX)
- **Pas de base de données.** Formulaire via service statique (voir §Formulaire)
- Déploiement cible : **Netlify** (alternative : Cloudflare Pages)

## Démarrage
0. **Git & premiers commits, c'est ton rôle.** Le dépôt distant est créé sur GitHub et tu y as accès. Vérifie l'état (`git status`) ; n'écrase pas un historique existant. Commence par **committer les éléments de cadrage présents** (`README.md`, `CLAUDE.md`, `docs/`, `maquettes/`, `livrables/`), puis avance par commits successifs.
1. `npm create astro@latest .` — template minimal, TypeScript strict
2. `npx astro add tailwind`
3. Mettre en place les tokens (§Design) et l'arborescence (cahier §4)
4. **Contenu rédactionnel définitif** dans `docs/contenu-redactionnel.md` (titres, textes, libellés de formulaire, métas SEO) → à placer dans les content collections / pages Astro.
5. **Référence visuelle : les maquettes validées sont dans `maquettes/`.** La planche `Maquettes_Site.html` et `Composants.html` donnent la vue d'ensemble ; **les fichiers `maquettes/site/*.html` et `maquettes/site/site.css` sont la référence d'implémentation principale** — transpose-les fidèlement en Astro + Tailwind (structure, tokens, composants). Les dossiers `maquettes/` et `livrables/` sont des **références, à NE PAS déployer**.
6. Dérouler **l'intégralité de `docs/backlog.md` (T0 → T12) en une session**, **un commit par tâche**. En cas de blocage, le documenter et continuer plutôt que t'arrêter.

## Design tokens — identité « Château de Sainte-Lucie »
Deux registres complémentaires (cf. cahier §6) :

**Registre nuit** (immersif — hero, galerie, ambiance)
`bg #0c0c0b · texte #ece4d4 · or #c8a45c · or clair #e7cd92`

**Registre jour** (lecture — contenu, offres, formulaire)
`bg #f4eee2 · texte #2a2620 · or profond #9a7b3f · filet #d8cdb8`

**Typographie**
- Titres : *Cormorant Garamond* (souvent italique) — display
- Texte : *EB Garamond*
- Libellés / UI : capitales espacées (~0.3em) ; une sans-serif neutre tolérée pour les très petits libellés de formulaire

**Signature** : la *lumière* (Sainte-Lucie = lumière) — lueur chaude émergeant du noir, à doser.
→ **Les maquettes Claude Design font foi pour le rendu final** ; ces tokens en sont la base.

## Exigences non négociables
- **Responsive mobile-first**, testé jusqu'à 320–380px
- **Accessibilité WCAG AA** : contraste, focus clavier visible, `alt` sur images, structure sémantique, navigation clavier, `prefers-reduced-motion` respecté
- **Performance** : Lighthouse ≥ 95 (perf / SEO / best-practices / a11y) ; images via `astro:assets` (formats modernes, lazy-loading, dimensions adaptées)
- **SEO** : `title`/`description` par page, OpenGraph + Twitter cards, `sitemap.xml`, `robots.txt`, données structurées schema.org (`EventVenue` / `LocalBusiness`), URLs propres en français
- **i18n** : FR par défaut ; **ne pas coder les chaînes en dur**, centraliser le contenu pour préparer l'EN (phase 2)

## Formulaire de contact
- Sans backend : **Netlify Forms** (si déploiement Netlify) ou **Web3Forms** (clé via variable d'environnement)
- Champs : voir cahier §9 ; anti-spam (honeypot + service)
- ⚠️ **Aucun secret dans le dépôt.** Clés via `.env` (jamais commité ; fournir un `.env.example`). L'e-mail de destination se configure hors dépôt.

## Vie privée du lieu — IMPORTANT
- Le château est une **résidence habitée**. **Ne pas afficher l'adresse postale précise** (rue + numéro) sur les pages publiques. Localisation publique : « aux portes de Rambervillers, Vosges ». L'adresse exacte n'est communiquée qu'aux clients confirmés.
- **Pas de calendrier de réservation public** ; logique « sur demande / privatisation ».

## Conventions de code
- Composants Astro réutilisables (`src/components`), layouts (`src/layouts`), contenu (`src/content`)
- Commits clairs en français, un par tâche du backlog
- Tenir le `README.md` à jour si la structure évolue

## Hors périmètre v1 — ne pas faire
- Pas de paiement en ligne, d'espace client, de CMS lourd, ni de réservation en ligne
- Ne pas publier de contenu non validé : le texte définitif vient du cahier / des livrables fournis
- Ne pas trancher le nom commercial ni le niveau d'ambition (décisions en cours côté famille) : utiliser « Château de Sainte-Lucie »
