import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import Main from './mainWindow';

import project from './IPC/Project';

require('electron-reload')(__dirname);

let main = new Main();

main.onEvent.on('window-created', () => {
  project.initIpcMain(ipcMain, main.window);

  // updaterInfo.initAutoUpdater(autoUpdater, main.window);
});
