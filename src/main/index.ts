import {
  app,
  BrowserWindow,
  ipcMain,
  IpcMainInvokeEvent,
  protocol,
} from "electron";
import childProcess from "child_process";
import {
  ZomeCallNapi,
  ZomeCallSigner,
  ZomeCallUnsignedNapi,
} from "@holochain/hc-spin-rust-utils";
import { encode } from "@msgpack/msgpack";
import {
  CallZomeRequest,
  CallZomeRequestSigned,
  getNonceExpiration,
  randomNonce,
} from "@holochain/client";
import { KangarooFileSystem } from "./filesystem";
import { KangarooEmitter } from "./eventEmitter";
import { setupLogs } from "./logs";
import { HolochainManager } from "./holochainManager";
import { createHappWindow, createSplashWindow } from "./windows";
import {
  DEFAULT_BOOTSTRAP_SERVER,
  DEFAULT_SIGNALING_SERVER,
  HAPP_APP_ID,
  HOLOCHAIN_BINARY,
  KANGAROO_CONFIG,
  LAIR_BINARY,
  UI_DIRECTORY,
} from "./const";
import { initializeLairKeystore, launchLairKeystore } from "./lairKeystore";

// Read CLI options

// Read and validate the config file to check that the content does not contain
// default values

const LAIR_PASSWORD = "password";

// Check whether lair is initialized or not and if not, decide based on the config
// file whether or not to show the splashscreen or use a default password

if (!app.isPackaged) {
  app.setName(KANGAROO_CONFIG.appId + '-dev');
}

const KANGAROO_FILESYSTEM = KangarooFileSystem.connect(app);

const KANGAROO_EMITTER = new KangarooEmitter();

setupLogs(KANGAROO_EMITTER, KANGAROO_FILESYSTEM, true);

protocol.registerSchemesAsPrivileged([
  {
    scheme: "webhapp",
    privileges: { standard: true, secure: true, stream: true },
  },
]);

const handleSignZomeCall = async (
  _e: IpcMainInvokeEvent,
  request: CallZomeRequest
) => {
  if (!ZOME_CALL_SIGNER) throw new Error("Zome call signer undefined.");
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

app.whenReady().then(async () => {
  SPLASH_SCREEN_WINDOW = createSplashWindow();
  ipcMain.handle("sign-zome-call", handleSignZomeCall);
  ipcMain.handle('exit', () => {
    app.exit(0);
  });
  if (!KANGAROO_FILESYSTEM.keystoreInitialized()) {
    if (SPLASH_SCREEN_WINDOW)
      SPLASH_SCREEN_WINDOW.webContents.send(
        "loading-progress-update",
        "Initializing lair keystore..."
      );

    console.log("initializing lair keystore...")
    await initializeLairKeystore(
      LAIR_BINARY,
      KANGAROO_FILESYSTEM.keystoreDir,
      KANGAROO_EMITTER,
      LAIR_PASSWORD
    );
    console.log("lair keystore initialized.")
  }
  if (SPLASH_SCREEN_WINDOW)
    SPLASH_SCREEN_WINDOW.webContents.send(
      "loading-progress-update",
      "Starting lair keystore..."
    );

  let lairUrl;

  [LAIR_HANDLE, lairUrl] = await launchLairKeystore(
    LAIR_BINARY,
    KANGAROO_FILESYSTEM.keystoreDir,
    KANGAROO_EMITTER,
    LAIR_PASSWORD
  );

  ZOME_CALL_SIGNER = await ZomeCallSigner.connect(lairUrl, LAIR_PASSWORD);

  if (SPLASH_SCREEN_WINDOW)
    SPLASH_SCREEN_WINDOW.webContents.send(
      "loading-progress-update",
      "Starting Holochain..."
    );

  HOLOCHAIN_MANAGER = await HolochainManager.launch(
    KANGAROO_EMITTER,
    KANGAROO_FILESYSTEM,
    HOLOCHAIN_BINARY,
    LAIR_PASSWORD,
    KANGAROO_CONFIG.bins.holochain.version,
    KANGAROO_FILESYSTEM.conductorDir,
    KANGAROO_FILESYSTEM.conductorConfigPath,
    lairUrl,
    DEFAULT_BOOTSTRAP_SERVER,
    DEFAULT_SIGNALING_SERVER
  );

  // Install happ if necessary
  await HOLOCHAIN_MANAGER.installHappIfNecessary();

  console.log("Happ installed.");

  const appToken = await HOLOCHAIN_MANAGER.getAppToken();

  console.log("Starting main window...");

  SPLASH_SCREEN_WINDOW.close();

  MAIN_WINDOW = await createHappWindow(
    {
      type: "path",
      path: UI_DIRECTORY,
    },
    HAPP_APP_ID,
    HOLOCHAIN_MANAGER.appPort,
    appToken,
    false
  );
  // This is just here to make it compile for now.
  console.log(MAIN_WINDOW);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  app.quit();
  // if (process.platform !== 'darwin') {
  //   app.quit()
  // }
});

app.on("quit", () => {
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
