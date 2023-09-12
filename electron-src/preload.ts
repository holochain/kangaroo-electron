// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronAPI', {
  signZomeCall: (zomeCall: any) => 
    ipcRenderer.invoke('sign-zome-call', zomeCall),
  handleStatus: (callback: any) => 
    ipcRenderer.on('update-status', callback),
  handleLauncherEnv: (callback: any) => 
    ipcRenderer.on('update-launcher-env', callback),
});