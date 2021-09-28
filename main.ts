// import path from 'path';
import { app, BrowserWindow, globalShortcut, Menu } from 'electron';
const mode = process.env['NODE_ENV'];

let mainWindow = null;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        title: 'WindowDemo',
        width: 800,
        height: 600,
        minHeight: 600,
        minWidth: 800,
        backgroundColor: '#222',
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
        // mainWindow.loadFile(path.join(__dirname, config.publishPage));
    }
    // #生产模式屏蔽快捷键（发布把注释放开）
    if (mode !== 'development') {
        globalShortcut.register('Control+R', () => { });
        globalShortcut.register('Control+Shift+R', () => { });
        globalShortcut.register('CommandOrControl+Shift+I', () => { });
    }
    // #默认菜单置空（发布把注释放开）
    if (mode !== 'development') {
        Menu.setApplicationMenu(null);
    }
});

app.on('window-all-closed', () => {
    app.exit(0);
});