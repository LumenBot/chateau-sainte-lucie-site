# Base de vérité partagée et simulateur v2

**Date :** 9 août 2026  
**Statut :** référentiel de travail courant  
**Audience :** associés, agents IA, conseils et futurs opérateurs

## 1. Architecture documentaire

Le projet utilise trois niveaux complémentaires :

1. **Cockpit humain** : conclusions, recommandations et paramètres manipulables dans `/demo/pilotage/`.
2. **Données machine** : fichiers datés de `public/knowledge/`, avec statuts, unités, formules et provenance.
3. **Sources brutes locales** : PDF, plans, passations et images hors du dépôt public lorsqu'ils sont sensibles ou trop volumineux.

L'interface principale ne présente pas les décisions obsolètes comme des options actives. La traçabilité utile est assurée par le catalogue des sources et l'explication des formules.

## 2. Statuts

- `validated` : choix de travail confirmé par Blaise ou les associés.
- `working_assumption` : valeur utile à la simulation, à recalibrer par devis ou exploitation.
- `external_validation_required` : point à faire confirmer par un professionnel ou une administration.

## 3. Simulateur

Le simulateur compare deux années :

- année 1 : gamme de lancement 180–220 €, prix moyen pondéré 198 € ;
- année 2 : gamme de consolidation 200–240 €, prix moyen pondéré 220 € ;
- volumes proposés : 90, 120, 150 ou 180 nuits vendues par suite ;
- deux suites, durée moyenne 2,1 nuits, 2,1 voyageurs moyens ;
- offres spa à 40, 50, 60 € ou panier moyen de carte signature à 74 € ;
- table à 40, 50 ou 60 € par personne, accord à 20, 30 ou 40 €, option romantique à 90 € par couple.

Le compte de résultat détaille hébergement, expériences, commissions, remise en état, petit-déjeuner, énergie, coûts directs, loyer SCI, emploi, relève et autres charges fixes. Il reste présenté avant impôt, TVA, dette et amortissements.

## 4. Emploi et capacité

Le montant de 30 k€ doit toujours être qualifié : brut, net ou budget employeur.

- référence simulée : 30 000 € brut annuel ;
- coût employeur central de travail : 40 500 € (coefficient provisoire 1,35) ;
- validation obligatoire : simulateur Urssaf et proposition de paie après choix du contrat et de la classification ;
- durée légale de référence : 1 607 h/an ;
- capacité utile de planification : 1 350 h/an, hypothèse interne conservant une réserve.

La charge est reconstruite par activité : rotations, petits-déjeuners, accueil/administration, spa, table, parc et maintenance générale. Même si le total annuel tient dans un ETP, une relève est nécessaire pour les week-ends, congés, absences et simultanéités.

Recommandation actuelle :

- 90 nuits/suite : 1 ETP et relève formalisée ;
- 120 nuits/suite : 1 ETP + 0,2 à 0,3 ETP ou sous-traitance ;
- 150 nuits/suite : 1 ETP + 0,4 à 0,6 ETP ou sous-traitance ;
- 180 nuits/suite : seconde force régulière ; étudier un deuxième ETP si la table est fortement utilisée.

## 5. Prochaines validations

1. Devis de paie et classification applicable.
2. Chronométrage de trois séjours à blanc en mars 2027.
3. Devis et commandes remplaçant le budget estimatif.
4. Prix OTA comparés sur des dates et conditions identiques.
5. Prévisionnel expert-comptable intégrant TVA, financement, amortissements et fiscalité.
