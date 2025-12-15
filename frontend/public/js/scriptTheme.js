(function () {
  // Détecter le thème du système
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const systemTheme = prefersDark ? "dark" : "light";

  // Utiliser le thème sauvegardé, sinon le thème du système
  const theme = localStorage.getItem("theme") || systemTheme;

  document.documentElement.setAttribute("data-theme", theme);
  console.log("🎨 Thème appliqué:", theme, "(système:", systemTheme + ")");
})();
