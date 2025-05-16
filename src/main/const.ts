/* eslint-disable import/no-named-as-default-member */
import { app } from 'electron';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import { KangarooConfig } from './types';

const RESOURCES_DIRECTORY = app.isPackaged
  ? path.join(app.getAppPath(), '../app.asar.unpacked/resources')
  : path.join(app.getAppPath(), './resources');

const kangarooConfigString = fs.readFileSync(
  path.join(RESOURCES_DIRECTORY, 'kangaroo.config.json'),
  'utf-8'
);
export const KANGAROO_CONFIG: KangarooConfig = JSON.parse(kangarooConfigString);
const conductorConfigTemplateString = fs.readFileSync(
  path.join(RESOURCES_DIRECTORY, 'conductor-config.yaml'),
  'utf-8'
);
export const CONDUCTOR_CONFIG_TEMPLATE = yaml.load(conductorConfigTemplateString);

const binariesAppendix = KANGAROO_CONFIG.appId.slice(0, 10).replace(' ', '-');

const BINARIES_DIRECTORY = path.join(RESOURCES_DIRECTORY, 'bins');

export const HOLOCHAIN_BINARY = path.join(
  BINARIES_DIRECTORY,
  `holochain-v${KANGAROO_CONFIG.bins.holochain.version}-${binariesAppendix}${
    process.platform === 'win32' ? '.exe' : ''
  }`
);

export const LAIR_BINARY = path.join(
  BINARIES_DIRECTORY,
  `lair-keystore-v${KANGAROO_CONFIG.bins.lair.version}-${binariesAppendix}${
    process.platform === 'win32' ? '.exe' : ''
  }`
);

export const HAPP_PATH = path.join(RESOURCES_DIRECTORY, 'kangaroo.happ');
export const HAPP_APP_ID = 'kangaroo.happ';

export const UI_DIRECTORY = path.join(RESOURCES_DIRECTORY, 'ui');

export const ICON_PATH = path.join(RESOURCES_DIRECTORY, 'ui', 'icon.png');

export const SYSTRAY_ICON_PATH = path.join(RESOURCES_DIRECTORY, 'icons', '32x32@2x.png');
export const NOTIFICATIONS_ICON_PATH = path.join(RESOURCES_DIRECTORY, 'icons', '128x128.png');

export const isMac = process.platform === 'darwin';
export const isWindows = process.platform === 'win32';
export const isLinux = process.platform === 'linux';
