# 04 — Backlog de refonte v2

## T0 — État initial

- Vérifier branche, historique et arbre de travail.
- Installer avec le lockfile existant.
- Exécuter `npm run check` et `npm run build` avant modification.
- Documenter toute anomalie initiale.

## T1 — Marque et socle éditorial

- Intégrer le blason définitif dans Header, Footer et hero.
- Mettre à jour nom, signature, baseline et navigation.
- Retirer le faux téléphone et les anciennes capacités.
- Centraliser les nouvelles constantes dans `src/data/site.ts`.

## T2 — Modèle de contenu

- Remplacer la collection `offres` par une collection `suites`.
- Créer Lumière et Feuillage à partir du contenu validé.
- Ajouter les données de l'expérience sans promesses non confirmées.
- Adapter les schémas Zod et les types.

## T3 — Accueil

- Recomposer le premier écran selon le flyer validé.
- Afficher le logo avec une taille réellement lisible.
- Présenter la maison, les deux suites, l'expérience et l'ouverture d'avril 2027.
- CTA « Découvrir les suites » et « Être informé de l'ouverture ».

## T4 — Suites

- Créer `/les-suites`, `/suite-lumiere` et `/suite-feuillage`.
- Ne pas inventer surfaces, couchages, équipements ou tarifs définitifs.
- Prévoir des emplacements de photographies finales faciles à remplacer en mars 2027.

## T5 — Expérience

- Créer `/experience` : communs, table d'hôtes, matin, piscine naturelle, hammam, parc.
- Exclure bain nordique et sauna comme promesses acquises.
- Ajouter les conditions prudentes d'accès aux équipements.

## T6 — Château, histoire et galerie

- Adapter `/le-chateau` au récit Lucy / lumière / maison habitée.
- Conserver et réviser `/histoire` sans surcharger la navigation principale.
- Nettoyer la galerie pour ne conserver que les photographies réelles pertinentes.
- Retirer les images sensibles ou non nécessaires au parcours commercial.

## T7 — Contact de pré-ouverture

- Transformer le formulaire événementiel en formulaire d'information et de contact.
- Supprimer tout téléphone fictif.
- Conserver honeypot, consentement et traitement sécurisé.
- Prévoir une confirmation claire et accessible.

## T8 — Anciennes routes

- Retirer les anciennes collections et pages d'offres.
- Mettre en place les redirections de `/seminaires`, `/evenements-prives`, `/tournages`.
- Vérifier les liens internes et le sitemap.

## T9 — SEO et données structurées

- Mettre à jour titres, descriptions, Open Graph et Twitter cards.
- Remplacer `EventVenue` par `BedAndBreakfast` ou `LodgingBusiness`.
- Ne pas inclure l'adresse précise dans le JSON-LD.
- Mettre à jour favicon et image sociale avec l'identité définitive.

## T10 — Responsive et accessibilité

- Tester 320, 375, 768, 1024 et grand écran.
- Vérifier contrastes, focus, ordre des titres, alt, clavier et réduction du mouvement.
- Vérifier la lisibilité du blason détaillé aux petites tailles ; prévoir une règle de taille minimale plutôt qu'une version inventée.

## T11 — Performance et qualité

- Vérifier poids et dimensions des images.
- Conserver `astro:assets`, lazy-loading hors hero et dimensions explicites.
- Exécuter `npm run check` et `npm run build`.
- Corriger les erreurs et avertissements pertinents.

## T12 — Passation

- Mettre README et documentation à jour.
- Lister les points à confirmer avant publication.
- Préparer une PR de prévisualisation sans fusion automatique.
