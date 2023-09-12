
import { InstalledAppId } from "@holochain/client";
import { ZomeCallUnsignedNapi } from "holochain-lair-signer";

export interface LauncherEnvironment {
  APP_INTERFACE_PORT?: number;
  ADMIN_INTERFACE_PORT?: number;
  INSTALLED_APP_ID?: InstalledAppId;
}

export interface ElectronAPICalls {
  signZomeCall(z: ZomeCallUnsignedNapi): any;
  handleStatus(callback: (e: Event, msg: string) => void): void;
  handleLauncherEnv(callback: (e: Event, env: LauncherEnvironment) => void): void;
}

declare global {
  interface Window {
    '__HC_LAUNCHER_ENV__'?: LauncherEnvironment;
    electronAPI: ElectronAPICalls;
  }
}