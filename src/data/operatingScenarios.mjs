const annualHours = 1607;
const fullTimeEmployerCost = 28000;
const shareholderAdvance = {
  sci: 35000,
  operatingCompany: 15000,
  repaymentYears: 5,
  sciAnnualPrincipal: 7000,
  operatingCompanyAnnualPrincipal: 3000,
};

export { shareholderAdvance };

export const scenarioA = {
  id: "annual-lean",
  name: "Exploitation annuelle allégée",
  shortName: "Modèle diffus",
  status: "Référence sauvegardée",
  soldNightsPerSuite: 120,
  sellableNightsPerSuite: null,
  averageNightPrice: 200,
  publicRevenue: 60000,
  lodgingRevenue: 48000,
  experienceRevenue: 12000,
  averageBasketPerSuiteNight: 250,
  averageExtrasPerSuiteNight: 50,
  operatingResultAfterRent: 1736,
  cashAfterRenewal: 236,
  operatingCompanyCashAfterPrincipalRepayment: -2764,
  operationsHours: 1756,
  julesFte: 0.8,
  julesCapacityHours: annualHours * 0.8,
  paidReliefHours: 100,
  familyHours: 380,
  staffingGapHours: 0,
  rent: 12000,
  renewal: 1500,
  strengths: [
    "Davantage de nuits vendables pour absorber les coûts fixes.",
    "Une promesse simple : suite, parc, piscine et bien-être à la carte.",
    "La restauration reste volontairement légère à produire.",
  ],
  limits: [
    "Le résultat reste trop faible pour rembourser intégralement l’avance versée à la société d’exploitation.",
    "L’effort familial atteint 380 h par an, soit près de 48 journées de 8 h.",
    "L’absence de vraie solution de dîner peut freiner les séjours premium.",
  ],
};

export const seasonalDefaults = {
  suites: 2,
  openMonths: 7,
  openWeeksPerMonth: 3,
  openNightsPerWeek: 3,
  sellableNightsPerSuite: 63,
  averageGuests: 2.1,
  averageStay: 2.5,
  directShare: 0.5,
  otaCommission: 0.15,
  paymentRate: 0.015,
  incidentRate: 0.002,
  breakfastCostPerGuestNight: 6,
  energyCostPerSuiteNight: 5,
  turnoverCashPerStay: 30,
  turnoverHoursPerStay: 4,
  spaPricePerSuiteDay: 60,
  spaCostPerSoldSuiteDay: 10,
  lunchPricePerGuest: 25,
  lunchCostPerGuest: 10,
  dinnerPricePerGuest: 50,
  dinnerCostPerGuest: 17.5,
  pairingPricePerGuest: 30,
  pairingCostPerGuest: 12,
  barCostRate: 0.35,
  fixedCosts: 8000,
  baseOperationsHours: 720,
  julesFte: 0.75,
  paidReliefHours: 150,
  paidReliefRate: 25,
  familyHours: 100,
  rent: 12000,
  renewal: 1500,
  operatingCompanyAnnualPrincipal: shareholderAdvance.operatingCompanyAnnualPrincipal,
};

const probabilityAtLeastOne = (individualProbability, suites) =>
  1 - Math.pow(1 - Math.min(1, Math.max(0, individualProbability)), suites);

export function calculateSeasonalScenario(input) {
  const p = { ...seasonalDefaults, ...input };
  const occupiedSuiteNights = p.soldNightsPerSuite * p.suites;
  const stays = occupiedSuiteNights / p.averageStay;
  const occupancyRate = Math.min(1, p.soldNightsPerSuite / p.sellableNightsPerSuite);
  const openCalendarNights = p.sellableNightsPerSuite;

  const lodgingRevenue = occupiedSuiteNights * p.averageNightPrice;
  const spaSoldSuiteDays = occupiedSuiteNights * p.spaTakeRate;
  const lunchGuests = occupiedSuiteNights * p.lunchTakeRate * p.averageGuests;
  const dinnerGuests = occupiedSuiteNights * p.dinnerTakeRate * p.averageGuests;
  const pairingGuests = dinnerGuests * p.pairingTakeRate;
  const barBuyingSuiteDays = occupiedSuiteNights * p.barTakeRate;
  const spaRevenue = spaSoldSuiteDays * p.spaPricePerSuiteDay;
  const lunchRevenue = lunchGuests * p.lunchPricePerGuest;
  const dinnerRevenue = dinnerGuests * p.dinnerPricePerGuest;
  const pairingRevenue = pairingGuests * p.pairingPricePerGuest;
  const barRevenue = barBuyingSuiteDays * p.barBasketPerSuiteDay;
  const experienceRevenue = spaRevenue + lunchRevenue + dinnerRevenue + pairingRevenue + barRevenue;
  const publicRevenue = lodgingRevenue + experienceRevenue;

  const otaCommission = lodgingRevenue * (1 - p.directShare) * p.otaCommission;
  const directReceipts = lodgingRevenue * p.directShare + experienceRevenue;
  const paymentFees = directReceipts * p.paymentRate;
  const turnoverCash = stays * p.turnoverCashPerStay;
  const breakfast = occupiedSuiteNights * p.averageGuests * p.breakfastCostPerGuestNight;
  const energy = occupiedSuiteNights * p.energyCostPerSuiteNight;
  const spaDirect = spaSoldSuiteDays * p.spaCostPerSoldSuiteDay;
  const lunchDirect = lunchGuests * p.lunchCostPerGuest;
  const dinnerDirect = dinnerGuests * p.dinnerCostPerGuest;
  const pairingDirect = pairingGuests * p.pairingCostPerGuest;
  const barDirect = barRevenue * p.barCostRate;
  const incidents = publicRevenue * p.incidentRate;
  const variableCosts = otaCommission + paymentFees + turnoverCash + breakfast + energy + spaDirect + lunchDirect + dinnerDirect + pairingDirect + barDirect + incidents;

  const activeGuestDays = openCalendarNights * probabilityAtLeastOne(occupancyRate, p.suites);
  const spaServiceDays = openCalendarNights * probabilityAtLeastOne(occupancyRate * p.spaTakeRate, p.suites);
  const lunchServiceDays = openCalendarNights * probabilityAtLeastOne(occupancyRate * p.lunchTakeRate, p.suites);
  const dinnerServiceDays = openCalendarNights * probabilityAtLeastOne(occupancyRate * p.dinnerTakeRate, p.suites);
  const baseHours = p.baseOperationsHours;
  const guestPresenceHours = activeGuestDays * 1.75;
  const commonAreasHours = occupiedSuiteNights * 0.5;
  const coordinationHours = stays;
  const turnoverHours = stays * p.turnoverHoursPerStay;
  const spaHours = spaServiceDays;
  const lunchHours = lunchServiceDays * 1.5;
  const dinnerHours = dinnerServiceDays * 4;
  const barHours = barBuyingSuiteDays * 0.5;
  const operationsHours = baseHours + guestPresenceHours + commonAreasHours + coordinationHours + turnoverHours + spaHours + lunchHours + dinnerHours + barHours;

  const julesCapacityHours = annualHours * p.julesFte;
  const declaredCapacityHours = julesCapacityHours + p.paidReliefHours + p.familyHours;
  const staffingGapHours = Math.max(0, operationsHours - declaredCapacityHours);
  const julesCost = fullTimeEmployerCost * p.julesFte;
  const paidReliefCost = p.paidReliefHours * p.paidReliefRate;
  const contribution = publicRevenue - variableCosts;
  const resultBeforeRent = contribution - p.fixedCosts - julesCost - paidReliefCost;
  const resultAfterRent = resultBeforeRent - p.rent;
  const cashAfterRenewal = resultAfterRent - p.renewal;
  const operatingCompanyCashAfterPrincipalRepayment = cashAfterRenewal - p.operatingCompanyAnnualPrincipal;

  return {
    ...p,
    occupiedSuiteNights,
    stays,
    occupancyRate,
    lodgingRevenue,
    spaRevenue,
    lunchRevenue,
    dinnerRevenue,
    pairingRevenue,
    barRevenue,
    experienceRevenue,
    publicRevenue,
    averageBasketPerSuiteNight: publicRevenue / occupiedSuiteNights,
    averageExtrasPerSuiteNight: experienceRevenue / occupiedSuiteNights,
    otaCommission,
    paymentFees,
    turnoverCash,
    breakfast,
    energy,
    spaDirect,
    lunchDirect,
    dinnerDirect,
    pairingDirect,
    barDirect,
    incidents,
    variableCosts,
    contribution,
    activeGuestDays,
    spaServiceDays,
    lunchServiceDays,
    dinnerServiceDays,
    baseHours,
    guestPresenceHours,
    commonAreasHours,
    coordinationHours,
    turnoverHours,
    spaHours,
    lunchHours,
    dinnerHours,
    barHours,
    operationsHours,
    julesCapacityHours,
    declaredCapacityHours,
    staffingGapHours,
    julesCost,
    paidReliefCost,
    resultBeforeRent,
    resultAfterRent,
    cashAfterRenewal,
    operatingCompanyCashAfterPrincipalRepayment,
  };
}

export const scenarioBCentral = calculateSeasonalScenario({
  id: "seasonal-table-central",
  label: "Hypothèse centrale",
  soldNightsPerSuite: 54,
  averageNightPrice: 200,
  spaTakeRate: 0.75,
  lunchTakeRate: 0.45,
  dinnerTakeRate: 0.75,
  pairingTakeRate: 0.5,
  barTakeRate: 0.35,
  barBasketPerSuiteDay: 25,
});

export const scenarioBStretch = calculateSeasonalScenario({
  id: "seasonal-table-stretch",
  label: "Pleine capacité commerciale",
  soldNightsPerSuite: 63,
  averageNightPrice: 210,
  spaTakeRate: 0.85,
  lunchTakeRate: 0.6,
  dinnerTakeRate: 0.85,
  pairingTakeRate: 0.65,
  barTakeRate: 0.5,
  barBasketPerSuiteDay: 30,
});

export const theoreticalCoupleBasket = {
  lodging: 200,
  spa: 60,
  lunch: 50,
  dinner: 100,
  pairing: 60,
  extrasExcludingSpa: 210,
  extrasIncludingSpa: 270,
  total: 470,
  annualRevenueAtCapacity: 470 * seasonalDefaults.sellableNightsPerSuite * seasonalDefaults.suites,
};

const centralContributionRate = (scenarioBCentral.publicRevenue - scenarioBCentral.variableCosts) / scenarioBCentral.publicRevenue;
const annualCashRequirementBeforeRepayment = seasonalDefaults.fixedCosts
  + fullTimeEmployerCost * seasonalDefaults.julesFte
  + seasonalDefaults.paidReliefHours * seasonalDefaults.paidReliefRate
  + seasonalDefaults.rent
  + seasonalDefaults.renewal;

export const seasonalBreakEven = {
  contributionRate: centralContributionRate,
  publicRevenueBeforeRepayment: annualCashRequirementBeforeRepayment / centralContributionRate,
  averageBasketAtCapacityBeforeRepayment: annualCashRequirementBeforeRepayment / centralContributionRate / (seasonalDefaults.sellableNightsPerSuite * seasonalDefaults.suites),
  publicRevenueAfterPrincipalRepayment: (annualCashRequirementBeforeRepayment + seasonalDefaults.operatingCompanyAnnualPrincipal) / centralContributionRate,
  averageBasketAtCapacityAfterPrincipalRepayment: (annualCashRequirementBeforeRepayment + seasonalDefaults.operatingCompanyAnnualPrincipal) / centralContributionRate / (seasonalDefaults.sellableNightsPerSuite * seasonalDefaults.suites),
};

export const hybridDefaults = {
  suites: 2,
  averageGuests: 2.1,
  averageStay: 2.5,
  averageNightPrice: 200,
  directShare: 0.5,
  otaCommission: 0.15,
  paymentRate: 0.015,
  incidentRate: 0.002,
  breakfastCostPerGuestNight: 6,
  energyCostPerSuiteNight: 5,
  turnoverCashPerStay: 30,
  turnoverHoursPerStay: 4,
  spaPricePerSuiteDay: 60,
  spaTakeRate: 0.7,
  spaCostPerSoldSuiteDay: 10,
  pantryPricePerSuiteDay: 55,
  pantryTakeRate: 0.35,
  pantryCostRate: 0.55,
  pantryLaborHoursPerSale: 0.25,
  signatureTablePricePerSuiteDay: 160,
  signatureTableTakeRate: 0.15,
  signatureTableCostRate: 0.35,
  signatureTableHoursPerServiceDay: 4,
  fixedCosts: 8000,
  baseOperationsHours: 720,
  paidReliefRate: 25,
  familyHours: 200,
  rent: 12000,
  renewal: 1500,
  operatingCompanyAnnualPrincipal: shareholderAdvance.operatingCompanyAnnualPrincipal,
};

export function calculateHybridScenario(input) {
  const p = { ...hybridDefaults, ...input };
  const occupiedSuiteNights = p.soldNightsPerSuite * p.suites;
  const stays = occupiedSuiteNights / p.averageStay;
  const presenceDays = Math.min(275, p.soldNightsPerSuite * 1.2);

  const lodgingRevenue = occupiedSuiteNights * p.averageNightPrice;
  const spaSales = occupiedSuiteNights * p.spaTakeRate;
  const pantrySales = occupiedSuiteNights * p.pantryTakeRate;
  const signatureTableSales = occupiedSuiteNights * p.signatureTableTakeRate;
  const spaRevenue = spaSales * p.spaPricePerSuiteDay;
  const pantryRevenue = pantrySales * p.pantryPricePerSuiteDay;
  const signatureTableRevenue = signatureTableSales * p.signatureTablePricePerSuiteDay;
  const experienceRevenue = spaRevenue + pantryRevenue + signatureTableRevenue;
  const publicRevenue = lodgingRevenue + experienceRevenue;

  const otaCommission = lodgingRevenue * (1 - p.directShare) * p.otaCommission;
  const paymentFees = (lodgingRevenue * p.directShare + experienceRevenue) * p.paymentRate;
  const turnoverCash = stays * p.turnoverCashPerStay;
  const breakfast = occupiedSuiteNights * p.averageGuests * p.breakfastCostPerGuestNight;
  const energy = occupiedSuiteNights * p.energyCostPerSuiteNight;
  const spaDirect = spaSales * p.spaCostPerSoldSuiteDay;
  const pantryDirect = pantryRevenue * p.pantryCostRate;
  const signatureTableDirect = signatureTableRevenue * p.signatureTableCostRate;
  const incidents = publicRevenue * p.incidentRate;
  const variableCosts = otaCommission + paymentFees + turnoverCash + breakfast + energy + spaDirect + pantryDirect + signatureTableDirect + incidents;
  const contribution = publicRevenue - variableCosts;

  const spaProbabilityPerSuitePresenceDay = presenceDays > 0 ? Math.min(1, spaSales / (p.suites * presenceDays)) : 0;
  const signatureProbabilityPerSuitePresenceDay = presenceDays > 0 ? Math.min(1, signatureTableSales / (p.suites * presenceDays)) : 0;
  const spaServiceDays = presenceDays * probabilityAtLeastOne(spaProbabilityPerSuitePresenceDay, p.suites);
  const signatureTableServiceDays = presenceDays * probabilityAtLeastOne(signatureProbabilityPerSuitePresenceDay, p.suites);
  const baseHours = p.baseOperationsHours;
  const guestPresenceHours = presenceDays * 1.75;
  const commonAreasHours = occupiedSuiteNights * 0.5;
  const coordinationHours = stays;
  const turnoverHours = stays * p.turnoverHoursPerStay;
  const spaHours = spaServiceDays;
  const pantryHours = pantrySales * p.pantryLaborHoursPerSale;
  const signatureTableHours = signatureTableServiceDays * p.signatureTableHoursPerServiceDay;
  const operationsHours = baseHours + guestPresenceHours + commonAreasHours + coordinationHours + turnoverHours + spaHours + pantryHours + signatureTableHours;

  const paidReliefCost = p.paidReliefHours * p.paidReliefRate;
  const cashAvailableForJules = contribution - p.fixedCosts - paidReliefCost - p.rent - p.renewal - p.operatingCompanyAnnualPrincipal;
  const maximumAffordableJulesFte = Math.min(1, Math.max(0, cashAvailableForJules / fullTimeEmployerCost));
  const requiredJulesHours = Math.max(0, operationsHours - p.paidReliefHours - p.familyHours);
  const requiredJulesFte = requiredJulesHours / annualHours;
  const julesFte = Math.min(1, Math.max(0, p.julesFte));
  const julesCost = fullTimeEmployerCost * julesFte;
  const declaredCapacityHours = annualHours * julesFte + p.paidReliefHours + p.familyHours;
  const staffingGapHours = Math.max(0, operationsHours - declaredCapacityHours);
  const cashAfterPrincipalRepayment = cashAvailableForJules - julesCost;

  return {
    ...p,
    occupiedSuiteNights,
    stays,
    presenceDays,
    lodgingRevenue,
    spaRevenue,
    pantryRevenue,
    signatureTableRevenue,
    experienceRevenue,
    publicRevenue,
    averageBasketPerSuiteNight: publicRevenue / occupiedSuiteNights,
    averageExtrasPerSuiteNight: experienceRevenue / occupiedSuiteNights,
    variableCosts,
    contribution,
    spaServiceDays,
    signatureTableServiceDays,
    baseHours,
    guestPresenceHours,
    commonAreasHours,
    coordinationHours,
    turnoverHours,
    spaHours,
    pantryHours,
    signatureTableHours,
    operationsHours,
    paidReliefCost,
    cashAvailableForJules,
    maximumAffordableJulesFte,
    requiredJulesHours,
    requiredJulesFte,
    julesCost,
    declaredCapacityHours,
    staffingGapHours,
    cashAfterPrincipalRepayment,
  };
}

const hybridActivityInputs = [
  { soldNightsPerSuite: 60, julesFte: 0, paidReliefHours: 100 },
  { soldNightsPerSuite: 90, julesFte: 0.35, paidReliefHours: 125 },
  { soldNightsPerSuite: 120, julesFte: 0.8, paidReliefHours: 250 },
  { soldNightsPerSuite: 150, julesFte: 1, paidReliefHours: 350 },
];

export const hybridActivityCases = hybridActivityInputs.map(calculateHybridScenario);

export const hybridRecommendation = calculateHybridScenario({
  soldNightsPerSuite: 140,
  averageNightPrice: 205,
  julesFte: 1,
  paidReliefHours: 300,
});

export const ambitiousDefaults = {
  suiteCount: 3,
  soldNightsPerSuite: 150,
  averageNightPrice: 210,
  averageGuests: 2.1,
  averageStay: 2.5,
  directShare: 0.5,
  otaCommission: 0.15,
  paymentRate: 0.015,
  incidentRate: 0.002,
  breakfastCostPerGuestNight: 6,
  energyCostPerSuiteNight: 5,
  turnoverCashPerStay: 30,
  turnoverHoursPerStay: 4,
  spaPricePerSuiteDay: 60,
  spaTakeRate: 0.7,
  spaCostPerSoldSuiteDay: 10,
  pantryPricePerSuiteDay: 55,
  pantryTakeRate: 0.35,
  pantryCostRate: 0.55,
  pantryLaborHoursPerSale: 0.25,
  signatureTablePricePerSuiteDay: 160,
  signatureTableTakeRate: 0.15,
  signatureTableCostRate: 0.35,
  signatureTableHoursPerServiceDay: 4,
  fixedCostsTtc: 10000,
  fixedVatRecovery: 1500,
  baseOperationsHours: 780,
  julesFte: 1,
  familyHours: 200,
  staffingSafetyRate: 0.1,
  paidReliefRate: 25,
  rent: 12000,
  renewal: 2250,
  baselineShareholderAdvancePrincipal: 50000,
  thirdSuiteAdditionalAdvancePrincipal: 30000,
  sciShareholderAdvancePrincipal: 65000,
  operatingCompanyShareholderAdvancePrincipal: 15000,
  shareholderAdvanceInterestRate: 0,
  shareholderAdvanceYears: 5,
};

const foodAndDrinkRevenueExVat = (revenueTtc) => revenueTtc * (0.8 / 1.1 + 0.2 / 1.2);
const foodAndDrinkCostExVat = (costTtc) => costTtc * (0.8 / 1.055 + 0.2 / 1.2);
const roundUpTo = (value, step) => Math.ceil(Math.max(0, value) / step) * step;

/**
 * Prudent three-suite decision model.
 *
 * Unlike the two-suite working model, this case assumes recurring VAT liability:
 * public prices stay tax-inclusive, revenue is converted to accounting revenue,
 * and only explicitly estimated input VAT is recovered. The staffing budget also
 * includes a 10% capacity buffer rather than matching the annual workload exactly.
 */
export function calculateAmbitiousScenario(input = {}) {
  const p = { ...ambitiousDefaults, ...input };
  if (p.shareholderAdvanceInterestRate !== 0) {
    throw new Error("Le scénario C accepte uniquement des comptes courants sans intérêt.");
  }
  if (p.shareholderAdvanceYears <= 0) {
    throw new Error("La durée-cible de remboursement doit être strictement positive.");
  }
  const occupiedSuiteNights = p.suiteCount * p.soldNightsPerSuite;
  const stays = occupiedSuiteNights / p.averageStay;
  const presenceDays = Math.min(275, p.soldNightsPerSuite * 1.2);

  const lodgingRevenueTtc = occupiedSuiteNights * p.averageNightPrice;
  const spaSales = occupiedSuiteNights * p.spaTakeRate;
  const pantrySales = occupiedSuiteNights * p.pantryTakeRate;
  const signatureTableSales = occupiedSuiteNights * p.signatureTableTakeRate;
  const spaRevenueTtc = spaSales * p.spaPricePerSuiteDay;
  const pantryRevenueTtc = pantrySales * p.pantryPricePerSuiteDay;
  const signatureTableRevenueTtc = signatureTableSales * p.signatureTablePricePerSuiteDay;
  const experienceRevenueTtc = spaRevenueTtc + pantryRevenueTtc + signatureTableRevenueTtc;
  const publicRevenueTtc = lodgingRevenueTtc + experienceRevenueTtc;
  const blendedAverageNightPrice = p.averageNightPrice;

  const lodgingRevenue = lodgingRevenueTtc / 1.1;
  const spaRevenue = spaRevenueTtc / 1.2;
  const foodRevenue = foodAndDrinkRevenueExVat(pantryRevenueTtc + signatureTableRevenueTtc);
  const accountingRevenue = lodgingRevenue + spaRevenue + foodRevenue;
  const collectedVat = publicRevenueTtc - accountingRevenue;

  const otaCommission = lodgingRevenueTtc * (1 - p.directShare) * p.otaCommission;
  const paymentFees = (lodgingRevenueTtc * p.directShare + experienceRevenueTtc) * p.paymentRate;
  const turnover = stays * p.turnoverCashPerStay / 1.2;
  const breakfast = occupiedSuiteNights * p.averageGuests * p.breakfastCostPerGuestNight / 1.055;
  const energy = occupiedSuiteNights * p.energyCostPerSuiteNight / 1.2;
  const spaDirect = spaSales * p.spaCostPerSoldSuiteDay / 1.2;
  const pantryDirect = foodAndDrinkCostExVat(pantryRevenueTtc * p.pantryCostRate);
  const signatureTableDirect = foodAndDrinkCostExVat(signatureTableRevenueTtc * p.signatureTableCostRate);
  const incidents = accountingRevenue * p.incidentRate;
  const variableCosts = otaCommission + paymentFees + turnover + breakfast + energy
    + spaDirect + pantryDirect + signatureTableDirect + incidents;

  const occupancySharePerPresenceDay = presenceDays > 0 ? Math.min(1, p.soldNightsPerSuite / presenceDays) : 0;
  const spaProbabilityPerSuiteDay = occupancySharePerPresenceDay * p.spaTakeRate;
  const tableProbabilityPerSuiteDay = occupancySharePerPresenceDay * p.signatureTableTakeRate;
  const spaServiceDays = presenceDays * probabilityAtLeastOne(spaProbabilityPerSuiteDay, p.suiteCount);
  const signatureTableServiceDays = presenceDays * probabilityAtLeastOne(tableProbabilityPerSuiteDay, p.suiteCount);
  const baseHours = p.baseOperationsHours;
  const guestPresenceHours = presenceDays * 1.75;
  const commonAreasHours = occupiedSuiteNights * 0.5;
  const coordinationHours = stays;
  const turnoverHours = stays * p.turnoverHoursPerStay;
  const spaHours = spaServiceDays + Math.max(0, spaSales - spaServiceDays) * 0.25;
  const pantryHours = pantrySales * p.pantryLaborHoursPerSale;
  const signatureTableHours = signatureTableServiceDays * p.signatureTableHoursPerServiceDay
    + Math.max(0, signatureTableSales - signatureTableServiceDays) * 0.5;
  const operationsHours = baseHours + guestPresenceHours + commonAreasHours + coordinationHours
    + turnoverHours + spaHours + pantryHours + signatureTableHours;

  const julesCapacityHours = annualHours * p.julesFte;
  const minimumReliefHours = roundUpTo(operationsHours - julesCapacityHours - p.familyHours, 25);
  const prudentReliefHours = roundUpTo(operationsHours * (1 + p.staffingSafetyRate) - julesCapacityHours - p.familyHours, 25);
  const paidReliefHours = Math.max(300, prudentReliefHours);
  const declaredCapacityHours = julesCapacityHours + paidReliefHours + p.familyHours;
  const capacityBufferHours = declaredCapacityHours - operationsHours;

  const fixedCosts = Math.max(0, p.fixedCostsTtc - p.fixedVatRecovery);
  const julesCost = fullTimeEmployerCost * p.julesFte;
  const paidReliefCost = paidReliefHours * p.paidReliefRate;
  const resultBeforeRent = accountingRevenue - variableCosts - fixedCosts - julesCost - paidReliefCost;
  const resultAfterRent = resultBeforeRent - p.rent;
  const operatingCompanyCashBeforeFinancing = resultAfterRent - p.renewal;
  const totalShareholderAdvancePrincipal = p.sciShareholderAdvancePrincipal
    + p.operatingCompanyShareholderAdvancePrincipal;
  const expectedShareholderAdvancePrincipal = p.baselineShareholderAdvancePrincipal
    + p.thirdSuiteAdditionalAdvancePrincipal;
  if (Math.abs(totalShareholderAdvancePrincipal - expectedShareholderAdvancePrincipal) > 0.01) {
    throw new Error("La ventilation des comptes courants ne correspond pas à l'enveloppe totale du scénario.");
  }
  const operatingCompanyAnnualPrincipalRepayment = p.operatingCompanyShareholderAdvancePrincipal
    / p.shareholderAdvanceYears;
  const sciAnnualPrincipalRepayment = p.sciShareholderAdvancePrincipal / p.shareholderAdvanceYears;
  const operatingCompanyCashAfterShareholderAdvanceRepayment = operatingCompanyCashBeforeFinancing
    - operatingCompanyAnnualPrincipalRepayment;
  const sciCashBeforeExistingCommitments = p.rent - sciAnnualPrincipalRepayment;
  const projectCashBeforeShareholderAdvanceRepayment = resultBeforeRent - p.renewal;
  const totalAnnualShareholderAdvanceRepayment = operatingCompanyAnnualPrincipalRepayment
    + sciAnnualPrincipalRepayment;
  if (totalAnnualShareholderAdvanceRepayment <= 0) {
    throw new Error("Le scénario C exige un principal de comptes courants à rembourser.");
  }
  const consolidatedCashAfterShareholderAdvanceRepayment = projectCashBeforeShareholderAdvanceRepayment
    - totalAnnualShareholderAdvanceRepayment;
  const simplifiedRepaymentCoverage = projectCashBeforeShareholderAdvanceRepayment
    / totalAnnualShareholderAdvanceRepayment;
  const rentCoverageOfSciShareholderAdvance = sciAnnualPrincipalRepayment > 0
    ? p.rent / sciAnnualPrincipalRepayment
    : null;

  return {
    ...p,
    lotCount: p.suiteCount,
    occupiedSuiteNights,
    stays,
    presenceDays,
    lodgingRevenueTtc,
    spaRevenueTtc,
    pantryRevenueTtc,
    signatureTableRevenueTtc,
    experienceRevenueTtc,
    publicRevenueTtc,
    blendedAverageNightPrice,
    accountingRevenue,
    collectedVat,
    variableCosts,
    baseHours,
    guestPresenceHours,
    commonAreasHours,
    coordinationHours,
    turnoverHours,
    spaHours,
    pantryHours,
    signatureTableHours,
    operationsHours,
    julesCapacityHours,
    minimumReliefHours,
    prudentReliefHours,
    paidReliefHours,
    declaredCapacityHours,
    capacityBufferHours,
    fixedCosts,
    julesCost,
    paidReliefCost,
    resultBeforeRent,
    resultAfterRent,
    operatingCompanyCashBeforeFinancing,
    operatingCompanyCashBeforeShareholderAdvanceRepayment: operatingCompanyCashBeforeFinancing,
    totalShareholderAdvancePrincipal,
    annualShareholderAdvanceRepayment: totalAnnualShareholderAdvanceRepayment,
    operatingCompanyAnnualPrincipalRepayment,
    sciAnnualPrincipalRepayment,
    operatingCompanyCashAfterShareholderAdvanceRepayment,
    sciCashBeforeExistingCommitments,
    sciCashAfterShareholderAdvanceRepaymentBeforeExistingCosts: sciCashBeforeExistingCommitments,
    projectCashBeforeShareholderAdvanceRepayment,
    totalAnnualShareholderAdvanceRepayment,
    consolidatedCashAfterShareholderAdvanceRepayment,
    cashAfterShareholderAdvanceRepayment: consolidatedCashAfterShareholderAdvanceRepayment,
    simplifiedRepaymentCoverage,
    coverageOfShareholderAdvanceRepayment: simplifiedRepaymentCoverage,
    rentCoverageOfSciShareholderAdvance,
  };
}

export const ambitiousReference = calculateAmbitiousScenario();
/**
 * Methodological counterfactual: the same commercial and prudence assumptions
 * as the three-suite reference, but without the Suite Maisonnette. It isolates
 * the capacity effect and is not a fourth operating proposal.
 */
export const ambitiousTwoSuiteCounterfactual = calculateAmbitiousScenario({
  suiteCount: 2,
  baseOperationsHours: 720,
  fixedCostsTtc: 8000,
  fixedVatRecovery: 1200,
  renewal: 1500,
  baselineShareholderAdvancePrincipal: 50000,
  thirdSuiteAdditionalAdvancePrincipal: 0,
  sciShareholderAdvancePrincipal: 35000,
  operatingCompanyShareholderAdvancePrincipal: 15000,
});
export const ambitiousBalancedAllocation = calculateAmbitiousScenario({
  sciShareholderAdvancePrincipal: 60000,
  operatingCompanyShareholderAdvancePrincipal: 20000,
});
export const ambitiousHighRentStress = calculateAmbitiousScenario({ rent: 18000 });
export const ambitiousLowerActivity = calculateAmbitiousScenario({
  soldNightsPerSuite: 140,
  averageNightPrice: 205,
});
export const ambitiousConsolidation = calculateAmbitiousScenario({
  soldNightsPerSuite: 160,
});
export const ambitiousSixYearRepayment = calculateAmbitiousScenario({
  shareholderAdvanceYears: 6,
});
