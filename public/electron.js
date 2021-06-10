const {app, BrowserWindow} = require('electron')
const isDev = require('electron-is-dev');
const path = require("path");
const url = require('url');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: path.join(__dirname, 'preload.js')
      preload: 'preload.js',
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    minWidth: 800,
    minHeight: 600,
  })

  // mainWindow.loadURL('http://192.168.0.10:3000')

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

  // mainWindow.loadURL(url.format({
  //   pathname: path.join(__dirname, 'index.html'),
  //   protocol: 'file:',
  //   slashes: true,
  // }));

}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})