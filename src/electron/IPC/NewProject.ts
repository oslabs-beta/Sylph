import { SendChannels } from './General/channelsInterface';
import IPC from './General/IPC';
import { BrowserWindow } from 'electron';
import cp from 'child_process';

const nameAPI = 'newProject';

// to Main
const validSendChannel: SendChannels = {
  makeNewProject,
  closeProject,
};

// from Main
const validReceiveChannel: string[] = ['madeNewFolder', 'closedProject'];

const newFolder = new IPC({
  nameAPI,
  validSendChannel,
  validReceiveChannel,
});

export default newFolder;

// Enter here the functions for ElectronJS

// const processes: any[] = [];
const mkdr = 'mkdir';

function makeNewProject(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  console.log(message);

  const child = cp
    .exec(
      `cd .\\Projects\\ & npx degit sveltejs/template ${message} & cd ${message} & npm install & npm run build & cd`,
      (error, stdout, stderr) => {
        if (error) {
          console.log(error);
        } else {
          console.log(stdout);
          mainWindow.webContents.send('madeNewFolder', 'endprocess');
        }
      }
    )
    .on('close', (code) => {});
  // processes.push(child);
}

function closeProject(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  console.log(message);
  cp.exec(`cd.\\Projects\\${message} & npm run build`).on('close', (code) => {
    mainWindow.webContents.send('closedProject', 'reloaded');
  });
}

// & cd TestFolder & npx degit sveltejs/template & cd test-project & npm install & npm run dev
