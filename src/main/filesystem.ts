import path from 'path';
import fs from 'fs';
import semver from 'semver';
import { nanoid } from 'nanoid';
import { app, dialog, session, shell } from 'electron';
import AdmZip from 'adm-zip';
import { platform } from '@electron-toolkit/utils';
import { KANGAROO_CONFIG } from './const';

export type Profile = string;

export class KangarooFileSystem {
  public readonly profileDataDir: string;
  public readonly profileConfigDir: string;
  public readonly profileLogsDir: string;

  public readonly conductorDir: string;
  public readonly keystoreDir: string;

  public readonly profile: string;

  constructor(profileDataDir: string, profileConfigDir: string, profileLogsDir: string, profile: string) {
    this.profileDataDir = profileDataDir;
    this.profileConfigDir = profileConfigDir;
    this.profileLogsDir = profileLogsDir;

    this.conductorDir = path.join(profileDataDir, 'conductor');
    this.keystoreDir = path.join(profileDataDir, 'keystore');

    this.profile = profile;

    createDirIfNotExists(this.conductorDir);
    createDirIfNotExists(this.keystoreDir);
  }

  static connect(app: Electron.App, profile?: Profile, tempDir?: string) {
    profile = profile ? profile : 'default';
    const versionString = breakingAppVersion();

    const defaultLogsPath = app.getPath('logs');
    console.log('defaultLogsPath: ', defaultLogsPath);

    const defaultUserDataPath = app.getPath('userData');
    console.log('defaultUserDataPath: ', defaultUserDataPath);
    // check whether userData path has already been modified, otherwise, set paths to point
    // to the profile-specific paths
    if (!defaultUserDataPath.endsWith(profile)) {
      const rootDir = tempDir ? tempDir : defaultUserDataPath;

      app.setPath('logs', path.join(rootDir, versionString, profile, 'logs'));
      app.setAppLogsPath(path.join(rootDir, versionString, profile, 'logs'));
      app.setPath('userData', path.join(rootDir, versionString, profile));
      app.setPath('sessionData', path.join(rootDir, versionString, profile, 'chromium'));
      fs.rmdirSync(defaultLogsPath);
    }

    const logsDir = app.getPath('logs');
    const configDir = path.join(app.getPath('userData'), 'config');
    const dataDir = path.join(app.getPath('userData'), 'data');

    createDirIfNotExists(logsDir);
    createDirIfNotExists(configDir);
    createDirIfNotExists(dataDir);

    console.log(
      'userData directory (the one to be deleted for a factory reset): ',
      app.getPath('userData')
    );
    console.log('dataDir: ', dataDir);
    console.log('logsDir:', logsDir);
    console.log('configDir: ', configDir);

    const kangarooFs = new KangarooFileSystem(dataDir, configDir, logsDir, profile);

    return kangarooFs;
  }

  get conductorConfigPath() {
    return path.join(this.conductorDir, 'conductor-config.yaml');
  }

  keystoreInitialized = () => {
    return fs.existsSync(path.join(this.keystoreDir, 'lair-keystore-config.yaml'));
  };

  readOrCreatePassword() {
    const pwPath = path.join(this.profileDataDir, '.pw');
    if (!fs.existsSync(pwPath)) {
      const pw = nanoid();
      fs.writeFileSync(pwPath, pw, 'utf-8');
    }
    return fs.readFileSync(pwPath, 'utf-8');
  }

  randomPasswordExists() {
    const pwPath = path.join(this.profileDataDir, '.pw');
    return fs.existsSync(pwPath);
  }

  async openLogs() {
    try {
      await shell.openPath(this.profileLogsDir);
    } catch (e) {
      dialog.showErrorBox('Failed to open logs folder', (e as any).toString());
    }
  }

  async exportLogs() {
    try {
      const zip = new AdmZip();
      zip.addLocalFolder(this.profileLogsDir);
      const exportToPathResponse = await dialog.showSaveDialog({
        title: 'Export Logs',
        buttonLabel: 'Export',
        defaultPath: `${KANGAROO_CONFIG.productName}_${app.getVersion()}_logs_${Date.now()}.zip`,
      });
      if (exportToPathResponse.filePath) {
        zip.writeZip(exportToPathResponse.filePath);
        shell.showItemInFolder(exportToPathResponse.filePath);
      }
    } catch (e) {
      dialog.showErrorBox('Failed to export logs', (e as any).toString());
    }
  }

  async factoryReset(keepLogs = false) {
    if (keepLogs) throw new Error('Keeping logs across factory reset is currently not supported.');
    if (platform.isWindows) {
      // Windows needs special treatment, because it tends to keep files "in use" that we'd
      // want to delete and then rejects deletion. And since factory reset needs to be
      // triggered by the app, we can apparently not let loose of all files without exiting
      // the app but then we have no process left to trigger the deletion from. It's a
      // chicken-egg problem and only a problem on Windows, so we also delete browser
      // data here via the electron API instead of just removing the containing folder.
      await clearDefaultSessionCache();
    }
    deleteRecursively(this.profileDataDir);
    deleteRecursively(this.profileLogsDir);
  }
}

function createDirIfNotExists(path: fs.PathLike) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

export function breakingAppVersion(): string {
  const version = app.getVersion();
  return breakingVersion(version);
}

export function breakingVersion(version: string): string {
  if (!semver.valid(version)) {
    throw new Error('App has an invalid version number.');
  }
  const prerelease = semver.prerelease(version);
  if (prerelease) {
    return `${semver.major(version)}.${semver.minor(version)}.${semver.patch(version)}-${
      prerelease[0]
    }`;
  }
  switch (semver.major(version)) {
    case 0:
      switch (semver.minor(version)) {
        case 0:
          return `0.0.${semver.patch(version)}`;
        default:
          return `0.${semver.minor(version)}.x`;
      }
    default:
      return `${semver.major(version)}.x.x`;
  }
}

/**
 * Deletes a folder recursively and if a folder fails with an EPERM error,
 * it tries instead to recursively delete the individual files and subfolders
 * it contains
 * @param root
 */
export function deleteRecursively(root: string) {
  try {
    fs.rmSync(root, { recursive: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.toString && e.toString().includes('EPERM') && fs.statSync(root).isDirectory()) {
      const filesAndSubFolders = fs.readdirSync(root);
      filesAndSubFolders.forEach((file) => deleteRecursively(path.join(root, file)));
    }
  }
}

async function clearDefaultSessionCache() {
  try {
    await session.defaultSession.clearCache();
  } catch (e) {
    console.warn('Failed to clear cache: ', e);
  }
  try {
    await session.defaultSession.clearStorageData();
  } catch (e) {
    console.warn('Failed to clear storage data: ', e);
  }
  try {
    await session.defaultSession.clearAuthCache();
  } catch (e) {
    console.warn('Failed to clear auth cache: ', e);
  }
  try {
    await session.defaultSession.clearCodeCaches({});
  } catch (e) {
    console.warn('Failed to clear code cache: ', e);
  }
  try {
    await session.defaultSession.clearHostResolverCache();
  } catch (e) {
    console.warn('Failed to clear host resolver cache: ', e);
  }
}
