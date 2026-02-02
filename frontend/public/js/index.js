// ========================================
// THÈME DARK/LIGHT
// ========================================

class ThemeManager {
  constructor() {
    this.STORAGE_KEY = "app-theme";
    this.LIGHT_THEME = "light";
    this.DARK_THEME = "dark";
    this.HTML_ELEMENT = document.documentElement;
    this.CHECKBOX_SELECTOR = "#theme-toggle";

    this.init();
  }

  init() {
    this.applyStoredOrSystemTheme();
    this.setupCheckbox();
  }

  getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? this.DARK_THEME
      : this.LIGHT_THEME;
  }

  getThemeToApply() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored || this.getSystemTheme();
  }

  applyTheme(theme) {
    if (theme !== this.LIGHT_THEME && theme !== this.DARK_THEME) {
      theme = this.LIGHT_THEME;
    }
    this.HTML_ELEMENT.setAttribute("data-theme", theme);
  }

  saveTheme(theme) {
    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  applyStoredOrSystemTheme() {
    const theme = this.getThemeToApply();
    this.applyTheme(theme);
  }

  setupCheckbox() {
    const checkbox = document.querySelector(this.CHECKBOX_SELECTOR);
    if (!checkbox) return;

    const currentTheme = this.HTML_ELEMENT.getAttribute("data-theme");
    checkbox.checked = currentTheme === this.DARK_THEME;

    checkbox.addEventListener("change", (e) => {
      const newTheme = e.target.checked ? this.DARK_THEME : this.LIGHT_THEME;
      this.applyTheme(newTheme);
      this.saveTheme(newTheme);
    });
  }
}

// ========================================
// MODAL DE CONFIRMATION
// ========================================

class ConfirmationModal {
  constructor() {
    console.log('🔧 Initialisation du modal de confirmation...');

    // Éléments du modal
    this.modal = document.getElementById('confirmationModal');
    this.modalMessage = document.getElementById('modalMessage');
    this.taskPreview = document.getElementById('taskPreview');
    this.confirmBtn = document.getElementById('modalConfirmBtn');
    this.cancelBtn = document.getElementById('modalCancelBtn');
    this.closeBtn = document.querySelector('.modal-close-btn');

    // Vérification des éléments
    if (!this.modal) {
      console.error('❌ Modal non trouvé! Vérifiez que le HTML est présent dans index.ejs');
      return;
    }

    if (!this.modalMessage || !this.confirmBtn || !this.cancelBtn) {
      console.error('❌ Un ou plusieurs éléments du modal sont manquants');
      return;
    }

    this.currentTaskId = null;
    this.currentTaskTitle = null;
    this.currentForm = null;

    this.init();
  }

  init() {
    console.log('✅ Éléments du modal trouvés, initialisation...');

    // Écouteurs d'événements
    this.cancelBtn.addEventListener('click', () => this.hide());
    this.closeBtn?.addEventListener('click', () => this.hide());
    this.confirmBtn.addEventListener('click', () => this.confirm());

    // Fermer en cliquant sur l'overlay
    this.modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay') || e.target === this.modal) {
        this.hide();
      }
    });

    // Fermer avec la touche Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.hide();
      }
    });

    // Lier les boutons de suppression
    this.bindDeleteButtons();

    console.log('✅ Modal initialisé avec succès');
  }

  bindDeleteButtons() {
    // Utiliser la délégation d'événements pour gérer les boutons dynamiques
    document.addEventListener('click', (e) => {
      const deleteBtn = e.target.closest('.delete-btn');
      if (deleteBtn) {
        e.preventDefault();
        e.stopPropagation();
        this.show(deleteBtn);
      }
    });

    // Afficher un message de débogage
    const deleteButtons = document.querySelectorAll('.delete-btn');
    console.log(`🔍 ${deleteButtons.length} bouton(s) de suppression détecté(s)`);
  }

  show(deleteButton) {
    console.log('📋 Affichage du modal...');

    // Récupérer les données
    this.currentTaskId = deleteButton.dataset.taskId;
    this.currentTaskTitle = deleteButton.dataset.taskTitle || 'Tâche sans titre';

    if (!this.currentTaskId) {
      console.error('❌ ID de tâche manquant');
      return;
    }

    // Mettre à jour le contenu du modal
    this.modalMessage.textContent = `Êtes-vous sûr de vouloir supprimer cette tâche ?`;

    if (this.taskPreview) {
      this.taskPreview.innerHTML = `
        <h4>${this.escapeHtml(this.currentTaskTitle)}</h4>
        <p><small>ID: ${this.currentTaskId}</small></p>
      `;
    }

    // Trouver le formulaire de suppression
    this.findOrCreateForm();

    // Afficher le modal
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus sur le bouton Annuler pour UX
    setTimeout(() => this.cancelBtn.focus(), 100);
  }

  findOrCreateForm() {
    // Chercher un formulaire existant
    this.currentForm = document.querySelector(`form[action*="/tasks/${this.currentTaskId}/delete"]`);

    // Si aucun formulaire n'est trouvé, en créer un
    if (!this.currentForm) {
      console.log(`📝 Création d'un formulaire pour la tâche ${this.currentTaskId}`);
      this.currentForm = document.createElement('form');
      this.currentForm.method = 'POST';
      this.currentForm.action = `/app/v1/tasks/${this.currentTaskId}/delete`;
      this.currentForm.style.display = 'none';
      document.body.appendChild(this.currentForm);
    }
  }

  hide() {
    console.log('🔒 Fermeture du modal');
    this.modal.classList.remove('active');
    document.body.style.overflow = '';

    // Réinitialiser
    this.currentTaskId = null;
    this.currentTaskTitle = null;
    this.currentForm = null;

    // Réinitialiser le bouton de confirmation
    this.confirmBtn.innerHTML = '<i class="fas fa-trash"></i> Supprimer';
    this.confirmBtn.disabled = false;
  }

  confirm() {
    if (!this.currentForm) {
      console.error('❌ Aucun formulaire à soumettre');
      this.hide();
      return;
    }

    console.log(`🗑️  Suppression de la tâche: ${this.currentTaskTitle}`);

    // Animation de suppression
    this.confirmBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Suppression...';
    this.confirmBtn.disabled = true;

    // Soumettre après un délai pour l'effet visuel
    setTimeout(() => {
      try {
        this.currentForm.submit();
      } catch (error) {
        console.error('❌ Erreur lors de la soumission:', error);
        this.hide();
      }
    }, 800);
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// ========================================
// INITIALISATION PRINCIPALE
// ========================================

// Initialiser quand le DOM est complètement chargé
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Application TodoApp - Initialisation...');

  // Initialiser le gestionnaire de thème
  try {
    const themeManager = new ThemeManager();
    window.themeManager = themeManager;
    console.log('✅ Gestionnaire de thème initialisé');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation du thème:', error);
  }

  // Initialiser le modal de confirmation
  try {
    const confirmationModal = new ConfirmationModal();
    window.confirmationModal = confirmationModal;
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation du modal:', error);
  }

  // Message de confirmation
  console.log('✅ TodoApp prêt à fonctionner !');

  // Vérification finale
  setTimeout(() => {
    const modalExists = !!document.getElementById('confirmationModal');
    console.log(`📊 Modal présent dans le DOM: ${modalExists ? '✅ OUI' : '❌ NON'}`);

    const deleteButtons = document.querySelectorAll('.delete-btn');
    console.log(`📊 Boutons de suppression: ${deleteButtons.length}`);
  }, 500);
});