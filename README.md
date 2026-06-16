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

## Statut
- [x] Cahier des charges
- [x] Brief maquettes
- [x] Maquettes validées (Claude Design)
- [ ] Implémentation (Claude Code)
- [ ] Mise en ligne
