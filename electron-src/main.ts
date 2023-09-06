import { app, BrowserWindow } from 'electron';
import path from 'path';
import initAgent, {
  StateSignal,
  StatusUpdates,
  STATUS_EVENT,
  APP_PORT_EVENT,
  ElectronHolochainOptions,
  PathOptions
} from '@lightningrodlabs/electron-holochain';

const HAPP_FILE = "replace-me.happ"; // replace-me Enter the path to your happ
const APP_ID = "main-app"; // replace-me
const NETWORK_SEED: string | undefined = undefined; // replace-me (optional) Enter the network seed for your happ
const LAIR_PASSWORD = "password";
const WINDOW_TITLE = "replace-me".toUpperCase(); //replace-me

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = async () => {
  // Setup holochain
  const runnerOptions: ElectronHolochainOptions = {
    happPath: `pouch/${HAPP_FILE}`,
    appId: APP_ID,
    passphrase: LAIR_PASSWORD,
    keystorePath: `${process.cwd()}/holochain-data/keystore`,
    datastorePath:`${process.cwd()}/holochain-data/databases`,
    // appWsPort?: number
    // adminWsPort?: number
    // webrtcSignalUrl?: string
    // membraneProof?: string
    // networkSeed: NETWORK_SEED,
  }

  const { statusEmitter, shutdown } = await initAgent(app, runnerOptions)

  // listen on the statusEmitter for status update
  statusEmitter.on(STATUS_EVENT, (status: StateSignal) => {
    // do stuff
  });

  // listen on the statusEmitter for the websocket port used for app
  statusEmitter.on(APP_PORT_EVENT, (appPort: string) => {
    // do stuff
  });

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    title: WINDOW_TITLE
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
