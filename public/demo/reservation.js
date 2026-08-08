document.addEventListener("DOMContentLoaded", function () {
  const demo = window.CSLDemo;
  const form = document.getElementById("demo-booking-form");
  if (!demo || !form) return;

  const fields = {
    arrival: form.elements.arrival,
    departure: form.elements.departure,
    adults: form.elements.adults,
    children: form.elements.children,
    childrenUnderSix: form.elements.childrenUnderSix,
    childrenUnderThree: form.elements.childrenUnderThree,
    spaPass: form.elements.spaPass,
    dinner: form.elements.dinner,
  };

  function values() {
    return {
      arrival: fields.arrival.value,
      departure: fields.departure.value,
      adults: Number(fields.adults.value),
      children: Number(fields.children.value),
      childrenUnderSix: Number(fields.childrenUnderSix.value),
      childrenUnderThree: Number(fields.childrenUnderThree.value),
      spaPass: fields.spaPass.checked,
      dinner: fields.dinner.checked,
    };
  }

  function render() {
    const value = values();
    if (value.childrenUnderSix > value.children) {
      fields.childrenUnderSix.value = String(value.children);
      value.childrenUnderSix = value.children;
    }
    if (value.childrenUnderThree > value.childrenUnderSix) {
      fields.childrenUnderThree.value = String(value.childrenUnderSix);
      value.childrenUnderThree = value.childrenUnderSix;
    }
    if (value.adults + value.children > 4) {
      demo.toast("Une suite accueille au maximum quatre personnes.");
    }
    const quote = demo.quote(value);
    const suite = form.querySelector('[name="suite"]:checked').value;
    form.querySelector("[data-summary-suite]").textContent = suite;
    form.querySelector("[data-summary-nights]").textContent = quote.nights + (quote.nights > 1 ? " nuits" : " nuit");
    form.querySelector("[data-summary-guests]").textContent = value.adults + value.children + " personne" + (value.adults + value.children > 1 ? "s" : "");
    form.querySelector("[data-price-accommodation]").textContent = demo.money(quote.accommodation);
    form.querySelector("[data-price-spa]").textContent = demo.money(quote.spa);
    form.querySelector("[data-price-dinner]").textContent = demo.money(quote.dinner);
    form.querySelector("[data-price-total]").textContent = demo.money(quote.total);
    form.querySelector("[data-price-now]").textContent = demo.money(quote.accommodation);
    form.querySelector("[data-price-later]").textContent = demo.money(quote.spa + quote.dinner);
  }

  form.addEventListener("input", render);
  form.addEventListener("change", render);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const value = values();
    if (value.adults + value.children > 4) {
      demo.toast("Ajustez la composition : quatre personnes maximum.");
      return;
    }
    if (new Date(value.departure) <= new Date(value.arrival)) {
      demo.toast("La date de départ doit suivre la date d’arrivée.");
      return;
    }
    const quote = demo.quote(value);
    const state = demo.load();
    const suite = form.querySelector('[name="suite"]:checked').value;
    state.booking = {
      ...state.booking,
      suite,
      arrival: value.arrival,
      departure: value.departure,
      adults: value.adults,
      children: value.children,
      childrenUnderSix: value.childrenUnderSix,
      childrenUnderThree: value.childrenUnderThree,
      nights: quote.nights,
      accommodationTotal: quote.accommodation,
      accommodationPaid: true,
      status: "Confirmée",
    };
    state.guest.firstName = form.elements.firstName.value.trim();
    state.guest.lastName = form.elements.lastName.value.trim();
    state.guest.email = form.elements.email.value.trim();
    state.services.spaPass = value.spaPass;
    state.services.spaTotal = quote.spa;
    state.services.dinner = value.dinner;
    state.services.dinnerGuests = value.adults + value.children;
    state.services.dinnerTotal = quote.dinner;
    state.services.bookings = [];
    state.services.poolPrivate = false;
    state.services.poolPrivateTotal = 0;
    state.payment.optionsTotal = quote.spa + quote.dinner;
    state.payment.optionsPaid = false;
    state.payment.invoiceStatus = "Brouillon";
    const dateCode = value.arrival.slice(2).replaceAll("-", "");
    state.booking.reference = "CSL-" + dateCode + "-" + (suite === "Suite Lumière" ? "LUM" : "FEU");
    state.stay.status = "Avant séjour";
    state.stay.currentStep = "Préparer votre arrivée";
    demo.save(state, "booking.confirmed", "Réservation et paiement simulés confirmés");
    demo.toast("Paiement fictif accepté. Ouverture de votre espace client…");
    window.setTimeout(() => { window.location.href = demo.base("/demo/client"); }, 900);
  });

  render();
});
