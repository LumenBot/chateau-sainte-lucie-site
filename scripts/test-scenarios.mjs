import fs from "node:fs";
import {
  ambitiousConsolidation,
  ambitiousBalancedAllocation,
  ambitiousHighRentStress,
  ambitiousLowerActivity,
  ambitiousReference,
  ambitiousSixYearRepayment,
  ambitiousTwoSuiteCounterfactual,
  calculateAmbitiousScenario,
  hybridActivityCases,
  hybridRecommendation,
  scenarioA,
  scenarioBCentral,
  scenarioBStretch,
  seasonalBreakEven,
  theoreticalCoupleBasket,
} from "../src/data/operatingScenarios.mjs";

const page = fs.readFileSync(new URL("../src/pages/demo/scenarios.astro", import.meta.url), "utf8");
const knowledge = JSON.parse(fs.readFileSync(new URL("../public/knowledge/operating-scenarios.json", import.meta.url), "utf8"));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const close = (actual, expected, tolerance = 0.01) => Math.abs(actual - expected) <= tolerance;

assert(scenarioA.publicRevenue === 60000, "Le scénario A ne conserve pas les 60 000 € de ventes TTC.");
assert(scenarioA.operatingCompanyCashAfterPrincipalRepayment === -2764, "Le scénario A ne conserve pas le déficit de 2 764 € après remboursement du principal.");
assert(close(scenarioBCentral.publicRevenue, 41013), "Le chiffre d’affaires central du scénario B est incorrect.");
assert(close(scenarioBCentral.variableCosts, 11510.721), "Les coûts variables centraux du scénario B sont incorrects.");
assert(close(scenarioBCentral.operatingCompanyCashAfterPrincipalRepayment, -19747.721), "La trésorerie centrale après remboursement du principal du scénario B est incorrecte.");
assert(close(scenarioBCentral.operationsHours, 1450.562143), "La charge humaine centrale du scénario B est incorrecte.");
assert(scenarioBCentral.staffingGapHours === 0, "Le scénario B central devrait être couvert avec une marge annuelle presque nulle.");
assert(close(scenarioBStretch.publicRevenue, 54376.245), "Le chiffre d’affaires du test de pleine capacité est incorrect.");
assert(close(scenarioBStretch.staffingGapHours, 108.7925), "Le déficit d’heures du test de pleine capacité est incorrect.");
assert(theoreticalCoupleBasket.extrasIncludingSpa === 270, "Les extras complets du couple ne valent pas 270 €.");
assert(theoreticalCoupleBasket.total === 470, "Le panier complet du couple ne vaut pas 470 €.");
assert(theoreticalCoupleBasket.annualRevenueAtCapacity === 59220, "Le plafond arithmétique annuel ne vaut pas 59 220 €.");
assert(seasonalBreakEven.averageBasketAtCapacityAfterPrincipalRepayment > theoreticalCoupleBasket.total, "Le point mort après remboursement du principal devrait dépasser le panier complet décrit.");

assert(knowledge.schema_version === "5.0", "Le schéma machine du modèle unifié n’est pas à jour.");
assert(knowledge.guest_house_scope.suite_count.value === 3, "La base machine ne conserve pas trois suites.");
assert(knowledge.shareholder_current_account_financing.total_works_and_installation_envelope_ttc === 80000, "La base machine ne conserve pas l’enveloppe totale de 80 000 €.");
assert(knowledge.shareholder_current_account_financing.funding_sources.previously_modelled_interest_free_shareholder_current_accounts === 50000, "Le socle de 50 000 € diverge.");
assert(knowledge.shareholder_current_account_financing.funding_sources.additional_interest_free_shareholder_current_account_for_maisonnette === 30000, "L’avance supplémentaire de 30 000 € diverge.");
assert(knowledge.shareholder_current_account_financing.funding_sources.other_funding_sources === 0, "Une ressource extérieure ne doit pas apparaître dans le scénario C.");
assert(knowledge.shareholder_current_account_financing.repayment_convention.interest_rate === 0, "Les comptes courants ne doivent pas porter intérêt dans la simulation.");

const expectedHybrid = [
  [60, 34230, -1642.41, 983.5],
  [90, 51345, 611.385, 677.8],
  [120, 68460, -2434.82, 111.4],
  [150, 85575, 2143.975, 0],
];
expectedHybrid.forEach(([nights, revenue, cash, gap], index) => {
  const item = hybridActivityCases[index];
  assert(item.soldNightsPerSuite === nights, `Le palier hybride ${nights} nuits est absent.`);
  assert(close(item.publicRevenue, revenue), `Les ventes du palier hybride ${nights} nuits divergent.`);
  assert(close(item.cashAfterPrincipalRepayment, cash), `Le solde du palier hybride ${nights} nuits diverge.`);
  assert(close(item.staffingGapHours, gap), `Le besoin humain du palier hybride ${nights} nuits diverge.`);
});
assert(hybridRecommendation.soldNightsPerSuite === 140 && hybridRecommendation.averageNightPrice === 205, "Le point de travail hybride 140 nuits / 205 € n’est pas conservé.");
assert(close(hybridRecommendation.cashAfterPrincipalRepayment, 449.41), "Le solde du point de travail hybride est incorrect.");
assert(knowledge.superseded_references.two_suite_concept_comparison.includes("24-comparatif"), "Le comparatif à deux suites doit rester identifié comme historique.");

assert(ambitiousReference.suiteCount === 3, "Le scénario ambitieux ne conserve pas trois suites.");
assert(ambitiousReference.soldNightsPerSuite === 150, "Le scénario ambitieux ne conserve pas 150 nuits par suite.");
assert(close(ambitiousReference.averageNightPrice, 210), "Le prix moyen commun aux trois suites est incorrect.");
assert(close(ambitiousReference.publicRevenueTtc, 132862.5), "Les ventes TTC du scénario ambitieux sont incorrectes.");
assert(close(ambitiousReference.accountingRevenue, 119057.386364), "Le produit comptable du scénario ambitieux est incorrect.");
assert(close(ambitiousReference.operationsHours, 2705.058594), "La charge humaine du scénario ambitieux est incorrecte.");
assert(ambitiousReference.paidReliefHours === 1175, "La relève prudente du scénario ambitieux doit être de 1 175 h.");
assert(ambitiousReference.baselineShareholderAdvancePrincipal === 50000, "Le socle de comptes courants du modèle diverge.");
assert(ambitiousReference.thirdSuiteAdditionalAdvancePrincipal === 30000, "L’avance Maisonnette du modèle diverge.");
assert(ambitiousReference.totalShareholderAdvancePrincipal === 80000, "Le principal total des comptes courants diverge.");
assert(ambitiousReference.annualShareholderAdvanceRepayment === 16000, "La cible annuelle totale de remboursement diverge.");
assert(close(ambitiousReference.operatingCompanyAnnualPrincipalRepayment, 3000), "Le remboursement annuel de l’exploitation est incorrect.");
assert(close(ambitiousReference.sciAnnualPrincipalRepayment, 13000), "Le remboursement annuel de la SCI est incorrect.");
assert(close(ambitiousReference.operatingCompanyCashAfterShareholderAdvanceRepayment, 5044.967089), "La trésorerie finale de l’exploitation est incorrecte.");
assert(close(ambitiousReference.sciCashBeforeExistingCommitments, -1000), "La tension de trésorerie de la SCI est incorrecte.");
assert(close(ambitiousReference.cashAfterShareholderAdvanceRepayment, 4044.967089), "La trésorerie consolidée après remboursement est incorrecte.");
assert(close(ambitiousReference.coverageOfShareholderAdvanceRepayment, 1.25281), "La couverture simplifiée des comptes courants est incorrecte.");
assert(close(knowledge.active_reference.calculated_results.total_public_sales_ttc, ambitiousReference.publicRevenueTtc), "La base machine diverge des ventes du modèle à trois suites.");
assert(close(knowledge.active_reference.calculated_results.estimated_operations_hours, ambitiousReference.operationsHours), "La base machine diverge de la charge humaine du modèle à trois suites.");
assert(close(knowledge.shareholder_current_account_financing.reference_cash_by_entity.operating_company_cash_after_3000_principal_repayment, ambitiousReference.operatingCompanyCashAfterShareholderAdvanceRepayment), "La trésorerie d’exploitation diverge dans la base machine.");
assert(close(knowledge.shareholder_current_account_financing.reference_cash_by_entity.property_company_cash_after_13000_principal_repayment_before_existing_costs, ambitiousReference.sciCashBeforeExistingCommitments), "La trésorerie SCI diverge dans la base machine.");
assert(close(knowledge.shareholder_current_account_financing.reference_cash_by_entity.consolidated_cash_after_16000_principal_repayment, ambitiousReference.cashAfterShareholderAdvanceRepayment), "Le solde consolidé diverge dans la base machine.");
assert(ambitiousLowerActivity.cashAfterShareholderAdvanceRepayment < 0 && ambitiousLowerActivity.coverageOfShareholderAdvanceRepayment < 1, "Le cas 140 nuits / 205 € ne doit pas couvrir les comptes courants sur cinq ans.");
assert(close(ambitiousBalancedAllocation.sciCashBeforeExistingCommitments, 0), "La répartition 60/20 devrait aligner la SCI sur le loyer de 12 k€.");
assert(ambitiousHighRentStress.operatingCompanyCashAfterShareholderAdvanceRepayment < 0, "Le loyer immédiat de 18 k€ devrait fragiliser l’exploitation.");
assert(ambitiousConsolidation.cashAfterShareholderAdvanceRepayment > ambitiousReference.cashAfterShareholderAdvanceRepayment, "Le cas 160 nuits devrait améliorer la marge.");
assert(ambitiousSixYearRepayment.cashAfterShareholderAdvanceRepayment > ambitiousReference.cashAfterShareholderAdvanceRepayment, "L’étalement à six ans devrait améliorer la trésorerie annuelle.");
assert(ambitiousTwoSuiteCounterfactual.suiteCount === 2, "Le contre-factuel doit conserver deux suites.");
assert(close(ambitiousTwoSuiteCounterfactual.publicRevenueTtc, 88575), "Les ventes du contre-factuel à deux suites divergent.");
assert(close(ambitiousTwoSuiteCounterfactual.cashAfterShareholderAdvanceRepayment, -1895.021941), "Le solde du contre-factuel à deux suites diverge.");
assert(close(ambitiousReference.cashAfterShareholderAdvanceRepayment - ambitiousTwoSuiteCounterfactual.cashAfterShareholderAdvanceRepayment, 5939.98903), "L’effet économique isolé de la Maisonnette diverge.");
let interestBearingAdvanceRejected = false;
try {
  calculateAmbitiousScenario({ shareholderAdvanceInterestRate: 0.01 });
} catch {
  interestBearingAdvanceRejected = true;
}
assert(interestBearingAdvanceRejected, "Le scénario C ne doit pas accepter de comptes courants portant intérêt.");

for (const marker of ["scenario-a", "scenario-b", "scenario-c", "contexte", "comparaison", "recommandation", "Maisonnette", "operating-scenarios.json", "Aide à la décision"]) {
  assert(page.includes(marker), `La page comparative ne contient pas le marqueur attendu : ${marker}.`);
}

console.log(JSON.stringify({
  scenarioA: { revenue: scenarioA.publicRevenue, afterPrincipal: scenarioA.operatingCompanyCashAfterPrincipalRepayment },
  scenarioBCentral: { revenue: Math.round(scenarioBCentral.publicRevenue), afterPrincipal: Math.round(scenarioBCentral.operatingCompanyCashAfterPrincipalRepayment), hours: Math.round(scenarioBCentral.operationsHours) },
  scenarioBStretch: { revenue: Math.round(scenarioBStretch.publicRevenue), afterPrincipal: Math.round(scenarioBStretch.operatingCompanyCashAfterPrincipalRepayment), uncoveredHours: Math.round(scenarioBStretch.staffingGapHours) },
  hybridReference: { revenue: Math.round(hybridRecommendation.publicRevenue), afterPrincipal: Math.round(hybridRecommendation.cashAfterPrincipalRepayment), uncoveredHours: Math.round(hybridRecommendation.staffingGapHours) },
  ambitiousReference: { revenueTtc: Math.round(ambitiousReference.publicRevenueTtc), accountingRevenue: Math.round(ambitiousReference.accountingRevenue), consolidatedCash: Math.round(ambitiousReference.cashAfterShareholderAdvanceRepayment), paidReliefHours: ambitiousReference.paidReliefHours },
  ambitiousTwoSuiteCounterfactual: { revenueTtc: Math.round(ambitiousTwoSuiteCounterfactual.publicRevenueTtc), consolidatedCash: Math.round(ambitiousTwoSuiteCounterfactual.cashAfterShareholderAdvanceRepayment) },
  theoreticalCeiling: theoreticalCoupleBasket.annualRevenueAtCapacity,
}, null, 2));
