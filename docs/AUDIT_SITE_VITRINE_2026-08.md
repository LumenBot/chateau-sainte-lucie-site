# Audit et finalisation du site vitrine

> Document historique. La grille à 250 € décrite ci-dessous a été remplacée le
> 8 août 2026 par un tarif à 200 €, lui-même remplacé le 9 août par le tarif
> d'ouverture 2027 à 180 € conformément au référentiel d'offre.

Date : 8 août 2026
Périmètre : site public « Les Nuits au Château — Les Suites de Sainte-Lucie »

## Diagnostic de la version reçue

La base technique était saine : site Astro statique, composants réutilisables,
polices auto-hébergées, métadonnées SEO, sitemap, données structurées et socle
d'accessibilité. L'identité nuit/ivoire/or et le blason définitif étaient déjà
cohérents avec le positionnement.

Les principaux écarts concernaient l'expérience de marque :

- la page Histoire n'était plus présente dans la navigation principale ;
- la tarification était présentée comme indicative, avec un supplément de 25 €
  par personne qui n'avait pas été validé ;
- les rendus après travaux étaient relégués à des galeries secondaires au lieu de
  porter le récit du séjour ;
- l'accueil décrivait le lieu mais ne construisait pas un parcours émotionnel de
  l'arrivée au départ ;
- les pages des suites restaient proches de fiches techniques ;
- le spa projeté ne racontait ni le sauna finlandais, ni le bain nordique, ni le
  cheminement nocturne par pas japonais éclairés ;
- la galerie annonçait encore que les visuels des suites seraient ajoutés plus
  tard, alors qu'ils sont désormais assumés comme projections ;
- le balisage structuré n'exposait pas le tarif confirmé et pointait l'URL de
  l'établissement vers la racine GitHub plutôt que vers le sous-répertoire du
  projet ;
- le seuil d'affichage de la navigation desktop était trop bas pour cinq entrées
  plus le bouton de contact.

## Repositionnement mis en œuvre

Le site articule désormais deux preuves complémentaires : le patrimoine réel
fonde la confiance ; les rendus photoréalistes montrent l'expérience visée après
travaux. Chaque projection reste identifiée de façon discrète et constante.

L'accueil suit un parcours complet : façade éclairée, maison habitée, choix de la
suite, arrivée au perron, dîner privatif, piscine naturelle, spa au jardin,
petit-déjeuner, histoire de Lucy et tarifs. Les pages Suites et Expérience
reprennent la même promesse avec davantage de profondeur.

La tarification publique est unifiée :

- 250 € la nuit pour une suite et deux personnes, petit-déjeuner inclus ;
- +50 € pour l'accès au spa, sur réservation ;
- +50 € par personne pour le dîner privatif à la table d'hôtes.

Le parcours bien-être présente l'intention d'ouverture : hammam, bain nordique,
sauna finlandais à habillage bois et liaisons par pas japonais bordés d'une
lumière basse. Aucun détail d'exploitation non décidé n'est présenté comme
acquis.

## Structure et contenus modifiés

- retour d'« Histoire » dans les navigations desktop et mobile ;
- nouvelle séquence immersive et nouveau bloc tarifaire sur l'accueil ;
- enrichissement des deux pages de suite et mise en avant des projections ;
- réécriture de la page Expérience autour des temps du séjour ;
- transformation de la galerie en récit mêlant état réel et projections ;
- ajout de six rendus finalisés : façade nuit, façade matin, perron, piscine à
  l'heure bleue, petit-déjeuner et accueil du spa ;
- mise à jour du Château, des métadonnées SEO et des données Schema.org ;
- correction du responsive de navigation et du positionnement mobile de la
  mention de projection.

## Contrôles réalisés

- `astro check` : 0 erreur, 0 avertissement, 0 indication ;
- build GitHub Pages avec Node.js 22 : 16 pages générées ;
- 578 références internes contrôlées : aucun lien ou asset manquant ;
- vérification des chemins avec le préfixe GitHub Pages ;
- contrôle des anciens prix et formulations obsolètes : aucune occurrence.

## Réserves et prochaines décisions

- confirmer que `contact@chateau-saintelucie.fr` est l'adresse publique
  définitive avant une campagne de communication ;
- remplacer les projections par les photographies finales prévues en mars 2027 ;
- photographier spécifiquement le sauna finlandais et le cheminement lumineux,
  aujourd'hui racontés mais non représentés par une vue dédiée ;
- arrêter les règles d'accès, capacités, horaires et conditions de vente lors de
  la conception du système de réservation ;
- traiter dans une phase distincte le calendrier consolidé, le paiement, le
  back-office, l'onboarding, le check-in/out et la réservation des options.
