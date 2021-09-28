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
  killDev,
  getDirectory,
};

// from Main
const validReceiveChannel: string[] = [
  'madeNewProject',
  'projectUpdated',
  'readProject',
  'overwritten',
  'entryPoint',
  'directorySent',
];

const project = new IPC({
  nameAPI,
  validSendChannel,
  validReceiveChannel,
});

export default project;

const history: [string] = ['Begin log -> '];
let devProcess: any;

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
      cwd: './Projects',
    },
    (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      } else {
      }
    }
  ).on('close', () => {
    console.log('New Project init');
    console.log('npm i path: ', `./Projects/${message}`);
    cp.exec(
      'npm i',
      { cwd: `./Projects/${message}` },
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
  mainWindow.webContents.send('entryPoint', 'http://localhost:5000');
  // mainWindow.webContents.send(
  //   'entryPoint',
  //   path.join(dirpath, 'Projects', folder, 'public', 'index.html')
  // );
}

async function updateProject(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  history.push('updateProject -> ');
  console.log(history.join(''));
  // console.log('before');
  // const dev = cp.execSync('npm run build', { cwd: `./Projects/${folder}` });
  // console.log('after');
  // const dev = cp.spawn('npm run dev', [], {
  //   cwd: `./Projects/${folder}`,
  //   detached: true,
  // });
  // dev.on('error', (err) => {
  //   console.log('spawn err:', err);
  // });

  // devProcess = dev;
  // console.log('devPID: ', typeof devPID, devPID);

  const dev = cp
    .exec(
      'npm run dev',
      { cwd: `./Projects/${folder}` },
      (err, stdout, stderr) => {
        if (err) {
          console.log('was Error: ');
          console.log(err);
        } else {
          console.log('no error: ');
          console.log(stdout);
        }
      }
    )
    .on('close', () => {
      console.log('updated build');
      mainWindow.webContents.send('projectUpdated');
    });

  // devPID = dev.pid;
  // console.log('devPID: ', typeof devPID, devPID);
  // dev.kill('SIGINT');
}

function killDev(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  // cp.kill(devPID);
  console.log('devProcess: ', typeof devProcess, devProcess);
  process.kill(-devProcess);
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
      console.log('message.path', message.path);
      if (err) {
        console.log(err);
        mainWindow.webContents.send('overwritten', false);
      } else {
        mainWindow.webContents.send('overwritten', true);
      }
    }
  );
}

function dirCrawl(dir: string) {
  const dirObj: any = { [dir]: [] };

  const dirContents: string[] = fs.readdirSync(dir);

  dirContents.map((elm) => {
    const next = path.join(dir, elm);
    dirObj[dir].push(fs.lstatSync(next).isDirectory() ? dirCrawl(next) : next);
  });
  return dirObj;
}

function getDirectory(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  const dirObj: {} = dirCrawl(path.join(dirpath, 'Projects'));
  console.log(dirObj);
  mainWindow.webContents.send('directorySent', dirObj);
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
