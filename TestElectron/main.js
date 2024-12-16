const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, // 기본 프레임 제거
    transparent: true, // 투명 창 활성화
    webPreferences: {
      preload: path.join(__dirname, 'renderer.js'), // 프리로드 스크립트
      contextIsolation: true, // 메인/렌더러 프로세스 분리
      enableRemoteModule: false, // remote 비활성화
      nodeIntegration: false, // 노드 통합 비활성화
    },
  });

  mainWindow.loadFile('index.html');
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('window-control', (event, action) => {
  if (!mainWindow) return;

  switch (action) {
    case 'minimize':
      mainWindow.minimize();
      break;
    case 'maximize':
      mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
      break;
    case 'close':
      mainWindow.close();
      break;
  }
});
