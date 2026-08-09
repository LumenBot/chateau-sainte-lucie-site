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
  fields.push({ ...makeNode(value), name });
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
const getNode = (selector) => {
  if (!nodes.has(selector)) nodes.set(selector, makeNode());
  return nodes.get(selector);
};
const marketScope = makeNode("vosges");
const competitorSelect = makeNode("0");
competitorSelect.appendChild = () => {};

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
      if (!outputs.has(outputName)) outputs.set(outputName, makeNode());
      return [outputs.get(outputName)];
    }
    return [];
  },
  createElement() { return makeNode(); },
};

globalThis.localStorage = { getItem() { return null; }, setItem() {} };
Object.defineProperty(globalThis, "navigator", { value: {}, configurable: true });
globalThis.window = {
  alert() {},
  prompt() {},
  scrollTo() {},
  history: { replaceState() {} },
  location: { search: "", hash: "", origin: "https://example.test", pathname: "/demo/pilotage/" },
};

vm.runInThisContext(source, { filename: "pilotage.js" });

const normalized = (value) => String(value || "").replace(/[\s\u00a0\u202f]/g, "");
const assert = (condition, message) => { if (!condition) throw new Error(message); };

assert(normalized(outputs.get("revenue-ttc")?.textContent).includes("81840€"), "Le CA TTC recommandé ne vaut pas 81 840 €.");
assert(normalized(outputs.get("support-hours")?.textContent).startsWith("350h"), "La relève budgétée recommandée ne vaut pas 350 h.");
assert(outputs.get("support-gap")?.textContent?.includes("couverture déclarée"), "Le scénario recommandé ne couvre pas les heures estimées.");
assert(outputs.get("cash-result")?.textContent && outputs.get("cash-result")?.textContent !== "—", "Le solde prudent ne s’affiche pas.");
assert(getNode("[data-pnl]").innerHTML.includes("Loyer SCI contractuel testé"), "Le loyer contractuel manque dans le compte d’exploitation.");
assert(getNode("[data-workload]").innerHTML.includes("Décomposition du temps annuel"), "La décomposition de charge ne s’affiche pas.");

const rerender = (target = form) => {
  for (const handler of form.listeners?.input || []) handler({ target });
};
const fingerprint = () => [
  ...Array.from(outputs.entries()).filter(([key]) => key !== "scenario-name").map(([key, node]) => `${key}:${node.textContent}`),
  getNode("[data-pnl]").innerHTML,
  getNode("[data-workload]").innerHTML,
].join("|");

for (const field of fields.filter((item) => item.name !== "supportEmployeeMonths")) {
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

const supportMode = form.elements.namedItem("supportMode");
const supportModeBefore = fingerprint();
supportMode.value = "parttime";
rerender(supportMode);
assert(fingerprint() !== supportModeBefore, "Le mode de relève ne modifie aucun résultat visible.");
const supportMonths = form.elements.namedItem("supportEmployeeMonths");
const partTimeBefore = fingerprint();
supportMonths.value = "11";
rerender(supportMonths);
assert(fingerprint() !== partTimeBefore, "Le nombre de mois du CDI de relève ne modifie aucun résultat visible.");
supportMonths.value = "12";
supportMode.value = "subcontract";
rerender(supportMode);

const vatMode = form.elements.namedItem("vatMode");
const vatBefore = fingerprint();
vatMode.value = "franchise";
rerender(vatMode);
assert(fingerprint() !== vatBefore, "Le régime de TVA ne modifie aucun résultat visible.");
vatMode.value = "vat";
rerender(vatMode);

const plannedSupport = form.elements.namedItem("plannedSupportHours");
plannedSupport.value = "300";
rerender(plannedSupport);
assert(normalized(outputs.get("support-hours")?.textContent).startsWith("300h"), "La relève saisie à 300 h est encore remplacée silencieusement.");
assert(outputs.get("support-gap")?.textContent?.includes("non couvertes"), "L’écart de couverture n’est pas signalé après réduction de la relève.");

plannedSupport.value = "350";
rerender(plannedSupport);

console.log(JSON.stringify({
  revenueTtc: outputs.get("revenue-ttc").textContent,
  accountingRevenue: outputs.get("accounting-revenue").textContent,
  preRentResult: outputs.get("pre-rent-result").textContent,
  julesCost: outputs.get("jules-cost").textContent,
  cashResult: outputs.get("cash-result").textContent,
  support: outputs.get("support-hours").textContent,
  recommendedSupport: outputs.get("support-recommended").textContent,
  supportGap: outputs.get("support-gap").textContent,
  operationsHours: outputs.get("operations-hours").textContent,
  fullTimeAndRentGap: outputs.get("fulltime-gap").textContent,
}, null, 2));
