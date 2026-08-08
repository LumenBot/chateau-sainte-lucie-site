document.addEventListener("DOMContentLoaded", function () {
  const demo = window.CSLDemo;
  if (!demo) return;
  let state = demo.load();
  const qs = (selector, scope) => (scope || document).querySelector(selector);
  const qsa = (selector, scope) => Array.from((scope || document).querySelectorAll(selector));
  const setAll = (selector, value) => qsa(selector).forEach((node) => { node.textContent = value; });

  function onboardingPercent() {
    const keys = ["identity", "occupants", "preferences", "rules", "guarantee", "checkIn"];
    return Math.round(keys.filter((key) => state.onboarding[key]).length / keys.length * 100);
  }

  function renderSpa() {
    const items = state.services.bookings || [];
    const container = qs("[data-manager-spa-list]");
    container.innerHTML = items.length ? items.map((item) => `
      <div class="demo-list-row">
        <span class="demo-list-main"><span class="demo-check-icon done">✓</span><span><strong>${item.equipment}</strong><br><small>${demo.formatDate(item.date, { weekday: "short", day: "numeric", month: "short" })} · ${item.time} · ${item.duration} min</small></span></span>
        <span class="demo-status ${item.status === "Partagé possible" ? "warn" : "ok"}">${item.status}</span>
      </div>`).join("") : "<p>Aucun créneau programmé.</p>";
    setAll("[data-manager-spa-count]", items.length + " réservation" + (items.length > 1 ? "s" : ""));
  }

  function renderEvents() {
    const container = qs("[data-manager-events]");
    container.innerHTML = (state.events || []).map((event) => `
      <div class="demo-event">
        <span><strong>${event.label}</strong><br><small>${event.type}</small></span>
        <time>${new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(event.at))}</time>
      </div>`).join("");
  }

  function render() {
    const fullName = state.guest.firstName + " " + state.guest.lastName;
    const dates = demo.formatDate(state.booking.arrival, { day: "numeric", month: "short" }) + "–" + demo.formatDate(state.booking.departure, { day: "numeric", month: "short" }) + " · " + state.booking.nights + " nuits";
    const options = Number(state.payment.optionsTotal || 0);
    setAll("[data-manager-guest]", fullName);
    setAll("[data-manager-suite]", state.booking.suite);
    setAll("[data-manager-dates]", dates);
    setAll("[data-manager-guests]", state.booking.adults + state.booking.children);
    setAll("[data-manager-welcome]", state.guest.welcomeMode + " · " + state.guest.arrivalTime);
    setAll("[data-manager-welcome-mode]", state.guest.welcomeMode);
    setAll("[data-manager-arrival-time]", state.guest.arrivalTime);
    setAll("[data-manager-language]", state.guest.language);
    setAll("[data-manager-key-status]", state.stay.keyStatus);
    setAll("[data-manager-breakfast]", state.guest.breakfastTime.replace(":", "h") + " · " + state.guest.breakfastStyle.toLowerCase());
    setAll("[data-manager-dietary]", state.guest.dietary || "Aucune préférence signalée");
    setAll("[data-manager-dogs]", state.guest.dogNoticeAccepted ? "Information acceptée" : "À confirmer");
    setAll("[data-service-breakfast-time]", state.guest.breakfastTime);
    setAll("[data-service-dietary]", state.guest.dietary || "—");
    setAll("[data-manager-accommodation]", demo.money(state.booking.accommodationTotal) + " · payé");
    setAll("[data-finance-accommodation]", demo.money(state.booking.accommodationTotal));
    setAll("[data-finance-options]", demo.money(options));
    setAll("[data-finance-total]", demo.money(state.booking.accommodationTotal + options));
    setAll("[data-finance-spa]", demo.money(state.services.spaTotal));
    setAll("[data-finance-dinner]", demo.money(state.services.dinnerTotal));
    setAll("[data-finance-wine]", demo.money(state.services.wineTotal));
    setAll("[data-finance-options-status]", state.payment.optionsPaid ? "encaissé fictivement" : "à encaisser");
    setAll("[data-finance-guarantee]", state.onboarding.guarantee ? "autorisée fictivement" : "non autorisée");
    setAll("[data-manager-guarantee]", state.onboarding.guarantee ? "Empreinte fictive autorisée" : "Empreinte fictive à autoriser");
    const guaranteeStatus = qs("[data-manager-guarantee-status]");
    guaranteeStatus.textContent = state.onboarding.guarantee ? "Conforme" : "À suivre";
    guaranteeStatus.className = "demo-status " + (state.onboarding.guarantee ? "ok" : "warn");
    const completion = qs("[data-arrival-completion]");
    completion.textContent = "Préparation à " + onboardingPercent() + " %";
    completion.className = "demo-status " + (onboardingPercent() === 100 ? "ok" : "warn");
    const roomIcon = qs("[data-room-icon]");
    if (state.operations.roomReady) { roomIcon.textContent = "✓"; roomIcon.className = "demo-check-icon done"; }
    const roomState = qs("[data-room-state]");
    if (state.operations.roomReady) roomState.innerHTML = '<span class="demo-status ok">Terminée</span>';
    qsa("[data-finance-payment-state]").forEach((node) => {
      node.textContent = state.payment.optionsPaid ? "Rapproché" : "À encaisser";
      node.className = "demo-status " + (state.payment.optionsPaid ? "ok" : "warn");
    });
    renderSpa();
    renderEvents();
  }

  function openView(view) {
    qsa("[data-manager-view]").forEach((section) => { section.hidden = section.dataset.managerView !== view; });
    qsa("[data-manager-target]").forEach((button) => button.classList.toggle("active", button.dataset.managerTarget === view));
    history.replaceState(null, "", "#" + view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  qsa("[data-manager-target]").forEach((button) => button.addEventListener("click", () => openView(button.dataset.managerTarget)));
  qsa("[data-manager-go]").forEach((button) => button.addEventListener("click", () => openView(button.dataset.managerGo)));

  qs("[data-room-ready]").addEventListener("click", function () {
    state.operations.roomReady = true;
    demo.save(state, "operations.room_ready", state.booking.suite + " déclarée prête");
    demo.toast("La suite est déclarée prête dans le scénario fictif.");
    render();
  });

  qs("[data-manager-checkin]").addEventListener("click", function () {
    state.onboarding.checkIn = true;
    state.stay.status = "En séjour";
    state.stay.currentStep = "Profiter du château";
    state.stay.keyStatus = "Accès activé · simulation";
    demo.save(state, "stay.checked_in", "Arrivée client et activation d’accès simulées");
    demo.toast("Check-in fictif réalisé. L’espace client est mis à jour.");
    render();
  });

  qsa("[data-manager-message], [data-add-task], [data-report-incident], [data-export-accounting], [data-export-kpi]").forEach((button) => {
    button.addEventListener("click", () => demo.toast("Action simulée et ajoutée au périmètre de la future intégration."));
  });
  qs("[data-refresh-events]").addEventListener("click", () => { state = demo.load(); renderEvents(); demo.toast("Journal fictif actualisé."); });

  window.addEventListener("csl-demo-change", (event) => { state = event.detail; render(); });
  const initial = window.location.hash.replace("#", "");
  if (["dashboard", "calendar", "arrivals", "services", "operations", "finance", "events"].includes(initial)) openView(initial);
  render();
});
