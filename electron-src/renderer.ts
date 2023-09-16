console.log('👋 This message is being logged by "renderer.ts", included via Vite');

import { LauncherEnvironment } from "./types";

window.electronAPI.handleLauncherEnv((e: Event, env: LauncherEnvironment) => {
  window.__HC_LAUNCHER_ENV__ = env;
});
