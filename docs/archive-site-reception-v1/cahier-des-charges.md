# Cahier des charges — Site vitrine du Château de Sainte-Lucie

**Version** 1.0 · 2026 · Document de travail interne
**Maître d'ouvrage** SCI / société d'exploitation (à constituer) — Château de Sainte-Lucie, Rambervillers (88)

---

## 1. Contexte & objectifs

Le Château de Sainte-Lucie ouvre une activité de **lieu de réception à taille humaine** (50–70 personnes max), principalement en semaine, sans hébergement ni mariages. Le site vitrine est le premier outil commercial du projet.

**Objectifs, par ordre de priorité :**
1. **Crédibiliser** le lieu par une image à sa hauteur — premium, sobre, confidentiel.
2. **Générer des demandes qualifiées** (séminaires, événements privés, tournages) via un formulaire.
3. **Servir trois cibles distinctes** avec des parcours et des messages adaptés.
4. **Être trouvé** sur les recherches locales et de niche (Vosges, Lorraine, Grand Est).
5. **Raconter l'histoire** du lieu — différenciant fort déjà capitalisé (galerie, plaquette).

**Ce que le site n'est pas :** une billetterie, une plateforme de réservation en ligne, un site de mariages, un blog (cf. §12 et §14).

## 2. Cibles & parcours

| Cible | Logique d'achat | Attentes sur le site | CTA principal |
|---|---|---|---|
| **Entreprises** (séminaires, journées premium) | Rationnelle : cadre, capacité, logistique, restauration, activités, ROI d'un offsite | Capacité, salles, déjeuner maison, bien-être, team-building, accès Épinal/Nancy | « Demander une proposition » |
| **Familles** (événements privés) | Émotionnelle : beauté, intimité, exclusivité | Photos, ambiance, privatisation, repas, occasions (anniversaires, baptêmes) | « Demander une visite » |
| **Productions** (cinéma, pub, mode, automobile) | Technique : variété et authenticité du décor, lumière, accès, électricité, droits, tarif jour | Espaces intérieurs/extérieurs, style d'époque, parc, piscine naturelle, logistique tournage | « Étudier un tournage » |

Chaque cible a une **page dédiée** + un point d'entrée clair depuis l'accueil.

## 3. Positionnement & messages clés

- **Promesse :** « Un château de caractère, à taille humaine, aux portes des Vosges — pour des séminaires, des moments de famille et des tournages d'exception. »
- **Piliers de différenciation :** l'âme et l'histoire (150 ans) · l'intimité et l'exclusivité (lieu confidentiel, sur réservation) · le cadre naturel (parc, chênes centenaires, piscine naturelle) · le déjeuner maison (locavore, du parc à l'assiette) · la flexibilité multi-usages.
- **Ton :** élégant, sobre, chaleureux ; jamais tape-à-l'œil — le luxe se dit par la retenue.
- **Signature de marque :** la *lumière* (Sainte-Lucie).

## 4. Arborescence & contenu des pages

*(MVP en gras.)*

1. **Accueil** — hero immersif (façade de nuit + promesse) ; les usages en cartes ; aperçu de l'histoire ; teaser galerie ; bandeau de réassurance (taille humaine, confidentiel, aux portes des Vosges) ; CTA contact ; pied de page.
2. **Le Château / Le lieu** — l'histoire en bref (storytelling), les espaces (salles de réception, parc, piscine naturelle, bien-être), les chiffres clés (≈750 m², 50–70 pers, ~20 places de parking), la situation (sans adresse précise).
3. **Séminaires & journées d'entreprise** — journée type, salles + parc + pauses + déjeuner maison + bien-être, option team-building (parcours/épreuves dans le sous-bois), capacités, fourchettes indicatives, accès Épinal/Nancy.
4. **Événements privés** — occasions (anniversaires, baptêmes, repas de famille), privatisation, repas maison, beauté du lieu.
5. **Tournages & prises de vues** — atouts du décor (intérieurs d'époque, blasons, boiseries, parc, piscine, lumière), espaces et superficies, logistique (accès, stationnement, électricité), modalités (location de décor, tarif jour indicatif).
6. **Galerie** — photothèque soignée (extérieurs, détails patrimoniaux, parc, piscine) ; filtres en v2.
7. **Contact / Demande** — formulaire qualifiant (§9), e-mail, téléphone, localisation approximative, téléchargement de la plaquette (lead magnet).
8. **Mentions légales** — éditeur (société d'exploitation), hébergeur, directeur de publication.
9. **Politique de confidentialité / cookies** — RGPD.
10. *(v2)* **Histoire** (page longue), **Témoignages**, **Actualités**, **Version anglaise**.

## 5. Fonctionnalités

- Navigation claire (header sticky léger + menu mobile), pied de page avec contact rapide.
- **Formulaire de contact qualifiant** (§9).
- **Téléchargement de la plaquette** (PDF) en lead magnet (option : contre e-mail).
- Galerie responsive (lightbox).
- Liens cliquables : téléphone, e-mail (pas d'adresse précise).
- CTA de contact persistant (sticky discret en mobile).
- Multilingue prêt (FR / EN en v2).
- Bandeau cookies minimal (selon l'analytics retenu).

## 6. Identité visuelle & direction de design

- **Continuité de marque** avec la galerie et la plaquette (dark/gold/serif, signature « lumière »).
- **Deux registres** pour concilier émotion et conversion :
  - *Nuit* (immersif) — hero, galerie, transitions d'ambiance.
  - *Jour / parchemin clair* (lisibilité) — pages de contenu, offres, formulaire.
- **Typographie :** Cormorant Garamond (titres) + EB Garamond (texte) ; libellés en capitales espacées.
- **Photo-centré :** la photographie porte l'émotion — grand format, qualité soignée.
- **Mobile-first :** les décideurs consultent souvent sur smartphone.
- Les **maquettes Claude Design** font foi pour le rendu final (cf. `brief-claude-design.md`).

## 7. Exigences techniques

- **Stack :** Astro + TypeScript + Tailwind ; contenu en content collections (MD/MDX) ; site **statique**.
- **Responsive** mobile-first, testé jusqu'à 320–380px.
- **Performance :** Lighthouse ≥ 95 ; images optimisées (formats modernes, lazy-loading, dimensions adaptées) ; zéro JS superflu.
- **Accessibilité :** WCAG AA (contraste, focus visible, alternatives textuelles, sémantique, clavier, `prefers-reduced-motion`).
- **Compatibilité :** navigateurs modernes (2 dernières versions).
- **Maintenabilité :** contenu éditorial séparé du code (édition future par un non-développeur).

## 8. SEO & visibilité locale

- **Mots-clés cibles :** « château séminaire Vosges / Lorraine », « lieu séminaire entreprise Épinal / Nancy », « salle de réception château Rambervillers », « location décor tournage château Grand Est », « lieu événement privé Vosges ».
- **On-page :** title/description uniques, hiérarchie Hn propre, URLs en français, maillage interne entre offres.
- **Technique :** `sitemap.xml`, `robots.txt`, OpenGraph + Twitter cards, schema.org `EventVenue` / `LocalBusiness`.
- **Hors site (tâches marketing, hors dev) :** fiche **Google Business Profile**, référencement sur les plateformes de repérage de décors (tournages).

## 9. Formulaire de contact & conversion

**Champs :**
- Nom · E-mail · Téléphone (optionnel)
- **Type de demande** (séminaire / événement privé / tournage / autre)
- Date(s) envisagée(s)
- Nombre de personnes (ou type de production)
- Message / besoins
- Case de consentement RGPD
- Honeypot anti-spam

**Comportement :** validation côté client, message de confirmation clair, notification e-mail au propriétaire (config hors dépôt). Solution : Netlify Forms (défaut) ou Web3Forms.
**CTA :** verbes d'action explicites par cible (« Demander une proposition », « Demander une visite », « Étudier un tournage »).

## 10. Conformité & protection du lieu

- **RGPD :** politique de confidentialité, consentement formulaire, bandeau cookies minimal (idéalement analytics sans cookie → Plausible).
- **Mentions légales :** éditeur = société d'exploitation (à créer), hébergeur, directeur de publication.
- **Protection de la vie privée (château habité) :** pas d'adresse postale précise ; localisation approximative (« aux portes de Rambervillers ») ; adresse exacte communiquée uniquement aux clients confirmés ; pas de calendrier public.

## 11. Hébergement, déploiement, analytics

- **Hébergement / déploiement :** Netlify (déploiement continu depuis GitHub + formulaires intégrés) ; alternative Cloudflare Pages.
- **Nom de domaine :** à réserver (ex. `chateau-saintelucie.fr` — à arbitrer avec le nom retenu).
- **Analytics :** Plausible (respect de la vie privée, allège le bandeau cookies) ou GA4 — décision marketing.
- **E-mails :** adresse de contact pro (ex. `contact@…`) — config hors dépôt.

## 12. Phasage

- **MVP (v1) :** pages 1–9, FR, formulaire, galerie, SEO de base, mise en ligne.
- **v2 :** version anglaise, page Histoire dédiée, témoignages, actualités, filtres galerie.
- **Ultérieur :** réservation en ligne, espace pro — seulement si le modèle l'exige.

## 13. Critères de succès (KPIs)

- Lighthouse ≥ 95 sur les 4 axes.
- Demandes qualifiées / mois (cible à fixer au lancement).
- Taux de conversion visite → demande.
- Positionnement sur 3–5 requêtes locales prioritaires (suivi à 3–6 mois).

## 14. Hors périmètre (v1)

Paiement en ligne · réservation/calendrier public · espace client · CMS lourd · blog · multilingue (reporté v2) · production des photos d'intérieur (à fournir par le propriétaire).

---
*Tous les chiffres, fourchettes et éléments juridiques sont indicatifs et restent à valider par les professionnels concernés (bureau de contrôle ERP, notaire, expert-comptable).*
