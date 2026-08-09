(function () {
  function start() {
    const form = document.querySelector("[data-pilotage-form]");
    if (!form) return;

    const money = window.CSLDemo?.money || ((value) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Number(value || 0)));
    const integer = (value) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Number(value || 0));
    const percent = (value) => new Intl.NumberFormat("fr-FR", { style: "percent", maximumFractionDigits: 0 }).format(Number(value || 0));
    const toast = window.CSLDemo?.toast || ((message) => window.alert(message));

    const pricing = {
      launch: { label: "180–220 €", adr: 198 },
      year2: { label: "200–240 €", adr: 220 },
      180: { label: "180 €", adr: 180 },
      200: { label: "200 €", adr: 200 },
      220: { label: "220 €", adr: 220 },
      240: { label: "240 €", adr: 240 },
    };
    const spaOffers = {
      pack40: { label: "Pack unique 40 €", basket: 40, costRate: 0.28, hours: 0.55 },
      pack50: { label: "Pack unique 50 €", basket: 50, costRate: 0.28, hours: 0.6 },
      pack60: { label: "Pack unique 60 €", basket: 60, costRate: 0.28, hours: 0.65 },
      catalog: { label: "Carte signature", basket: 74, costRate: 0.31, hours: 0.75 },
    };
    const scenarioNames = { pilot: "Lancement maîtrisé", balance: "Équilibre recherché", ambition: "Premium installé", custom: "Scénario personnalisé" };
    const scenarios = {
      pilot: { priceProfile1: "launch", nights1: "90", priceProfile2: "year2", nights2: "120", spaOffer: "pack40", spaTake: "30", mealPrice: "40", winePrice: "20", dinnerTake: "15", romanticShare: "0", directShare: "40", salaryCost: "40500", supportMode: "mixed", rent: "18000", otherFixed: "8000", capex: "65000" },
      balance: { priceProfile1: "launch", nights1: "120", priceProfile2: "year2", nights2: "150", spaOffer: "pack50", spaTake: "45", mealPrice: "50", winePrice: "30", dinnerTake: "30", romanticShare: "20", directShare: "55", salaryCost: "40500", supportMode: "mixed", rent: "18000", otherFixed: "8000", capex: "65000" },
      ambition: { priceProfile1: "year2", nights1: "150", priceProfile2: "240", nights2: "180", spaOffer: "catalog", spaTake: "60", mealPrice: "60", winePrice: "40", dinnerTake: "45", romanticShare: "40", directShare: "70", salaryCost: "40500", supportMode: "second", rent: "18000", otherFixed: "10000", capex: "65000" },
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

    let activeScenario = "balance";
    const read = () => Object.fromEntries(Array.from(form.elements).filter((field) => field.name).map((field) => [field.name, field.value]));
    const number = (v, key) => Number(v[key] || 0);
    function setValues(next) { Object.entries(next).forEach(([key, value]) => { const field = form.elements.namedItem(key); if (field) field.value = String(value); }); }
    function output(key, value) { document.querySelectorAll(`[data-output="${key}"]`).forEach((node) => { node.textContent = value; }); }

    function supportHoursFor(nights, totalHours) {
      const calendarRelief = nights <= 90 ? 180 : nights <= 120 ? 320 : nights <= 150 ? 520 : 760;
      return Math.max(calendarRelief, Math.max(0, totalHours - 1350));
    }

    function calculate(v, year, overrideNights) {
      const profile = pricing[v[`priceProfile${year}`]] || pricing.launch;
      const nights = overrideNights ?? number(v, `nights${year}`);
      const occupiedNights = nights * 2;
      const los = 2.1;
      const avgGuests = 2.1;
      const stays = occupiedNights / los;
      const spa = spaOffers[v.spaOffer] || spaOffers.pack50;
      const spaBookings = stays * number(v, "spaTake") / 100;
      const dinnerBookings = stays * number(v, "dinnerTake") / 100;
      const romanticBookings = dinnerBookings * number(v, "romanticShare") / 100;
      const regularDinnerBookings = dinnerBookings - romanticBookings;
      const lodgingRevenue = occupiedNights * profile.adr;
      const spaRevenue = spaBookings * spa.basket;
      const regularDinnerBasket = number(v, "mealPrice") * avgGuests + number(v, "winePrice") * 2 * 0.65;
      const tableRevenue = regularDinnerBookings * regularDinnerBasket;
      const romanticRevenue = romanticBookings * 90;
      const revenue = lodgingRevenue + spaRevenue + tableRevenue + romanticRevenue;

      const commission = lodgingRevenue * (1 - number(v, "directShare") / 100) * 0.15;
      const turnover = stays * 66;
      const breakfast = occupiedNights * avgGuests * 7;
      const energy = occupiedNights * 7.5;
      const spaDirect = spaRevenue * spa.costRate;
      const tableDirect = tableRevenue * 0.35 + romanticRevenue * 0.32;
      const variableCosts = commission + turnover + breakfast + energy + spaDirect + tableDirect;
      const contribution = revenue - variableCosts;

      const operationsHours = stays * 3 + occupiedNights * 0.65 + stays * 1 + spaBookings * spa.hours + dinnerBookings * 4.5 + 420 + 300;
      const supportHours = supportHoursFor(nights, operationsHours);
      const supportCost = v.supportMode === "second" ? 40500 : v.supportMode === "mixed" ? supportHours * 25 : 0;
      const fixedCosts = number(v, "rent") + number(v, "salaryCost") + number(v, "otherFixed") + supportCost;
      const result = contribution - fixedCosts;
      return { year, profile, nights, occupiedNights, stays, lodgingRevenue, spaRevenue, tableRevenue, romanticRevenue, revenue, commission, turnover, breakfast, energy, spaDirect, tableDirect, variableCosts, contribution, operationsHours, supportHours, supportCost, fixedCosts, result };
    }

    function findBreakEven(v) {
      if (calculate(v, 2, 275).result < 0) return null;
      let low = 0; let high = 275;
      for (let i = 0; i < 35; i += 1) { const mid = (low + high) / 2; if (calculate(v, 2, mid).result >= 0) high = mid; else low = mid; }
      return Math.ceil(high);
    }

    const pnlRows = [
      ["Hébergement", "lodgingRevenue", "revenue"], ["Bien-être", "spaRevenue", "revenue"], ["Table classique", "tableRevenue", "revenue"], ["Dîner romantique", "romanticRevenue", "revenue"], ["Chiffre d’affaires", "revenue", "subtotal"],
      ["Commissions plateformes", "commission", "cost"], ["Remise en état", "turnover", "cost"], ["Petit-déjeuner", "breakfast", "cost"], ["Énergie", "energy", "cost"], ["Coûts directs spa", "spaDirect", "cost"], ["Coûts directs table", "tableDirect", "cost"], ["Marge contributive", "contribution", "subtotal"],
      ["Loyer SCI", "rent", "fixed"], ["Poste Jules — coût employeur", "salary", "fixed"], ["Renfort / relève", "supportCost", "fixed"], ["Autres frais fixes", "other", "fixed"], ["Résultat d’exploitation simplifié", "result", "total"],
    ];

    function renderPnl(y1, y2, v) {
      const enrich = (data) => ({ ...data, rent: number(v, "rent"), salary: number(v, "salaryCost"), other: number(v, "otherFixed") });
      const a = enrich(y1); const b = enrich(y2);
      document.querySelector("[data-pnl]").innerHTML = `<div class="pilotage-pnl__head"><span>Compte de résultat</span><strong>Année 1</strong><strong>Année 2</strong></div>${pnlRows.map(([label, key, kind]) => `<div class="pilotage-pnl__row ${kind}"><span>${label}</span><strong>${money(a[key])}</strong><strong>${money(b[key])}</strong></div>`).join("")}`;
    }

    function render() {
      const v = read(); const y1 = calculate(v, 1); const y2 = calculate(v, 2); const breakEven = findBreakEven(v);
      const payback = y2.result > 0 ? number(v, "capex") / y2.result : null;
      output("scenario-name", scenarioNames[activeScenario] || scenarioNames.custom);
      output("y1-revenue", money(y1.revenue)); output("y1-result", money(y1.result)); output("y1-adr", `${y1.profile.label} · prix moyen ${money(y1.profile.adr)}`);
      output("y2-revenue", money(y2.revenue)); output("y2-result", money(y2.result)); output("y2-adr", `${y2.profile.label} · prix moyen ${money(y2.profile.adr)}`);
      output("trajectory-note", `${money(y2.revenue - y1.revenue)} de CA entre les deux années`);
      output("y2-experience-share", percent((y2.spaRevenue + y2.tableRevenue + y2.romanticRevenue) / Math.max(1, y2.revenue)));
      output("break-even", breakEven === null ? "hors capacité" : `${breakEven} nuits/suite`);
      output("y2-hours", `${integer(y2.operationsHours)} h · ${percent(y2.operationsHours / 1350)} d’une capacité utile`);
      output("y2-support", `${integer(y2.supportHours)} h/an`);
      output("payback", payback ? `${payback.toFixed(1).replace(".", ",")} ans` : "non financé par ce scénario");
      output("family-hours", v.supportMode === "family" ? `${integer(y2.supportHours)} h/an` : `${integer(Math.max(0, y2.supportHours - (v.supportMode === "second" ? 1350 : y2.supportHours)))} h non financées`);

      let staffingTitle; let staffingCopy;
      if (number(v, "nights2") <= 90) { staffingTitle = "Possible, avec une relève formalisée."; staffingCopy = "Le volume reste compatible avec un poste central, mais pas avec une disponibilité solitaire sept jours sur sept."; }
      else if (number(v, "nights2") <= 120) { staffingTitle = "Un ETP + 0,2 à 0,3 ETP."; staffingCopy = "Prévoir des week-ends, congés et pics couverts par la famille, du saisonnier ou de la sous-traitance."; }
      else if (number(v, "nights2") <= 150) { staffingTitle = "Un ETP + 0,4 à 0,6 ETP."; staffingCopy = "La table et le parc rendent une relève régulière nécessaire, même si le total annuel paraît tenir."; }
      else { staffingTitle = "Une seconde force devient structurelle."; staffingCopy = "À 180 nuits par suite, saisonnier long, second poste ou externalisation du ménage/parc doivent être arbitrés."; }
      output("staffing-title", staffingTitle); output("staffing-copy", staffingCopy);

      const verdict = document.querySelector("[data-verdict]");
      if (y2.result >= 10000) { verdict.className = "pilotage-verdict positive"; verdict.innerHTML = `<strong>Modèle finançable.</strong><span>Le loyer SCI et l’emploi sont couverts, avec ${money(y2.result)} avant fiscalité et financement.</span>`; }
      else if (y2.result >= 0) { verdict.className = "pilotage-verdict warn"; verdict.innerHTML = `<strong>Équilibre fragile.</strong><span>${money(y2.result)} restent avant aléas, dette et fiscalité : la marge de sécurité est faible.</span>`; }
      else { verdict.className = "pilotage-verdict negative"; verdict.innerHTML = `<strong>Obligations non couvertes.</strong><span>Il manque ${money(Math.abs(y2.result))}. Le volume, le prix net, les expériences ou l’organisation doivent évoluer.</span>`; }
      document.querySelectorAll("[data-pilotage-scenario]").forEach((button) => button.classList.toggle("active", button.dataset.pilotageScenario === activeScenario));
      renderPnl(y1, y2, v);
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
    document.querySelector("[data-pilotage-reset]").addEventListener("click", () => { activeScenario = "balance"; setValues(scenarios.balance); window.history.replaceState({}, "", "#simulateur"); render(); });
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
