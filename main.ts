import path from 'path';
import { app, BrowserWindow, dialog, ipcMain, globalShortcut, Menu, OpenDialogReturnValue, SaveDialogReturnValue } from 'electron';
const mode = process.env['NODE_ENV'];
const cwd = process.cwd();

let mainWindow: BrowserWindow | null = null;

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        title: '网络行为监控系统',
        width: 1280,
        height: 768,
        minWidth: 1280,
        minHeight: 768,
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

ipcMain.handle('select-file', async (event, args) => {

    const val: OpenDialogReturnValue = await dialog
        .showOpenDialog({
            title: '选择txt文件',
            properties: ['openFile'],
            filters: [{ name: '文本文档', extensions: ['txt'] }]
        });

    return val;
});

ipcMain.handle('save-temp-file', async (event, args) => {
    const val: SaveDialogReturnValue = await dialog
        .showSaveDialog(mainWindow!, {
            title: '下载批量查询模板',
            properties: ['createDirectory'],
            defaultPath: cwd,
            filters: [{ name: '模板文件', extensions: ['txt'] }]
        });
    return val;
});

app.on('window-all-closed', () => {
    app.exit(0);
});