# 10 — Brief de consultation PMS et channel manager v1

Date : 8 août 2026

Ce document peut être transmis à eviivo, Amenitiz ou tout autre candidat afin
d'obtenir une démonstration comparable et un devis complet. Il ne vaut ni
engagement ni commande.

## Objet de la consultation

La société commerciale d'exploitation des Nuits au Château recherche un socle
PMS, channel manager, moteur de réservation et paiement pour l'ouverture en avril
2027 de deux suites haut de gamme au Château de Sainte-Lucie, à Rambervillers.

Le site vitrine existe déjà sous Astro. Il doit être conservé et relié au moteur
de réservation du fournisseur. Un portail client et un cockpit gestionnaire
spécifiques seront développés au moyen des API et webhooks du socle retenu.

## Établissement et inventaire

- Deux suites : Lumière et Feuillage.
- Chaque suite est une unité indivisible.
- Capacité : un ou deux adultes et jusqu'à deux enfants par suite ; la formule
  n'est pas vendue à quatre adultes.
- Tarif d'ouverture 2027 : 180 € la nuit pour un ou deux adultes.
- Chaque enfant : 20 € par nuit, petit-déjeuner inclus.
- Petit-déjeuner compris.
- Vente directe, Airbnb, Booking et futurs canaux touristiques.
- Langues : français et anglais.

## Parcours de paiement

- Paiement intégral de l'hébergement à la réservation directe.
- Options confirmées pendant l'onboarding et payées sur place.
- Préautorisation recommandée de 500 € autour de l'arrivée.
- Gestion des cartes virtuelles et paiements provenant des OTA.
- Remboursements complets ou partiels selon la politique d'annulation.
- Rapprochement des commissions, paiements, extras et taxes.

## Services complémentaires

- Forfait spa : 40 € par suite et par jour pour un ou deux occupants, puis 20 €
  par personne supplémentaire et par jour.
- Déjeuner ou dîner : 40 € par adulte, 20 € par enfant de 3 à 11 ans.
- Accord mets et vins : 20 € par adulte, comme option du repas.
- Privatisation de piscine : 50 € pour deux heures.
- Autres boissons et services ajoutés au dossier de séjour.
- Les options doivent être visibles sur la facture et dans les exports.

Le planning détaillé des équipements sera géré par notre portail, mais le PMS
doit permettre de lire et écrire les suppléments et leur statut financier.

## Fonctionnalités indispensables

1. synchronisation bidirectionnelle temps réel avec Airbnb et Booking ;
2. moteur de réservation intégrable à un site existant ;
3. règles d'occupation et suppléments selon l'âge ;
4. paiement en ligne, remboursement et préautorisation ;
5. ventes additionnelles et paiement différé ;
6. facturation, taxe de séjour et rapprochement OTA ;
7. API et webhooks pour réservations, paiements, factures et suppléments ;
8. environnement de test ;
9. export complet et documenté des données ;
10. assistance en français.

## Démonstration demandée

Merci de montrer dans votre environnement :

1. la création des deux suites ;
2. le mapping avec Airbnb et Booking ;
3. une réservation de Lumière pour deux adultes et deux enfants de 4 et 8 ans ;
4. le calcul de 220 € par nuit hors taxe de séjour ;
5. le paiement intégral de l'hébergement ;
6. l'ajout d'un spa à 80 € pour quatre occupants et d'un repas enfant à 20 € payables sur place ;
7. la programmation d'une garantie de 500 € ;
8. une modification, une annulation et un remboursement partiel ;
9. les webhooks ou événements API produits ;
10. l'export du dossier, des lignes financières et des paiements.

## Informations attendues dans le devis

Merci de distinguer :

- abonnement mensuel et annuel pour deux suites ;
- frais de mise en service et de migration ;
- channel manager et nombre de connexions compris ;
- moteur de réservation et domaine personnalisé ;
- paiement, préautorisation, remboursement et frais par transaction ;
- accès API, webhooks, sandbox et accompagnement développeur ;
- utilisateurs et droits ;
- communications e-mail, SMS et WhatsApp ;
- facturation et reporting ;
- support, formation et niveau de service ;
- options recommandées mais non indispensables ;
- engagement, résiliation et export de sortie ;
- montants HT, TVA et coût TTC estimé.

## Questions techniques

- Les API permettent-elles de créer et modifier un supplément rattaché à une
  réservation ?
- Permettent-elles de lire les factures, paiements, remboursements et commissions ?
- Quels webhooks sont disponibles et comment sont-ils sécurisés et rejoués ?
- Quelles limites et politiques de versionnement s'appliquent ?
- Le portail peut-il créer un lien de paiement sécurisé pour un client OTA ?
- Peut-on ajouter dans les messages OTA un lien personnel vers notre portail ?
- Quelles données clients sont réellement disponibles selon chaque canal ?
- Le moteur accepte-t-il des paramètres préremplis depuis une page de suite ?
- Quelles solutions de secours existent en cas de panne ou désynchronisation ?

## Données, sécurité et réversibilité

Merci de fournir :

- lieu d'hébergement des données ;
- accord de traitement des données et liste des sous-traitants ;
- certifications et mesures de sécurité ;
- gestion des droits et authentification forte ;
- sauvegarde, disponibilité et reprise d'activité ;
- formats d'export et procédure de récupération complète ;
- politique de conservation après résiliation.

## Calendrier souhaité

- démonstrations et devis : août–septembre 2026 ;
- choix et contractualisation : septembre 2026 ;
- configuration : septembre–octobre 2026 ;
- intégration et tests : octobre 2026–mars 2027 ;
- ouverture : avril 2027.

## Réponse attendue

La réponse doit distinguer clairement :

- disponible nativement ;
- disponible avec paramétrage ;
- disponible par API ;
- nécessite un partenaire ;
- non disponible ;
- prévu mais non encore livré.

Toute limitation liée à Airbnb, Booking, au pays d'exploitation ou au nombre de
suites doit être explicitée.
