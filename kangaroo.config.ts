import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.dino-adventure',
  productName: 'Dino Adventure',
  version: '0.1.1',
  macOSCodeSigning: true,
  windowsEVCodeSigning: true,
  fallbackToIndexHtml: true,
  autoUpdates: true,
  systray: true,
  webhapp: {
    url: "https://github.com/holochain/dino-adventure/releases/download/v0.1.0/dino-adventure-v0.1.0.webhapp",
    sha256: "c1e03ff5ef71c397d4228123aa75ceb2fb30d7feea7720130853248cbcc397e7",
  },
  passwordMode: 'no-password',
  bootstrapUrl: 'https://dev-test-bootstrap2.holochain.org/',
  signalUrl: 'wss://dev-test-bootstrap2.holochain.org/',
  iceUrls: ['stun:stun.l.google.com:19302','stun:stun.cloudflare.com:3478'],
  bins: {
    holochain: {
      version: '0.5.2',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'bbbdb2e52693522eaaaddafd392c9861db19210e02a48e1ff80d1077a296a08e',
        'x86_64-pc-windows-msvc.exe':
          'e111298fc3af3cc12bfc7adb742d5f29ced7d19f05267969a23d0b8e0d286d5c',
        'x86_64-apple-darwin': '8bde56c485154b9ac31aa8a5c7232479503b6015fccf66035228b52680e2daf5',
        'aarch64-apple-darwin': '3b6da6df698d86e5d66691b0c91c5ff0e308b07a400b7ea733f019ea62021cdd',
      },
    },
    lair: {
      version: '0.6.1',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'c5d5d912af41f17def1c9d1027abd8eb6ce6f088871f4347ed38e124a93023cc',
        'x86_64-pc-windows-msvc.exe':
          'e11a0658c2d5a3c00409ea447241b3f1f3a215d70fa396b8a3ed633226f0a11f',
        'x86_64-apple-darwin': 'fed0e9c3fc32589031229fb177ef3b3324e0096e742802898976812174bdd12d',
        'aarch64-apple-darwin': 'dd36c33e495b8046501f0824fbc08f069973cab5ee210275ab9de3af932d79e8',
      },
    },
  },
});
