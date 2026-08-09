(function () {
  function start() {
    const form = document.querySelector("[data-pilotage-form]");
    if (!form) return;

    const money = window.CSLDemo?.money || function (value) {
      return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Number(value || 0));
    };
    const toast = window.CSLDemo?.toast || function (message) {
      const node = document.querySelector("[data-demo-toast]");
      if (!node) return;
      node.textContent = message;
      node.classList.add("visible");
      window.setTimeout(() => node.classList.remove("visible"), 3000);
    };

    const common = {
      openDays: 275, avgGuests: 2.1, otaCommission: 15, spaCostRate: 28,
      dinnerCostRate: 35, turnoverCost: 66, breakfastCost: 7, energyCost: 7.5,
      rent: 18000, salary: 30000, otherFixed: 8000, capex: 65000, hoursPerStay: 6,
    };
    const scenarios = {
      family: { ...common, nightsPerSuite: 80, adr: 180, los: 2, overlapRate: 75, directShare: 40, spaTake: 30, spaBasket: 50, dinnerTake: 20, dinnerBasket: 90 },
      opening: { ...common, nightsPerSuite: 110, adr: 205, los: 2.1, overlapRate: 70, directShare: 50, spaTake: 45, spaBasket: 70, dinnerTake: 30, dinnerBasket: 95 },
      target: { ...common, nightsPerSuite: 140, adr: 225, los: 2.2, overlapRate: 70, directShare: 60, spaTake: 55, spaBasket: 95, dinnerTake: 40, dinnerBasket: 105 },
      maturity: { ...common, nightsPerSuite: 155, adr: 235, los: 2.3, overlapRate: 75, directShare: 70, spaTake: 65, spaBasket: 110, dinnerTake: 45, dinnerBasket: 115 },
    };
    const scenarioNames = {
      family: "Prudence familiale", opening: "Ouverture affirmée",
      target: "Cible de consolidation", maturity: "Premium démontré", custom: "Scénario personnalisé",
    };
    const spaPolicies = {
      entry: { spaTake: 30, spaBasket: 50 },
      nordic: { spaTake: 50, spaBasket: 70 },
      signature: { spaTake: 60, spaBasket: 110 },
    };

    const competitors = [
      ["Château de Failloux", "Jeuxey · Vosges", "vosges", 108, "Patrimoine local", "Preuve qu’un château fonctionne localement ; Sainte-Lucie doit démontrer un saut de finition et de scénographie."],
      ["Les Villas du Parc", "Vittel · Vosges", "vosges", 165, "Demeure premium", "La qualité photographique et les signes de classement rassurent."],
      ["Le Nid Cosy", "Gérardmer · Vosges", "vosges", 220, "Spa romantique", "Le marché vosgien paie déjà l’intimité et un spa privé autour de 200–250 €."],
      ["Glam88", "Remiremont · Vosges", "vosges", 250, "Suite expérientielle", "Référence locale pour les extras, packs romantiques et ventes additionnelles."],
      ["Domaine du Haut Jardin", "Rehaupal · Vosges", "vosges", 230, "Hôtel-spa", "Opposer la rareté et le parc privé à la densité de services."],
      ["Maison La Devinière", "Gérardmer · Vosges", "vosges", 115, "Maison d’hôtes", "À prix supérieur, rendre immédiatement visibles suite, terrasse et privatisation."],
      ["La Ferme", "Val d’Ajol · Vosges", "vosges", 250, "Nature premium", "Le bain nordique devient désirable quand il est relié au paysage et à un rituel."],
      ["Les Atypiques Chalets", "Barbey-Seroux · Vosges", "vosges", 170, "Chalet photogénique", "Dépasser le chalet par l’histoire, les volumes et le parcours nocturne."],
      ["NUITS D’EXIL", "Gérardmer · Vosges", "vosges", 500, "Suite immersive", "Un prix exceptionnel devient possible lorsque l’expérience est totalement lisible et scénarisée."],
      ["Best Western Le Chapître", "Remiremont · Vosges", "vosges", 192, "Hôtel 4 étoiles spa", "À prix voisin, vendre l’espace, l’âme et la confidentialité plutôt que des services standardisés."],
      ["Château du Landin", "Normandie", "france", 216, "Patrimoine + bien-être", "Benchmark central : l’entretien et la cohérence de l’expérience déterminent les avis."],
      ["Château Réal", "Médoc · Gironde", "france", 185, "Demeure territoriale", "Un récit territorial précis transforme une demeure en destination."],
      ["Maison Durieux", "Haute-Vienne", "france", 230, "Luxe discret", "Une destination secondaire peut soutenir 200–300 € grâce au design et au service."],
      ["Château de Fontariol", "Allier", "france", 160, "Expérience signature", "Une activité signature cohérente vaut mieux qu’une longue liste d’options."],
      ["Château d’Omiécourt", "Somme", "france", 170, "Château-spa", "La privatisation par créneau doit être expliquée sans ambiguïté."],
      ["Château Écrin de Lumière", "Dordogne", "france", 220, "Art de recevoir", "La table et le petit-déjeuner participent autant au luxe perçu que le spa."],
      ["Château du Palanquey", "Saint-Émilion", "france", 320, "Référence haute", "Montre le plafond de valeur, avec une structure de service beaucoup plus lourde."],
      ["Commanderie de Ballan", "Indre-et-Loire", "france", 240, "Vie de château", "Le faible nombre de clés est un argument si les espaces réservés sont réels."],
      ["Château Duo", "Drôme", "france", 260, "Grandes suites + spa", "Les mètres carrés, le salon séparé et la terrasse doivent être visibles immédiatement."],
      ["Charme au Fil de l’Eau", "Aisne", "france", 320, "Suite spa privée", "Formuler la promesse en bénéfices émotionnels plutôt qu’en inventaire."],
      ["Château de Jallanges", "Indre-et-Loire", "france", 210, "Patrimoine touristique", "Sans le flux de la Loire, Sainte-Lucie doit devenir le motif du déplacement."],
      ["Château de Candes", "Loire", "france", 260, "Domaine structuré", "La diversification vient après la stabilisation du cœur de produit."],
      ["Château de Blavou", "Orne", "france", 135, "Patrimoine traditionnel", "Le patrimoine seul ne soutient pas 230 €."],
      ["Château de la Grange Moreau", "Sarthe", "france", 143, "Élégance classique", "Se différencier d’une simple belle chambre au château."],
      ["Château de Sarceaux", "Orne", "france", 150, "Maison privée", "L’accueil incarné doit rester compatible avec la vie familiale."],
      ["Le Volcan des Sens", "Haute-Loire", "france", 210, "Immersion sensorielle", "La piscine naturelle doit être montrée comme un paysage."],
      ["Le Clos Saint Lubin", "Essonne", "france", 230, "Bien-être privatisé", "Une formule nuit + petit-déjeuner + créneau privé simplifie l’achat."],
      ["Manoir de La Malartrie", "Dordogne", "france", 170, "Patrimoine-image", "Les vues et terrasses sont monétisables."],
      ["La Petite Folie", "Honfleur", "france", 250, "Marque éditoriale", "Une direction artistique cohérente augmente la désirabilité."],
      ["Bastide Saint-Honorat", "Alpes-Maritimes", "france", 180, "Art de vivre", "Le terroir, la vaisselle et les senteurs forment aussi le luxe."],
    ].map((row, index) => ({ index: index + 1, name: row[0], location: row[1], scope: row[2], price: row[3], model: row[4], lesson: row[5] }));

    let activeScenario = "family";

    function values() {
      return Object.fromEntries(Array.from(form.elements).filter((field) => field.name).map((field) => [field.name, Number(field.value || 0)]));
    }
    function setValues(next) {
      Object.entries(next).forEach(([key, value]) => {
        const field = form.elements.namedItem(key);
        if (field) field.value = String(value);
      });
    }
    function calculate(v, override) {
      const openDays = Math.max(1, v.openDays);
      const nightsPerSuite = Math.min(openDays, Math.max(0, override ?? v.nightsPerSuite));
      const occupiedNights = nightsPerSuite * 2;
      const stays = v.los > 0 ? occupiedNights / v.los : 0;
      const occupancy = nightsPerSuite / openDays;
      const paired = nightsPerSuite * Math.min(1, Math.max(0, v.overlapRate / 100));
      const presenceDays = Math.min(openDays, Math.max(nightsPerSuite, occupiedNights - paired));
      const accommodationRevenue = occupiedNights * v.adr;
      const spaRevenue = stays * v.spaTake / 100 * v.spaBasket;
      const dinnerRevenue = stays * v.dinnerTake / 100 * v.dinnerBasket;
      const revenue = accommodationRevenue + spaRevenue + dinnerRevenue;
      const roomCosts = stays * v.turnoverCost + occupiedNights * v.avgGuests * v.breakfastCost + occupiedNights * v.energyCost;
      const commissions = accommodationRevenue * (1 - v.directShare / 100) * v.otaCommission / 100;
      const variableCosts = roomCosts + commissions + spaRevenue * v.spaCostRate / 100 + dinnerRevenue * v.dinnerCostRate / 100;
      const contribution = revenue - variableCosts;
      const fixedCosts = v.rent + v.salary + v.otherFixed;
      return { openDays, nightsPerSuite, occupiedNights, stays, occupancy, presenceDays, accommodationRevenue, spaRevenue, dinnerRevenue, revenue, variableCosts, contribution, fixedCosts, result: contribution - fixedCosts, operationsHours: stays * v.hoursPerStay };
    }
    function findBreakEven(v) {
      if (calculate(v, v.openDays).result < 0) return null;
      let low = 0;
      let high = v.openDays;
      for (let i = 0; i < 40; i += 1) {
        const mid = (low + high) / 2;
        if (calculate(v, mid).result >= 0) high = mid;
        else low = mid;
      }
      return Math.ceil(high);
    }
    function formatInteger(value) { return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(value); }
    function formatPercent(value) { return new Intl.NumberFormat("fr-FR", { style: "percent", maximumFractionDigits: 1 }).format(value); }
    function output(key, value) { document.querySelectorAll(`[data-pilotage-output="${key}"]`).forEach((node) => { node.textContent = value; }); }

    function render() {
      const v = values();
      if (v.nightsPerSuite > v.openDays) {
        form.elements.namedItem("nightsPerSuite").value = String(v.openDays);
        v.nightsPerSuite = v.openDays;
      }
      const data = calculate(v);
      const breakEven = findBreakEven(v);
      const payback = data.result > 0 && v.capex > 0 ? v.capex / data.result : null;
      const gap = data.revenue - 70000;

      output("scenario-name", scenarioNames[activeScenario] || scenarioNames.custom);
      output("revenue", money(data.revenue));
      output("revenue-note", gap >= 0 ? `${money(gap)} au-dessus du cap de 70 k€` : `${money(Math.abs(gap))} sous le cap de 70 k€`);
      output("result", money(data.result));
      output("contribution", money(data.contribution));
      output("variable-costs", money(data.variableCosts));
      output("fixed-costs", money(data.fixedCosts));
      output("occupancy", formatPercent(data.occupancy));
      output("occupied-detail", `${formatInteger(data.occupiedNights)} nuits-suite vendues`);
      output("presence-days", `${formatInteger(data.presenceDays)} jours`);
      output("break-even", breakEven === null ? "hors capacité" : `${formatInteger(breakEven)} nuits/suite · ${formatPercent(breakEven / data.openDays)}`);
      output("payback", payback ? `${payback.toFixed(1).replace(".", ",")} ans` : "non financé par ce scénario");
      output("operations-hours", `${formatInteger(data.operationsHours)} h/an`);

      const mix = [data.accommodationRevenue, data.spaRevenue, data.dinnerRevenue];
      ["accommodation", "spa", "dinner"].forEach((key, index) => {
        document.querySelectorAll(`[data-revenue-bar="${key}"]`).forEach((bar) => { bar.style.width = `${data.revenue ? mix[index] / data.revenue * 100 : 0}%`; });
      });

      document.querySelectorAll("[data-pilotage-scenario]").forEach((button) => button.classList.toggle("active", button.dataset.pilotageScenario === activeScenario));
      const verdicts = document.querySelectorAll("[data-pilotage-verdict]");
      verdicts.forEach((verdict) => {
        if (data.result >= 0) {
          verdict.className = "pilotage-verdict positive";
          verdict.innerHTML = `<strong>Équilibre simulé atteint.</strong><span>Une marge de ${money(data.result)} subsiste avant fiscalité, dette et amortissements.</span>`;
        } else if (data.contribution >= data.fixedCosts * 0.85) {
          verdict.className = "pilotage-verdict warn";
          verdict.innerHTML = `<strong>Proche du seuil.</strong><span>${money(Math.abs(data.result))} restent à couvrir. Le prix, le direct et les packs sont plus soutenables qu’une hausse isolée du volume.</span>`;
        } else {
          verdict.className = "pilotage-verdict negative";
          verdict.innerHTML = `<strong>Phase d’apprentissage non équilibrée.</strong><span>${money(Math.abs(data.result))} manquent pour financer les obligations annuelles saisies.</span>`;
        }
      });
    }

    function showPanel(key, updateHash) {
      document.querySelectorAll("[data-pilotage-panel]").forEach((panel) => { panel.hidden = panel.dataset.pilotagePanel !== key; });
      document.querySelectorAll("[data-pilotage-tab]").forEach((button) => {
        const active = button.dataset.pilotageTab === key;
        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", String(active));
      });
      if (updateHash) window.history.replaceState({}, "", `#${key}`);
      window.scrollTo({ top: document.querySelector(".pilotage-tabs").offsetTop - 12, behavior: "smooth" });
    }

    document.querySelectorAll("[data-pilotage-tab]").forEach((button) => button.addEventListener("click", () => showPanel(button.dataset.pilotageTab, true)));
    document.querySelectorAll("[data-open-simulator]").forEach((button) => button.addEventListener("click", () => showPanel("simulateur", true)));
    document.querySelectorAll("[data-pilotage-scenario]").forEach((button) => button.addEventListener("click", function () {
      activeScenario = button.dataset.pilotageScenario;
      setValues(scenarios[activeScenario]);
      document.querySelector("[data-spa-policy]").value = activeScenario === "maturity" ? "signature" : activeScenario === "target" || activeScenario === "opening" ? "nordic" : "entry";
      render();
    }));
    form.addEventListener("input", function (event) {
      if (event.target.matches("[data-spa-policy]")) return;
      activeScenario = "custom";
      document.querySelector("[data-spa-policy]").value = "custom";
      render();
    });
    document.querySelector("[data-spa-policy]").addEventListener("change", function (event) {
      const policy = spaPolicies[event.target.value];
      if (!policy) return;
      setValues(policy);
      activeScenario = "custom";
      render();
    });
    document.querySelector("[data-pilotage-reset]").addEventListener("click", function () {
      activeScenario = "family";
      setValues(scenarios.family);
      document.querySelector("[data-spa-policy]").value = "entry";
      window.history.replaceState({}, "", "#simulateur");
      render();
    });
    document.querySelector("[data-pilotage-share]").addEventListener("click", async function () {
      const params = new URLSearchParams({ scenario: activeScenario });
      Object.entries(values()).forEach(([key, value]) => params.set(key, String(value)));
      const url = `${window.location.origin}${window.location.pathname}?${params.toString()}#simulateur`;
      try { await navigator.clipboard.writeText(url); toast("Le lien du scénario est copié."); }
      catch (_) { window.prompt("Copiez ce lien :", url); }
    });

    function loadSharedScenario() {
      const params = new URLSearchParams(window.location.search);
      if (!params.size) return;
      const next = {};
      Array.from(form.elements).filter((field) => field.name).forEach((field) => { if (params.has(field.name)) next[field.name] = Number(params.get(field.name)); });
      setValues(next);
      activeScenario = params.get("scenario") || "custom";
      if (!scenarioNames[activeScenario]) activeScenario = "custom";
    }

    const marketScope = document.querySelector("[data-market-scope]");
    const competitorSelect = document.querySelector("[data-competitor-select]");
    competitors.forEach((item) => {
      const option = document.createElement("option");
      option.value = String(item.index - 1);
      option.textContent = `${String(item.index).padStart(2, "0")} · ${item.name} · ${item.price} €`;
      competitorSelect.appendChild(option);
    });
    function renderCompetitor(index) {
      const item = competitors[index] || competitors[0];
      document.querySelector("[data-competitor-detail]").innerHTML = `<span>${String(item.index).padStart(2, "0")} · ${item.model}</span><h3>${item.name}</h3><p>${item.location}</p><strong>${item.price} €</strong><blockquote>${item.lesson}</blockquote>`;
    }
    function renderMarket() {
      const scope = marketScope.value;
      const list = competitors.filter((item) => scope === "all" || item.scope === scope).sort((a, b) => a.price - b.price);
      const max = 500;
      document.querySelector("[data-market-chart]").innerHTML = list.map((item) => `<button type="button" data-market-index="${item.index - 1}"><span>${item.name}</span><i><b style="width:${item.price / max * 100}%"></b></i><strong>${item.price} €</strong></button>`).join("");
      document.querySelectorAll("[data-market-index]").forEach((button) => button.addEventListener("click", function () {
        competitorSelect.value = button.dataset.marketIndex;
        renderCompetitor(Number(button.dataset.marketIndex));
      }));
    }
    marketScope.addEventListener("change", renderMarket);
    competitorSelect.addEventListener("change", () => renderCompetitor(Number(competitorSelect.value)));
    renderMarket();
    renderCompetitor(0);

    const roadmapKey = "csl-pilotage-roadmap-v2";
    const roadmapTasks = Array.from(document.querySelectorAll("[data-roadmap-task]"));
    let roadmapState = {};
    try { roadmapState = JSON.parse(localStorage.getItem(roadmapKey) || "{}"); } catch (_) {}
    function renderRoadmap() {
      roadmapTasks.forEach((box) => { box.checked = Boolean(roadmapState[box.dataset.roadmapTask]); });
      const done = roadmapTasks.filter((box) => box.checked).length;
      const percentage = Math.round(done / roadmapTasks.length * 100);
      document.querySelector("[data-roadmap-progress]").textContent = `${percentage} %`;
      document.querySelector("[data-roadmap-progress-bar]").style.width = `${percentage}%`;
    }
    roadmapTasks.forEach((box) => box.addEventListener("change", function () {
      roadmapState[box.dataset.roadmapTask] = box.checked;
      localStorage.setItem(roadmapKey, JSON.stringify(roadmapState));
      renderRoadmap();
    }));

    loadSharedScenario();
    render();
    renderRoadmap();
    const requestedPanel = window.location.hash.replace("#", "");
    if (["synthese", "simulateur", "marche", "investissements", "plan"].includes(requestedPanel)) showPanel(requestedPanel, false);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
