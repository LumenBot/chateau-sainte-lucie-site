import fs from "node:fs";
import vm from "node:vm";

const astro = fs.readFileSync(new URL("../src/pages/demo/pilotage.astro", import.meta.url), "utf8");
const source = fs.readFileSync(new URL("../public/demo/pilotage.js", import.meta.url), "utf8");

const makeNode = (value = "") => ({
  value,
  textContent: "",
  innerHTML: "",
  hidden: false,
  checked: false,
  style: {},
  dataset: {},
  className: "",
  classList: { toggle() {}, add() {}, remove() {} },
  setAttribute() {},
  addEventListener(type, handler) {
    this.listeners ||= {};
    this.listeners[type] ||= [];
    this.listeners[type].push(handler);
  },
  appendChild() {},
});

const fields = [];
for (const match of astro.matchAll(/<input\s+([^>]+)>/g)) {
  const attrs = match[1];
  const name = attrs.match(/name="([^"]+)"/)?.[1];
  if (!name) continue;
  const value = attrs.match(/value="([^"]*)"/)?.[1] || "";
  const min = attrs.match(/min="([^"]*)"/)?.[1];
  const max = attrs.match(/max="([^"]*)"/)?.[1];
  fields.push({ ...makeNode(value), name, min, max });
}
for (const match of astro.matchAll(/<select\s+name="([^"]+)"[^>]*>([\s\S]*?)<\/select>/g)) {
  const [, name, body] = match;
  const selected = body.match(/<option\s+value="([^"]+)"[^>]*selected/)?.[1] || body.match(/<option\s+value="([^"]+)"/)?.[1] || "";
  fields.push({ ...makeNode(selected), name });
}

const form = makeNode();
form.elements = fields;
form.elements.namedItem = (name) => fields.find((field) => field.name === name) || null;

const nodes = new Map();
const outputs = new Map();
const declaredOutputs = new Set(Array.from(astro.matchAll(/data-output="([^"]+)"/g), (match) => match[1]));
const getNode = (selector) => {
  if (!nodes.has(selector)) nodes.set(selector, makeNode());
  return nodes.get(selector);
};
const marketScope = makeNode("vosges");
const competitorSelect = makeNode("0");
competitorSelect.appendChild = () => {};
const scenarioTabs = ["socle", "saisonnier", "libre"].map((scenarioTab) => ({ ...makeNode(), dataset: { scenarioTab } }));
const simpleDiningLabels = ["diningTake", "diningDailyPrice", "diningLaborHours"].map((name) => ({ ...makeNode(), querySelector() { return form.elements.namedItem(name); } }));
const tableDiningLabels = ["lunchTake", "lunchPrice", "dinnerTake", "dinnerPrice", "pairingTake", "pairingPrice", "barTake", "barBasket", "lunchLaborHours", "dinnerLaborHours", "barLaborHours"].map((name) => ({ ...makeNode(), querySelector() { return form.elements.namedItem(name); } }));
const historyUrls = [];

globalThis.document = {
  readyState: "complete",
  querySelector(selector) {
    if (selector === "[data-pilotage-form]") return form;
    if (selector === "[data-market-scope]") return marketScope;
    if (selector === "[data-competitor-select]") return competitorSelect;
    return getNode(selector);
  },
  querySelectorAll(selector) {
    const outputName = selector.match(/^\[data-output="([^"]+)"\]$/)?.[1];
    if (outputName) {
      if (!declaredOutputs.has(outputName)) return [];
      if (!outputs.has(outputName)) outputs.set(outputName, makeNode());
      return [outputs.get(outputName)];
    }
    if (selector === "[data-scenario-tab]") return scenarioTabs;
    if (selector === "[data-simple-dining]") return simpleDiningLabels;
    if (selector === "[data-table-dining]") return tableDiningLabels;
    return [];
  },
  createElement() { return makeNode(); },
};

globalThis.localStorage = { getItem() { return null; }, setItem() {} };
let copiedUrl = "";
Object.defineProperty(globalThis, "navigator", { value: { clipboard: { async writeText(value) { copiedUrl = value; } } }, configurable: true });
globalThis.window = {
  alert() {},
  prompt() {},
  scrollTo() {},
  history: { replaceState(_state, _title, url) { historyUrls.push(url); } },
  location: { search: "", hash: "", origin: "https://example.test", pathname: "/demo/pilotage/" },
};

vm.runInThisContext(source, { filename: "pilotage.js" });

const normalized = (value) => String(value || "").replace(/[\s\u00a0\u202f]/g, "");
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const trigger = async (node, type = "click") => {
  for (const handler of node.listeners?.[type] || []) await handler({ target: node });
};

for (const field of fields) field.value = "__sentinel__";
await trigger(scenarioTabs.find((button) => button.dataset.scenarioTab === "socle"));
assert(fields.every((field) => field.value !== "__sentinel__"), "Le scénario socle n’alimente pas tous les champs du formulaire.");

assert(normalized(outputs.get("revenue-ttc")?.textContent).includes("60000€"), "Les ventes TTC du scénario socle ne valent pas 60 000 €.");
assert(form.elements.namedItem("spaDailyPrice").value === "50" && normalized(outputs.get("tariff-spa")?.textContent).includes("50€"), "Le scénario socle ne conserve pas le spa à 50 € par suite et par jour.");
assert(normalized(outputs.get("support-hours")?.textContent).startsWith("100h"), "La relève budgétée du scénario socle ne vaut pas 100 h.");
assert(outputs.get("support-gap")?.textContent?.includes("couverture déclarée"), "Le scénario socle ne couvre pas les heures estimées.");
assert(outputs.get("cash-result")?.textContent && outputs.get("cash-result")?.textContent !== "—", "Le solde annuel ne s’affiche pas.");
assert(normalized(outputs.get("operating-company-after-loan")?.textContent).includes("−2764€") || normalized(outputs.get("operating-company-after-loan")?.textContent).includes("-2764€"), "La trésorerie de la société d’exploitation après remboursement du principal n’affiche pas le déficit attendu.");
assert(getNode("[data-pnl]").innerHTML.includes("Hypothèse de loyer SCI"), "Le loyer SCI testé manque dans le compte d’exploitation.");
assert(getNode("[data-financing]").innerHTML.includes("Avance d’associé à la SCI"), "Le financement des avances d’associés ne s’affiche pas.");
assert(getNode("[data-workload]").innerHTML.includes("Décomposition du temps annuel"), "La décomposition de charge ne s’affiche pas.");

for (const field of fields) field.value = "__sentinel__";
await trigger(scenarioTabs.find((button) => button.dataset.scenarioTab === "saisonnier"));
assert(fields.every((field) => field.value !== "__sentinel__"), "Le scénario saisonnier n’alimente pas tous les champs du formulaire.");
assert(form.elements.namedItem("sellableNightsPerSuite").value === "63", "La capacité saisonnière n’est pas fixée à 63 nuits par suite.");
assert(form.elements.namedItem("nightsPerSuite").value === "54", "Le scénario saisonnier central ne charge pas 54 nuits vendues par suite.");
assert(form.elements.namedItem("diningMode").value === "table", "Le scénario saisonnier n’active pas la table d’hôtes détaillée.");
assert(form.elements.namedItem("spaDailyPrice").value === "60" && normalized(outputs.get("tariff-spa")?.textContent).includes("60€"), "Le scénario saisonnier ne charge pas le spa à 60 € par suite et par jour.");
assert(normalized(outputs.get("revenue-ttc")?.textContent).includes("41013€"), "Le scénario saisonnier central ne calcule pas 41 013 € de ventes TTC.");
assert(historyUrls.at(-1)?.includes("?scenario=saisonnier#simulateur"), "Le scénario saisonnier n’est pas reflété dans l’URL.");
await trigger(scenarioTabs.find((button) => button.dataset.scenarioTab === "socle"));

const rerender = (target = form) => {
  for (const handler of form.listeners?.input || []) handler({ target });
};
const changeAndRender = (target = form) => {
  for (const handler of form.listeners?.change || []) handler({ target });
};
const fingerprint = () => [
  ...Array.from(outputs.entries()).filter(([key]) => key !== "scenario-name").map(([key, node]) => `${key}:${node.textContent}`),
  getNode("[data-pnl]").innerHTML,
  getNode("[data-workload]").innerHTML,
  getNode("[data-financing]").innerHTML,
].join("|");

const tableOnlyNames = ["lunchTake", "lunchPrice", "dinnerTake", "dinnerPrice", "pairingTake", "pairingPrice", "barTake", "barBasket", "lunchLaborHours", "dinnerLaborHours", "barLaborHours"];
const simpleOnlyNames = ["diningTake", "diningDailyPrice", "diningLaborHours"];
const assertNumericFieldsInfluence = (excludedNames) => {
for (const field of fields.filter((item) => !excludedNames.includes(item.name))) {
  if (!/^[-+]?\d/.test(field.value)) continue;
  const initial = field.value;
  const before = fingerprint();
  const step = Number(astro.match(new RegExp(`name="${field.name}"[^>]*step="([^"]+)"`))?.[1] || 1);
  const max = Number(astro.match(new RegExp(`name="${field.name}"[^>]*max="([^"]+)"`))?.[1] || Number.POSITIVE_INFINITY);
  field.value = String(Number(initial) + step <= max ? Number(initial) + step : Number(initial) - step);
  rerender(field);
  assert(fingerprint() !== before, `Le champ ${field.name} ne modifie aucun résultat visible.`);
  field.value = initial;
  rerender(field);
}
};
assertNumericFieldsInfluence(["diningAlcoholShare", "fixedVatRecovery", ...tableOnlyNames]);

await trigger(scenarioTabs.find((button) => button.dataset.scenarioTab === "saisonnier"));
assertNumericFieldsInfluence(["diningAlcoholShare", "fixedVatRecovery", ...simpleOnlyNames]);
await trigger(scenarioTabs.find((button) => button.dataset.scenarioTab === "socle"));

const diningMode = form.elements.namedItem("diningMode");
const diningModeBefore = fingerprint();
diningMode.value = "table";
changeAndRender(diningMode);
assert(fingerprint() !== diningModeBefore, "Le format de restauration ne modifie aucun résultat visible.");
const tableOnlyRevenue = outputs.get("revenue-ttc")?.textContent;
diningMode.value = "hybrid";
changeAndRender(diningMode);
assert(outputs.get("revenue-ttc")?.textContent !== tableOnlyRevenue, "Le mode hybride n’additionne pas le garde-manger et la table d’hôtes.");
assert([...simpleDiningLabels, ...tableDiningLabels].every((label) => !label.querySelector()?.disabled), "Le mode hybride n’active pas simultanément les deux groupes de paramètres.");
await trigger(scenarioTabs.find((button) => button.dataset.scenarioTab === "socle"));

const supportMode = form.elements.namedItem("supportMode");
const supportModeBefore = fingerprint();
supportMode.value = "parttime";
rerender(supportMode);
assert(fingerprint() !== supportModeBefore, "Le mode de relève ne modifie aucun résultat visible.");
supportMode.value = "subcontract";
rerender(supportMode);

const vatMode = form.elements.namedItem("vatMode");
const vatBefore = fingerprint();
vatMode.value = "vat";
rerender(vatMode);
assert(fingerprint() !== vatBefore, "Le régime de TVA ne modifie aucun résultat visible.");
for (const name of ["diningAlcoholShare", "fixedVatRecovery"]) {
  const field = form.elements.namedItem(name);
  const before = fingerprint();
  field.value = String(Number(field.value) + 1);
  rerender(field);
  assert(fingerprint() !== before, `Le champ TVA ${name} ne modifie aucun résultat visible au réel.`);
  field.value = name === "diningAlcoholShare" ? "50" : "0";
  rerender(field);
}
vatMode.value = "franchise";
rerender(vatMode);

const plannedSupport = form.elements.namedItem("plannedSupportHours");
plannedSupport.value = "50";
rerender(plannedSupport);
assert(normalized(outputs.get("support-hours")?.textContent).startsWith("50h"), "La relève saisie à 50 h est remplacée silencieusement.");
assert(outputs.get("support-gap")?.textContent?.includes("non couvertes"), "L’écart de couverture n’est pas signalé après réduction de la relève.");

plannedSupport.value = "100";
rerender(plannedSupport);

const contractRent = form.elements.namedItem("contractRent");
contractRent.value = "5000";
rerender(contractRent);
assert(outputs.get("rent-input-warning")?.textContent?.includes("12 000"), "Le loyer hors corridor n’est pas signalé près du champ.");
changeAndRender(contractRent);
assert(contractRent.value === "12000", "Le loyer hors corridor n’est pas normalisé à la validation du champ.");
assert(normalized(outputs.get("contract-rent")?.textContent).includes("12000€"), "Le loyer normalisé n’est pas repris par le calcul.");

const seasonalTab = scenarioTabs.find((button) => button.dataset.scenarioTab === "saisonnier");
const freeTab = scenarioTabs.find((button) => button.dataset.scenarioTab === "libre");
await trigger(seasonalTab);
const seasonalPrice = form.elements.namedItem("averageNightPrice").value;
await trigger(freeTab);
assert(form.elements.namedItem("averageNightPrice").value === seasonalPrice, "Le scénario libre ne reprend pas les hypothèses affichées.");
form.elements.namedItem("averageNightPrice").value = "205";
rerender(form.elements.namedItem("averageNightPrice"));
assert(outputs.get("scenario-name")?.textContent === "Scénario libre", "Une modification manuelle ne bascule pas vers le scénario libre.");
await trigger(getNode("[data-pilotage-share]"));
assert(copiedUrl.includes("scenario=libre") && copiedUrl.includes("averageNightPrice=205"), "Le lien partagé ne conserve pas le scénario libre et ses paramètres.");
assert(source.includes("#scenario-(socle|saisonnier|libre)"), "Les liens profonds par ancre de scénario ne sont pas pris en charge.");

console.log(JSON.stringify({
  revenueTtc: outputs.get("revenue-ttc").textContent,
  accountingRevenue: outputs.get("accounting-revenue").textContent,
  preRentResult: outputs.get("pre-rent-result").textContent,
  julesCost: outputs.get("jules-cost").textContent,
  cashResult: outputs.get("cash-result").textContent,
  operatingCompanyAfterLoan: outputs.get("operating-company-after-loan").textContent,
  support: outputs.get("support-hours").textContent,
  recommendedSupport: outputs.get("support-recommended").textContent,
  supportGap: outputs.get("support-gap").textContent,
  operationsHours: outputs.get("operations-hours").textContent,
  afterRentResult: outputs.get("after-rent-result").textContent,
  familyEffort: outputs.get("family-effort-title").textContent,
  annualPrincipalRepayment: outputs.get("shareholder-loan-annuity").textContent,
  operatingCompanyLoanGap: outputs.get("operating-company-loan-gap").textContent,
}, null, 2));
