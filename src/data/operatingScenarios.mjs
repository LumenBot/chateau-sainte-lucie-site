const annualHours = 1607;
const fullTimeEmployerCost = 28000;

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
  opcoCashAfterLoanService: -3414,
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
    "Le résultat reste trop faible pour rembourser le CCA de l’exploitation.",
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
  opcoLoanService: 3649.5,
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
  const opcoCashAfterLoanService = cashAfterRenewal - p.opcoLoanService;

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
    opcoCashAfterLoanService,
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
const annualCashRequirementBeforeLoan = seasonalDefaults.fixedCosts
  + fullTimeEmployerCost * seasonalDefaults.julesFte
  + seasonalDefaults.paidReliefHours * seasonalDefaults.paidReliefRate
  + seasonalDefaults.rent
  + seasonalDefaults.renewal;

export const seasonalBreakEven = {
  contributionRate: centralContributionRate,
  publicRevenueBeforeLoan: annualCashRequirementBeforeLoan / centralContributionRate,
  averageBasketAtCapacityBeforeLoan: annualCashRequirementBeforeLoan / centralContributionRate / (seasonalDefaults.sellableNightsPerSuite * seasonalDefaults.suites),
  publicRevenueAfterLoan: (annualCashRequirementBeforeLoan + seasonalDefaults.opcoLoanService) / centralContributionRate,
  averageBasketAtCapacityAfterLoan: (annualCashRequirementBeforeLoan + seasonalDefaults.opcoLoanService) / centralContributionRate / (seasonalDefaults.sellableNightsPerSuite * seasonalDefaults.suites),
};
