# Les Nuits au Château — Les Suites de Sainte-Lucie

Site vitrine de **pré-ouverture** de la maison d'hôtes haut de gamme
**« Les Nuits au Château »** (signature *Les Suites de Sainte-Lucie*), au
Château de Sainte-Lucie — Rambervillers, Vosges. **Ouverture prévue en avril 2027.**

> Refonte v2 du dépôt : l'ancienne vitrine « réception » (séminaires, événements,
> tournages) est remplacée par le projet de maison d'hôtes à deux suites.
> Documentation de reprise et d'exploitation : `docs/00-…` à `docs/08-…`,
> puis référentiel annuel actif dans `docs/23-referentiel-exploitation-standard-v6.md`.

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
Confidentialité · Liste d'attente (`/liste-attente`) · Conditions
prévisionnelles (`/conditions-sejour`) · 404.

**Démonstrateur interne non indexé** : vue d’ensemble (`/demo`), réservation
fictive (`/demo/reservation`), compagnon client (`/demo/client`), cockpit
gestionnaire (`/demo/gestion`), base de vérité et simulateur des associés
(`/demo/pilotage`), comparatif des scénarios (`/demo/scenarios`) et architecture
(`/demo/integrations`). Les parcours client
utilisent des données fictives. Le cockpit associés contient des données projet
dérivées et non sensibles ; il n'est pas authentifié et doit rester sans donnée personnelle.

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
liens internes passent par `withBase()` (`src/utils/url.ts`). Les formulaires
utilisent Web3Forms lorsque `PUBLIC_WEB3FORMS_KEY` est configurée. Sans clé, la
maquette simule explicitement l'envoi dans le navigateur et ne transmet rien.

## Référentiel opérationnel

- `docs/07-referentiel-offre-et-regles-v3.md` centralise les tarifs, horaires,
  conditions de séjour, restauration et règles du spa.
- `docs/08-cahier-des-charges-fonctionnel-si-v1.md` définit le futur système de
  réservation, le portail client et l'applicatif gestionnaire.
- `docs/09-selection-socle-technique-v1.md` compare les PMS et recommande une
  shortlist ainsi qu'un protocole de démonstration.
- `docs/10-brief-consultation-fournisseurs-v1.md` est le brief prêt à transmettre
  aux fournisseurs pour obtenir des réponses et devis comparables.
- `docs/11-demonstrateur-experience-et-exploitation-v1.md` décrit la maquette
  fonctionnelle, les rôles, les événements d’intégration, les scénarios de repli
  et le protocole de revue par les associés.
- `docs/12-positionnement-tarifaire-et-valeur-v2.md` documente le cadrage tarifaire initial,
  le benchmark local et les preuves nécessaires pour défendre le positionnement.
- `docs/13-iteration-corrective-site-aout-2026.md` consigne les arbitrages du
  brief d'itération 2, les corrections livrées et les sujets différés.
- `docs/14-note-arbitrage-juridique-fiscal-financier-v1.md` propose le schéma
  SCI / société d'exploitation et la règle d'affectation des investissements.
- `docs/15-plan-directeur-ouverture-avril-2027-v1.md` organise les dix chantiers,
  les obligations, les jalons et le chemin critique jusqu'à l'ouverture.
- Les documents numérotés 16 à 22 conservent les travaux préparatoires à titre
  historique et ne constituent plus la photographie active du projet.
- `docs/23-referentiel-exploitation-standard-v6.md` documente le modèle annuel
  actif, les tests à 120 et 150 nuits par suite, le loyer et les financements.
- `docs/24-comparatif-scenarios-exploitation-v1.md` conserve le modèle annuel
  actif et compare l’étude saisonnière avec table, ses plafonds et sa charge.
- `public/knowledge/` et `public/llms.txt` exposent la photographie courante
  sous des formats structurés directement consultables par les agents IA.
- `docs/06-points-a-confirmer.md` ne contient plus que les validations externes
  ou paramètres réellement ouverts.

## ⚠️ À confirmer avant l'ouverture (cf. `docs/06-points-a-confirmer.md`)

- **Photographies des suites** : remplacement des projections sélectionnées par
  les photographies réalisées après travaux, en mars 2027.
- **Coordonnées** : e-mail (`contact@chateau-saintelucie.fr`), téléphone
  (aucun affiché), nom de domaine et URL canonique.
- **Suites** : surfaces, couchages et équipements définitifs.
- **Dîner au château** : régime applicable, boissons, licences et conditions de service.
- **Société d'exploitation** : identité, fiscalité et paramètres comptables.
- **Prestataires** : PMS, channel manager, paiement et futur hébergement.
- **Légal** : mentions légales, responsable de publication, confidentialité
  (gabarits à compléter), hébergeur de production et traitement du formulaire.

## Statut
- [x] Cadrage & docs de reprise (v2)
- [x] Refonte « Les Nuits au Château » (backlog T0 → T12)
- [x] Validation et publication du site vitrine sur GitHub Pages
- [x] Référentiel d'offre et cahier des charges fonctionnel du SI
- [x] Présélection documentée du socle PMS, channel manager et paiement
- [x] Démonstrateur fonctionnel réservation / client / gestion / pilotage / intégrations
- [ ] Démonstrations fournisseurs, devis et décision contractuelle
- [ ] Revue du démonstrateur par les associés et arbitrage de la v2
- [ ] Intégration du PMS et réalisation du MVP opérationnel
