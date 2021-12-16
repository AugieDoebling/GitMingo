const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const isDev = require('electron-is-dev');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        minWidth : 900,
        height: 740,
        minHeight : 740,
        webPreferences: {
            nodeIntegration: true
        }});

    if (isDev) {
        // Open the DevTools.
        mainWindow.webContents.openDevTools();
        // this allows electron to show desktop notifications if its not installed
        app.setAppUserModelId(process.execPath)
        // load localhost
        mainWindow.loadURL('http://localhost:3000');
    }
    // PRODUCTION ONLY
    else {
        // don't show the default menu
        mainWindow.setMenu(null);
        // load compiled site
        mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html')}`);
    }

    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});