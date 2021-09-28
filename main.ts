import { app, ipcMain, BrowserWindow } from 'electron';

let mainWindow = null;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        title: 'WindowDemo',
        width: 800,
        height: 600,
        show: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    mainWindow.loadURL('http://localhost:8084/index.html');//引用index.html
});

app.on('window-all-closed', () => {
    app.exit(0);
});