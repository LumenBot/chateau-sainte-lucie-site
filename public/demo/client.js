document.addEventListener("DOMContentLoaded", function () {
  const demo = window.CSLDemo;
  if (!demo) return;
  let state = demo.load();

  const qs = (selector, scope) => (scope || document).querySelector(selector);
  const qsa = (selector, scope) => Array.from((scope || document).querySelectorAll(selector));
  const setText = (selector, value) => { const node = qs(selector); if (node) node.textContent = value; };

  function calculateOptionsTotal() {
    return Number(state.services.spaTotal || 0) + Number(state.services.dinnerTotal || 0) + Number(state.services.wineTotal || 0) + Number(state.services.poolPrivateTotal || 0);
  }

  function dateOptions() {
    const select = qs("#spaDate");
    if (!select) return;
    select.innerHTML = "";
    const start = new Date(state.booking.arrival + "T12:00:00");
    for (let i = 0; i < state.booking.nights; i += 1) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const iso = date.toISOString().slice(0, 10);
      const option = document.createElement("option");
      option.value = iso;
      option.textContent = demo.formatDate(iso, { weekday: "long", day: "numeric", month: "long" });
      select.appendChild(option);
    }
  }

  function progress() {
    const keys = ["identity", "occupants", "preferences", "rules", "guarantee", "checkIn"];
    const done = keys.filter((key) => state.onboarding[key]).length;
    const value = Math.round(done / keys.length * 100);
    qs("[data-onboarding-progress]").style.width = value + "%";
    setText("[data-onboarding-percent]", value);
  }

  function renderChecklist() {
    const items = [
      ["Identité et coordonnées", state.onboarding.identity],
      ["Composition du séjour", state.onboarding.occupants],
      ["Accueil et préférences", state.onboarding.preferences],
      ["Règles du domaine", state.onboarding.rules],
      ["Garantie bancaire fictive", state.onboarding.guarantee],
    ];
    const list = qs("[data-client-checklist]");
    list.innerHTML = items.map(([label, done], index) => `
      <li class="demo-check">
        <span class="demo-check-main"><span class="demo-check-icon ${done ? "done" : ""}">${done ? "✓" : index + 1}</span><span>${label}</span></span>
        <span class="demo-status ${done ? "ok" : "warn"}">${done ? "Complet" : "À faire"}</span>
      </li>`).join("");
  }

  function renderSpa() {
    const container = qs("[data-spa-bookings]");
    const bookings = state.services.bookings || [];
    container.innerHTML = bookings.length ? bookings.map((booking) => `
      <div class="demo-list-row">
        <span class="demo-list-main"><span class="demo-check-icon done">✓</span><span><strong>${booking.equipment}</strong><br><small>${demo.formatDate(booking.date, { weekday: "short", day: "numeric", month: "short" })} · ${booking.time} · ${booking.duration} min</small></span></span>
        <button class="demo-button quiet" type="button" data-remove-spa="${booking.id}">Annuler</button>
      </div>`).join("") : "<p>Aucun créneau réservé.</p>";
    setText("[data-spa-count]", bookings.length + " créneau" + (bookings.length > 1 ? "x" : ""));
    const next = bookings[0];
    if (next) {
      setText("[data-next-service]", next.time);
      setText("[data-next-service-label]", next.equipment);
    }
  }

  function renderFinancials() {
    const pool = Number(state.services.poolPrivateTotal || 0);
    const options = calculateOptionsTotal();
    state.payment.optionsTotal = options;
    setText("[data-options-total]", demo.money(state.payment.optionsPaid ? 0 : options));
    setText("[data-checkout-accommodation]", demo.money(state.booking.accommodationTotal));
    setText("[data-checkout-spa]", demo.money(state.services.spaTotal));
    setText("[data-checkout-dinner]", demo.money(state.services.dinnerTotal));
    setText("[data-checkout-wine]", demo.money(state.services.wineTotal));
    setText("[data-checkout-pool]", demo.money(pool));
    setText("[data-checkout-options]", demo.money(state.payment.optionsPaid ? 0 : options));
    setText("[data-checkout-nights]", state.booking.nights + " nuit" + (state.booking.nights > 1 ? "s" : ""));
    const invoice = qs("[data-invoice-status]");
    const wineStatus = qs("[data-wine-payment-status]");
    if (wineStatus) {
      wineStatus.textContent = state.services.winePairing ? (state.payment.optionsPaid ? "Réglé" : "À régler") : "Non choisi";
      wineStatus.className = "demo-status " + (state.services.winePairing ? (state.payment.optionsPaid ? "ok" : "warn") : "simulated");
    }
    if (state.payment.optionsPaid) {
      invoice.textContent = "Réglé · facture disponible";
      invoice.className = "demo-status ok";
    }
  }

  function render() {
    setText("[data-guest-firstname]", state.guest.firstName);
    setText("[data-booking-suite]", state.booking.suite);
    setText("[data-booking-dates]", "du " + demo.formatDate(state.booking.arrival, { day: "numeric", month: "long" }) + " au " + demo.formatDate(state.booking.departure, { day: "numeric", month: "long", year: "numeric" }));
    setText("[data-booking-reference]", state.booking.reference);
    setText("[data-arrival-date]", demo.formatDate(state.booking.arrival, { day: "numeric", month: "short" }));
    setText("[data-nights]", state.booking.nights + " nuit" + (state.booking.nights > 1 ? "s" : ""));
    setText("[data-guests]", state.booking.adults + state.booking.children + " voyageurs");
    setText("[data-sidebar-step]", state.stay.currentStep);
    setText("[data-spa-pass]", state.services.spaPass ? "Activé" : "Non choisi");
    setText("[data-guarantee-status]", state.payment.guaranteeStatus);
    const guarantee = qs("[data-guarantee-status]");
    if (state.onboarding.guarantee) guarantee.className = "demo-status ok";
    const welcome = qs(`[name="welcomeMode"][value="${state.guest.welcomeMode}"]`);
    if (welcome) welcome.checked = true;
    qs("#arrivalTime").value = state.guest.arrivalTime;
    qs("#language").value = state.guest.language;
    qs("#breakfastTime").value = state.guest.breakfastTime;
    qs("#breakfastStyle").value = state.guest.breakfastStyle;
    qs("#dietary").value = state.guest.dietary;
    qs("#dogNoticeAccepted").checked = state.guest.dogNoticeAccepted;
    qs("#winePairingClient").checked = Boolean(state.services.winePairing);
    progress();
    renderChecklist();
    renderSpa();
    renderFinancials();
    dateOptions();
  }

  function openView(view) {
    qsa("[data-view]").forEach((section) => { section.hidden = section.dataset.view !== view; });
    qsa("[data-view-target]").forEach((button) => button.classList.toggle("active", button.dataset.viewTarget === view));
    history.replaceState(null, "", "#" + view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  qsa("[data-view-target]").forEach((button) => button.addEventListener("click", () => openView(button.dataset.viewTarget)));
  qsa("[data-go-view]").forEach((button) => button.addEventListener("click", () => openView(button.dataset.goView)));

  qs("#client-preferences-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.currentTarget;
    state.guest.welcomeMode = form.elements.welcomeMode.value;
    state.guest.arrivalTime = form.elements.arrivalTime.value;
    state.guest.language = form.elements.language.value;
    state.guest.breakfastTime = form.elements.breakfastTime.value;
    state.guest.breakfastStyle = form.elements.breakfastStyle.value;
    state.guest.dietary = form.elements.dietary.value.trim();
    state.guest.dogNoticeAccepted = form.elements.dogNoticeAccepted.checked;
    state.onboarding.preferences = true;
    state.onboarding.rules = form.elements.dogNoticeAccepted.checked;
    demo.save(state, "onboarding.updated", "Préférences d’accueil et de petit-déjeuner mises à jour");
    demo.toast("Vos préférences fictives ont été transmises à l’équipe.");
    render();
  });

  qs("[data-authorize-guarantee]").addEventListener("click", function () {
    state.onboarding.guarantee = true;
    state.payment.guaranteeStatus = "Autorisée · simulation";
    demo.save(state, "guarantee.authorized", "Empreinte bancaire fictive autorisée");
    demo.toast("Empreinte fictive de 500 € autorisée.");
    render();
  });

  qs("[data-save-dinner]").addEventListener("click", function () {
    state.services.winePairing = qs("#winePairingClient").checked;
    state.services.wineGuests = state.booking.adults;
    state.services.wineTotal = state.services.winePairing ? state.booking.adults * 30 : 0;
    state.payment.optionsTotal = calculateOptionsTotal();
    demo.save(state, "dinner.updated", "Préférences du dîner et accord des vins mis à jour");
    demo.toast("Vos préférences fictives ont été transmises à la table.");
    renderFinancials();
  });

  qs("#spa-booking-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.currentTarget;
    const date = form.elements.date.value;
    const equipment = form.elements.equipment.value;
    const time = form.elements.time.value;
    const privatePool = form.elements.privatePool.checked && equipment === "Piscine naturelle";
    const sameEquipment = state.services.bookings.filter((item) => item.date === date && item.equipment === equipment);
    const sameDayHours = state.services.bookings.filter((item) => item.date === date).reduce((total, item) => total + item.duration / 60, 0);
    const requestedHours = privatePool ? 2 : 1;
    if (sameEquipment.length + requestedHours > 2) {
      demo.toast("Limite atteinte : deux heures par équipement et par jour.");
      return;
    }
    if (sameDayHours + requestedHours > 8) {
      demo.toast("Limite atteinte : huit heures de spa par suite et par jour.");
      return;
    }
    if (privatePool) state.services.poolPrivateTotal += 50;
    state.services.bookings.push({
      id: "spa-" + Date.now(), date, equipment, time,
      duration: privatePool ? 120 : 60,
      status: privatePool ? "Privatisé" : equipment === "Piscine naturelle" ? "Partagé possible" : "Confirmé",
    });
    state.payment.optionsTotal = calculateOptionsTotal();
    demo.save(state, "service.booked", equipment + " réservé en simulation");
    demo.toast(privatePool ? "Piscine privatisée pour deux heures (+50 €)." : "Créneau ajouté au programme.");
    form.reset();
    render();
  });

  qs("[data-spa-bookings]").addEventListener("click", function (event) {
    const button = event.target.closest("[data-remove-spa]");
    if (!button) return;
    const booking = state.services.bookings.find((item) => item.id === button.dataset.removeSpa);
    if (booking && booking.status === "Privatisé") state.services.poolPrivateTotal = Math.max(0, state.services.poolPrivateTotal - 50);
    state.services.bookings = state.services.bookings.filter((item) => item.id !== button.dataset.removeSpa);
    state.payment.optionsTotal = calculateOptionsTotal();
    demo.save(state, "service.cancelled", "Créneau de service annulé dans la simulation");
    demo.toast("Créneau retiré du programme fictif.");
    render();
  });

  qs("[data-pay-options]").addEventListener("click", function () {
    state.payment.optionsPaid = true;
    state.payment.invoiceStatus = "Payée";
    demo.save(state, "payment.succeeded", "Règlement fictif des options accepté");
    demo.toast("Règlement fictif accepté. La facture est prête.");
    renderFinancials();
  });

  qs("[data-complete-checkout]").addEventListener("click", function () {
    if (!state.payment.optionsPaid) {
      demo.toast("Le solde des options doit être simulé avant le départ.");
      return;
    }
    state.onboarding.checkOut = true;
    state.stay.status = "Séjour terminé";
    state.stay.currentStep = "Merci et à bientôt";
    state.stay.keyStatus = "Accès désactivé";
    demo.save(state, "stay.checked_out", "Check-out client simulé");
    const status = qs("[data-checkout-status]");
    status.textContent = "Check-out terminé";
    status.className = "demo-status ok";
    demo.toast("Départ fictif finalisé. Merci pour ce séjour.");
  });

  qsa("[data-contact-host], [data-help], [data-story-next], [data-story-card], [data-download-invoice]").forEach((button) => {
    button.addEventListener("click", () => demo.toast("Interaction simulée : le flux réel sera connecté lors de l’intégration."));
  });

  const initial = window.location.hash.replace("#", "");
  if (["overview", "prepare", "services", "guide", "checkout", "assistance"].includes(initial)) openView(initial);
  render();
});
