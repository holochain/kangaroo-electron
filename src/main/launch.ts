import * as childProcess from 'child_process';
import { BrowserWindow } from 'electron';
import { KangarooEmitter } from './eventEmitter';
import { KangarooFileSystem } from './filesystem';
import { PasswordType } from './types';
import { RunOptions } from './cli';
import { initializeLairKeystore, launchLairKeystore } from './lairKeystore';
import {
  HAPP_APP_ID,
  HOLOCHAIN_BINARY,
  KANGAROO_CONFIG,
  LAIR_BINARY,
  UI_DIRECTORY,
} from './const';
import { createHappWindow } from './windows';
import { ZomeCallSigner } from '@holochain/hc-spin-rust-utils';
import { HolochainManager } from './holochainManager';
import { v4 } from 'uuid';

export async function launch(
  kangarooFs: KangarooFileSystem,
  kangarooEmitter: KangarooEmitter,
  splashscreenWindow: BrowserWindow | undefined,
  passwordInput: PasswordType,
  runOptions: RunOptions
): Promise<{
  lairHandle: childProcess.ChildProcessWithoutNullStreams;
  holochainManager: HolochainManager;
  mainWindow: BrowserWindow;
  zomeCallSigner: ZomeCallSigner;
}> {
  let password: string;
  switch (passwordInput.type) {
    case 'random': {
      password = kangarooFs.readOrCreatePassword();
      break;
    }
    case 'user-provided': {
      password = passwordInput.password;
      break;
    }
  }

  if (!kangarooFs.keystoreInitialized()) {
    if (splashscreenWindow)
      splashscreenWindow.webContents.send(
        'loading-progress-update',
        'Initializing lair keystore...'
      );

    console.log('initializing lair keystore...');
    await initializeLairKeystore(
      runOptions.lairPath ? runOptions.lairPath : LAIR_BINARY,
      kangarooFs.keystoreDir,
      kangarooEmitter,
      password
    );
    console.log('lair keystore initialized.');
  }
  if (splashscreenWindow)
    splashscreenWindow.webContents.send('loading-progress-update', 'Starting lair keystore...');

  const [lairHandle, lairUrl] = await launchLairKeystore(
    runOptions.lairPath ? runOptions.lairPath : LAIR_BINARY,
    kangarooFs.keystoreDir,
    kangarooEmitter,
    password
  );

  const zomeCallSigner = await ZomeCallSigner.connect(lairUrl, password);

  if (splashscreenWindow)
    splashscreenWindow.webContents.send('loading-progress-update', 'Starting Holochain...');

  const holochainManager = await HolochainManager.launch(
    kangarooEmitter,
    kangarooFs,
    runOptions.holochainPath ? runOptions.holochainPath : HOLOCHAIN_BINARY,
    password,
    KANGAROO_CONFIG.bins.holochain.version,
    kangarooFs.conductorDir,
    kangarooFs.conductorConfigPath,
    lairUrl,
    runOptions.bootstrapUrl ? runOptions.bootstrapUrl.toString() : KANGAROO_CONFIG.bootstrapUrl,
    runOptions.signalUrl ? runOptions.signalUrl.toString() : KANGAROO_CONFIG.signalUrl,
    runOptions.iceUrls ? runOptions.iceUrls : KANGAROO_CONFIG.iceUrls,
    runOptions.holochainRustLog,
    runOptions.holochainWasmLog
  );

  // Install happ if necessary
  const randomNetworkSeed = v4();
  await holochainManager.installHappIfNecessary(randomNetworkSeed);

  console.log('Happ installed.');

  const appToken = await holochainManager.getAppToken();

  console.log('Starting main window...');

  if (splashscreenWindow) splashscreenWindow.close();

  const mainWindow = await createHappWindow(
    {
      type: 'path',
      path: UI_DIRECTORY,
    },
    HAPP_APP_ID,
    holochainManager.appPort,
    appToken,
    false
  );

  return {
    lairHandle,
    holochainManager,
    mainWindow,
    zomeCallSigner,
  };
}
