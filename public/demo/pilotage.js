(function () {
  function start() {
    const form = document.querySelector("[data-pilotage-form]");
    if (!form) return;

    const money = window.CSLDemo?.money || ((value) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Number(value || 0)));
    const integer = (value) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Number(value || 0));
    const percent = (value) => new Intl.NumberFormat("fr-FR", { style: "percent", maximumFractionDigits: 0 }).format(Number(value || 0));
    const toast = window.CSLDemo?.toast || ((message) => window.alert(message));

    const fixed = { suites: 2, averageGuests: 2.1, annualHours: 1607, capex: 59000 };
    const scenarioNames = { standard: "Modèle annuel standard", custom: "Hypothèses ajustées" };
    const scenarios = {
      standard: {
        nightsPerSuite: "120", averageNightPrice: "200", averageStay: "2.5", directShare: "50",
        spaTake: "75", spaDailyPrice: "50", diningTake: "25", diningDailyPrice: "50",
        vatMode: "franchise", diningAlcoholShare: "50", otaCommission: "15", directPaymentRate: "1.5",
        turnoverCost: "30", turnoverInternalHours: "4", breakfastCost: "6", energyCost: "5", spaUnitCost: "10", spaLaborHours: "1", diningUnitCost: "20", diningLaborHours: "1", incidentRate: "0.2",
        fixedInsurance: "1500", fixedAccounting: "800", fixedDigital: "1500", fixedTaxes: "700", fixedBank: "400", fixedSafety: "600", fixedUtilities: "1200", fixedTraining: "300", fixedVatRecovery: "0",
        baseOperationsHours: "720", julesFte: "0.8", supportMode: "subcontract", supportHourlyRate: "25", plannedSupportHours: "100", familyHours: "380", renewalProvision: "1500", contractRent: "12000", julesFullTimeCost: "28000",
        sciShareholderLoan: "35000", opcoShareholderLoan: "15000", shareholderLoanYears: "5", shareholderLoanRate: "4.33",
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
      ["Château Écrin de Lumière", "Dordogne", "france", 220, "Art de recevoir", "Le petit-déjeuner et l’offre du soir participent autant au luxe perçu que le spa."],
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

    let activeScenario = "standard";
    const read = () => Object.fromEntries(Array.from(form.elements).filter((field) => field.name).map((field) => [field.name, field.value]));
    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
    const number = (v, key) => {
      const raw = Number(v[key] || 0);
      const field = form.elements.namedItem(key);
      const min = field && field.min !== undefined && field.min !== "" ? Number(field.min) : Number.NEGATIVE_INFINITY;
      const max = field && field.max !== undefined && field.max !== "" ? Number(field.max) : Number.POSITIVE_INFINITY;
      return clamp(Number.isFinite(raw) ? raw : 0, min, max);
    };
    function normalizeNumericField(field) {
      if (!field?.name || field.min === undefined || field.max === undefined) return;
      const raw = Number(field.value);
      if (!Number.isFinite(raw)) return;
      const min = field.min !== "" ? Number(field.min) : Number.NEGATIVE_INFINITY;
      const max = field.max !== "" ? Number(field.max) : Number.POSITIVE_INFINITY;
      const normalized = clamp(raw, min, max);
      if (normalized !== raw) field.value = String(normalized);
    }
    function normalizeNumericInputs() {
      Array.from(form.elements).forEach(normalizeNumericField);
    }
    function setValues(next) { Object.entries(next).forEach(([key, value]) => { const field = form.elements.namedItem(key); if (field) field.value = String(value); }); }
    function output(key, value) { document.querySelectorAll(`[data-output="${key}"]`).forEach((node) => { node.textContent = value; }); }

    const roundTo = (value, step) => Math.round(value / step) * step;

    function calculate(v, overrides) {
      const next = { ...v, ...(overrides || {}) };
      const nightsPerSuite = number(next, "nightsPerSuite");
      const occupiedNights = nightsPerSuite * fixed.suites;
      const averageStay = Math.max(1, number(next, "averageStay"));
      const stays = occupiedNights / averageStay;
      const spaTakeRate = clamp(number(next, "spaTake") / 100, 0, 1);
      const diningTakeRate = clamp(number(next, "diningTake") / 100, 0, 1);
      const spaBuyerStays = stays * spaTakeRate;
      const spaSuiteDays = spaBuyerStays * averageStay;
      const diningSales = occupiedNights * diningTakeRate;
      const lodgingRevenueTtc = occupiedNights * number(next, "averageNightPrice");
      const spaRevenueTtc = spaSuiteDays * number(next, "spaDailyPrice");
      const diningRevenueTtc = diningSales * number(next, "diningDailyPrice");
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
      const spaDirectTtc = spaSuiteDays * number(next, "spaUnitCost");
      const diningDirectTtc = diningSales * number(next, "diningUnitCost");
      const turnover = vatMode === "vat" ? turnoverTtc / 1.2 : turnoverTtc;
      const breakfast = vatMode === "vat" ? breakfastTtc / 1.1 : breakfastTtc;
      const energy = vatMode === "vat" ? energyTtc / 1.2 : energyTtc;
      const spaDirect = vatMode === "vat" ? spaDirectTtc / 1.2 : spaDirectTtc;
      const diningDirect = vatMode === "vat" ? diningDirectTtc * (1 - alcoholShare) / 1.1 + diningDirectTtc * alcoholShare / 1.2 : diningDirectTtc;
      const incidents = accountingRevenue * number(next, "incidentRate") / 100;
      const variableCosts = commission + paymentFees + turnover + breakfast + energy + spaDirect + diningDirect + incidents;
      const contribution = accountingRevenue - variableCosts;

      const fixedKeys = ["fixedInsurance", "fixedAccounting", "fixedDigital", "fixedTaxes", "fixedBank", "fixedSafety", "fixedUtilities", "fixedTraining"];
      const fixedCostsTtc = fixedKeys.reduce((sum, key) => sum + number(next, key), 0);
      const fixedVatRecovery = vatMode === "vat" ? Math.min(fixedCostsTtc, number(next, "fixedVatRecovery")) : 0;
      const fixedCosts = fixedCostsTtc - fixedVatRecovery;

      const presenceDays = Math.min(275, nightsPerSuite * 1.2);
      const baseHours = number(next, "baseOperationsHours");
      const presenceHours = presenceDays * 1.75;
      const suiteNightHours = occupiedNights * 0.5;
      const coordinationHours = stays;
      const turnoverHours = stays * number(next, "turnoverInternalHours");
      const suiteUseProbabilityPerPresenceDay = presenceDays > 0 ? clamp(spaSuiteDays / (fixed.suites * presenceDays), 0, 1) : 0;
      const spaOperatingDays = presenceDays * (1 - Math.pow(1 - suiteUseProbabilityPerPresenceDay, fixed.suites));
      const spaHours = spaOperatingDays * number(next, "spaLaborHours");
      const diningHours = diningSales * number(next, "diningLaborHours");
      const operationsHours = baseHours + presenceHours + suiteNightHours + coordinationHours + turnoverHours + spaHours + diningHours;
      const calendarRelief = nightsPerSuite > 0 ? clamp(roundTo(100 + nightsPerSuite * 2, 50), 250, 500) : 0;
      const familyHours = number(next, "familyHours");
      const julesFte = clamp(number(next, "julesFte"), 0, 1);
      const employeeMonths = 12;
      const julesFullTimeCost = number(next, "julesFullTimeCost");
      const paidCapacity = fixed.annualHours * julesFte * employeeMonths / 12;
      const workloadRelief = Math.max(0, operationsHours - paidCapacity - familyHours);
      const calendarSupportNeed = Math.max(0, calendarRelief - familyHours);
      const recommendedSupportHours = Math.max(calendarSupportNeed, workloadRelief);
      const supportHours = Math.max(0, number(next, "plannedSupportHours"));
      const supportEmployeeMonths = 12;
      const partTimeAnnualCapacity = fixed.annualHours;
      const partTimeFte = supportHours > 0 && partTimeAnnualCapacity > 0 ? Math.max(0.2, Math.ceil(supportHours / partTimeAnnualCapacity * 20) / 20) : 0;
      const supportCapacityHours = next.supportMode === "parttime" ? partTimeAnnualCapacity * partTimeFte : supportHours;
      const supportGap = Math.max(0, recommendedSupportHours - supportCapacityHours);
      const supportCost = next.supportMode === "parttime" ? julesFullTimeCost * partTimeFte * supportEmployeeMonths / 12 : supportHours * number(next, "supportHourlyRate");
      const julesCost = julesFullTimeCost * julesFte * employeeMonths / 12;
      const operatingResultBeforeRent = contribution - fixedCosts - julesCost - supportCost;
      const contractRent = number(next, "contractRent");
      const operatingResultAfterRent = operatingResultBeforeRent - contractRent;
      const renewalProvision = number(next, "renewalProvision");
      const cashResult = operatingResultAfterRent - renewalProvision;
      const recoveredVat = (turnoverTtc - turnover) + (breakfastTtc - breakfast) + (energyTtc - energy) + (spaDirectTtc - spaDirect) + (diningDirectTtc - diningDirect) + fixedVatRecovery;
      const netVat = collectedVat - recoveredVat;

      const sciShareholderLoan = Math.max(0, number(next, "sciShareholderLoan"));
      const opcoShareholderLoan = Math.max(0, number(next, "opcoShareholderLoan"));
      const shareholderLoanYears = Math.max(1, number(next, "shareholderLoanYears"));
      const shareholderLoanRate = Math.max(0, number(next, "shareholderLoanRate")) / 100;
      const sciPrincipalRepayment = sciShareholderLoan / shareholderLoanYears;
      const opcoPrincipalRepayment = opcoShareholderLoan / shareholderLoanYears;
      const sciFirstYearInterest = sciShareholderLoan * shareholderLoanRate;
      const opcoFirstYearInterest = opcoShareholderLoan * shareholderLoanRate;
      const sciFirstYearDebtService = sciPrincipalRepayment + sciFirstYearInterest;
      const opcoFirstYearDebtService = opcoPrincipalRepayment + opcoFirstYearInterest;
      const totalFirstYearDebtService = sciFirstYearDebtService + opcoFirstYearDebtService;
      const sciGrossRepaymentCapacity = contractRent;
      const opcoRepaymentCapacity = cashResult;
      const sciRepaymentGap = sciGrossRepaymentCapacity - sciFirstYearDebtService;
      const opcoRepaymentGap = opcoRepaymentCapacity - opcoFirstYearDebtService;
      const opcoCashAfterDebtService = opcoRepaymentCapacity - opcoFirstYearDebtService;
      const consolidatedGrossRepaymentCapacity = contractRent + cashResult;
      const shareholderLoanCoverageGap = consolidatedGrossRepaymentCapacity - totalFirstYearDebtService;
      const totalInterestOverTerm = (sciShareholderLoan + opcoShareholderLoan) * shareholderLoanRate * (shareholderLoanYears + 1) / 2;

      const julesAssignedHours = Math.max(0, operationsHours - supportCapacityHours - familyHours);
      return { nightsPerSuite, occupiedNights, stays, spaBuyerStays, spaSuiteDays, spaOperatingDays, diningSales, lodgingRevenueTtc, spaRevenueTtc, diningRevenueTtc, revenueTtc, lodgingRevenue, spaRevenue, diningRevenue, accountingRevenue, collectedVat, recoveredVat, netVat, commission, paymentFees, turnover, breakfast, energy, spaDirect, diningDirect, incidents, variableCosts, contribution, fixedCostsTtc, fixedVatRecovery, fixedCosts, presenceDays, baseHours, presenceHours, suiteNightHours, coordinationHours, turnoverHours, spaHours, diningHours, operationsHours, calendarRelief, calendarSupportNeed, workloadRelief, recommendedSupportHours, supportHours, supportCapacityHours, supportGap, supportEmployeeMonths, partTimeFte, supportCost, familyHours, julesFte, paidCapacity, julesAssignedHours, julesCost, operatingResultBeforeRent, contractRent, operatingResultAfterRent, renewalProvision, cashResult, sciShareholderLoan, opcoShareholderLoan, shareholderLoanYears, shareholderLoanRate, sciPrincipalRepayment, opcoPrincipalRepayment, sciFirstYearInterest, opcoFirstYearInterest, sciFirstYearDebtService, opcoFirstYearDebtService, totalFirstYearDebtService, sciGrossRepaymentCapacity, opcoRepaymentCapacity, sciRepaymentGap, opcoRepaymentGap, opcoCashAfterDebtService, consolidatedGrossRepaymentCapacity, shareholderLoanCoverageGap, totalInterestOverTerm };
    }

    const pnlRows = [
      ["Ventes publiques TTC · hébergement", "lodgingRevenueTtc", "revenue"], ["Ventes publiques TTC · bien-être", "spaRevenueTtc", "revenue"], ["Ventes publiques TTC · planches du territoire", "diningRevenueTtc", "revenue"], ["Ventes publiques TTC", "revenueTtc", "subtotal"],
      ["TVA collectée estimée", "collectedVat", "cost"], ["Produits comptables simulés", "accountingRevenue", "subtotal"],
      ["Commissions plateformes", "commission", "cost"], ["Encaissements directs", "paymentFees", "cost"], ["Linge et consommables de rotation", "turnover", "cost"], ["Petit-déjeuner", "breakfast", "cost"], ["Énergie marginale", "energy", "cost"], ["Coûts directs spa", "spaDirect", "cost"], ["Coûts directs des planches", "diningDirect", "cost"], ["Impayés et gestes", "incidents", "cost"], ["Marge contributive", "contribution", "subtotal"],
      ["Charges fixes analytiques · net TVA simulée", "fixedCosts", "fixed"], ["Jules — budget employeur financé", "julesCost", "fixed"], ["Relève rémunérée", "supportCost", "fixed"], ["Résultat avant loyer SCI", "operatingResultBeforeRent", "subtotal"], ["Hypothèse de loyer SCI", "contractRent", "fixed"], ["Résultat d’exploitation simplifié", "operatingResultAfterRent", "subtotal"],
      ["Enveloppe de renouvellement", "renewalProvision", "cash"], ["Solde OpCo avant remboursement du CCA", "cashResult", "total"],
    ];

    function renderPnl(data) {
      document.querySelector("[data-pnl]").innerHTML = `<div class="pilotage-pnl__head"><span>Exploitation annuelle simplifiée</span><strong>Montant</strong></div>${pnlRows.map(([label, key, kind]) => `<div class="pilotage-pnl__row ${kind}"><span>${label}</span><strong>${money(data[key])}</strong></div>`).join("")}`;
    }

    function renderFinancing(data) {
      const rows = [
        ["Compte courant SCI · principal", data.sciShareholderLoan, "revenue"],
        ["SCI · capital de l’annuité initiale", data.sciPrincipalRepayment, "cash"],
        ["SCI · intérêts de l’annuité initiale", data.sciFirstYearInterest, "cash"],
        ["SCI · service de dette / loyer brut", `${money(data.sciFirstYearDebtService)} / ${money(data.sciGrossRepaymentCapacity)}`, "subtotal"],
        ["Écart SCI avant ses charges et sa fiscalité", data.sciRepaymentGap, data.sciRepaymentGap >= 0 ? "revenue" : "cash"],
        ["Compte courant exploitation · principal", data.opcoShareholderLoan, "revenue"],
        ["Exploitation · capital de l’annuité initiale", data.opcoPrincipalRepayment, "cash"],
        ["Exploitation · intérêts de l’annuité initiale", data.opcoFirstYearInterest, "cash"],
        ["Exploitation · service de dette / surplus disponible", `${money(data.opcoFirstYearDebtService)} / ${money(data.opcoRepaymentCapacity)}`, "subtotal"],
        ["Écart propre à l’exploitation", data.opcoRepaymentGap, data.opcoRepaymentGap >= 0 ? "revenue" : "cash"],
        ["Service total de l’annuité initiale", data.totalFirstYearDebtService, "subtotal"],
        ["Intérêts bruts cumulés sur la durée", data.totalInterestOverTerm, "cash"],
        ["Écart consolidé brut", data.shareholderLoanCoverageGap, "total"],
      ];
      document.querySelector("[data-financing]").innerHTML = `<div class="pilotage-pnl__head"><span>Remboursement linéaire du principal</span><strong>Montant</strong></div>${rows.map(([label, value, kind]) => `<div class="pilotage-pnl__row ${kind}"><span>${label}</span><strong>${typeof value === "string" ? value : money(value)}</strong></div>`).join("")}`;
    }

    function render() {
      const v = read(); const data = calculate(v);
      output("scenario-name", scenarioNames[activeScenario] || scenarioNames.custom);
      output("revenue-ttc", money(data.revenueTtc));
      output("accounting-revenue", money(data.accountingRevenue));
      output("revenue-mix", `${percent(data.lodgingRevenueTtc / Math.max(1, data.revenueTtc))} hébergement · ${percent((data.spaRevenueTtc + data.diningRevenueTtc) / Math.max(1, data.revenueTtc))} expériences`);
      const vatLabel = data.netVat >= 0 ? `TVA nette estimée ${money(data.netVat)}` : `Crédit de TVA estimé ${money(Math.abs(data.netVat))}`;
      const franchiseAlert = data.revenueTtc > 93500 ? "Franchise à requalifier : seuil majoré global de 93 500 € dépassé" : data.revenueTtc > 85000 ? "Franchise à vérifier : seuil global de base de 85 000 € dépassé" : data.spaRevenueTtc > 41250 ? "Franchise à requalifier : seuil majoré des services dépassé" : data.spaRevenueTtc > 37500 ? "Franchise à vérifier : seuil de base des services dépassé" : "Franchise simulée · aucune TVA récupérée";
      output("vat-summary", v.vatMode === "vat" ? `${vatLabel} · taux spa à confirmer` : franchiseAlert);
      output("cash-result", money(data.cashResult));
      output("opco-after-cca", money(data.opcoCashAfterDebtService));
      output("after-rent-result", money(data.operatingResultAfterRent));
      output("employment", money(data.julesCost + data.supportCost));
      output("support-summary", `${data.julesFte.toFixed(2).replace(".", ",")} ETP Jules + ${integer(data.supportCapacityHours)} h de relève financée`);
      output("family-summary", `${integer(data.familyHours / 12)} h/mois · ${integer(data.familyHours / 8)} journées de 8 h`);
      output("fixed-total-ttc", money(data.fixedCostsTtc));
      output("fixed-total-net", money(data.fixedCosts));
      output("pre-rent-result", money(data.operatingResultBeforeRent));
      output("contract-rent", money(data.contractRent));
      const rawContractRent = Number(v.contractRent);
      output("rent-input-warning", Number.isFinite(rawContractRent) && rawContractRent !== data.contractRent ? `Valeur hors corridor : ${money(data.contractRent)} appliqués au calcul.` : "");
      output("jules-cost", `${money(data.julesCost)} · ${data.julesFte.toFixed(2).replace(".", ",")} ETP`);
      output("support-hours", `${integer(data.supportCapacityHours)} h · ${money(data.supportCost)}`);
      output("support-recommended", `${integer(data.recommendedSupportHours)} h/an`);
      output("support-gap", data.supportGap > 0 ? `${integer(data.supportGap)} h non couvertes` : "0 h · couverture déclarée");
      output("family-hours", `${integer(data.familyHours)} h/an`);
      output("operations-hours", `${integer(data.operationsHours)} h/an`);
      output("operations-copy", `${integer(data.presenceDays)} jours de présence estimés · ${integer(data.paidCapacity)} h de capacité payée pour Jules.`);
      output("shareholder-loan-annuity", money(data.totalFirstYearDebtService));
      output("opco-loan-gap", data.opcoRepaymentGap >= 0 ? `+ ${money(data.opcoRepaymentGap)}` : `− ${money(Math.abs(data.opcoRepaymentGap))}`);
      output("family-effort-title", `${integer(data.familyHours)} h/an`);
      output("family-effort-copy", `Environ ${integer(data.familyHours / 12)} h par mois, soit ${integer(data.familyHours / 8)} journées de 8 h à répartir et planifier entre les associés.`);

      const entityFundingGap = Math.min(data.sciRepaymentGap, data.opcoRepaymentGap);
      output("shareholder-loan-coverage-title", entityFundingGap >= 0 ? "Chaque entité couvre sa part" : "Répartition non couverte");
      output("shareholder-loan-coverage-copy", `SCI : ${data.sciRepaymentGap >= 0 ? "marge" : "manque"} ${money(Math.abs(data.sciRepaymentGap))}. Exploitation : ${data.opcoRepaymentGap >= 0 ? "marge" : "manque"} ${money(Math.abs(data.opcoRepaymentGap))}. Les flux ne peuvent pas être déplacés librement d’une entité à l’autre.`);

      const staffingTitle = data.supportGap > 0 ? `${integer(data.supportGap)} h à couvrir` : "Couverture déclarée complète";
      const supportForm = v.supportMode === "parttime" ? `${data.partTimeFte.toFixed(2).replace(".", ",")} ETP · ${integer(data.supportCapacityHours)} h contractuelles` : `${integer(data.supportHours)} h rémunérées`;
      const staffingCopy = `${integer(data.calendarRelief)} h de besoin calendaire brut ; ${supportForm} et ${integer(data.familyHours)} h associées. Coût de relève : ${money(data.supportCost)}.`;
      output("staffing-title", staffingTitle); output("staffing-copy", staffingCopy);

      document.querySelector("[data-workload]").innerHTML = `
        <div class="pilotage-workload__head"><span>Décomposition du temps annuel</span><strong>${integer(data.operationsHours)} h à organiser</strong></div>
        <div><span>Socle parc, maintenance & administration</span><strong>${integer(data.baseHours)} h</strong></div>
        <div><span>Présence clients & petits-déjeuners</span><strong>${integer(data.presenceHours)} h</strong></div>
        <div><span>Nuits-suite & communs</span><strong>${integer(data.suiteNightHours)} h</strong></div>
        <div><span>Coordination des séjours</span><strong>${integer(data.coordinationHours)} h</strong></div>
        <div><span>Ménage internalisé</span><strong>${integer(data.turnoverHours)} h</strong></div>
        <div><span>Bien-être · ${integer(data.spaOperatingDays)} jours ouverts</span><strong>${integer(data.spaHours)} h</strong></div>
        <div><span>Planches du territoire · ${integer(data.diningSales)} ventes</span><strong>${integer(data.diningHours)} h</strong></div>
        <div class="allocation"><span>Jules assigné / capacité payée</span><strong>${integer(data.julesAssignedHours)} / ${integer(data.paidCapacity)} h</strong></div>
        <div class="allocation"><span>Relève financée / aide familiale</span><strong>${integer(data.supportCapacityHours)} / ${integer(data.familyHours)} h</strong></div>`;

      const verdict = document.querySelector("[data-verdict]");
      if (data.cashResult < -1000) { verdict.className = "pilotage-verdict negative"; verdict.innerHTML = `<strong>Besoin de financement courant : ${money(Math.abs(data.cashResult))}.</strong><span>Le loyer, l’emploi, la relève et le renouvellement ne sont pas tous couverts.${data.supportGap > 0 ? ` Il manque aussi ${integer(data.supportGap)} h de couverture.` : ""}</span>`; }
      else if (data.supportGap > 0) { verdict.className = "pilotage-verdict warn"; verdict.innerHTML = `<strong>Couverture humaine incomplète.</strong><span>Le budget ne finance pas ${integer(data.supportGap)} h du besoin estimé. Le solde financier n’est donc pas suffisant pour qualifier le scénario de soutenable.</span>`; }
      else if (data.cashResult < 3000) { verdict.className = "pilotage-verdict warn"; verdict.innerHTML = `<strong>Exploitation à l’équilibre, sans marge.</strong><span>Après loyer et renouvellement, il ne reste que ${money(Math.max(0, data.cashResult))}. Le remboursement du compte courant de l’exploitation n’est donc pas financé.</span>`; }
      else if (data.opcoRepaymentGap < 0) { verdict.className = "pilotage-verdict warn"; verdict.innerHTML = `<strong>Exploitation positive, avance non remboursée.</strong><span>Le surplus atteint ${money(data.cashResult)}, mais il manque encore ${money(Math.abs(data.opcoRepaymentGap))} pour le service annuel du compte courant de l’exploitation.</span>`; }
      else { verdict.className = "pilotage-verdict positive"; verdict.innerHTML = `<strong>Modèle courant et financement couverts.</strong><span>Le scénario couvre les moyens humains déclarés et le service annuel propre à l’exploitation. La SCI reste à examiner séparément.</span>`; }

      const economicText = data.cashResult >= 0
        ? `L’activité couvre le loyer SCI de ${money(data.contractRent)} et le renouvellement, mais ne conserve que ${money(data.cashResult)} dans l’exploitation avant remboursement des avances et impôt.`
        : `Après le loyer SCI de ${money(data.contractRent)} et le renouvellement, l’exploitation présente un manque annuel de ${money(Math.abs(data.cashResult))}. Ce besoin doit être réduit par les prix, le volume, les coûts ou l’organisation du travail.`;
      output("economic-interpretation", economicText);
      output("human-interpretation", `${integer(data.operationsHours)} h sont à organiser. Jules en couvre au maximum ${integer(data.paidCapacity)} h payées ; ${integer(data.supportCapacityHours)} h sont financées en relève et ${integer(data.familyHours)} h, soit environ ${integer(data.familyHours / 12)} h/mois, reposent sur les associés.`);
      const rateWarning = data.shareholderLoanRate > 0.0576 ? " Le taux testé dépasse le seuil d’alerte de 5,76 % identifié au troisième trimestre 2026 pour certaines qualifications de prêt à une SCI : validation juridique impérative." : " Le taux reste une hypothèse fiscale et contractuelle à actualiser.";
      output("financing-interpretation", `Le service initial des deux avances atteint ${money(data.totalFirstYearDebtService)}. La lecture consolidée fait apparaître ${data.shareholderLoanCoverageGap >= 0 ? "une marge brute de" : "un manque brut de"} ${money(Math.abs(data.shareholderLoanCoverageGap))}, mais l’exploitation présente séparément ${data.opcoRepaymentGap >= 0 ? "une marge" : "un manque"} de ${money(Math.abs(data.opcoRepaymentGap))}.${rateWarning}`);
      document.querySelector("[data-hourly-field]").hidden = v.supportMode !== "subcontract";
      document.querySelectorAll("[data-vat-only]").forEach((label) => {
        const disabled = v.vatMode !== "vat";
        label.classList.toggle("is-disabled", disabled);
        const field = label.querySelector("input, select");
        if (field) field.disabled = disabled;
      });
      renderPnl(data);
      renderFinancing(data);
    }

    function showPanel(key, updateHash) {
      document.querySelectorAll("[data-pilotage-panel]").forEach((panel) => { panel.hidden = panel.dataset.pilotagePanel !== key; });
      document.querySelectorAll("[data-pilotage-tab]").forEach((button) => { const active = button.dataset.pilotageTab === key; button.classList.toggle("active", active); button.setAttribute("aria-selected", String(active)); });
      if (updateHash) window.history.replaceState({}, "", `#${key}`);
      window.scrollTo({ top: document.querySelector(".pilotage-tabs").offsetTop - 12, behavior: "smooth" });
    }
    document.querySelectorAll("[data-pilotage-tab]").forEach((button) => button.addEventListener("click", () => showPanel(button.dataset.pilotageTab, true)));
    form.addEventListener("input", () => { activeScenario = "custom"; render(); });
    form.addEventListener("change", (event) => { normalizeNumericField(event.target); activeScenario = "custom"; render(); });
    document.querySelector("[data-pilotage-reset]").addEventListener("click", () => { activeScenario = "standard"; setValues(scenarios.standard); window.history.replaceState({}, "", "#simulateur"); render(); });
    document.querySelector("[data-pilotage-share]").addEventListener("click", async () => {
      const params = new URLSearchParams({ scenario: activeScenario }); Object.entries(read()).forEach(([key, value]) => params.set(key, value));
      const url = `${window.location.origin}${window.location.pathname}?${params.toString()}#simulateur`;
      try { await navigator.clipboard.writeText(url); toast("Le lien du scénario est copié."); } catch (_) { window.prompt("Copiez ce lien :", url); }
    });
    const params = new URLSearchParams(window.location.search);
    if (params.size) { const next = {}; Array.from(form.elements).filter((field) => field.name && params.has(field.name)).forEach((field) => { next[field.name] = params.get(field.name); }); setValues(next); normalizeNumericInputs(); activeScenario = params.get("scenario") || "custom"; }

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
