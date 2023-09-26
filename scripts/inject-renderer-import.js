const fs = require("fs");
const path = require("path");

function injectRendererToIndexHtml() {
  const html = fs.readFileSync(path.resolve(__dirname, '../main_window/index.html')).toString();
  
  const regex = /<\/head>(.*?)/gi;
  const replacement = '  <script type="module" src="/renderer.ts"></script>\n</head>$1';
  const newHtml = html.replace(regex, replacement);

  fs.writeFileSync(path.resolve(__dirname, '../main_window/index.html'), newHtml);
}

injectRendererToIndexHtml();