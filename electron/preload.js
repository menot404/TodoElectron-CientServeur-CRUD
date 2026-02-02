/**
 * electron/preload.js
 * BUT: Exposer window.electronAPI pour ton app existante
 */

const { contextBridge, ipcRenderer } = require('electron');

// Créer l'API Electron
const electronAPI = {
  // Détection
  isElectron: true,
  
  // APIs système
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),
  
  // APIs fichiers
  openFileDialog: (options) => ipcRenderer.invoke('dialog:openFile', options),
  
  // APIs fenêtre
  minimizeWindow: () => ipcRenderer.send('window:minimize'),
  maximizeWindow: () => ipcRenderer.send('window:maximize'),
  closeWindow: () => ipcRenderer.send('window:close'),
  
  // Notifications
  showNotification: (title, body) => 
    ipcRenderer.send('notification:show', { title, body }),
  
  // Test
  testConnection: () => {
    console.log('✅ Connexion Electron active');
    return { status: 'connected', mode: 'wrapper' };
  }
};

// Exposer l'API
contextBridge.exposeInMainWorld('electronAPI', electronAPI);
