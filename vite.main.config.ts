import { defineConfig } from 'vite';
import path from "node:path";

// https://vitejs.dev/config
export default defineConfig({
  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
  optimizeDeps: {
    include: ['electron-holochain'],
  },
  build: {
    commonjsOptions: { 
      include: [/electron-holochain/],
    },
    rollupOptions: {
      external: [/holochain-lair-signer/],
    }
  },
});
