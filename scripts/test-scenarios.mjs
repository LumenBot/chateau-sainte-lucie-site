import fs from "node:fs";
import {
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
assert(scenarioA.opcoCashAfterLoanService === -3414, "Le scénario A ne conserve pas le déficit OpCo après CCA de 3 414 €.");
assert(close(scenarioBCentral.publicRevenue, 41013), "Le chiffre d’affaires central du scénario B est incorrect.");
assert(close(scenarioBCentral.variableCosts, 11510.721), "Les coûts variables centraux du scénario B sont incorrects.");
assert(close(scenarioBCentral.opcoCashAfterLoanService, -20397.221), "La trésorerie centrale après CCA du scénario B est incorrecte.");
assert(close(scenarioBCentral.operationsHours, 1450.562143), "La charge humaine centrale du scénario B est incorrecte.");
assert(scenarioBCentral.staffingGapHours === 0, "Le scénario B central devrait être couvert avec une marge annuelle presque nulle.");
assert(close(scenarioBStretch.publicRevenue, 54376.245), "Le chiffre d’affaires du test de pleine capacité est incorrect.");
assert(close(scenarioBStretch.staffingGapHours, 108.7925), "Le déficit d’heures du test de pleine capacité est incorrect.");
assert(theoreticalCoupleBasket.extrasIncludingSpa === 270, "Les extras complets du couple ne valent pas 270 €.");
assert(theoreticalCoupleBasket.total === 470, "Le panier complet du couple ne vaut pas 470 €.");
assert(theoreticalCoupleBasket.annualRevenueAtCapacity === 59220, "Le plafond arithmétique annuel ne vaut pas 59 220 €.");
assert(seasonalBreakEven.averageBasketAtCapacityBeforeLoan > theoreticalCoupleBasket.total, "Le point mort avant CCA devrait dépasser le panier complet décrit.");

assert(close(knowledge.scenarios.B.calculated_variable_costs.total, scenarioBCentral.variableCosts), "Le JSON machine diverge des coûts variables de la page.");
assert(close(knowledge.scenarios.B.calculated_results.cash_after_operating_company_CCA_principal, scenarioBCentral.opcoCashAfterLoanService), "Le JSON machine diverge du solde B après CCA.");
assert(close(knowledge.scenario_B_full_capacity_stretch_test.total_public_sales_ttc, scenarioBStretch.publicRevenue), "Le test de pleine capacité diverge entre le JSON et la source de page.");
assert(knowledge.scenario_B_theoretical_couple_ceiling.extras_including_spa_ttc === 270, "Le JSON machine ne corrige pas les extras à 270 €.");

for (const marker of ["scenario-a", "scenario-b", "recommandation", "operating-scenarios.json", "Table d’hôtes oui"]) {
  assert(page.includes(marker), `La page comparative ne contient pas le marqueur attendu : ${marker}.`);
}

console.log(JSON.stringify({
  scenarioA: { revenue: scenarioA.publicRevenue, afterCca: scenarioA.opcoCashAfterLoanService },
  scenarioBCentral: { revenue: Math.round(scenarioBCentral.publicRevenue), afterCca: Math.round(scenarioBCentral.opcoCashAfterLoanService), hours: Math.round(scenarioBCentral.operationsHours) },
  scenarioBStretch: { revenue: Math.round(scenarioBStretch.publicRevenue), afterCca: Math.round(scenarioBStretch.opcoCashAfterLoanService), uncoveredHours: Math.round(scenarioBStretch.staffingGapHours) },
  theoreticalCeiling: theoreticalCoupleBasket.annualRevenueAtCapacity,
}, null, 2));
