console.log('👋 This message is being logged by "renderer.ts", included via Vite');

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.electronAPI.handleLauncherEnv((e: Event, env: any) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window.__HC_LAUNCHER_ENV__ = env;
  console.log("Set __HC_LAUNCHER_ENV__", env);
});