# Backlog — Implémentation (Claude Code)

> Lire `../CLAUDE.md` et `./cahier-des-charges.md` d'abord. **Un commit par tâche.** Cocher au fur et à mesure.

## Fondations
- [ ] **T0 — Git & cadrage** : vérifier `git status` (dépôt déjà créé sur GitHub), committer les documents de cadrage présents (`README.md`, `CLAUDE.md`, `docs/`). *Acceptation :* premier commit poussé, historique propre.
- [ ] **T1 — Échafaudage** : Astro + TypeScript (strict) + Tailwind. Structure `src/{components,layouts,pages,content,styles,assets}`. *Acceptation :* `npm run dev` et `npm run build` OK.
- [ ] **T2 — Design tokens** : palette (nuit/jour), polices (Cormorant Garamond, EB Garamond), échelle typographique dans la config Tailwind / le CSS global. *Acceptation :* tokens utilisables, polices chargées proprement, pas de FOUT gênant.
- [ ] **T3 — Layout & navigation** : layout de base, header sticky léger + menu mobile, pied de page (contact rapide). *Acceptation :* responsive, navigation clavier, focus visible.

## Pages MVP
- [ ] **T4 — Accueil** : hero immersif, cartes des usages, teaser histoire, teaser galerie, bandeau réassurance, CTA. Conforme à la maquette. *Acceptation :* mobile + desktop, Lighthouse perf ≥ 95.
- [ ] **T5 — Le Château** : storytelling, espaces, chiffres clés, situation (sans adresse précise).
- [ ] **T6 — Pages offres** : Séminaires, Événements privés, Tournages — composant de page réutilisable, contenu en MD/MDX, CTA différenciés.
- [ ] **T7 — Galerie** : photothèque responsive + lightbox, images optimisées (`astro:assets`).
- [ ] **T8 — Contact** : formulaire qualifiant (champs §9 du cahier), validation, anti-spam, intégration Netlify Forms / Web3Forms (clé via env), message de confirmation. *Acceptation :* soumission de test reçue ; **aucun secret commité**.
- [ ] **T9 — Légal** : mentions légales + politique de confidentialité/cookies (gabarits à compléter par le propriétaire).

## Qualité & mise en ligne
- [ ] **T10 — SEO** : title/description par page, OpenGraph/Twitter, `sitemap.xml`, `robots.txt`, schema.org `EventVenue`/`LocalBusiness`.
- [ ] **T11 — Performance & accessibilité** : passe Lighthouse (≥ 95 sur 4 axes), audit contraste/focus/alt, `prefers-reduced-motion`.
- [ ] **T12 — Déploiement** : configuration Netlify (build, redirections), prévisualisation, branchement du domaine. *Acceptation :* site en ligne sur une URL de preview.

## Préparé pour la v2 (ne pas implémenter en v1)
- [ ] i18n EN · page Histoire dédiée · témoignages · filtres galerie · actualités.
