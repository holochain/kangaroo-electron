import { defineConfig } from 'vite';
import path from "node:path";

// https://vitejs.dev/config
export default defineConfig({
  optimizeDeps: {
    include: ['electron-holochain'],
  },
});
