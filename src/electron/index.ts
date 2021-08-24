import { ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import Main from './mainWindow';

import newFolder from './IPC/NewProject';

require('electron-reload')(__dirname);

let main = new Main();

main.onEvent.on('window-created', () => {
  newFolder.initIpcMain(ipcMain, main.window);

  // updaterInfo.initAutoUpdater(autoUpdater, main.window);
});
