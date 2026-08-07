# 01 — Audit de la maquette et du site v1

## Synthèse

La v1 est techniquement saine et visuellement cohérente, mais commercialement obsolète. Elle doit être refondue, non reconstruite depuis zéro.

## Éléments à conserver

- Astro 5, TypeScript strict, Tailwind 4 et `package-lock.json`.
- Architecture en composants, layouts et données centralisées.
- Imports d'images via `astro:assets`.
- Gestion du chemin de base avec `withBase()` pour GitHub Pages.
- Workflow de preview GitHub Pages et configuration Netlify.
- Registres visuels nuit / ivoire, lumière chaude, Cormorant Garamond et EB Garamond.
- Pages galerie, histoire, mentions légales, confidentialité et 404 comme bases techniques.
- Accessibilité, réduction des animations et structure SEO déjà amorcées.

## Éléments à remplacer

- Positionnement « séminaires, événements privés, tournages ».
- Capacité de 50–70 personnes et toute mention ERP liée à l'ancienne offre.
- Routes et content collections des trois anciennes offres.
- CTA « demander une proposition », « demander une visite » et « étudier un tournage ».
- Données structurées `EventVenue`.
- Formulaire orienté événement.
- Chiffres « plusieurs hectares », stationnement et temps de trajet non confirmés.
- Faux numéro de téléphone contenu dans `src/data/site.ts`.
- Ancienne signature de marque « Château · Vosges » utilisée sans la nouvelle architecture de marque.

## Risques identifiés

1. **Mélange des deux projets** : laisser des fragments d'anciennes offres dégraderait immédiatement la compréhension du site.
2. **Promesses non validées** : bain nordique, sauna, capacité, menus, horaires et règles de séjour restent à confirmer.
3. **Visuels trompeurs** : les rendus générés sont séduisants mais interdits de publication.
4. **Vie privée** : le château est habité ; l'adresse précise ne doit apparaître ni dans le HTML, ni dans le JSON-LD, ni dans les métadonnées.
5. **Pré-ouverture** : les suites ne pourront être photographiées qu'en mars 2027. La v1 doit donc assumer une communication patrimoniale et atmosphérique avec les photographies réelles existantes.
6. **Anciennes URLs indexées** : prévoir des redirections explicites.

## Conclusion d'audit

Le socle technique et le système de design réduisent fortement le coût de la refonte. Le travail principal concerne la nouvelle modélisation de contenu, les routes, le hero, les CTA, les données structurées et la hiérarchie de marque.
