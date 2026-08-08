document.addEventListener("DOMContentLoaded", function () {
  const demo = window.CSLDemo;
  if (!demo) return;
  let state = demo.load();

  document.querySelectorAll("[data-failure]").forEach((button) => {
    button.addEventListener("click", function () {
      const key = button.dataset.failure;
      const isFailure = state.integrationHealth[key] === "failure";
      state.integrationHealth[key] = isFailure ? "simulated" : "failure";
      demo.save(state, isFailure ? "integration.recovered" : "integration.failed", (isFailure ? "Rétablissement" : "Panne") + " fictif : " + key);
      render();
      demo.toast(isFailure ? "Service fictif rétabli." : "Panne fictive activée : le scénario de repli est appliqué.");
    });
  });

  function render() {
    document.querySelectorAll("[data-health]").forEach((badge) => {
      const key = badge.dataset.health;
      const failure = state.integrationHealth[key] === "failure";
      badge.textContent = failure ? "Panne simulée" : key.toUpperCase() + " simulé";
      badge.className = "demo-status " + (failure ? "danger" : "simulated");
      const button = document.querySelector(`[data-failure="${key}"]`);
      if (button) button.textContent = failure ? "Rétablir le service" : "Simuler la panne";
    });
  }
  render();
});
