const { contextBridge, ipcRenderer} = require('electron');

// Exposition sécurisée des APIs au processus de rendu
contextBridge.executeInMainWorld('electronAPI', {

     // APIs système
    getAppInfo: ()=> ipcRenderer.invoke('get-app-info'),

    // APIs fichiers
    openFileDialog: () => ipcRenderer.invoke('dialog:open'),
    saveFile: (content, filename)=>{
        ipcRenderer.invoke('dialog:save', { content, filename })
    },

     // APIs fenêtre
    minimizeWindow: ()=> ipcRenderer.send('window:minimize'),
    maximizeWindow: ()=>ipcRenderer.send('window:maximize'),
    closeWindow: ()=>ipcRenderer.send('window:close'),

    // Communication
    sendToMain: (channel, data)=> ipcRenderer.send(channel, data),
    receiveFromMain: (channel, callback) =>{
        ipcRenderer.on(channel, (event, ...args)=> callback(...args))
    }
});
