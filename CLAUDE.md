# CLAUDE.md — Refonte « Les Nuits au Château »

Tu reprends le site Astro existant du Château de Sainte-Lucie. Le site actuellement publié présente une ancienne offre de séminaires, événements privés et tournages. Cette orientation est abandonnée pour cette refonte.

## Mission

Transformer le site en vitrine de pré-ouverture de la maison d'hôtes haut de gamme :

- marque principale : **Les Nuits au Château** ;
- signature : **Les Suites de Sainte-Lucie** ;
- deux suites seulement : **Lumière** et **Feuillage** ;
- ouverture prévisionnelle : **avril 2027** ;
- maison habitée par trois foyers d'une même famille ;
- château de 1876, environ 750 m², parc clos d'environ un hectare, piscine naturelle filtrée par lagunage.

Lis dans cet ordre :

1. `PROMPT_REPRISE_CLAUDE_CODE.md` ;
2. `docs/00-decisions-projet-v2.md` ;
3. `docs/01-audit-site-v1.md` ;
4. `docs/02-contenu-site-v2.md` ;
5. `docs/03-architecture-cible-v2.md` ;
6. `docs/04-backlog-refonte-v2.md` ;
7. `docs/05-inventaire-medias-v2.md` ;
8. `docs/06-points-a-confirmer.md`.

## Règles non négociables

- Préserver Astro, TypeScript strict, Tailwind, le lockfile et l'historique Git.
- Travailler sur `refonte/nuits-au-chateau`, jamais directement sur `main`.
- Réutiliser les composants, l'optimisation d'images, `withBase()`, les métadonnées et le système responsive existants quand ils restent pertinents.
- Ne publier **aucun rendu photoréaliste de projection**. Ils sont réservés à la décision interne. Utiliser uniquement les photographies réelles déjà présentes dans `src/assets/images/`.
- Ne publier aucune personne reconnaissable, marque ou logo tiers.
- Ne jamais afficher l'adresse postale exacte : écrire « Rambervillers, Vosges » ou « aux portes de Rambervillers ».
- Ne pas promettre le bain nordique, le sauna, une capacité non confirmée, des horaires, des conditions d'annulation ou des produits précis au petit-déjeuner.
- Ne pas afficher le faux numéro de téléphone actuellement présent dans les données.
- Ne pas présenter les tarifs indicatifs comme définitifs.
- Accessibilité WCAG AA, mobile-first, `prefers-reduced-motion`, navigation clavier et performance restent obligatoires.
- Ne pas installer de CMS, base de données ou moteur de réservation sans décision explicite de Blaise.

## Identité visuelle validée

- Logo maître : `src/assets/brand/blason-definitif-encre.svg`.
- Variante or : `src/assets/brand/blason-definitif-or.svg`.
- Référence de composition : `references/flyer/flyer-reference-validee.jpeg`.
- Encre `#141F26`, or patiné `#C8A45B`, blanc `#FFFFFF`, ivoire éditorial `#F2EBDD`.
- Cormorant Garamond pour les titres, EB Garamond pour le texte.
- Conserver l'alternance immersive nuit / lecture ivoire de la v1, avec une présence plus forte du blason et une hiérarchie plus éditoriale.

## Fin de mission attendue

Terminer par `npm run check` et `npm run build`, documenter les points restant à confirmer et fournir une synthèse des routes, redirections, contenus et médias modifiés. Ne pousser ni ne fusionner sans instruction explicite.
