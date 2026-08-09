# 13 — Itération corrective du site · août 2026

> Historique de l'itération du 8 août. La grille tarifaire et le wording ont été
> remplacés le 9 août 2026 par `docs/00-decisions-projet-v2.md`,
> `docs/07-referentiel-offre-et-regles-v3.md` et
> `docs/12-positionnement-tarifaire-et-valeur-v2.md`.

## Objet

Cette itération applique le brief familial d'août 2026 sans transformer la
maquette en outil de vente réel. Elle clarifie l'offre, renforce le récit
fondateur et donne la priorité à la constitution d'une liste d'attente.

## Décisions appliquées

- Tarif : 200 € par suite et par nuit pour deux adultes, petit-déjeuner inclus.
- Jusqu'à deux enfants : 50 € par nuit à partir de 6 ans, 25 € en dessous.
- La seconde pièce n'est ni mise en avant ni vendue à des adultes ; une
  configuration enfant est confirmée avant le séjour.
- Spa : 50 € par jour pour deux, puis 25 € par personne supplémentaire.
- Dîner au château : 50 € par adulte, 25 € de 3 à 11 ans ; moins de 3 ans sans
  menu individuel, accord mets et vins à 30 € par adulte.
- Arrivée à partir de 15 h, 14 h sur demande ; départ avant 12 h.
- Taxe de séjour en sus, sans montant inventé avant confirmation locale.
- Liste d'attente en action principale ; réservation fictive en action secondaire.
- Paiement de l'hébergement intégral à la réservation future ; options sur place.
- Politique prévisionnelle : remboursement intégral à plus de 30 jours, retenue
  de 30 % entre 30 et 15 jours, séjour dû à moins de 15 jours.

## Terminologie publique

La formulation « dîner au château » remplace provisoirement « dîner privatif —
table d'hôtes ». Elle évite de promettre un modèle de service avant validation
du régime applicable. Le terme « privatif » reste réservé aux suites et aux
équipements de spa occupés par une seule suite à la fois.

## Parcours de conversion

1. Le site invite d'abord à rejoindre la liste d'attente, sans paiement ni
   blocage de dates.
2. La contrepartie est une priorité d'information sur les premières dates, sans
   remise qui dégraderait le positionnement.
3. Le parcours de réservation reste accessible en démonstration.
4. Dans le tunnel, les dates, voyageurs, suite, options et coordonnées précèdent
   désormais le récapitulatif et le bouton de paiement fictif.
5. Les montants sont recalculés dans le navigateur à chaque changement.

## Transparence intégrée

- Demeure habitée par trois foyers d'une même famille ; appartements privatifs.
- Trois chiens présents dans le domaine, absents des suites et du spa.
- Animaux des hôtes non admis.
- Suites à l'étage, accessibles par escalier, sans ascenseur.
- Piscine naturelle ouverte aux mineurs accompagnés dans la simulation ; sauna,
  hammam et bain nordique à partir de 16 ans à titre provisoire.

## État de la collecte

La liste d'attente et le contact fonctionnent avec Web3Forms si la variable
`PUBLIC_WEB3FORMS_KEY` est fournie. Sans cette configuration, la maquette simule
explicitement l'envoi dans le navigateur et ne prétend pas transmettre les
données. Une collecte réelle et un processus de consentement doivent être
activés avant toute campagne publique.

## Sujets différés

- Réservation du domaine et activation de l'adresse e-mail.
- Validation mairie / services compétents du classement et de l'accessibilité.
- Validation assureur et fabricants des âges d'accès au spa.
- Choix et dimensions exactes des couchages enfants.
- Qualification du dîner, licence alcool et obligations d'hygiène.
- Société d'exploitation, médiateur, CGV définitives et politique RGPD validée.
- PMS, channel manager, paiement, taxe de séjour et réservation opérationnelle.
- Dépôt de marque et stratégie de repli du blason.
