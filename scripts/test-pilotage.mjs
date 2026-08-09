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
  addEventListener() {},
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

assert(normalized(outputs.get("revenue-ttc")?.textContent).includes("87300€"), "Le CA TTC recommandé ne vaut pas 87 300 €.");
assert(normalized(outputs.get("support-hours")?.textContent).startsWith("400h"), "La relève recommandée ne vaut pas 400 h.");
assert(outputs.get("cash-result")?.textContent && outputs.get("cash-result")?.textContent !== "—", "Le solde prudent ne s’affiche pas.");
assert(getNode("[data-pnl]").innerHTML.includes("Loyer SCI contractuel testé"), "Le loyer contractuel manque dans le compte d’exploitation.");
assert(getNode("[data-workload]").innerHTML.includes("Décomposition du temps annuel"), "La décomposition de charge ne s’affiche pas.");

console.log(JSON.stringify({
  revenueTtc: outputs.get("revenue-ttc").textContent,
  accountingRevenue: outputs.get("accounting-revenue").textContent,
  preRentResult: outputs.get("pre-rent-result").textContent,
  julesCost: outputs.get("jules-cost").textContent,
  cashResult: outputs.get("cash-result").textContent,
  support: outputs.get("support-hours").textContent,
  fullTimeAndRentGap: outputs.get("fulltime-gap").textContent,
}, null, 2));
