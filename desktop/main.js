/**
 * main.js - Point d'entrée simplifié
 * Délègue tout au AppManager
 */

// Désactiver les warnings pour un démarrage propre
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

// Optimisations de performance
require('v8').setFlagsFromString('--max-old-space-size=4096');

async function bootstrap() {
  try {
    const AppManager = require('./core/AppManager');
    
    // Initialiser l'application
    const appManager = new AppManager();
    await appManager.initialize();
    
  } catch (error) {
    console.error('💥 Bootstrap failed:', error);
    
    // Fallback simple en cas d'échec
    const { app, dialog } = require('electron');
    dialog.showErrorBox(
      'Startup Error',
      `Failed to start application:\n\n${error.message}`
    );
    
    app.exit(1);
  }
}

// Point d'entrée
bootstrap();