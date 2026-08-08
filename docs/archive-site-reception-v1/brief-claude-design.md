# Brief Claude Design — Maquettes du site vitrine

## Objet
Concevoir les **maquettes** (desktop + mobile) du site vitrine du Château de Sainte-Lucie, sur la base de `cahier-des-charges.md`. Elles serviront de référence à l'implémentation (Claude Code).

## Écrans à maquetter (priorité MVP)
1. **Accueil — desktop & mobile** *(le plus important)* : hero, cartes des usages, teaser histoire, teaser galerie, bandeau réassurance, CTA, footer.
2. **Le Château / Le lieu** : storytelling + espaces + chiffres clés.
3. **Une page Offre type** (ex. Séminaires) : modèle réutilisable pour Événements privés et Tournages.
4. **Contact** : formulaire qualifiant.
5. **Composants transverses** : header/nav (desktop + menu mobile), pied de page, carte d'usage, bloc galerie/lightbox, formulaire.

## Direction visuelle
- Continuité avec la galerie / la plaquette : identité « lumière », dark/gold/serif.
- **Deux registres** : *nuit* (immersif — hero, galerie) et *jour / parchemin clair* (lisibilité — contenu, offres, formulaire). Montrer les deux.
- Palette — nuit : `#0c0c0b` / `#ece4d4` / or `#c8a45c` / or clair `#e7cd92` · jour : `#f4eee2` / `#2a2620` / or profond `#9a7b3f`.
- Typo : Cormorant Garamond (titres) + EB Garamond (texte) ; labels en capitales espacées.
- Mobile-first ; CTA clairs et **différenciés par cible**.
- Les photos du château sont déjà chargées.

## Livrable
Maquettes par écran (desktop + mobile), cohérentes, annotées si utile (hover, focus). Format exploitable comme référence pour une implémentation **Astro + Tailwind**.

## À ne pas faire
- Pas d'adresse postale précise (résidence habitée → localisation approximative).
- Pas de réservation en ligne ni de calendrier public (hors périmètre v1).
- Ne pas trancher le nom commercial ni le niveau d'ambition (décisions en cours) : garder « Château de Sainte-Lucie ».

## Prompt prêt à coller
> À partir du cahier des charges fourni et des photos du Château de Sainte-Lucie déjà chargées, conçois les **maquettes du site vitrine** (desktop + mobile) pour : l'accueil, la page « Le Château », une page offre type (Séminaires) et la page Contact, plus les composants transverses (nav, footer, carte d'usage, galerie, formulaire).
>
> Identité : continuité avec la galerie historique — registre « nuit » immersif (fond noir chaud, titres serif or clair, signature « lumière ») pour le hero et la galerie ; registre « jour » parchemin clair et lisible pour le contenu, les offres et le formulaire. Typo Cormorant Garamond + EB Garamond. Mobile-first, élégant, sobre, premium.
>
> Trois cibles, trois CTA distincts : entreprises (« Demander une proposition »), familles (« Demander une visite »), productions (« Étudier un tournage »).
>
> Contraintes : ne pas afficher l'adresse précise ; pas de réservation en ligne. Montre-moi **d'abord l'accueil (desktop + mobile)** pour validation, puis déroule les autres écrans.
