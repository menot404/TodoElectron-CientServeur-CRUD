const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let server;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    title: "TODOs APP",
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
  mainWindow.loadURL('http://localhost:3000/app/v1/');

  // DevTools en développement
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }


  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

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