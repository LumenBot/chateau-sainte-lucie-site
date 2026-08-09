(function () {
  function start() {
    const form = document.querySelector("[data-pilotage-form]");
    if (!form) return;

    const money = window.CSLDemo?.money || ((value) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Number(value || 0)));
    const integer = (value) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Number(value || 0));
    const percent = (value) => new Intl.NumberFormat("fr-FR", { style: "percent", maximumFractionDigits: 0 }).format(Number(value || 0));
    const toast = window.CSLDemo?.toast || ((message) => window.alert(message));

    const fixed = { suites: 2, averageGuests: 2.1, julesCost: 28000, julesUsefulHours: 1350, annualHours: 1607, capex: 65000 };
    const scenarioNames = { recommended: "Scénario recommandé", custom: "Scénario libre" };
    const scenarios = {
      recommended: { nightsPerSuite: "155", averageNightPrice: "235", averageStay: "2.4", directShare: "65", spaTake: "60", spaBasket: "80", diningTake: "30", diningBasket: "170", turnoverCost: "90", breakfastCost: "7", energyCost: "7.5", spaUnitCost: "24", diningUnitCost: "60", otaCommission: "15", miscRate: "6", operatingReserve: "5000", supportMode: "subcontract", supportHourlyRate: "25" },
    };

    const competitors = [
      ["Château de Failloux", "Jeuxey · Vosges", "vosges", 108, "Patrimoine local", "Valide une demande locale ; Sainte-Lucie doit rendre visible le saut de suite, de confidentialité et de scénographie."],
      ["Les Villas du Parc", "Vittel · Vosges", "vosges", 165, "Demeure premium", "La photographie, les preuves de standing et la régularité rassurent."],
      ["Le Nid Cosy", "Gérardmer · Vosges", "vosges", 220, "Spa romantique", "Le marché vosgien paie déjà l’intimité et un spa privé autour de 200–250 €."],
      ["Glam88", "Remiremont · Vosges", "vosges", 250, "Suite expérientielle", "Référence locale pour les extras, les rituels et la vente additionnelle."],
      ["Domaine du Haut Jardin", "Rehaupal · Vosges", "vosges", 230, "Hôtel-spa", "Sainte-Lucie doit opposer rareté et parc privé à la densité de services."],
      ["Maison La Devinière", "Gérardmer · Vosges", "vosges", 115, "Maison d’hôtes", "À prix supérieur, suite, terrasse et privatisation doivent être comprises immédiatement."],
      ["La Ferme", "Val d’Ajol · Vosges", "vosges", 250, "Nature premium", "Le bain nordique devient désirable quand il est relié au paysage et à un rituel."],
      ["Les Atypiques Chalets", "Barbey-Seroux · Vosges", "vosges", 170, "Chalet photogénique", "L’histoire, les volumes et le parcours nocturne permettent de dépasser le chalet."],
      ["NUITS D’EXIL", "Gérardmer · Vosges", "vosges", 500, "Suite immersive", "Un prix exceptionnel exige une expérience totalement lisible et scénarisée."],
      ["Best Western Le Chapître", "Remiremont · Vosges", "vosges", 192, "Hôtel 4 étoiles spa", "À prix voisin, vendre l’espace, l’âme et la confidentialité plutôt qu’un inventaire standard."],
      ["Château du Landin", "Normandie", "france", 216, "Patrimoine + bien-être", "L’entretien et la cohérence de l’expérience déterminent la valeur et les avis."],
      ["Château Réal", "Médoc · Gironde", "france", 185, "Demeure territoriale", "Un récit territorial précis transforme une demeure en destination."],
      ["Maison Durieux", "Haute-Vienne", "france", 230, "Luxe discret", "Une destination secondaire soutient 200–300 € grâce au design et au service."],
      ["Château de Fontariol", "Allier", "france", 160, "Expérience signature", "Une activité signature cohérente vaut mieux qu’une longue liste d’options."],
      ["Château d’Omiécourt", "Somme", "france", 170, "Château-spa", "La privatisation par créneau doit être expliquée sans ambiguïté."],
      ["Château Écrin de Lumière", "Dordogne", "france", 220, "Art de recevoir", "La table et le petit-déjeuner participent autant au luxe perçu que le spa."],
      ["Château du Palanquey", "Saint-Émilion", "france", 320, "Référence haute", "Montre le plafond de valeur avec une structure de service nettement plus lourde."],
      ["Commanderie de Ballan", "Indre-et-Loire", "france", 240, "Vie de château", "Le faible nombre de clés est un argument si les espaces réservés sont réels."],
      ["Château Duo", "Drôme", "france", 260, "Grandes suites + spa", "Mètres carrés, salon séparé et terrasse doivent être visibles immédiatement."],
      ["Charme au Fil de l’Eau", "Aisne", "france", 320, "Suite spa privée", "La promesse gagne à être formulée en bénéfices émotionnels."],
      ["Château de Jallanges", "Indre-et-Loire", "france", 210, "Patrimoine touristique", "Sans flux de la Loire, Sainte-Lucie doit devenir le motif du déplacement."],
      ["Château de Candes", "Loire", "france", 260, "Domaine structuré", "La diversification vient après la stabilisation du cœur de produit."],
      ["Château de Blavou", "Orne", "france", 135, "Patrimoine traditionnel", "Le patrimoine seul ne soutient pas 230 €."],
      ["Château de la Grange Moreau", "Sarthe", "france", 143, "Élégance classique", "Il faut se différencier d’une simple belle chambre au château."],
      ["Château de Sarceaux", "Orne", "france", 150, "Maison privée", "L’accueil incarné doit rester compatible avec la vie familiale."],
      ["Le Volcan des Sens", "Haute-Loire", "france", 210, "Immersion sensorielle", "La piscine naturelle doit être montrée comme un paysage."],
      ["Le Clos Saint Lubin", "Essonne", "france", 230, "Bien-être privatisé", "Nuit, petit-déjeuner et créneau privé peuvent former une offre simple."],
      ["Manoir de La Malartrie", "Dordogne", "france", 170, "Patrimoine-image", "Les vues et les terrasses sont monétisables."],
      ["La Petite Folie", "Honfleur", "france", 250, "Marque éditoriale", "Une direction artistique cohérente augmente la désirabilité."],
      ["Bastide Saint-Honorat", "Alpes-Maritimes", "france", 180, "Art de vivre", "Terroir, vaisselle, gestes et senteurs construisent aussi le luxe."],
    ].map((row, index) => ({ index: index + 1, name: row[0], location: row[1], scope: row[2], price: row[3], model: row[4], lesson: row[5] }));

    let activeScenario = "recommended";
    const read = () => Object.fromEntries(Array.from(form.elements).filter((field) => field.name).map((field) => [field.name, field.value]));
    const number = (v, key) => Number(v[key] || 0);
    function setValues(next) { Object.entries(next).forEach(([key, value]) => { const field = form.elements.namedItem(key); if (field) field.value = String(value); }); }
    function output(key, value) { document.querySelectorAll(`[data-output="${key}"]`).forEach((node) => { node.textContent = value; }); }

    function calculate(v) {
      const nightsPerSuite = number(v, "nightsPerSuite");
      const occupiedNights = nightsPerSuite * fixed.suites;
      const stays = occupiedNights / Math.max(1, number(v, "averageStay"));
      const spaBookings = stays * number(v, "spaTake") / 100;
      const diningBookings = stays * number(v, "diningTake") / 100;
      const lodgingRevenue = occupiedNights * number(v, "averageNightPrice");
      const spaRevenue = spaBookings * number(v, "spaBasket");
      const diningRevenue = diningBookings * number(v, "diningBasket");
      const revenue = lodgingRevenue + spaRevenue + diningRevenue;

      const commission = lodgingRevenue * (1 - number(v, "directShare") / 100) * number(v, "otaCommission") / 100;
      const turnover = stays * number(v, "turnoverCost");
      const breakfast = occupiedNights * fixed.averageGuests * number(v, "breakfastCost");
      const energy = occupiedNights * number(v, "energyCost");
      const spaDirect = spaBookings * number(v, "spaUnitCost");
      const diningDirect = diningBookings * number(v, "diningUnitCost");
      const misc = revenue * number(v, "miscRate") / 100;
      const variableCosts = commission + turnover + breakfast + energy + spaDirect + diningDirect + misc;
      const contribution = revenue - variableCosts;

      const operationsHours = 720 + occupiedNights * 0.65 + stays + spaBookings * 0.75 + diningBookings * 4.5;
      const calendarRelief = 80 + nightsPerSuite * 0.5;
      const supportHours = Math.max(calendarRelief, operationsHours - fixed.julesUsefulHours, 0);
      const partTimeFte = Math.max(0.2, Math.ceil(supportHours / fixed.annualHours * 10) / 10);
      const supportCost = v.supportMode === "parttime" ? fixed.julesCost * partTimeFte : supportHours * number(v, "supportHourlyRate");
      const reserve = number(v, "operatingReserve");
      const rentCapacity = contribution - fixed.julesCost - supportCost - reserve;
      const rent = Math.max(0, rentCapacity);
      const deficit = Math.max(0, -rentCapacity);
      const presenceDays = Math.min(275, Math.max(nightsPerSuite, occupiedNights - nightsPerSuite * 0.8));
      return { nightsPerSuite, occupiedNights, stays, spaBookings, diningBookings, lodgingRevenue, spaRevenue, diningRevenue, revenue, commission, turnover, breakfast, energy, spaDirect, diningDirect, misc, variableCosts, contribution, operationsHours, calendarRelief, supportHours, partTimeFte, supportCost, reserve, rent, deficit, presenceDays };
    }

    const pnlRows = [
      ["Hébergement", "lodgingRevenue", "revenue"], ["Bien-être", "spaRevenue", "revenue"], ["Table d’hôte", "diningRevenue", "revenue"], ["Chiffre d’affaires", "revenue", "subtotal"],
      ["Commissions plateformes", "commission", "cost"], ["Rotation ménage, linge & accueil", "turnover", "cost"], ["Petit-déjeuner", "breakfast", "cost"], ["Énergie", "energy", "cost"], ["Coûts directs spa", "spaDirect", "cost"], ["Coûts directs table", "diningDirect", "cost"], ["Charges diverses", "misc", "cost"], ["Marge avant emploi", "contribution", "subtotal"],
      ["CDI Jules — budget employeur", "julesCost", "fixed"], ["Renfort / relève", "supportCost", "fixed"], ["Réserve d’exploitation", "reserve", "fixed"], ["Loyer SCI automatique", "rent", "fixed"], ["Déficit à financer", "deficit", "total"],
    ];

    function renderPnl(data) {
      const values = { ...data, julesCost: fixed.julesCost };
      document.querySelector("[data-pnl]").innerHTML = `<div class="pilotage-pnl__head"><span>Compte de résultat annuel</span><strong>Montant</strong></div>${pnlRows.map(([label, key, kind]) => `<div class="pilotage-pnl__row ${kind}"><span>${label}</span><strong>${money(values[key])}</strong></div>`).join("")}`;
    }

    function render() {
      const v = read(); const data = calculate(v);
      output("scenario-name", scenarioNames[activeScenario] || scenarioNames.custom);
      output("revenue", money(data.revenue));
      output("revenue-mix", `${percent(data.lodgingRevenue / Math.max(1, data.revenue))} hébergement · ${percent((data.spaRevenue + data.diningRevenue) / Math.max(1, data.revenue))} expériences`);
      output("rent", money(data.rent));
      output("employment", money(fixed.julesCost + data.supportCost));
      output("support-summary", v.supportMode === "parttime" ? `CDI Jules + ${data.partTimeFte.toFixed(1).replace(".", ",")} ETP` : `CDI Jules + ${integer(data.supportHours)} h sous-traitées`);
      output("reserve", money(data.reserve));
      output("contribution", money(data.contribution));
      output("support-cost", money(data.supportCost));
      output("support-hours", `${integer(data.supportHours)} h/an`);
      output("presence-days", `${integer(data.presenceDays)} jours/an`);
      output("deficit", data.deficit ? money(data.deficit) : "0 €");
      output("operations-hours", `${integer(data.operationsHours)} h/an`);
      output("operations-copy", `${percent(data.operationsHours / fixed.julesUsefulHours)} de la capacité utile de Jules avant organisation de la relève.`);

      const staffingTitle = v.supportMode === "parttime" ? `${data.partTimeFte.toFixed(1).replace(".", ",")} ETP complémentaire` : `${integer(data.supportHours)} h sous-traitées`;
      const staffingCopy = v.supportMode === "parttime" ? `Budget estimé à ${money(data.supportCost)} au prorata d’un coût employeur annuel de 28 k€ au SMIC.` : `Budget estimé à ${money(data.supportCost)}, au tarif de ${money(number(v, "supportHourlyRate"))} par heure.`;
      output("staffing-title", staffingTitle); output("staffing-copy", staffingCopy);

      const verdict = document.querySelector("[data-verdict]");
      if (data.deficit > 0) { verdict.className = "pilotage-verdict negative"; verdict.innerHTML = `<strong>Activité insuffisante.</strong><span>Après un loyer SCI ramené à zéro, il manque encore ${money(data.deficit)} pour financer emploi, relève et réserve.</span>`; }
      else if (data.rent < 12000) { verdict.className = "pilotage-verdict warn"; verdict.innerHTML = `<strong>Équilibre opérationnel, contribution limitée.</strong><span>Le modèle finance l’emploi et la réserve, mais seulement ${money(data.rent)} de loyer SCI.</span>`; }
      else { verdict.className = "pilotage-verdict positive"; verdict.innerHTML = `<strong>Modèle équilibré.</strong><span>L’emploi, la relève et ${money(data.reserve)} de réserve sont financés ; ${money(data.rent)} peuvent contribuer à la SCI.</span>`; }
      document.querySelector("[data-hourly-field]").hidden = v.supportMode !== "subcontract";
      document.querySelectorAll("[data-pilotage-scenario]").forEach((button) => button.classList.toggle("active", button.dataset.pilotageScenario === activeScenario));
      renderPnl(data);
    }

    function showPanel(key, updateHash) {
      document.querySelectorAll("[data-pilotage-panel]").forEach((panel) => { panel.hidden = panel.dataset.pilotagePanel !== key; });
      document.querySelectorAll("[data-pilotage-tab]").forEach((button) => { const active = button.dataset.pilotageTab === key; button.classList.toggle("active", active); button.setAttribute("aria-selected", String(active)); });
      if (updateHash) window.history.replaceState({}, "", `#${key}`);
      window.scrollTo({ top: document.querySelector(".pilotage-tabs").offsetTop - 12, behavior: "smooth" });
    }
    document.querySelectorAll("[data-pilotage-tab]").forEach((button) => button.addEventListener("click", () => showPanel(button.dataset.pilotageTab, true)));
    document.querySelectorAll("[data-pilotage-scenario]").forEach((button) => button.addEventListener("click", function () { activeScenario = button.dataset.pilotageScenario; if (scenarios[activeScenario]) setValues(scenarios[activeScenario]); render(); }));
    form.addEventListener("input", () => { activeScenario = "custom"; render(); });
    document.querySelector("[data-pilotage-reset]").addEventListener("click", () => { activeScenario = "recommended"; setValues(scenarios.recommended); window.history.replaceState({}, "", "#simulateur"); render(); });
    document.querySelector("[data-pilotage-share]").addEventListener("click", async () => {
      const params = new URLSearchParams({ scenario: activeScenario }); Object.entries(read()).forEach(([key, value]) => params.set(key, value));
      const url = `${window.location.origin}${window.location.pathname}?${params.toString()}#simulateur`;
      try { await navigator.clipboard.writeText(url); toast("Le lien du scénario est copié."); } catch (_) { window.prompt("Copiez ce lien :", url); }
    });
    const params = new URLSearchParams(window.location.search);
    if (params.size) { const next = {}; Array.from(form.elements).filter((field) => field.name && params.has(field.name)).forEach((field) => { next[field.name] = params.get(field.name); }); setValues(next); activeScenario = params.get("scenario") || "custom"; }

    const marketScope = document.querySelector("[data-market-scope]"); const competitorSelect = document.querySelector("[data-competitor-select]");
    competitors.forEach((item) => { const option = document.createElement("option"); option.value = String(item.index - 1); option.textContent = `${String(item.index).padStart(2, "0")} · ${item.name} · ${item.price} €`; competitorSelect.appendChild(option); });
    function renderCompetitor(index) { const item = competitors[index] || competitors[0]; document.querySelector("[data-competitor-detail]").innerHTML = `<span>${String(item.index).padStart(2, "0")} · ${item.model}</span><h3>${item.name}</h3><p>${item.location}</p><strong>${item.price} €</strong><blockquote>${item.lesson}</blockquote>`; }
    function renderMarket() { const scope = marketScope.value; const list = competitors.filter((item) => scope === "all" || item.scope === scope).sort((a, b) => a.price - b.price); document.querySelector("[data-market-chart]").innerHTML = list.map((item) => `<button type="button" data-market-index="${item.index - 1}"><span>${item.name}</span><i><b style="width:${item.price / 5}%"></b></i><strong>${item.price} €</strong></button>`).join(""); document.querySelectorAll("[data-market-index]").forEach((button) => button.addEventListener("click", () => { competitorSelect.value = button.dataset.marketIndex; renderCompetitor(Number(button.dataset.marketIndex)); })); }
    marketScope.addEventListener("change", renderMarket); competitorSelect.addEventListener("change", () => renderCompetitor(Number(competitorSelect.value))); renderMarket(); renderCompetitor(0);

    const roadmapKey = "csl-pilotage-roadmap-v3"; const roadmapTasks = Array.from(document.querySelectorAll("[data-roadmap-task]")); let roadmapState = {};
    try { roadmapState = JSON.parse(localStorage.getItem(roadmapKey) || "{}"); } catch (_) {}
    function renderRoadmap() { roadmapTasks.forEach((box) => { box.checked = Boolean(roadmapState[box.dataset.roadmapTask]); }); const done = roadmapTasks.filter((box) => box.checked).length; const value = roadmapTasks.length ? Math.round(done / roadmapTasks.length * 100) : 0; document.querySelector("[data-roadmap-progress]").textContent = `${value} %`; document.querySelector("[data-roadmap-progress-bar]").style.width = `${value}%`; }
    roadmapTasks.forEach((box) => box.addEventListener("change", () => { roadmapState[box.dataset.roadmapTask] = box.checked; localStorage.setItem(roadmapKey, JSON.stringify(roadmapState)); renderRoadmap(); }));

    render(); renderRoadmap();
    const requested = window.location.hash.replace("#", ""); if (["simulateur", "marche", "investissements", "plan", "referentiel"].includes(requested)) showPanel(requested, false);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true }); else start();
})();
