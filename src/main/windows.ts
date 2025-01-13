import path from 'path';
import fs from 'fs';
import url from 'url';
import { AppAuthenticationToken, InstalledAppId } from '@holochain/client';
import {
  BrowserWindow,
  NativeImage,
  nativeImage,
  net,
  session,
  shell,
} from 'electron';
import { is } from '@electron-toolkit/utils';
import { ICON_PATH, KANGAROO_CONFIG } from './const';
import { SplashScreenType } from './types';

export type UISource =
  | {
      type: 'path';
      path: string;
    }
  | {
      type: 'port';
      port: number;
    };

export const createHappWindow = async (
  uiSource: UISource,
  appId: InstalledAppId,
  appPort: number,
  appAuthToken: AppAuthenticationToken,
  openDevtools: boolean
): Promise<BrowserWindow> => {
  // TODO create mapping between installed-app-id's and window ids
  if (!appPort) throw new Error('App port not defined.');

  if (uiSource.type === 'path') {
    const ses = session.defaultSession;
    ses.protocol.handle('webhapp', async (request) => {
      const uriWithoutProtocol = request.url.slice('webhapp://'.length);
      const filePathComponents = uriWithoutProtocol.split('/').slice(1);
      const relativeFilePath = path.join(...filePathComponents);
      const absoluteFilePath = path.join(uiSource.path, relativeFilePath);

      const fallbackToIndexHtml = KANGAROO_CONFIG.fallbackToIndexHtml
        ? !fs.existsSync(absoluteFilePath)
        : false;

      if (!relativeFilePath.endsWith('index.html') && !fallbackToIndexHtml) {
        return net.fetch(url.pathToFileURL(absoluteFilePath).toString());
      } else {
        const indexHtmlResponse = await net.fetch(url.pathToFileURL(absoluteFilePath).toString());
        const content = await indexHtmlResponse.text();
        let modifiedContent = content.replace(
          '<head>',
          `<head><script type="module">window.__HC_LAUNCHER_ENV__ = { APP_INTERFACE_PORT: ${appPort}, INSTALLED_APP_ID: "${appId}", APP_INTERFACE_TOKEN: [${appAuthToken}] };</script>`
        );
        // remove title attribute to be able to set title to app id later
        modifiedContent = modifiedContent.replace(/<title>.*?<\/title>/i, '');
        return new Response(modifiedContent, indexHtmlResponse);
      }
    });
  }

  let icon: NativeImage | undefined;

  if (uiSource.type === 'path') {
    if (fs.existsSync(ICON_PATH)) {
      icon = nativeImage.createFromPath(ICON_PATH);
    }
  } else {
    try {
      const iconResponse = await net.fetch(`http://localhost:${uiSource.port}/icon.png`);
      if (iconResponse.status === 404) {
        console.warn(
          'No icon.png found. It is recommended to put an icon.png file (1024x1024 pixel) in the root of your UI assets directory.'
        );
      } else {
        const buffer = await iconResponse.arrayBuffer();
        icon = nativeImage.createFromBuffer(Buffer.from(buffer));
      }
    } catch (e) {
      console.error('Failed to get icon.png: ', e);
    }
  }

  console.log('Instantiating browser window');

  const happWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    icon,
    title: KANGAROO_CONFIG.productName,
    webPreferences: {
      preload: path.resolve(__dirname, '../preload/happ.js'),
    },
  });

  console.log('setLinkOpenHandlers');

  setLinkOpenHandlers(happWindow);

  happWindow.on('page-title-updated', (evt) => {
    evt.preventDefault();
  });

  if (openDevtools) happWindow.webContents.openDevTools();

  if (uiSource.type === 'port') {
    try {
      // Check whether dev server is responsive and index.html exists
      await net.fetch(`http://localhost:${uiSource.port}/index.html`);
    } catch (e) {
      console.error(`No index.html file found at http://localhost:${uiSource.port}/index.html`, e);
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        happWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
      } else {
        happWindow.loadFile(path.join(__dirname, '../renderer/indexNotFound.html'));
      }
      happWindow.show();
      return happWindow;
    }
    await happWindow.loadURL(`http://localhost:${uiSource.port}`);
  } else if (uiSource.type === 'path') {
    try {
      console.log('loading URL');
      await happWindow.loadURL(`webhapp://webhappwindow/index.html`);
      console.log('URL loaded');
    } catch (e) {
      console.error('[ERROR] Failed to fetch index.html');

      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        happWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
      } else {
        happWindow.loadFile(path.join(__dirname, '../renderer/indexNotFound2.html'));
      }
      happWindow.show();
      return happWindow;
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throw new Error(`Unsupported uiSource type: ${(uiSource as any).type}`);
  }

  happWindow.show();

  return happWindow;
};

export function setLinkOpenHandlers(browserWindow: BrowserWindow): void {
  // links should open in the system default application
  // instead of the webview
  browserWindow.webContents.on('will-navigate', (e) => {
    if (e.url.startsWith('http://localhost') || e.url.startsWith('http://127.0.0.1')) {
      // ignore dev server reload
      return;
    }
    if (
      e.url.startsWith('http://') ||
      e.url.startsWith('https://') ||
      e.url.startsWith('mailto://')
    ) {
      e.preventDefault();
      shell.openExternal(e.url);
    }
  });

  browserWindow.webContents.on('will-frame-navigate', (e) => {
    if (e.url.startsWith('http://localhost') || e.url.startsWith('http://127.0.0.1')) {
      // ignore dev server reload
      return;
    }
    if (
      e.url.startsWith('http://') ||
      e.url.startsWith('https://') ||
      e.url.startsWith('mailto://')
    ) {
      e.preventDefault();
      shell.openExternal(e.url);
    }
  });

  // Links with target=_blank should open in the system default browser and
  // happ windows are not allowed to spawn new electron windows
  browserWindow.webContents.setWindowOpenHandler((details) => {
    if (details.url.startsWith('http://') || details.url.startsWith('https://')) {
      shell.openExternal(details.url);
    }
    return { action: 'deny' };
  });
}

export const createSplashWindow = (type: SplashScreenType): BrowserWindow => {
  let htmlFile: string;
  switch (type) {
    case SplashScreenType.EnterPassword: {
      htmlFile = 'enterPassword.html';
      break;
    }
    case SplashScreenType.LoadingOnly: {
      htmlFile = 'loading.html';
      break;
    }
    case SplashScreenType.PasswordSetup: {
      htmlFile = 'setupPassword.html';
      break;
    }
    case SplashScreenType.PasswordSetupOtional: {
      htmlFile = 'setupPasswordOptional.html';
      break;
    }
  }

  const splashWindow = new BrowserWindow({
    height: 450,
    width: 800,
    center: true,
    resizable: false,
    frame: false,
    show: false,
    backgroundColor: '#fbf9f7',
    webPreferences: {
      preload: path.join(__dirname, '../preload/splashscreen.js'),
    },
  });

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    splashWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/${htmlFile}`);
  } else {
    splashWindow.loadFile(path.join(__dirname, `../renderer/${htmlFile}`));
  }

  splashWindow.once('ready-to-show', () => {
    splashWindow.webContents.send('name-and-version', {
      productName: KANGAROO_CONFIG.productName,
      version: KANGAROO_CONFIG.version,
    });
    splashWindow.show();
  });

  return splashWindow;
};
