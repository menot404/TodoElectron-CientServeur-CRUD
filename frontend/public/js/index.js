// ========================================
// SYSTÈME DE THÈME DARK/LIGHT - PRO UI/UX
// ========================================

class ThemeManager {
  constructor() {
    this.STORAGE_KEY = 'app-theme';
    this.LIGHT_THEME = 'light';
    this.DARK_THEME = 'dark';
    this.HTML_ELEMENT = document.documentElement;
    this.CHECKBOX_SELECTOR = '#theme-toggle';

    this.init();
  }

  // Initialisation au chargement
  init() {
    console.log('🎨 ThemeManager: Initialisation...');

    // Appliquer le thème sauvegardé ou détecté
    this.applyStoredOrSystemTheme();

    // Attendre que le DOM soit chargé pour synchroniser le checkbox
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupCheckbox());
    } else {
      this.setupCheckbox();
    }
  }

  // Obtenir le thème système
  getSystemTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? this.DARK_THEME : this.LIGHT_THEME;
  }

  // Obtenir le thème à appliquer (localStorage > système > light)
  getThemeToApply() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      console.log(`💾 Thème trouvé dans localStorage: ${stored}`);
      return stored;
    }

    const system = this.getSystemTheme();
    console.log(`🖥️  Thème système détecté: ${system}`);
    return system;
  }

  // Appliquer le thème
  applyTheme(theme) {
    if (theme !== this.LIGHT_THEME && theme !== this.DARK_THEME) {
      console.warn(`⚠️  Thème invalide: ${theme}. Utilisation de 'light'.`);
      theme = this.LIGHT_THEME;
    }

    this.HTML_ELEMENT.setAttribute('data-theme', theme);
    console.log(`✅ Thème appliqué: ${theme}`);

    // Émettre un événement personnalisé
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme } }));
  }

  // Sauvegarder le thème dans localStorage
  saveTheme(theme) {
    localStorage.setItem(this.STORAGE_KEY, theme);
    console.log(`💾 Thème sauvegardé dans localStorage: ${theme}`);
  }

  // Appliquer et sauvegarder
  applyStoredOrSystemTheme() {
    const theme = this.getThemeToApply();
    this.applyTheme(theme);
  }

  // Configurer le checkbox et les événements
  setupCheckbox() {
    const checkbox = document.querySelector(this.CHECKBOX_SELECTOR);

    if (!checkbox) {
      console.warn(`⚠️  Élément ${this.CHECKBOX_SELECTOR} non trouvé!`);
      return;
    }

    // Synchroniser l'état du checkbox avec le thème actuel
    const currentTheme = this.HTML_ELEMENT.getAttribute('data-theme');
    checkbox.checked = currentTheme === this.DARK_THEME;
    console.log(`✅ Checkbox synchronisé: ${checkbox.checked ? 'dark' : 'light'}`);

    // Écouter les changements du checkbox
    checkbox.addEventListener('change', (e) => this.handleToggle(e));

    // Écouter les changements du thème système
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.handleSystemThemeChange(e);
    });
  }

  // Gérer le changement du checkbox
  handleToggle(event) {
    const isChecked = event.target.checked;
    const newTheme = isChecked ? this.DARK_THEME : this.LIGHT_THEME;

    console.log(`🔀 Changement de thème via switch: ${newTheme}`);

    this.applyTheme(newTheme);
    this.saveTheme(newTheme);
  }

  // Gérer le changement du thème système
  handleSystemThemeChange(event) {
    // Seulement appliquer si aucun thème n'a été choisi manuellement
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const newTheme = event.matches ? this.DARK_THEME : this.LIGHT_THEME;
      console.log(`��️  Thème système changé en: ${newTheme}`);

      this.applyTheme(newTheme);

      // Mettre à jour le checkbox si disponible
      const checkbox = document.querySelector(this.CHECKBOX_SELECTOR);
      if (checkbox) {
        checkbox.checked = newTheme === this.DARK_THEME;
      }
    }
  }

  // Méthode pour changer le thème via code
  setTheme(theme) {
    this.applyTheme(theme);
    this.saveTheme(theme);
    const checkbox = document.querySelector(this.CHECKBOX_SELECTOR);
    if (checkbox) {
      checkbox.checked = theme === this.DARK_THEME;
    }
  }

  // Méthode pour obtenir le thème actuel
  getCurrentTheme() {
    return this.HTML_ELEMENT.getAttribute('data-theme');
  }

  // Basculer le thème
  toggleTheme() {
    const current = this.getCurrentTheme();
    const newTheme = current === this.LIGHT_THEME ? this.DARK_THEME : this.LIGHT_THEME;
    this.setTheme(newTheme);
  }
}

// Initialiser le gestionnaire de thème
const themeManager = new ThemeManager();

// Exposer globalement pour accès externe
window.themeManager = themeManager;
