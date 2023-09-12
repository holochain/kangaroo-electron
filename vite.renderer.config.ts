import path from 'path';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config
export default defineConfig({
  root: path.resolve(__dirname, "src"),
  plugins: [
    {
      name: "html-inject-renderer-into-head",
      enforce: "post",
      transformIndexHtml(html: string) {
          const regex = /<\/head>(.*?)/gi;
          const replacement = '<script type="module" src="/renderer.ts"></script>\n</head>$1';
          return html.replace(regex, replacement);
      },
    },
  ]
});
