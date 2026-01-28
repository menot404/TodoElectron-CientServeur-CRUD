/**
 * electron/preload.js
 * BUT: Exposer des APIs Electron à ton app web existante
 */

const { contextBridge, ipcRenderer } = require("electron");

// APIs basiques pour améliorer l'expérience desktop
contextBridge.exposeInMainWorld("electronAPI", {
    // Détection d'Electron
    isElectron: true,

    // APIs système
    getAppInfo: () => ({
        name: "TODOS APP",
        version: "1.0.0",
        platform: process.platform,
    }),

    // APIs fenêtre
    minimizeWindow: () => ipcRenderer.send("window:minimize"),
    maximizeWindow: () => ipcRenderer.send("window:maximize"),
    closeWindow: () => ipcRenderer.send("window:close"),

    // Notifications
    showNotification: (title, body) =>
        ipcRenderer.send("notification:show", { title, body }),
});

// Ajouter un style pour la barre de titre
const style = document.createElement("style");
style.textContent = `
  .electron-titlebar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 32px;
    background: #2c3e50;
    -webkit-app-region: drag;
    z-index: 9999;
  }
`;
document.head.appendChild(style);
