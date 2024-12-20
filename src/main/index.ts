import { app, BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent, Menu, protocol } from 'electron';
import childProcess from 'child_process';
import { ZomeCallNapi, ZomeCallSigner, ZomeCallUnsignedNapi } from '@holochain/hc-spin-rust-utils';
import contextMenu from 'electron-context-menu';
import { encode } from '@msgpack/msgpack';
import {
  CallZomeRequest,
  CallZomeRequestSigned,
  getNonceExpiration,
  randomNonce,
} from '@holochain/client';
import { Command } from 'commander';
import semver from 'semver';

import { breakingVersion, KangarooFileSystem } from './filesystem';
import { KangarooEmitter } from './eventEmitter';
import { setupLogs } from './logs';
import { HolochainManager } from './holochainManager';
import { createSplashWindow } from './windows';
import { KANGAROO_CONFIG } from './const';
import { kangarooMenu } from './menu';
import { validateArgs } from './cli';
import { autoUpdater, UpdateCheckResult } from '@matthme/electron-updater';
import { launch } from './launch';
import { SplashScreenType } from './types';

// Read CLI options

const kangarooCli = new Command();

kangarooCli
  .name(KANGAROO_CONFIG.productName)
  .description(`Run ${KANGAROO_CONFIG.productName} via the command line`)
  .version(KANGAROO_CONFIG.version)
  .option(
    '-p, --profile <string>',
    `Runs ${KANGAROO_CONFIG.productName} with a custom profile with its own dedicated data store.`
  )
  .option(
    '-n, --network-seed <string>',
    'If this is the first time running kangaroo with the given profile, this installs the happ with the provided network seed.'
  )
  .option(
    '--holochain-path <path>',
    `Runs ${KANGAROO_CONFIG.productName} with the holochain binary at the provided path. Use with caution since this may potentially corrupt your databases if the binary you use is not compatible with existing databases.`
  )
  .option(
    '--lair-path <path>',
    `Runs the ${KANGAROO_CONFIG.productName} with the lair binary at the provided path. Use with caution since this may potentially corrupt your databases if the binary you use is not compatible with existing databases.`
  )
  .option('--holochain-rust-log <string>', 'RUST_LOG value to pass to the holochain binary')
  .option('--holochain-wasm-log <string>', 'WASM_LOG value to pass to the holochain binary')
  .option('--lair-rust-log <string>', 'RUST_LOG value to pass to the lair keystore binary')
  .option(
    '-b, --bootstrap-url <url>',
    'URL of the bootstrap server to use (not persisted across restarts).'
  )
  .option(
    '-s, --signaling-url <url>',
    'URL of the signaling server to use (not persisted across restarts).'
  )
  .option(
    '--ice-urls <string>',
    'Comma separated string of ICE server URLs to use. Is ignored if an external holochain binary is being used (not persisted across restarts).'
  )
  .option(
    '--print-holochain-logs',
    'Print holochain logs directly to the terminal (they will be still written to the logfile as well)'
  );

kangarooCli.parse();

const RUN_OPTIONS = validateArgs(kangarooCli.opts());

// Read and validate the config file to check that the content does not contain
// default values

// Check whether lair is initialized or not and if not, decide based on the config
// file whether or not to show the splashscreen or use a default password

if (!app.isPackaged) {
  app.setName(KANGAROO_CONFIG.appId + '-dev');
}

contextMenu({
  showSaveImageAs: true,
  showSearchWithGoogle: false,
  showInspectElement: true,
  append: (_defaultActions, _parameters, browserWindow) => [
    {
      label: 'Reload',
      click: () => (browserWindow as BrowserWindow).reload(),
    },
  ],
});

const KANGAROO_FILESYSTEM = KangarooFileSystem.connect(app, RUN_OPTIONS.profile);

const KANGAROO_EMITTER = new KangarooEmitter();

setupLogs(KANGAROO_EMITTER, KANGAROO_FILESYSTEM, RUN_OPTIONS.printHolochainLogs);

protocol.registerSchemesAsPrivileged([
  {
    scheme: 'webhapp',
    privileges: { standard: true, secure: true, stream: true },
  },
]);

const handleSignZomeCall = async (_e: IpcMainInvokeEvent, request: CallZomeRequest) => {
  if (!ZOME_CALL_SIGNER) throw new Error('Zome call signer undefined.');
  // console.log("Got zome call request: ", request);
  const zomeCallUnsignedNapi: ZomeCallUnsignedNapi = {
    provenance: Array.from(request.provenance),
    cellId: [Array.from(request.cell_id[0]), Array.from(request.cell_id[1])],
    zomeName: request.zome_name,
    fnName: request.fn_name,
    payload: Array.from(encode(request.payload)),
    nonce: Array.from(await randomNonce()),
    expiresAt: getNonceExpiration(),
  };

  const zomeCallSignedNapi: ZomeCallNapi = await ZOME_CALL_SIGNER.signZomeCall(
    zomeCallUnsignedNapi
  );

  const zomeCallSigned: CallZomeRequestSigned = {
    provenance: Uint8Array.from(zomeCallSignedNapi.provenance),
    cap_secret: null,
    cell_id: [
      Uint8Array.from(zomeCallSignedNapi.cellId[0]),
      Uint8Array.from(zomeCallSignedNapi.cellId[1]),
    ],
    zome_name: zomeCallSignedNapi.zomeName,
    fn_name: zomeCallSignedNapi.fnName,
    payload: Uint8Array.from(zomeCallSignedNapi.payload),
    signature: Uint8Array.from(zomeCallSignedNapi.signature),
    expires_at: zomeCallSignedNapi.expiresAt,
    nonce: Uint8Array.from(zomeCallSignedNapi.nonce),
  };

  return zomeCallSigned;
};

let ZOME_CALL_SIGNER: ZomeCallSigner | undefined;
let HOLOCHAIN_MANAGER: HolochainManager | undefined;
let LAIR_HANDLE: childProcess.ChildProcessWithoutNullStreams | undefined;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let MAIN_WINDOW: BrowserWindow | undefined | null;
let SPLASH_SCREEN_WINDOW: BrowserWindow | undefined;

Menu.setApplicationMenu(kangarooMenu(KANGAROO_FILESYSTEM));

app.whenReady().then(async () => {
  /**
   * Figure out which splashscreen to show and whether to start holochain immediately.
   */
  let splashScreenType: SplashScreenType;
  let startImmediately = false;

  if (KANGAROO_CONFIG.passwordMode === 'no-password') {
    splashScreenType = SplashScreenType.LoadingOnly;
    startImmediately = true;
  } else if (KANGAROO_CONFIG.passwordMode === 'password-required') {
    if (KANGAROO_FILESYSTEM.keystoreInitialized()) {
      splashScreenType = SplashScreenType.EnterPassword;
    } else {
      splashScreenType = SplashScreenType.PasswordSetup;
    }
  } else if (KANGAROO_CONFIG.passwordMode === 'password-optional') {
    const keystoreInitialized = KANGAROO_FILESYSTEM.keystoreInitialized();
    const randomPwExists = KANGAROO_FILESYSTEM.randomPasswordExists();
    if (keystoreInitialized && randomPwExists) {
      splashScreenType = SplashScreenType.LoadingOnly;
      startImmediately = true;
    } else if (keystoreInitialized && !randomPwExists) {
      splashScreenType = SplashScreenType.EnterPassword;
    } else {
      splashScreenType = SplashScreenType.PasswordSetupOtional;
    }
  } else {
    throw new Error(
      `Unexpected setup state.\nKeystore initialized: ${KANGAROO_FILESYSTEM.keystoreInitialized()}.\nPassword mode: ${
        KANGAROO_CONFIG.passwordMode
      }\nRandom pw exists: ${KANGAROO_FILESYSTEM.randomPasswordExists()}`
    );
  }

  // TODO chosse splashscreen depending on the password mode
  SPLASH_SCREEN_WINDOW = createSplashWindow(splashScreenType);

  /**
   * IPC handlers
   */
  ipcMain.handle('get-name-and-version', () => ({
    productName: KANGAROO_CONFIG.productName,
    version: KANGAROO_CONFIG.version,
  }));
  ipcMain.handle('sign-zome-call', handleSignZomeCall);
  ipcMain.handle('exit', () => {
    app.exit(0);
  });
  // Will be called by the splashscreen UI in the "password-optional"
  // or "user-provided" password modes
  ipcMain.handle('launch', async (_e, password: string): Promise<void> => {
    const { lairHandle, holochainManager, mainWindow, zomeCallSigner } = await launch(
      KANGAROO_FILESYSTEM,
      KANGAROO_EMITTER,
      SPLASH_SCREEN_WINDOW,
      { type: 'user-provided', password },
      RUN_OPTIONS
    );

    LAIR_HANDLE = lairHandle;
    HOLOCHAIN_MANAGER = holochainManager;
    MAIN_WINDOW = mainWindow;
    ZOME_CALL_SIGNER = zomeCallSigner;
  });

  /**
   * Checking for app updates
   */
  if (app.isPackaged && KANGAROO_CONFIG.autoUpdates) {
    autoUpdater.allowPrerelease = true;
    autoUpdater.autoDownload = false;

    let updateCheckResult: UpdateCheckResult | null | undefined;

    try {
      updateCheckResult = await autoUpdater.checkForUpdates();
    } catch (e) {
      console.warn('Failed to check for updates: ', e);
    }

    console.log('updateCheckResult: ', updateCheckResult);

    // We only install semver compatible updates
    const appVersion = app.getVersion();
    if (
      updateCheckResult &&
      breakingVersion(updateCheckResult.updateInfo.version) === breakingVersion(appVersion) &&
      semver.gt(updateCheckResult.updateInfo.version, appVersion)
    ) {
      const userDecision = await dialog.showMessageBox({
        title: 'Update Available',
        type: 'question',
        buttons: ['Deny', 'Install and Restart'],
        defaultId: 0,
        cancelId: 0,
        message: `A new compatible version of ${KANGAROO_CONFIG.productName} is available (${updateCheckResult.updateInfo.version}). Do you want to install it?`,
      });
      if (userDecision.response === 1) {
        // downloading means that with the next start of the application it's automatically going to be installed
        autoUpdater.on('update-downloaded', () => autoUpdater.quitAndInstall());
        await autoUpdater.downloadUpdate();
      }
    }
  }

  /**
   * If the conditions are fulfilled we can immediately start holochain here,
   * otherwise we start holochain when the corresponding splashscreen UI invokes
   * the 'launch' IPC command
   */
  if (startImmediately) {
    const { lairHandle, holochainManager, mainWindow, zomeCallSigner } = await launch(
      KANGAROO_FILESYSTEM,
      KANGAROO_EMITTER,
      SPLASH_SCREEN_WINDOW,
      { type: 'random' },
      RUN_OPTIONS
    );

    LAIR_HANDLE = lairHandle;
    HOLOCHAIN_MANAGER = holochainManager;
    MAIN_WINDOW = mainWindow;
    ZOME_CALL_SIGNER = zomeCallSigner;

    // Only logged for now to get rid of unused warning
    console.log('MAIN_WINDOW: ', MAIN_WINDOW);
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  app.quit();
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
});

app.on('quit', () => {
  if (LAIR_HANDLE) {
    LAIR_HANDLE.kill();
  }
  if (HOLOCHAIN_MANAGER) {
    HOLOCHAIN_MANAGER.processHandle.kill();
  }
});

// app.on("activate", () => {
//   // On OS X it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createMainWindow();
//   }
// });

// const contextMenu = Menu.buildFromTemplate([
//   {
//     label: 'Open',
//     type: 'normal',
//     click() {
//       if (SPLASH_SCREEN_WINDOW) {
//         SPLASH_SCREEN_WINDOW.show();
//       } else if (MAIN_WINDOW) {
//         MAIN_WINDOW.show();
//       }
//     },
//   },
//   {
//     label: 'Restart',
//     type: 'normal',
//     click() {
//       const options: Electron.RelaunchOptions = {
//         args: process.argv,
//       };
//       // https://github.com/electron-userland/electron-builder/issues/1727#issuecomment-769896927
//       if (process.env.APPIMAGE) {
//         console.log('process.execPath: ', process.execPath);
//         options.args?.unshift('--appimage-extract-and-run');
//         options.execPath = process.env.APPIMAGE;
//       }
//       app.relaunch(options);
//       app.quit();
//     },
//   },
//   {
//     label: 'Quit',
//     type: 'normal',
//     click() {
//       app.quit();
//     },
//   },
// ]);
// });
