import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { resolve } from "path";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin({ exclude: ["@holochain/client", "get-port", "nanoid"] })],
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          happ: resolve(__dirname, "src/preload/happ.ts"),
          splashscreen: resolve(__dirname, "src/preload/splashscreen.ts"),
        },
      },
    },
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          indexNotFound: resolve(__dirname, "src/renderer/indexNotFound.html"),
          indexNotFound2: resolve(__dirname, "src/renderer/indexNotFound2.html"),
          splashscreen: resolve(__dirname, "src/renderer/splashscreen.html"),
        },
      },
    },
  },
});
