import path from 'path';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';
import {
    app, BrowserWindow, dialog, ipcMain, globalShortcut, Menu,
    OpenDialogReturnValue, SaveDialogReturnValue
} from 'electron';
import { helper } from './src/utility/helper';
import log from './src/utility/log';

const mode = process.env['NODE_ENV'];
const cwd = process.cwd();
const config = helper.readConf();
let serveProc: ChildProcessWithoutNullStreams | null = null; //后台进程
let mainWindow: BrowserWindow | null = null;

if (helper.isNullOrUndefined(config)) {
    dialog.showErrorBox('启动失败', '配置文件读取失败, 请联系技术支持');
    app.exit(0);
}

/**
 * 运行exe进程
 * @param handle 进程句柄
 * @param exeName exe名称
 * @param exePath exe路径
 * @param exeParams 参数
 */
function runProc(handle: ChildProcessWithoutNullStreams | null,
    exeName: string, exePath: string, exeParams: string[] = []) {
    handle = spawn(exeName, exeParams, {
        cwd: exePath
    });
    handle.once('error', () => {
        log.error(`启动${exeName}失败`);
        console.log(`${exeName}启动失败`);
        handle = null;
    });
}

/**
 * 销毁所有窗口
 */
function destroyAllWindow() {
    if (mainWindow !== null) {
        mainWindow.destroy();
        mainWindow = null;
    }
    if (serveProc !== null) {
        serveProc.kill();
        serveProc = null;
    }
}


/**
 * 退出应用
 */
function exitApp(platform: string) {
    if (platform !== 'darwin') {
        globalShortcut.unregisterAll();
        destroyAllWindow();
        app.exit(0);
    }
}

app.on('before-quit', () => {
    //移除mainWindow上的listeners
    if (mainWindow !== null) {
        mainWindow.removeAllListeners('close');
    }
});
app.on('window-all-closed', () => {
    app.exit(0);
});

app.on('ready', () => {

    mainWindow = new BrowserWindow({
        title: config?.title ?? '',
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



    mainWindow.webContents.addListener('new-window', (event) => event.preventDefault());
    mainWindow.webContents.on('did-finish-load', () => {
        runProc(serveProc, 'LocalAgent.exe', path.join(cwd, '../LocalAgent'));
    });
    mainWindow.on('close', (event) => {
        //关闭事件到mainWindow中去处理
        event.preventDefault();
        if (mainWindow !== null) {
            mainWindow.webContents.send('will-close');
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
        helper.writeVersion();
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

//退出应用
ipcMain.on('do-close', (event) => {
    //mainWindow通知退出程序
    exitApp(process.platform);
});
