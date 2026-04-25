// app.js
// - Dark/Light mode (se guarda en localStorage)
// - Marca nav activo
// - Toggle para secciones colapsables
// - Año automático

(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("themeToggle");

  // 1) Tema: cargar preferencia
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    root.setAttribute("data-theme", savedTheme);
  } else {
    // Si no hay preferencia guardada, usa la del sistema
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }

  // 2) Pintar estado del botón
  function syncThemeToggleUI() {
    if (!toggleBtn) return;
    const theme = root.getAttribute("data-theme");
    const icon = toggleBtn.querySelector(".theme-icon");
    const label = toggleBtn.querySelector(".theme-label");

    if (theme === "dark") {
      if (icon) icon.textContent = "🌙";
      if (label) label.textContent = "Dark";
    } else {
      if (icon) icon.textContent = "☀️";
      if (label) label.textContent = "Light";
    }
  }
  syncThemeToggleUI();

  // 3) Click toggle
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      syncThemeToggleUI();
    });
  }

  // Año automático
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Marcar nav activo (por hash o por archivo)
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  const navLinks = document.querySelectorAll("[data-nav]");
  navLinks.forEach((a) => {
    const key = a.getAttribute("data-nav");

    const isHome =
      key === "home" &&
      (hash === "#home" ||
        hash === "" ||
        path.endsWith("/index.html") ||
        path.endsWith("/"));

    const isAbout = key === "about" && hash === "#about";
    const isAfrodita = key === "afrodita" && path.includes("afrodita.html");
    const isMultimedia =
      key === "multimedia" && path.includes("multimedia.html");
    const isMitologia = key === "mitologia" && path.includes("mitologia.html");

    if (isHome || isAbout || isAfrodita || isMultimedia || isMitologia) {
      a.classList.add("active");
    }
  });

  // Toggle collapsibles
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-toggle]");
    if (!btn) return;

    const selector = btn.getAttribute("data-toggle");
    const target = document.querySelector(selector);
    if (!target) return;

    const isHidden = target.hasAttribute("hidden");
    if (isHidden) target.removeAttribute("hidden");
    else target.setAttribute("hidden", "");
  });
})();
