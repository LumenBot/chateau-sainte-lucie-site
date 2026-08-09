# Intégration de la contre-analyse et simulateur d’exploitation v4

Date : 9 août 2026

Statut : **supplanté par `22-simulateur-v5-modele-lean-sous-contraintes.md`** ; conservé pour traçabilité

Remplace : les conclusions et formules du simulateur v3 documentées dans `20-simulateur-exploitation-equilibre-v3.md`

## 1. Verdict

La contre-analyse Claude améliore utilement le modèle sur trois sujets : les frais fixes, la continuité humaine et le traitement du loyer SCI. Elle confirme aussi que le scénario libre à 27,9 k€ de loyer résiduel était trop optimiste.

Elle ne peut toutefois pas être adoptée telle quelle. Deux affirmations sont matériellement erronées et plusieurs montants restent des hypothèses :

1. le seuil de TVA de 37,5 k€ ne s’applique pas indistinctement à toute l’activité de chambre d’hôtes ;
2. les 1 607 heures constituent déjà la référence annuelle légale de travail, congés intégrés dans sa construction ;
3. les 14–24 k€ de frais fixes sont une liste de diligence, pas un budget devisé ;
4. les 300–500 heures de relève sont une plage de planification plausible, pas une mesure ;
5. le seuil de 102 k€ TTC pour financer un plein temps et 10 k€ de loyer n’est pas reproductible avec tous les coûts annoncés. La plage recalculée est plutôt de 110 à 123 k€ TTC.

La conclusion économique de fond demeure : avec deux suites, financer simultanément un CDI plein temps pour Jules, une relève suffisante, le renouvellement, une réserve de trésorerie et un loyer significatif à la SCI paraît très difficile aux prix et volumes aujourd’hui démontrés.

## 2. Corrections de doctrine

### TVA

En 2026, la franchise en base utilise un seuil principal de 85 k€ et un seuil majoré de 93,5 k€ pour l’hébergement et les ventes à consommer sur place. En activité mixte, les prestations de services accessoires doivent également respecter leur sous-seuil. L’année de création, le chiffre d’affaires antérieur et une option volontaire modifient l’analyse.

Le simulateur propose donc deux modes :

- franchise : ventes TTC conservées, aucune TVA récupérée ;
- TVA au réel : hébergement simulé à 10 %, spa à 20 % à confirmer, table ventilée entre nourriture à 10 % et alcool à 20 %, avec récupération estimative sur les coûts éligibles.

Ce sélecteur n’est pas une qualification fiscale. L’expert-comptable devra modéliser la chronologie 2027–2029 et l’intérêt d’une option avant travaux.

### Temps de travail et continuité

Les 1 607 h restent la capacité légale annuelle par ETP. Le projet ne retranche plus artificiellement une deuxième fois les congés. En revanche, la capacité annuelle ne résout pas le calendrier : repos hebdomadaire, congés, maladie, pics et petits-déjeuners imposent une relève.

La v4 distingue :

- la charge totale estimée ;
- la capacité payée de Jules, proportionnelle à son ETP et à ses mois de contrat ;
- la relève rémunérée ;
- toute contribution familiale non rémunérée, obligatoirement saisie et affichée.

Le plancher de relève est porté entre 250 et 500 h selon le volume d’activité. Un planning hebdomadaire réel devra remplacer cette heuristique.

### Charges

La ligne générique « charges diverses » disparaît. Le budget central provisoire atteint 18 k€ TTC, ventilé sur onze postes : assurance, comptabilité/paie, PMS/site/télécom, acquisition, CFE/licences, banque, sécurité, maintenance technique, maintenance fixe du spa, eau/déchets/socle énergie, formation/prévention.

Chaque ligne doit encore recevoir :

- un devis ou une facture ;
- un responsable économique : OpCo, SCI ou partagé ;
- une règle de récupération de TVA ;
- une vérification de non-double-compte avec les coûts unitaires.

### Loyer SCI

Le loyer contractuel devient une entrée du modèle. Le résultat de l’OpCo redevient le résidu.

Le simulateur conserve une « capacité contributive maximale » comme indicateur secondaire, après emploi, relève, renouvellement et réserve. Elle n’est ni une valeur locative, ni une recommandation juridique, ni le montant à porter automatiquement dans le bail.

Une expertise de valeur locative et un arbitrage sur un loyer fixe ou binaire devront être conduits avec les conseils.

## 3. Trajectoire de référence

| Horizon | Nuits par suite | Prix moyen TTC | Vente directe | Spa | Table | Lecture |
|---|---:|---:|---:|---:|---:|---|
| 2027, avril–décembre | 75 | 195 € | 35 % | 50 % · 60 € | 30 % · 130 € | phase d’amorçage financée ; environ 34 k€ TTC |
| 2028 | 110 | 215 € | 45 % | 60 % · 75 € | 35 % · 150 € | consolidation ; environ 56,6 k€ TTC |
| 2029+ | 150 | 240 € | 55 % | 70 % · 85 € | 40 % · 170 € | cible exigeante ; environ 87,3 k€ TTC |

Le prix moyen de 240 € n’est pas compatible avec la grille publique de lancement 180–220 €. Il suppose une future grille culminant au-dessus de 240 €, des photographies réelles, des avis excellents et une demande prouvée.

## 4. Configuration soutenable proposée à deux suites

La configuration centrale du simulateur n’est pas le plein temps. Elle teste :

- 0,70 ETP de Jules financé par l’exploitation ;
- 400 h de relève rémunérée à 28 €/h ;
- 60 h d’aide familiale explicite ;
- 4 k€ de renouvellement ;
- 3 k€ de dotation annuelle à la trésorerie ;
- 0 € de loyer SCI au départ.

Cette configuration vise un équilibre serré à maturité. Elle doit être éprouvée, car 150 nuits par suite et 240 € de prix moyen sont déjà ambitieux.

Le projet familial souhaite idéalement financer un CDI plein temps pour Jules et réduire les contributions à la SCI. À activité identique, ce choix recrée un besoin de financement. Financer un plein temps et 10 k€ de loyer annuel demanderait environ 110 à 123 k€ TTC selon le couple prix/remplissage :

- 150 nuits/suite : prix moyen proche de 314 € ;
- prix moyen 300 € : environ 159 nuits/suite ;
- prix moyen 280 € : environ 173 nuits/suite ;
- prix moyen 240 € : environ 211 nuits/suite.

Ces combinaisons sont mathématiques, pas validées par le marché.

## 5. Conséquences stratégiques

### Plan d’exploitation recommandé

1. considérer 2027 comme une phase d’amorçage avec financement identifié du déficit ;
2. ne pas promettre immédiatement que l’OpCo financera le plein temps et le loyer ;
3. calibrer le CDI ou la mise à disposition de Jules en fonction des tâches réellement affectables à l’exploitation ;
4. contractualiser la relève avant l’ouverture ;
5. concentrer la table sur des soirs réservés et rentables, car elle consomme beaucoup d’heures ;
6. mesurer mensuellement prix net, marge par séjour, heures et jours de présence ;
7. réarbitrer l’ETP et le loyer après une saison réelle.

### Troisième unité

La troisième unité est une option structurante, pas une nécessité démontrée. Elle diluerait les coûts fixes mais créerait du CAPEX, des rotations et de la charge. L’inventaire exact doit aussi préserver, ou faire volontairement quitter, la limite de cinq chambres et quinze clients du régime chambre d’hôtes. Les deux suites semblent déjà agréger quatre chambres : une éventuelle troisième unité devrait être étudiée avec précision.

### Répartition SCI / OpCo

Jules doit assurer à terme une partie de l’entretien intérieur et extérieur du domaine. Toutes ces heures ne bénéficient pas nécessairement à l’activité commerciale. L’OpCo ne doit pas financer silencieusement le travail relevant des espaces privés ou de la conservation immobilière. Il faut :

- inventorier les tâches ;
- affecter chacune à l’exploitation, à la SCI ou aux résidents ;
- choisir un mécanisme juridique de refacturation ou de partage ;
- afficher séparément l’effort commercial et l’effort patrimonial.

## 6. Données à obtenir avant le budget définitif

- simulation Urssaf et devis de paie ;
- convention collective et classification applicables ;
- devis de relève à 25, 28 et 32 €/h ;
- devis ménage, linge et consommables ;
- coût réel de trois petits-déjeuners et trois menus ;
- mesures énergie/eau des équipements bien-être ;
- onze devis ou montants documentés de frais fixes ;
- qualification TVA et ventilation des taux ;
- valeur locative et clé de répartition SCI/OpCo ;
- trésorerie mensuelle 2026–2028, dette et amortissements ;
- trois séjours à blanc chronométrés ;
- planning hebdomadaire intégrant repos, congés et astreintes.

## 7. Modifications réalisées dans l’environnement

- simulateur web v4 avec deux scénarios seulement ;
- ventes TTC, produit comptable et TVA nette estimée ;
- budget fixe détaillé ;
- emploi en ETP, relève et effort familial ;
- loyer contractuel saisi et capacité contributive séparée ;
- compte d’exploitation puis emplois de trésorerie ;
- trajectoire 2027–2029+ ;
- alerte sur l’objectif plein temps + 10 k€ de loyer ;
- `business-model.json` version 3.0 ;
- sources officielles et contre-analyse cataloguées.

## 8. Sources officielles principales

- Impôts — TVA et seuils 2026 : <https://www.impots.gouv.fr/professionnel/tva>
- Impôts — activités mixtes : <https://www.impots.gouv.fr/professionnel/questions/en-tant-que-micro-entrepreneur-puis-je-etre-redevable-de-la-tva>
- Service Public — chambres d’hôtes : <https://www.service-public.fr/particuliers/vosdroits/F17452>
- Service Public — durée légale annuelle : <https://www.service-public.fr/particuliers/vosdroits/F1911>
- Service Public — repos hebdomadaire : <https://www.service-public.fr/particuliers/vosdroits/F2327>
- Urssaf — simulateur employeur : <https://mon-entreprise.urssaf.fr/simulateurs/salaire-brut-net?view=employeur>

Toutes les conclusions fiscales, sociales, juridiques et comptables demeurent soumises à validation professionnelle.
