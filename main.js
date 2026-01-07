const { app, BrowserWindow } = require('electron');

let mainWindow;
let server;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
  });

  // Charger l'app depuis le serveur local
  mainWindow.loadURL('http://localhost:3000/app/v1/');

  // DevTools en développement
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', () => {
  // Démarrer ton serveur Express existant
  server = require('./server.js');
  
  // Attendre un peu que le serveur démarre
  setTimeout(() => {
    createWindow();
  }, 1500);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
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