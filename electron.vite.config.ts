import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { resolve } from 'path';

export default defineConfig({
  main: {
    plugins: [
      externalizeDepsPlugin({
        // electron-context-menu v4 is ESM-only, so it must be bundled into the CJS main
        // output rather than externalized.
        exclude: ['@holochain/client', 'get-port', 'nanoid', 'electron-context-menu'],
      }),
    ],
  },
  preload: {
    build: {
      rollupOptions: {
        input: {
          happ: resolve(__dirname, 'src/preload/happ.ts'),
          splashscreen: resolve(__dirname, 'src/preload/splashscreen.ts'),
        },
      },
    },
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          indexNotFound: resolve(__dirname, 'src/renderer/indexNotFound.html'),
          indexNotFound2: resolve(__dirname, 'src/renderer/indexNotFound2.html'),
          loading: resolve(__dirname, 'src/renderer/loading.html'),
          setupPassword: resolve(__dirname, 'src/renderer/setupPassword.html'),
          setupPasswordOptional: resolve(__dirname, 'src/renderer/setupPasswordOptional.html'),
          enterPassword: resolve(__dirname, 'src/renderer/enterPassword.html'),
        },
      },
    },
  },
});
