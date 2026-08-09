(function () {
  function start() {
    const form = document.querySelector("[data-pilotage-form]");
    if (!form) return;

    const money = window.CSLDemo?.money || ((value) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Number(value || 0)));
    const integer = (value) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Number(value || 0));
    const percent = (value) => new Intl.NumberFormat("fr-FR", { style: "percent", maximumFractionDigits: 0 }).format(Number(value || 0));
    const toast = window.CSLDemo?.toast || ((message) => window.alert(message));

    const fixed = { suites: 2, averageGuests: 2.1, annualHours: 1607, capex: 65000 };
    const scenarioNames = { recommended: "Plein temps sous contraintes", custom: "Scénario libre" };
    const scenarios = {
      recommended: {
        nightsPerSuite: "150", averageNightPrice: "220", averageStay: "2.5", directShare: "50",
        spaTake: "66", spaBasket: "100", diningTake: "33", diningBasket: "200",
        vatMode: "vat", diningAlcoholShare: "20", otaCommission: "15", directPaymentRate: "1.5",
        turnoverCost: "30", turnoverInternalHours: "4", breakfastCost: "7", energyCost: "7", spaUnitCost: "25", spaLaborHours: "1", diningCostRate: "30", diningLaborHours: "4.5", incidentRate: "0.5",
        fixedInsurance: "1500", fixedAccounting: "2000", fixedDigital: "1800", fixedMarketing: "1000", fixedTaxes: "700", fixedBank: "400", fixedSafety: "600", fixedTechnical: "2000", fixedSpa: "1300", fixedUtilities: "1200", fixedTraining: "500", fixedVatRecovery: "2000",
        julesFte: "1", employeeMonths: "12", supportMode: "subcontract", supportHourlyRate: "25", supportEmployeeMonths: "12", plannedSupportHours: "350", familyHours: "100", renewalProvision: "2500", cashReserveContribution: "2500", contractRent: "0", julesFullTimeCost: "28000",
      },
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

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const roundTo = (value, step) => Math.round(value / step) * step;

    function calculate(v, overrides) {
      const next = { ...v, ...(overrides || {}) };
      const nightsPerSuite = number(next, "nightsPerSuite");
      const occupiedNights = nightsPerSuite * fixed.suites;
      const stays = occupiedNights / Math.max(1, number(next, "averageStay"));
      const spaBookings = stays * number(next, "spaTake") / 100;
      const diningBookings = stays * number(next, "diningTake") / 100;
      const lodgingRevenueTtc = occupiedNights * number(next, "averageNightPrice");
      const spaRevenueTtc = spaBookings * number(next, "spaBasket");
      const diningRevenueTtc = diningBookings * number(next, "diningBasket");
      const revenueTtc = lodgingRevenueTtc + spaRevenueTtc + diningRevenueTtc;

      const vatMode = next.vatMode === "vat" ? "vat" : "franchise";
      const alcoholShare = clamp(number(next, "diningAlcoholShare") / 100, 0, 1);
      const lodgingRevenue = vatMode === "vat" ? lodgingRevenueTtc / 1.1 : lodgingRevenueTtc;
      const spaRevenue = vatMode === "vat" ? spaRevenueTtc / 1.2 : spaRevenueTtc;
      const diningRevenue = vatMode === "vat" ? diningRevenueTtc * (1 - alcoholShare) / 1.1 + diningRevenueTtc * alcoholShare / 1.2 : diningRevenueTtc;
      const accountingRevenue = lodgingRevenue + spaRevenue + diningRevenue;
      const collectedVat = revenueTtc - accountingRevenue;

      const commission = lodgingRevenueTtc * (1 - number(next, "directShare") / 100) * number(next, "otaCommission") / 100;
      const directReceipts = lodgingRevenueTtc * number(next, "directShare") / 100 + spaRevenueTtc + diningRevenueTtc;
      const paymentFees = directReceipts * number(next, "directPaymentRate") / 100;
      const turnoverTtc = stays * number(next, "turnoverCost");
      const breakfastTtc = occupiedNights * fixed.averageGuests * number(next, "breakfastCost");
      const energyTtc = occupiedNights * number(next, "energyCost");
      const spaDirectTtc = spaBookings * number(next, "spaUnitCost");
      const diningDirectTtc = diningRevenueTtc * number(next, "diningCostRate") / 100;
      const turnover = vatMode === "vat" ? turnoverTtc / 1.2 : turnoverTtc;
      const breakfast = vatMode === "vat" ? breakfastTtc / 1.1 : breakfastTtc;
      const energy = vatMode === "vat" ? energyTtc / 1.2 : energyTtc;
      const spaDirect = vatMode === "vat" ? spaDirectTtc / 1.2 : spaDirectTtc;
      const diningDirect = vatMode === "vat" ? diningDirectTtc / 1.1 : diningDirectTtc;
      const incidents = accountingRevenue * number(next, "incidentRate") / 100;
      const variableCosts = commission + paymentFees + turnover + breakfast + energy + spaDirect + diningDirect + incidents;
      const contribution = accountingRevenue - variableCosts;

      const fixedKeys = ["fixedInsurance", "fixedAccounting", "fixedDigital", "fixedMarketing", "fixedTaxes", "fixedBank", "fixedSafety", "fixedTechnical", "fixedSpa", "fixedUtilities", "fixedTraining"];
      const fixedCostsTtc = fixedKeys.reduce((sum, key) => sum + number(next, key), 0);
      const fixedVatRecovery = vatMode === "vat" ? Math.min(fixedCostsTtc, number(next, "fixedVatRecovery")) : 0;
      const fixedCosts = fixedCostsTtc - fixedVatRecovery;

      const presenceDays = Math.min(275, nightsPerSuite * 1.2);
      const baseHours = 720;
      const presenceHours = presenceDays * 1.75;
      const suiteNightHours = occupiedNights * 0.5;
      const coordinationHours = stays;
      const turnoverHours = stays * number(next, "turnoverInternalHours");
      const spaHours = spaBookings * number(next, "spaLaborHours");
      const diningHours = diningBookings * number(next, "diningLaborHours");
      const operationsHours = baseHours + presenceHours + suiteNightHours + coordinationHours + turnoverHours + spaHours + diningHours;
      const calendarRelief = nightsPerSuite > 0 ? clamp(roundTo(100 + nightsPerSuite * 2, 50), 250, 500) : 0;
      const familyHours = number(next, "familyHours");
      const julesFte = clamp(number(next, "julesFte"), 0, 1);
      const employeeMonths = clamp(number(next, "employeeMonths"), 0, 12);
      const julesFullTimeCost = number(next, "julesFullTimeCost");
      const paidCapacity = fixed.annualHours * julesFte * employeeMonths / 12;
      const workloadRelief = Math.max(0, operationsHours - paidCapacity - familyHours);
      const calendarSupportNeed = Math.max(0, calendarRelief - familyHours);
      const recommendedSupportHours = Math.max(calendarSupportNeed, workloadRelief);
      const supportHours = Math.max(0, number(next, "plannedSupportHours"));
      const supportGap = Math.max(0, recommendedSupportHours - supportHours);
      const supportEmployeeMonths = clamp(number(next, "supportEmployeeMonths"), 0, 12);
      const partTimeAnnualCapacity = fixed.annualHours * supportEmployeeMonths / 12;
      const partTimeFte = supportHours > 0 && partTimeAnnualCapacity > 0 ? Math.max(0.2, Math.ceil(supportHours / partTimeAnnualCapacity * 20) / 20) : 0;
      const supportCost = next.supportMode === "parttime" ? julesFullTimeCost * partTimeFte * supportEmployeeMonths / 12 : supportHours * number(next, "supportHourlyRate");
      const julesCost = julesFullTimeCost * julesFte * employeeMonths / 12;
      const operatingResultBeforeRent = contribution - fixedCosts - julesCost - supportCost;
      const contractRent = number(next, "contractRent");
      const operatingResultAfterRent = operatingResultBeforeRent - contractRent;
      const renewalProvision = number(next, "renewalProvision");
      const cashReserveContribution = number(next, "cashReserveContribution");
      const cashResult = operatingResultAfterRent - renewalProvision - cashReserveContribution;
      const rentCapacity = Math.max(0, operatingResultBeforeRent - renewalProvision - cashReserveContribution);
      const recoveredVat = (turnoverTtc - turnover) + (breakfastTtc - breakfast) + (energyTtc - energy) + (spaDirectTtc - spaDirect) + (diningDirectTtc - diningDirect) + fixedVatRecovery;
      const netVat = collectedVat - recoveredVat;

      const julesAssignedHours = Math.max(0, operationsHours - supportHours - familyHours);
      return { nightsPerSuite, occupiedNights, stays, spaBookings, diningBookings, lodgingRevenueTtc, spaRevenueTtc, diningRevenueTtc, revenueTtc, lodgingRevenue, spaRevenue, diningRevenue, accountingRevenue, collectedVat, recoveredVat, netVat, commission, paymentFees, turnover, breakfast, energy, spaDirect, diningDirect, incidents, variableCosts, contribution, fixedCostsTtc, fixedVatRecovery, fixedCosts, presenceDays, baseHours, presenceHours, suiteNightHours, coordinationHours, turnoverHours, spaHours, diningHours, operationsHours, calendarRelief, calendarSupportNeed, workloadRelief, recommendedSupportHours, supportHours, supportGap, supportEmployeeMonths, partTimeFte, supportCost, familyHours, julesFte, paidCapacity, julesAssignedHours, julesCost, operatingResultBeforeRent, contractRent, operatingResultAfterRent, renewalProvision, cashReserveContribution, cashResult, rentCapacity };
    }

    const pnlRows = [
      ["Ventes publiques TTC · hébergement", "lodgingRevenueTtc", "revenue"], ["Ventes publiques TTC · bien-être", "spaRevenueTtc", "revenue"], ["Ventes publiques TTC · table", "diningRevenueTtc", "revenue"], ["Ventes publiques TTC", "revenueTtc", "subtotal"],
      ["TVA collectée estimée", "collectedVat", "cost"], ["Produits comptables simulés", "accountingRevenue", "subtotal"],
      ["Commissions plateformes", "commission", "cost"], ["Encaissements directs", "paymentFees", "cost"], ["Linge et consommables de rotation", "turnover", "cost"], ["Petit-déjeuner", "breakfast", "cost"], ["Énergie marginale", "energy", "cost"], ["Coûts directs spa", "spaDirect", "cost"], ["Matières table", "diningDirect", "cost"], ["Impayés et gestes", "incidents", "cost"], ["Marge contributive", "contribution", "subtotal"],
      ["Charges fixes analytiques · net TVA simulée", "fixedCosts", "fixed"], ["Jules — budget employeur financé", "julesCost", "fixed"], ["Relève rémunérée", "supportCost", "fixed"], ["Résultat avant loyer SCI", "operatingResultBeforeRent", "subtotal"], ["Loyer SCI contractuel testé", "contractRent", "fixed"], ["Résultat d’exploitation simplifié", "operatingResultAfterRent", "subtotal"],
      ["Enveloppe de renouvellement", "renewalProvision", "cash"], ["Dotation de trésorerie", "cashReserveContribution", "cash"], ["Solde de trésorerie prudent", "cashResult", "total"],
    ];

    function renderPnl(data) {
      document.querySelector("[data-pnl]").innerHTML = `<div class="pilotage-pnl__head"><span>Exploitation annuelle simplifiée</span><strong>Montant</strong></div>${pnlRows.map(([label, key, kind]) => `<div class="pilotage-pnl__row ${kind}"><span>${label}</span><strong>${money(data[key])}</strong></div>`).join("")}`;
    }

    function render() {
      const v = read(); const data = calculate(v);
      const fullTime = calculate(v, { julesFte: "1", contractRent: "10000" });
      output("scenario-name", scenarioNames[activeScenario] || scenarioNames.custom);
      output("revenue-ttc", money(data.revenueTtc));
      output("accounting-revenue", money(data.accountingRevenue));
      output("revenue-mix", `${percent(data.lodgingRevenueTtc / Math.max(1, data.revenueTtc))} hébergement · ${percent((data.spaRevenueTtc + data.diningRevenueTtc) / Math.max(1, data.revenueTtc))} expériences`);
      const vatLabel = data.netVat >= 0 ? `TVA nette estimée ${money(data.netVat)}` : `Crédit de TVA estimé ${money(Math.abs(data.netVat))}`;
      output("vat-summary", v.vatMode === "vat" ? `${vatLabel} · taux spa à confirmer` : "Franchise simulée · aucune TVA récupérée");
      output("cash-result", money(data.cashResult));
      output("employment", money(data.julesCost + data.supportCost));
      output("support-summary", `${data.julesFte.toFixed(2).replace(".", ",")} ETP Jules + ${integer(data.supportHours)} h de relève`);
      output("fixed-total-ttc", money(data.fixedCostsTtc));
      output("fixed-total-net", money(data.fixedCosts));
      output("pre-rent-result", money(data.operatingResultBeforeRent));
      output("contract-rent", money(data.contractRent));
      output("rent-capacity", money(data.rentCapacity));
      output("jules-cost", `${money(data.julesCost)} · ${data.julesFte.toFixed(2).replace(".", ",")} ETP`);
      output("support-hours", `${integer(data.supportHours)} h · ${money(data.supportCost)}`);
      output("support-recommended", `${integer(data.recommendedSupportHours)} h/an`);
      output("support-gap", data.supportGap > 0 ? `${integer(data.supportGap)} h non couvertes` : "0 h · couverture déclarée");
      output("family-hours", `${integer(data.familyHours)} h/an`);
      output("operations-hours", `${integer(data.operationsHours)} h/an`);
      output("operations-copy", `${integer(data.presenceDays)} jours de présence estimés · ${integer(data.paidCapacity)} h de capacité payée pour Jules.`);
      output("fulltime-gap", fullTime.cashResult < 0 ? `− ${money(Math.abs(fullTime.cashResult))}` : `+ ${money(fullTime.cashResult)}`);

      const staffingTitle = data.supportGap > 0 ? `${integer(data.supportGap)} h à couvrir` : "Couverture déclarée complète";
      const supportForm = v.supportMode === "parttime" ? `${data.partTimeFte.toFixed(2).replace(".", ",")} ETP de relève` : `${integer(data.supportHours)} h rémunérées`;
      const staffingCopy = `${integer(data.calendarRelief)} h de plancher calendaire brut ; ${supportForm} et ${integer(data.familyHours)} h associées. Coût de relève : ${money(data.supportCost)}.`;
      output("staffing-title", staffingTitle); output("staffing-copy", staffingCopy);

      document.querySelector("[data-workload]").innerHTML = `
        <div class="pilotage-workload__head"><span>Décomposition du temps annuel</span><strong>${integer(data.operationsHours)} h à organiser</strong></div>
        <div><span>Socle parc, maintenance & administration</span><strong>${integer(data.baseHours)} h</strong></div>
        <div><span>Présence clients & petits-déjeuners</span><strong>${integer(data.presenceHours)} h</strong></div>
        <div><span>Nuits-suite & communs</span><strong>${integer(data.suiteNightHours)} h</strong></div>
        <div><span>Coordination des séjours</span><strong>${integer(data.coordinationHours)} h</strong></div>
        <div><span>Ménage internalisé</span><strong>${integer(data.turnoverHours)} h</strong></div>
        <div><span>Bien-être</span><strong>${integer(data.spaHours)} h</strong></div>
        <div><span>Table d’hôte</span><strong>${integer(data.diningHours)} h</strong></div>
        <div class="allocation"><span>Jules assigné / capacité payée</span><strong>${integer(data.julesAssignedHours)} / ${integer(data.paidCapacity)} h</strong></div>
        <div class="allocation"><span>Relève rémunérée / aide familiale</span><strong>${integer(data.supportHours)} / ${integer(data.familyHours)} h</strong></div>`;

      const verdict = document.querySelector("[data-verdict]");
      if (data.cashResult < -1000) { verdict.className = "pilotage-verdict negative"; verdict.innerHTML = `<strong>Besoin de financement : ${money(Math.abs(data.cashResult))}.</strong><span>Le loyer saisi, l’emploi, la relève, le renouvellement et la réserve ne sont pas tous couverts.${data.supportGap > 0 ? ` Il manque aussi ${integer(data.supportGap)} h de couverture.` : ""}</span>`; }
      else if (data.supportGap > 0) { verdict.className = "pilotage-verdict warn"; verdict.innerHTML = `<strong>Couverture humaine incomplète.</strong><span>Le budget ne finance pas ${integer(data.supportGap)} h du besoin estimé. Le solde financier n’est donc pas suffisant pour qualifier le scénario de soutenable.</span>`; }
      else if (data.cashResult < 3000) { verdict.className = "pilotage-verdict warn"; verdict.innerHTML = `<strong>Équilibre très serré.</strong><span>Le scénario couvre les heures déclarées, mais ne laisse que ${money(Math.max(0, data.cashResult))} de marge de sécurité supplémentaire.</span>`; }
      else { verdict.className = "pilotage-verdict positive"; verdict.innerHTML = `<strong>Marge de sécurité positive.</strong><span>Après les emplois de trésorerie saisis, le solde atteint ${money(data.cashResult)}. Il ne constitue pas automatiquement un loyer distribuable.</span>`; }
      document.querySelector("[data-hourly-field]").hidden = v.supportMode !== "subcontract";
      document.querySelector("[data-support-months]").hidden = v.supportMode !== "parttime";
      document.querySelectorAll("[data-vat-only]").forEach((label) => {
        const disabled = v.vatMode !== "vat";
        label.classList.toggle("is-disabled", disabled);
        const field = label.querySelector("input, select");
        if (field) field.disabled = disabled;
      });
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
