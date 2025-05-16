// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
import { PasswordType } from '../main/types';

contextBridge.exposeInMainWorld('electronAPI', {
  onProgressUpdate: (callback) => ipcRenderer.on('loading-progress-update', callback),
  onNameAndVersion: (callback) => ipcRenderer.on('name-and-version', callback),
  factoryReset: () => ipcRenderer.invoke('factory-reset'),
  openLogs: () => ipcRenderer.invoke('open-logs'),
  exportLogs: () => ipcRenderer.invoke('export-logs'),
  getProfile: () => ipcRenderer.invoke('get-profile'),
  getNameAndVersion: () => ipcRenderer.invoke('get-name-and-version'),
  launch: (passwordInput: PasswordType) => ipcRenderer.invoke('launch', passwordInput),
  exit: () => ipcRenderer.invoke('exit'),
});
