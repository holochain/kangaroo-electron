import { app } from "electron";
import path from 'path';
import { KangarooConfig } from './types';
import tsNode from 'ts-node';

const kangarooConfigPath = path.join(app.getAppPath(), 'kangaroo.config.ts');

tsNode.register();
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const KANGAROO_CONFIG: KangarooConfig = require(kangarooConfigPath).default;

export const DEFAULT_BOOTSTRAP_SERVER = 'https://bootstrap.holo.host';
export const DEFAULT_SIGNALING_SERVER = 'wss://signal.holo.host';

const binariesAppendix = KANGAROO_CONFIG.appId.slice(0,10).replace(' ', '-');

const RESOURCES_DIRECTORY = app.isPackaged
  ? path.join(app.getAppPath(), '../app.asar.unpacked/resources')
  : path.join(app.getAppPath(), './resources');


const BINARIES_DIRECTORY = path.join(RESOURCES_DIRECTORY, 'bins');

export const HOLOCHAIN_BINARY = path.join(
  BINARIES_DIRECTORY,
  `holochain-v${KANGAROO_CONFIG.bins.holochain.version}-${binariesAppendix}${process.platform === 'win32' ? '.exe' : ''}`,
);

export const LAIR_BINARY = path.join(
  BINARIES_DIRECTORY,
  `lair-keystore-v${KANGAROO_CONFIG.bins.lair.version}-${binariesAppendix}${process.platform === 'win32' ? '.exe' : ''}`,
);

export const HAPP_PATH = path.join(RESOURCES_DIRECTORY, 'kangaroo.happ');
export const HAPP_APP_ID = 'kangaroo.happ';

export const UI_DIRECTORY = path.join(RESOURCES_DIRECTORY, 'ui');

export const ICON_PATH = path.join(RESOURCES_DIRECTORY, 'ui', 'icon.png');