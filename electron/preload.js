const { contextBridge, ipcRenderer} = require('electron');

// Exposition sécurisée des APIs au processus de rendu
contextBridge.executeInMainWorld('electronAPI', {

    getAppVersion: ()=> ipcRenderer.invoke('get-app-version'),
    showOpenDialog: (options) => ipcRenderer.invoke('show-open-dialog', options),
    sendMessage: (message)=> ipcRenderer.invoke('send-message', message),
    showNotification: (title, body)=>{
        ipcRenderer.invoke('show-notification', {title, body})
    }
})

// Exposition des versions pour informations système
contextBridge.exposeInMainWorld('versions', {
    node: ()=> process.version.node,
    chrome: ()=> process.versions.chrome,
    electron:()=> process.versions.electron,
})