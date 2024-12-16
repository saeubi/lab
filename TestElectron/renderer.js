const { ipcRenderer, contextBridge } = require('electron');

// 보안 강화를 위해 contextBridge로 IPC 통신 노출
contextBridge.exposeInMainWorld('electronAPI', {
  controlWindow: (action) => ipcRenderer.send('window-control', action),
});
