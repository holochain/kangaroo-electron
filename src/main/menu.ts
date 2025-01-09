import { Menu, app, dialog, shell } from 'electron';
import { KangarooFileSystem } from './filesystem';
import { isMac, KANGAROO_CONFIG } from './const';
import AdmZip from 'adm-zip';

// extending from electron's default menu: https://github.com/electron/electron/blob/398dde9dfbdfcfd7757ead9a30785c01de9f0808/lib/browser/default-menu.ts#L12
export const kangarooMenu = (kangarooFs: KangarooFileSystem) => {
  const macAppMenu: Electron.MenuItemConstructorOptions = { role: 'appMenu' };
  const helpMenu: Electron.MenuItemConstructorOptions = {
    role: 'help',
    submenu: [
      {
        label: 'Open Logs',
        async click() {
          try {
            await shell.openPath(kangarooFs.appLogsDir);
          } catch (e) {
            dialog.showErrorBox('Failed to open logs folder', (e as any).toString());
          }
        },
      },
      {
        label: 'Export Logs',
        async click() {
          try {
            const zip = new AdmZip();
            zip.addLocalFolder(kangarooFs.appLogsDir);
            const exportToPathResponse = await dialog.showSaveDialog({
              title: 'Export Logs',
              buttonLabel: 'Export',
              defaultPath: `${KANGAROO_CONFIG.productName}_${app.getVersion()}_logs_${new Date().toISOString()}.zip`,
            });
            if (exportToPathResponse.filePath) {
              zip.writeZip(exportToPathResponse.filePath);
              shell.showItemInFolder(exportToPathResponse.filePath);
            }
          } catch (e) {
            dialog.showErrorBox('Failed to export logs', (e as any).toString());
          }
        },
      },
    ],
  };

  const applicationMenu: Electron.MenuItemConstructorOptions = {
    label: KANGAROO_CONFIG.productName,
    submenu: [
      {
        label: 'Restart',
        click() {
          const options: Electron.RelaunchOptions = {
            args: process.argv,
          };
          // https://github.com/electron-userland/electron-builder/issues/1727#issuecomment-769896927
          if (process.env.APPIMAGE) {
            console.log('process.execPath: ', process.execPath);
            options.args?.unshift('--appimage-extract-and-run');
            options.execPath = process.env.APPIMAGE;
          }
          app.relaunch(options);
          app.quit();
        },
      },
      {
        label: 'Quit',
        type: 'normal',
        click() {
          app.quit();
        },
      },
    ],
  };

  return Menu.buildFromTemplate([
    ...(isMac ? [macAppMenu] : []),
    applicationMenu,
    { role: 'editMenu' },
    { role: 'viewMenu' },
    { role: 'windowMenu' },
    helpMenu,
  ]);
};
