import { SendChannels } from './General/channelsInterface';
import IPC from './General/IPC';
import { BrowserWindow, dialog } from 'electron';
import cp from 'child_process';
import fs from 'fs';
import path from 'path';

const nameAPI = 'app';

// to Main
const validSendChannel: SendChannels = {
  openDialog,
  toSlyph,
  toMain,
};

// from Main
const validReceiveChannel: string[] = [
  'openDialogConfirmed',
  'goToMain',
  'goToSlyph',
];

const app = new IPC({
  nameAPI,
  validSendChannel,
  validReceiveChannel,
});

let sylphWindow: BrowserWindow;

async function openDialog(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  console.log('open dialog called');

  // Open an Openfile Dialog window
  dialog.showOpenDialog({ properties: ['openDirectory'] });

  // send response back to frontend
  mainWindow.webContents.send('openDialogConfirmed');

  /* # Front End Receiver */
  // globalThis.api.app.receive('openDialogConfirmed', ()=>{
  //   console.log('openDialogConfirmed')
  // })

  /* # Front End Sender */
  // globalThis.api.app.send('openDialog')
}

export function toMain() {
  sylphWindow.webContents.send('goToMain');
}

function toSlyph(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  sylphWindow = mainWindow;
  mainWindow.webContents.send('goToSlyph');
}

export default app;
