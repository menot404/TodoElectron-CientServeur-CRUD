const { app, BrowserWindow, ipcMain, dialog, Notification } = require('electron');
const path = require('path');

let mainWindow;
let server;


/**
 * Créer la fenêtre Electron
 */
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    title: "Todo App - Version Desktop",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    //Une meilleure intégration desktop
    frame: true,
  });

  // Charger l'app depuis le serveur local
  mainWindow.loadURL('http://localhost:3000/app/v1/')

  // DevTools en développement
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }


  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}
/**
 * Cycle de vie de l'app Electron
 */

app.on('ready', () => {
  // Démarrer ton serveur Express existant
  server = require('../server.js');

  // Attendre un peu que le serveur démarre
  setTimeout(() => {
    createWindow();
    console.log('Starting Electron application...');
  }, 1500);
});

app.on('window-all-closed', () => {
  if (process.env.NODE_ENV !== 'darwin') {
    // Fermer le serveur proprement
    if (server && server.close) {
      server.close();
    }
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});


// ============================================
// APIs Electron pour ton app existante
// ============================================

// 1. Informations système
ipcMain.handle('get-app-info', () => {
  return {
    name: 'Todo App Desktop',
    version: '1.0.0',
    platform: process.platform,
    electronVersion: process.versions.electron
  };
});

// 2. Boîtes de dialogue fichiers
ipcMain.handle('dialog:openFile', async (event, options = {}) => {
  const result = await dialog.showOpenDialog(mainWindow, {
    title: 'Ouvrir un fichier',
    properties: ['openFile'],
    filters: [
      { name: 'Tous les fichiers', extensions: ['*'] }
    ],
    ...options
  });
  return result;
});

// 3. Gestion fenêtre
ipcMain.on('window:minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window:maximize', () => {
  if (mainWindow) {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  }
});

ipcMain.on('window:close', () => {
  if (mainWindow) mainWindow.close();
});

// 4. Notifications système
ipcMain.on('notification:show', (event, { title, body }) => {
  new Notification({
    title: title || 'Notification',
    body: body || ''
  }).show();
});