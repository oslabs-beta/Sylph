import { app, BrowserWindow, Menu, MenuItem, dialog } from 'electron';
import path from 'path';
import EventEmitter from 'events';
import { toMain } from './IPC/App';

const appName = 'Slyph';

const defaultSettings = {
  title: 'Slyph',
  // width: 854,
  // height: 480,
  width: 1080,
  height: 720,
};
const isMac = process.platform === 'darwin';
const template: any = [
  // { role: 'appMenu' }
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'services' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'hideOthers' },
            { role: 'unhide' },
            { type: 'separator' },
            { role: 'quit' },
          ],
        },
      ]
    : []),
  // { role: 'fileMenu' }
  {
    label: 'File',
    submenu: [
      {
        label: 'Save Project',
        accelerator: process.platform === 'darwin' ? 'Command+S' : 'Ctrl+S',
      },
      {
        label: 'Close Project',
        accelerator:
          process.platform === 'darwin' ? 'Command+Shift+N' : 'Ctrl+Shift+N',
        click() {
          toMain();
          // globalThis.api.app.send('closeProject')
          // focusedWindow.webContents.send('closeProject')
        },
      },
      { type: 'separator' },
      {
        label: 'Open Folder',
        click: async () => {
          const { filePaths } = await dialog.showOpenDialog({
            properties: ['openDirectory'],
          });
          console.log(filePaths[0]);
          console.log('Open Folder clicked');
        },
      },
      isMac ? { role: 'close' } : { role: 'quit' },
    ],
  },
  // { role: 'editMenu' }
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac
        ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [{ role: 'startSpeaking' }, { role: 'stopSpeaking' }],
            },
          ]
        : [{ role: 'delete' }, { type: 'separator' }, { role: 'selectAll' }]),
    ],
  },
  // { role: 'viewMenu' }
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
    ],
  },
  // { role: 'windowMenu' }
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac
        ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' },
          ]
        : [{ role: 'close' }]),
    ],
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: async () => {
          const { shell } = require('electron');
          await shell.openExternal('https://electronjs.org');
        },
      },
    ],
  },
];
// const template:any = [
//   {
//     label: 'Sylph',
//     submenu: [{ role: 'About Sylph' }, { role: 'Preferences' }],
//   },
//   {
//     label: 'File',
//     submenu: [
//       { role: 'Start New Project' },
//       isMac ? { role: 'close' } : { role: 'quit' },
//     ],
//   },
//   {
//     label: 'View',
//     submenu: [{ role: 'Reload' }, { role: 'Toggle Developer Tools' }],
//   },
// ];
// const menu:any = Menu.buildFromTemplate(template)

class Main {
  window!: BrowserWindow;
  settings: { [key: string]: any };
  onEvent: EventEmitter = new EventEmitter();

  constructor(settings: { [key: string]: any } | null = null) {
    this.settings = settings ? { ...settings } : { ...defaultSettings };

    app.on('ready', () => {
      this.window = this.createWindow();
      this.onEvent.emit('window-created');
      Menu.setApplicationMenu(Menu.buildFromTemplate(template));

      // ↓↓↓↓ context menu
      const contents = this.window.webContents;
      const ctxMenu = new Menu();

      ctxMenu.append(new MenuItem({ role: 'cut' }));
      ctxMenu.append(new MenuItem({ role: 'copy' }));
      ctxMenu.append(new MenuItem({ role: 'paste' }));
      ctxMenu.append(new MenuItem({ role: 'selectAll' }));
      ctxMenu.append(
        new MenuItem({
          label: 'Delete',
          click: function () {
            //simulating delete button is clicked
            contents.sendInputEvent({ type: 'keyDown', keyCode: 'Delete' });
          },
        })
      );
      ctxMenu.append(new MenuItem({ role: 'toggleDevTools' }));

      // new version of electron doesn't require params.x and y anymore. Default is the focused window and mouse cursor location
      contents.on('context-menu', () => {
        ctxMenu.popup();
      });

      // ↑↑↑↑ context menu
    });
    app.on('window-all-closed', this.onWindowAllClosed);
    app.on('activate', this.onActivate);
  }
  createMenu() {}

  createWindow() {
    let settings = { ...this.settings };
    app.name = appName;
    let window = new BrowserWindow({
      ...settings,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: true,
        preload: path.join(__dirname, 'preload.js'),
      },
    });

    window.loadFile(path.join(__dirname, 'www', 'index.html'));
    // window.loadURL(path.join(__dirname, 'www', 'index.html'));
    console.log('PATH ', path.join(__dirname, 'www', 'index.html'));

    window.once('ready-to-show', () => {
      console.log('READY TO SHOW');
      window.show();
    });
    console.log('WINDOW ', window);
    return window;
  }

  onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  onActivate() {
    // if (!this.window) {
    //   this.createWindow();
    // }
    if (BrowserWindow.getAllWindows().length === 0) {
      this.createWindow();
    }
  }
}

export default Main;
