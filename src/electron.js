const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  // Open Devtools
  // win.webContents.openDevTools();

  const mode = process.env.NODE_ENV;
  const url =
    mode === 'production'
      ? `file://${path.join(__dirname, '../public/index.html')}`
      : 'http://localhost:5000';

  win.loadURL(url);
  win.on('closed', () => {
    win = null;
  });
}
let count = 0;
while (count++ !== 10) {
  if (count === 10) app.on('ready', createWindow);
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
