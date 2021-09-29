import path from 'path';
import { app, BrowserWindow, globalShortcut, Menu } from 'electron';
const mode = process.env['NODE_ENV'];

let mainWindow = null;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        title: '网络行为监控系统',
        width: 1280,
        height: 768,
        minHeight: 600,
        minWidth: 800,
        backgroundColor: '#222',
        autoHideMenuBar: true,
        show: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    if (mode === 'development') {
        mainWindow.webContents.openDevTools();
        mainWindow.loadURL('http://localhost:8084/index.html');
    } else {
        mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
    }
    // #生产模式屏蔽快捷键（发布把注释放开）
    if (mode !== 'development') {
        // globalShortcut.register('Control+R', () => { });
        // globalShortcut.register('Control+Shift+R', () => { });
        // globalShortcut.register('CommandOrControl+Shift+I', () => { });
    }
    // mainWindow.removeMenu();
});

app.on('window-all-closed', () => {
    app.exit(0);
});