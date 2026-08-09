# 17 — Modèle économique et atelier des associés v1

Date : 9 août 2026  
Statut : base de discussion interne, non validée par l'expert-comptable

## 1. Décision de positionnement

La politique tarifaire doit être pilotée comme une trajectoire :

- **180 €** par nuit pour l'ouverture 2027, petit-déjeuner pour deux inclus ;
- **200 €** comme palier de consolidation après validation de l'expérience ;
- **230 €** comme objectif de maturité, conditionné par les photographies réelles,
  les avis, la demande, la qualité de service et les données de conversion.

Les deux suites restent vendues au même prix tant qu'aucune preuve commerciale ne
justifie une différenciation. Le revenu additionnel doit venir d'expériences à
forte valeur perçue et à capacité maîtrisée, pas d'un accès illimité sous-tarifé.

## 2. Ce qui est repris du business plan reçu

- deux suites de niveau comparable ;
- durée moyenne de travail de deux nuits ;
- enveloppe d'investissement initialement indicative de 50 000 €, désormais
  remplacée dans le simulateur par l'enveloppe corrigée de 65 000 € TTC de
  fournitures ;
- coûts du séjour type : 66 € par rotation, 7 € par petit-déjeuner et par personne,
  7,50 € d'énergie additionnelle par nuit-suite ;
- commission OTA de sensibilité à 15 % ;
- coût variable du pack spa à environ 28 % et du rituel Crémant à environ 31 % ;
- carte bien-être à la carte et packs comme piste commerciale ;
- 230 € conservé comme cible de maturité, pas comme prix public d'ouverture.

## 3. Corrections indispensables

### CA n'est pas résultat

Le scénario développé du document atteint environ 63,3 k€ de CA à 230 €, hors
dîner. Il ne finance pas automatiquement le loyer, le coût employeur, les frais
fixes, les commissions, la fiscalité, la dette et le temps familial.

Le raccourci partagé par Blaise est mathématiquement correct :

`(18 k€ de loyer + 30 k€ de coût employeur) / (1 - 30 %) = 68,6 k€ de CA`

Il ne devient toutefois réaliste que si :

1. les 30 % couvrent réellement tous les coûts variables ;
2. les 30 k€ représentent bien un coût employeur complet ;
3. assurance, comptabilité, logiciels, maintenance, commercialisation, énergie
   fixe et administration sont financés ailleurs ou intégrés aux 30 % ;
4. la dette, les impôts et les besoins de trésorerie sont traités séparément.

Avec une provision de travail de 8 k€ pour les autres frais fixes, 70 k€ est un
cap commercial pertinent mais pas encore un seuil d'équilibre garanti.

### 120 nuits doit être défini

Deux suites créent deux unités de capacité. Sur 275 jours ouverts :

- 120 nuits vendues **par suite** = 240 nuits-suite et 43,6 % d'occupation ;
- si les réservations sont totalement regroupées, la famille ressent 120 jours
  avec clients ;
- si elles sont totalement décalées, elle peut en ressentir jusqu'à 240.

Le comité doit donc voter deux objectifs : nuits-suite vendues et jours de présence
acceptables. La stratégie de calendrier peut regrouper les séjours afin de préserver
de vraies périodes sans hôtes.

## 4. Formules du simulateur

Pour deux suites :

- nuits-suite vendues = nuits vendues par suite × 2 ;
- séjours = nuits-suite vendues / durée moyenne ;
- CA hébergement = nuits-suite vendues × prix moyen ;
- CA expérience = séjours × taux d'achat × panier moyen, par famille d'options ;
- coût rotation = séjours × coût fixe de remise en état ;
- coût petit-déjeuner = nuits-suite × voyageurs moyens × coût unitaire ;
- commission OTA = CA hébergement × part OTA × taux de commission ;
- marge contributive = CA total − coûts variables ;
- solde d'exploitation = marge contributive − loyer − coût employeur − autres frais fixes.

Le retour simple de l'investissement est affiché uniquement si le solde est positif.
Il ne tient compte ni de la fiscalité ni du financement.

## 5. Architecture spa recommandée à instruire

La carte reçue est une meilleure base économique que l'accès uniforme actuel :

| Expérience | Prix de travail |
| --- | ---: |
| Bain nordique privatif | 45 € |
| Sauna finlandais privatif | 35 € |
| Bain + sauna | 65 € |
| Hammam | 35 € |
| Espace intérieur bien-être | 50 € |
| Expérience complète | 90 € |
| Soirée aux lanternes, Crémant | 59 € |
| Version Champagne | 79–89 € |

Avant publication, chaque ligne doit recevoir : durée, capacité, coût énergétique,
temps humain, protocole sanitaire, marge cible et règle de réservation. Le forfait
public de 40 € ne doit pas continuer à promettre implicitement jusqu'à huit heures
d'équipements par suite et par jour sans cette analyse.

## 6. Trois scénarios préchargés

### Prudence familiale

- 275 jours ouverts ;
- 80 nuits par suite ;
- 180 € par nuit ;
- 40 % de réservations directes ;
- prise modérée des expériences.

Ce scénario teste le quotidien, mais ne peut financer 18 k€ de loyer et un emploi
à temps plein. Il doit être assumé comme phase d'apprentissage ou accompagné d'un
calendrier de montée en charge et d'une trésorerie dédiée.

### Ouverture affirmée

- 110 nuits par suite ;
- 205 € par nuit ;
- 50 % de direct ;
- formule « Parc nordique » en progression.

Ce scénario installe la promesse premium mais reste une phase de montée en
charge non équilibrée avec un emploi complet et 18 k€ de loyer.

### Cible de consolidation

- 140 nuits par suite ;
- 225 € de prix moyen réalisé ;
- 60 % de direct ;
- prise croissante des expériences et de la table.

Le chiffre d'affaires approche 75 k€, mais le solde reste légèrement négatif
avec les provisions prudentes actuelles. Ce résultat confirme que 70 k€ est un
cap commercial et non un seuil d'équilibre garanti.

### Maturité premium

- 155 nuits par suite ;
- 235 € de prix moyen réalisé ;
- 70 % de direct ;
- meilleure prise des expériences.

Il constitue un objectif de développement, pas le budget d'ouverture.

## 7. Usage de la page en ligne

Route : `/demo/pilotage`

- exclue du sitemap et marquée `noindex, nofollow` ;
- non protégée par mot de passe sur GitHub Pages ;
- aucun détail bancaire, fiscal personnel ou patrimonial sensible ;
- hypothèses encodées dans le lien uniquement lorsque l'utilisateur clique sur
  « Copier ce scénario » ;
- aucune sauvegarde serveur ni collaboration en temps réel.

La version 2 de la page ajoute cinq onglets : synthèse, simulateur, marché,
investissements et plan directeur. L'initialisation ne dépend plus de l'ordre de
chargement du moteur commun du démonstrateur.

Une vraie zone privée nécessitera ultérieurement authentification, autorisations,
journalisation et hébergement adapté.

## 8. Prochaines données à obtenir

1. devis par investissement et propriétaire économique de chaque actif ;
2. coût employeur annuel complet et organisation du temps de Jules ;
3. assurance, comptabilité, PMS, paiement, maintenance et marketing ;
4. fiches techniques petit-déjeuner, table, vin et chaque expérience ;
5. calendrier exact d'ouverture et périodes sanctuarisées pour la famille ;
6. politique de regroupement des séjours ;
7. besoin en fonds de roulement et échéancier de dette ;
8. traitement TVA/fiscal validé par les conseils.
