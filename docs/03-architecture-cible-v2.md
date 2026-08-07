# 03 — Architecture cible du dépôt et du site

## Principe

Le dépôt existant est conservé. La refonte se fait en place, par migration progressive des données et des routes, sans réinitialiser Astro ni réécrire le système de design.

## Organisation documentaire

```text
docs/
├── 00-decisions-projet-v2.md
├── 01-audit-site-v1.md
├── 02-contenu-site-v2.md
├── 03-architecture-cible-v2.md
├── 04-backlog-refonte-v2.md
├── 05-inventaire-medias-v2.md
├── 06-points-a-confirmer.md
└── archive-site-reception-v1/

references/
├── flyer/
├── maquette-site-reception-v1/
└── interne/rendus-projection/
```

## Architecture applicative recommandée

```text
src/
├── assets/
│   ├── brand/                 # logo définitif
│   └── images/                # photographies réelles existantes
├── components/
│   ├── brand/                 # Logo, signature de marque
│   ├── suites/                # cartes et blocs des suites
│   └── experience/            # table, parc, eaux, espaces
├── content/
│   ├── suites/                # Lumière, Feuillage
│   └── histoire/              # récit patrimonial existant adapté
├── data/
│   ├── site.ts                # marque, navigation, localisation, contact
│   ├── home.ts
│   ├── experience.ts
│   ├── gallery.ts
│   └── images.ts
└── pages/
    ├── index.astro
    ├── les-suites.astro
    ├── [suite].astro ou deux routes explicites
    ├── experience.astro
    ├── le-chateau.astro
    ├── histoire.astro
    ├── galerie.astro
    ├── contact.astro
    └── pages légales et techniques existantes
```

## Git

- `main` reste la version publiée actuelle jusqu'à validation.
- Tout le travail se fait sur `refonte/nuits-au-chateau`.
- Commits petits et cohérents, suivant le backlog.
- Pas de réécriture d'historique, pas de force-push.
- PR de prévisualisation avant fusion.

## Déploiement

- Conserver la preview GitHub Pages et le chemin de base configurable.
- Conserver Netlify comme option de production tant que le domaine et l'hébergeur ne sont pas arbitrés.
- Le formulaire ne doit pas échouer silencieusement sur GitHub Pages : prévoir un mode preview explicite ou une solution compatible avec la cible retenue.

## Redirections

Anciennes routes à traiter :

- `/seminaires`
- `/evenements-prives`
- `/tournages`

Redirection recommandée vers `/` ou `/le-chateau`, à documenter. Ne pas laisser d'anciennes pages indexables avec le positionnement obsolète.
