import fs from "node:fs";
import {
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

assert(close(knowledge.concepts.seasonal_premium_table.calculated_results.total_variable_costs_ttc, scenarioBCentral.variableCosts), "Le JSON machine diverge des coûts variables de la page.");
assert(close(knowledge.concepts.seasonal_premium_table.calculated_results.cash_after_operating_company_principal_repayment, scenarioBCentral.operatingCompanyCashAfterPrincipalRepayment), "Le JSON machine diverge du solde B après remboursement du principal.");
assert(knowledge.shared_assumptions.financing.combined_annual_principal_repayment.value === 10000, "La base machine ne conserve pas 10 000 € de remboursement annuel sans intérêt.");
assert(!JSON.stringify(knowledge).toLowerCase().includes("interest"), "La base active des scénarios contient encore une notion d’intérêt.");

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
assert(close(knowledge.concepts.recommended_hybrid.recommended_reference_case.cash_after_property_rent_renewal_and_principal, hybridRecommendation.cashAfterPrincipalRepayment), "La base machine diverge du point de travail hybride.");

for (const marker of ["scenario-a", "scenario-b", "restauration", "hybride", "seuils", "operating-scenarios.json", "Aide à la décision"]) {
  assert(page.includes(marker), `La page comparative ne contient pas le marqueur attendu : ${marker}.`);
}

console.log(JSON.stringify({
  scenarioA: { revenue: scenarioA.publicRevenue, afterPrincipal: scenarioA.operatingCompanyCashAfterPrincipalRepayment },
  scenarioBCentral: { revenue: Math.round(scenarioBCentral.publicRevenue), afterPrincipal: Math.round(scenarioBCentral.operatingCompanyCashAfterPrincipalRepayment), hours: Math.round(scenarioBCentral.operationsHours) },
  scenarioBStretch: { revenue: Math.round(scenarioBStretch.publicRevenue), afterPrincipal: Math.round(scenarioBStretch.operatingCompanyCashAfterPrincipalRepayment), uncoveredHours: Math.round(scenarioBStretch.staffingGapHours) },
  hybridReference: { revenue: Math.round(hybridRecommendation.publicRevenue), afterPrincipal: Math.round(hybridRecommendation.cashAfterPrincipalRepayment), uncoveredHours: Math.round(hybridRecommendation.staffingGapHours) },
  theoreticalCeiling: theoreticalCoupleBasket.annualRevenueAtCapacity,
}, null, 2));
