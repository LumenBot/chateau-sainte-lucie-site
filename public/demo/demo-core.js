(function () {
  const STORAGE_KEY = "csl-demo-experience-v1";

  const defaultState = {
    version: 2,
    booking: {
      reference: "CSL-270514-LUM",
      suite: "Suite Lumière",
      arrival: "2027-05-14",
      departure: "2027-05-17",
      adults: 2,
      children: 1,
      childrenUnderSix: 0,
      childrenUnderThree: 0,
      nights: 3,
      accommodationTotal: 750,
      accommodationPaid: true,
      source: "Réservation directe",
      status: "Confirmée",
    },
    guest: {
      firstName: "Camille",
      lastName: "Martin",
      email: "camille.martin@exemple.fr",
      language: "FR",
      arrivalTime: "15:30",
      welcomeMode: "Hybride",
      breakfastTime: "08:30",
      breakfastStyle: "Sucré & salé",
      dietary: "Sans fruits à coque",
      dogNoticeAccepted: true,
    },
    onboarding: {
      identity: true,
      occupants: true,
      preferences: true,
      rules: true,
      guarantee: false,
      checkIn: false,
      checkOut: false,
    },
    services: {
      spaPass: true,
      spaTotal: 225,
      dinner: true,
      dinnerGuests: 3,
      dinnerTotal: 125,
      winePairing: true,
      wineGuests: 2,
      wineTotal: 60,
      poolPrivate: false,
      poolPrivateTotal: 0,
      bookings: [
        { id: "spa-1", date: "2027-05-14", equipment: "Bain nordique", time: "18:00", duration: 60, status: "Confirmé" },
        { id: "spa-2", date: "2027-05-15", equipment: "Hammam", time: "10:00", duration: 60, status: "Confirmé" },
        { id: "spa-3", date: "2027-05-15", equipment: "Piscine naturelle", time: "15:00", duration: 60, status: "Partagé possible" },
      ],
    },
    payment: {
      guaranteeAmount: 500,
      guaranteeStatus: "À autoriser",
      optionsTotal: 410,
      optionsPaid: false,
      invoiceStatus: "Brouillon",
    },
    stay: {
      status: "Avant séjour",
      keyStatus: "Accès non activé",
      currentStep: "Préparer votre arrivée",
    },
    operations: {
      roomReady: false,
      breakfastBriefReady: true,
      dinnerBriefReady: true,
      messageUnread: 1,
    },
    integrationHealth: {
      pms: "simulated",
      payment: "simulated",
      messaging: "simulated",
      access: "simulated",
      accounting: "simulated",
    },
    events: [
      { at: "2026-08-08T09:00:00.000Z", type: "booking.confirmed", label: "Réservation fictive confirmée" },
      { at: "2026-08-08T09:02:00.000Z", type: "payment.succeeded", label: "Paiement hébergement simulé" },
      { at: "2026-08-08T09:05:00.000Z", type: "onboarding.updated", label: "Préférences client enregistrées" },
    ],
  };

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved && saved.version === defaultState.version) return saved;
    } catch (_) {}
    const state = clone(defaultState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return state;
  }

  function save(state, eventType, label) {
    if (eventType && label) {
      state.events = state.events || [];
      state.events.unshift({ at: new Date().toISOString(), type: eventType, label });
      state.events = state.events.slice(0, 30);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("csl-demo-change", { detail: state }));
    return state;
  }

  function reset() {
    const state = clone(defaultState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return state;
  }

  function money(value) {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(Number(value || 0));
  }

  function formatDate(value, options) {
    if (!value) return "—";
    return new Intl.DateTimeFormat("fr-FR", options || { day: "numeric", month: "long", year: "numeric" })
      .format(new Date(value + (value.length === 10 ? "T12:00:00" : "")));
  }

  function nightsBetween(arrival, departure) {
    const start = new Date(arrival + "T12:00:00");
    const end = new Date(departure + "T12:00:00");
    return Math.max(1, Math.round((end - start) / 86400000));
  }

  function quote(values) {
    const nights = nightsBetween(values.arrival, values.departure);
    const adults = Number(values.adults || 0);
    const children = Number(values.children || 0);
    const underSix = Number(values.childrenUnderSix || 0);
    const underThree = Number(values.childrenUnderThree || 0);
    // Le prix de base couvre les deux occupants dont le supplément unitaire
    // serait le plus élevé ; seuls les 3e et 4e occupants sont facturés.
    const occupantSupplements = [
      ...Array(adults).fill(50),
      ...Array(Math.max(0, children - underSix)).fill(50),
      ...Array(underSix).fill(25),
    ].sort((a, b) => b - a);
    const additionalPerNight = occupantSupplements.slice(2).reduce((sum, amount) => sum + amount, 0);
    const accommodation = nights * (200 + additionalPerNight);
    const guests = adults + children;
    const spa = values.spaPass ? nights * (50 + Math.max(0, guests - 2) * 25) : 0;
    const dinner = values.dinner ? adults * 50 + Math.max(0, children - underThree) * 25 : 0;
    const wine = values.dinner && values.winePairing ? adults * 30 : 0;
    return { nights, accommodation, spa, dinner, wine, total: accommodation + spa + dinner + wine };
  }

  function toast(message) {
    const element = document.querySelector("[data-demo-toast]");
    if (!element) return;
    element.textContent = message;
    element.classList.add("visible");
    window.clearTimeout(toast.timer);
    toast.timer = window.setTimeout(() => element.classList.remove("visible"), 3200);
  }

  function base(path) {
    const marker = "/demo";
    const current = window.location.pathname;
    const index = current.indexOf(marker);
    const prefix = index >= 0 ? current.slice(0, index) : "";
    return prefix + path;
  }

  window.CSLDemo = { load, save, reset, money, formatDate, nightsBetween, quote, toast, base };

  document.addEventListener("click", function (event) {
    const button = event.target.closest("[data-demo-reset]");
    if (!button) return;
    event.preventDefault();
    reset();
    toast("Le scénario fictif a été réinitialisé.");
    window.setTimeout(() => window.location.reload(), 350);
  });
})();
