import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import Main from './mainWindow';

import project from './IPC/Project';
import app from './IPC/App';

require('electron-reload')(__dirname);

let main = new Main();

main.onEvent.on('window-created', () => {
  project.initIpcMain(ipcMain, main.window);
  app.initIpcMain(ipcMain, main.window);
});
