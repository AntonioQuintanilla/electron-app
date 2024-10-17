const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const { getConnection } = require('./database')
const path = require('path');
const {initializeIpcHandlers} = require("./handlers/ipcHandlers");

let window

function createWindow() {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: true
    }
  })
  window.maximize();
  window.loadFile('src/ui/index.html');
}

app.whenReady().then(() => {
  createWindow();
  initializeIpcHandlers();
})

app.on('window-all-closed', () => {
  if (process.platform === 'win32' || 'darwin') app.quit();
})