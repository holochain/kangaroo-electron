import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
  root: path.resolve(__dirname, "main_window"),
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'main_window/index.html'),
      },
    }
  }
});
