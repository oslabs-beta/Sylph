import { SendChannels } from './General/channelsInterface';
import IPC from './General/IPC';
import { BrowserWindow } from 'electron';
import cp from 'child_process';
import fs from 'fs';
import path from 'path';

const nameAPI = 'project';

// to Main
const validSendChannel: SendChannels = {
  makeNewProject,
  closeProject,
  updateProject,
  writeOver,
  read,
  getEntry,
};

// from Main
const validReceiveChannel: string[] = [
  'madeNewProject',
  'updateProject',
  'readProject',
  'overwritten',
  'entryPoint',
];

const project = new IPC({
  nameAPI,
  validSendChannel,
  validReceiveChannel,
});

export default project;

const history: [string] = ['Begin log -> '];

// Enter here the functions for ElectronJS

// const processes: any[] = [];
const mkdr = 'mkdir';

let dirpath: string;
let folder: string;

async function makeNewProject(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  history.push(' makeNewProject ->');
  console.log(history);
  folder = message;

  cp.exec('cd', (err, stdout, stderr) => {
    dirpath = path.join(__dirname, '../..');
  });

  cp.exec(
    `npx degit sveltejs/template ${message}`,
    {
      cwd: '.\\Projects\\',
    },
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      } else {
      }
    }
  ).on('close', () => {
    console.log('New Project init');
    cp.exec(
      'npm i',
      { cwd: `.\\Projects\\${message}` },
      (err, stdout, stderr) => {
        if (err) {
          console.log(err);
        } else {
          console.log(stdout);
        }
      }
    ).on('exit', () => {
      console.log('Dependencies installed');
      fs.writeFile(
        path.join(dirpath, 'Projects', folder, 'public', 'index.html'),
        `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset='utf-8'>
          <meta name='viewport' content='width=device-width,initial-scale=1'>
        
          <title>Svelte app</title>
        
          <link rel='icon' type='image/png' href='./favicon.png'>
          <link rel='stylesheet' href='./global.css'>
          <link rel='stylesheet' href='./build/bundle.css'>
        
          <script defer src='./build/bundle.js'></script>
        </head>
        
        <body>
        </body>
        </html>
        `,
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('setup complete');
          }
        }
      );
      mainWindow.webContents.send('madeNewProject', 'project installed');
    });
  });
}

function getEntry(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  mainWindow.webContents.send(
    'entryPoint',
    path.join(dirpath, 'Projects', folder, 'public', 'index.html')
  );
}

function updateProject(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  history.push('updateProject');
  console.log(history.join(''));
  // cp.exec('cd', (err, stdout, stderr) => {
  //   console.log('stdout: ', stdout);
  // });

  // console.log(folder);
  // cp.exec(`cd .\\Projects\\${folder}\\`, (error, stdout, stderr) => {
  //   if (error) console.log('error: ', error);
  //   console.log(stdout);
  //   cp.exec('cd', (err, std) => console.log('std: ', std));
  // });

  cp.exec(
    'npm run build',
    { cwd: `.\\Projects\\${folder}` },
    (err, stdout, stderr) => {
      if (err) {
        console.log('err: ', err);
        console.log('stderr: ', stderr);
      } else {
        console.log('stdout: ', stdout);
      }
    }
  );
}

function closeProject(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {}

function writeOver(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  fs.writeFile(
    path.join(dirpath, 'Projects', folder, message.path),
    message.data,
    (err) => {
      if (err) {
        console.log(err);
        mainWindow.webContents.send('overwritten', false);
      } else {
        mainWindow.webContents.send('overwritten', true);
      }
    }
  );
}

function read(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  // console.log('dirpath: ', dirpath);
  let data = fs.readFile(
    path.join(dirpath, 'Projects', folder, message.path),
    (err, data) => {
      if (err) console.log(err);
      else mainWindow.webContents.send('readProject', data.toString());
    }
  );
}
