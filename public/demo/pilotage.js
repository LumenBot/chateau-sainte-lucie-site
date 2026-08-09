(function () {
  const form = document.querySelector("[data-pilotage-form]");
  if (!form || !window.CSLDemo) return;

  const demo = window.CSLDemo;
  const names = {
    launch: "Lancement maîtrisé",
    target: "Cap 70 k€",
    maturity: "Maturité premium",
    custom: "Scénario libre",
  };

  const baseCosts = {
    turnoverCost: 66,
    breakfastCost: 7,
    energyCost: 7.5,
    spaCostRate: 28,
    dinnerCostRate: 35,
    ritualCostRate: 31,
    otaCommission: 15,
    rent: 18000,
    salary: 30000,
    otherFixed: 8000,
    capex: 50000,
  };

  const scenarios = {
    launch: {
      openDays: 275, nightsPerSuite: 75, adr: 180, los: 2, avgGuests: 2.1,
      overlapRate: 50, directShare: 40, spaTake: 35, spaBasket: 55,
      dinnerTake: 20, dinnerBasket: 90, ritualTake: 10, ritualBasket: 59,
      ...baseCosts,
    },
    target: {
      openDays: 275, nightsPerSuite: 145, adr: 200, los: 2, avgGuests: 2.1,
      overlapRate: 60, directShare: 55, spaTake: 50, spaBasket: 70,
      dinnerTake: 35, dinnerBasket: 100, ritualTake: 20, ritualBasket: 65,
      ...baseCosts,
    },
    maturity: {
      openDays: 275, nightsPerSuite: 150, adr: 230, los: 2.2, avgGuests: 2.1,
      overlapRate: 65, directShare: 70, spaTake: 60, spaBasket: 80,
      dinnerTake: 45, dinnerBasket: 110, ritualTake: 30, ritualBasket: 69,
      ...baseCosts,
    },
  };

  let activeScenario = "launch";

  function numericValues() {
    return Object.fromEntries(Array.from(form.elements)
      .filter((field) => field.name)
      .map((field) => [field.name, Number(field.value || 0)]));
  }

  function setValues(values) {
    Object.entries(values).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);
      if (field) field.value = String(value);
    });
  }

  function calculate(values, nightsOverride) {
    const openDays = Math.max(1, values.openDays);
    const nightsPerSuite = Math.min(openDays, Math.max(0, nightsOverride ?? values.nightsPerSuite));
    const occupiedNights = nightsPerSuite * 2;
    const stays = values.los > 0 ? occupiedNights / values.los : 0;
    const occupancy = nightsPerSuite / openDays;
    const pairedNights = nightsPerSuite * Math.min(1, Math.max(0, values.overlapRate / 100));
    const presenceDays = Math.min(openDays, Math.max(nightsPerSuite, occupiedNights - pairedNights));

    const accommodationRevenue = occupiedNights * values.adr;
    const spaRevenue = stays * values.spaTake / 100 * values.spaBasket;
    const dinnerRevenue = stays * values.dinnerTake / 100 * values.dinnerBasket;
    const ritualRevenue = stays * values.ritualTake / 100 * values.ritualBasket;
    const experienceRevenue = spaRevenue + dinnerRevenue + ritualRevenue;
    const revenue = accommodationRevenue + experienceRevenue;

    const roomCosts = stays * values.turnoverCost
      + occupiedNights * values.avgGuests * values.breakfastCost
      + occupiedNights * values.energyCost;
    const commissions = accommodationRevenue * (1 - values.directShare / 100) * values.otaCommission / 100;
    const experienceCosts = spaRevenue * values.spaCostRate / 100
      + dinnerRevenue * values.dinnerCostRate / 100
      + ritualRevenue * values.ritualCostRate / 100;
    const variableCosts = roomCosts + commissions + experienceCosts;
    const contribution = revenue - variableCosts;
    const fixedCosts = values.rent + values.salary + values.otherFixed;
    const result = contribution - fixedCosts;

    return {
      openDays, nightsPerSuite, occupiedNights, stays, occupancy, presenceDays,
      accommodationRevenue, experienceRevenue, revenue, variableCosts,
      contribution, fixedCosts, result,
    };
  }

  function findBreakEven(values) {
    if (calculate(values, values.openDays).result < 0) return null;
    let low = 0;
    let high = values.openDays;
    for (let i = 0; i < 40; i += 1) {
      const mid = (low + high) / 2;
      if (calculate(values, mid).result >= 0) high = mid;
      else low = mid;
    }
    return Math.ceil(high);
  }

  function output(key, value) {
    document.querySelectorAll(`[data-pilotage-output="${key}"]`).forEach((node) => {
      node.textContent = value;
    });
  }

  function integer(value) {
    return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(value);
  }

  function percent(value) {
    return new Intl.NumberFormat("fr-FR", { style: "percent", maximumFractionDigits: 1 }).format(value);
  }

  function render() {
    const values = numericValues();
    if (values.nightsPerSuite > values.openDays) {
      form.elements.namedItem("nightsPerSuite").value = String(values.openDays);
      values.nightsPerSuite = values.openDays;
    }
    const data = calculate(values);
    const breakEven = findBreakEven(values);
    const capGap = data.revenue - 70000;
    const payback = data.result > 0 && values.capex > 0 ? values.capex / data.result : null;

    output("scenario-name", names[activeScenario]);
    output("revenue", demo.money(data.revenue));
    output("revenue-gap", capGap >= 0 ? `${demo.money(capGap)} au-dessus du cap de 70 k€` : `${demo.money(Math.abs(capGap))} sous le cap de 70 k€`);
    output("contribution", demo.money(data.contribution));
    output("result", demo.money(data.result));
    output("break-even", breakEven === null ? "Hors capacité" : `${integer(breakEven)} nuits / suite`);
    output("break-even-detail", breakEven === null ? "les hypothèses ne couvrent pas les obligations" : `${percent(breakEven / data.openDays)} d’occupation`);
    output("occupancy", percent(data.occupancy));
    output("occupied-nights", integer(data.occupiedNights));
    output("stays", integer(data.stays));
    output("presence-days", `${integer(data.presenceDays)} jours estimés`);
    output("accommodation-revenue", demo.money(data.accommodationRevenue));
    output("experience-revenue", demo.money(data.experienceRevenue));
    output("variable-costs", demo.money(data.variableCosts));
    output("fixed-costs", demo.money(data.fixedCosts));
    output("payback", payback ? `${payback.toFixed(1).replace(".", ",")} ans` : "Non finançable par ce scénario");

    const resultCard = document.querySelector("[data-result-card]");
    resultCard.classList.toggle("positive", data.result >= 0);
    resultCard.classList.toggle("negative", data.result < 0);

    const verdict = document.querySelector("[data-pilotage-verdict]");
    if (data.result >= 0) {
      verdict.className = "pilotage-verdict positive";
      verdict.innerHTML = `<strong>Équilibre simulé atteint.</strong><span>Il reste à vérifier la trésorerie, les impôts, la dette et le temps familial non valorisé.</span>`;
    } else if (data.contribution >= data.fixedCosts * 0.8) {
      verdict.className = "pilotage-verdict warn";
      verdict.innerHTML = `<strong>Proche du seuil.</strong><span>${demo.money(Math.abs(data.result))} restent à couvrir par le prix, le volume, les expériences ou une baisse des obligations.</span>`;
    } else {
      verdict.className = "pilotage-verdict negative";
      verdict.innerHTML = `<strong>Modèle non équilibré.</strong><span>${demo.money(Math.abs(data.result))} manquent avant impôts, dette et rémunérations non incluses.</span>`;
    }

    document.querySelectorAll("[data-pilotage-scenario]").forEach((button) => {
      button.classList.toggle("active", button.dataset.pilotageScenario === activeScenario);
    });
  }

  function scenarioParams() {
    const params = new URLSearchParams();
    params.set("scenario", activeScenario);
    Object.entries(numericValues()).forEach(([key, value]) => params.set(key, String(value)));
    return params;
  }

  function loadFromUrl() {
    const params = new URLSearchParams(window.location.search);
    if (!params.size) return false;
    const values = {};
    Array.from(form.elements).filter((field) => field.name).forEach((field) => {
      if (params.has(field.name)) values[field.name] = Number(params.get(field.name));
    });
    setValues(values);
    activeScenario = params.get("scenario") || "custom";
    if (!names[activeScenario]) activeScenario = "custom";
    return true;
  }

  document.querySelectorAll("[data-pilotage-scenario]").forEach((button) => {
    button.addEventListener("click", function () {
      const key = button.dataset.pilotageScenario;
      if (key === "custom") {
        activeScenario = "custom";
      } else {
        activeScenario = key;
        setValues(scenarios[key]);
      }
      render();
    });
  });

  form.addEventListener("input", function () {
    activeScenario = "custom";
    render();
  });

  document.querySelector("[data-pilotage-share]").addEventListener("click", async function () {
    const url = `${window.location.origin}${window.location.pathname}?${scenarioParams().toString()}#simulateur`;
    try {
      await navigator.clipboard.writeText(url);
      demo.toast("Le lien de ce scénario est copié.");
    } catch (_) {
      window.prompt("Copiez ce lien de scénario :", url);
    }
  });

  document.querySelector("[data-pilotage-reset]").addEventListener("click", function () {
    activeScenario = "launch";
    setValues(scenarios.launch);
    window.history.replaceState({}, "", window.location.pathname + "#simulateur");
    render();
  });

  if (!loadFromUrl()) setValues(scenarios.launch);
  render();
})();
