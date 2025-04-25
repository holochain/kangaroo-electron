import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.kangaroo-electron',
  productName: 'Holochain Kangaroo Electron',
  version: '0.3.0-rc.3',
  macOSCodeSigning: false,
  windowsEVCodeSigning: false,
  fallbackToIndexHtml: true,
  autoUpdates: true,
  systray: true,
  passwordMode: 'password-optional',
  webhapp: {
    url: 'https://github.com/holochain/ziptest/releases/download/ziptest-v0.2.1/ziptest.webhapp',
    sha256: '447332e383074d6a36328f158160679dba7dcf1e6096ce635f3ace7ec35493b3',
  },
  bins: {
    holochain: {
      version: '0.5.1',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '7b269a56d73f6e08a4c89d389f3ef8d55470a35ff84b58ca551502e5f9c164e4',
        'x86_64-pc-windows-msvc.exe':
          'db1ff30f7322286d981f969a8b0f421bffd87e28bf73a118100767f31d6be69d',
        'x86_64-apple-darwin': 'cbda9c454c385757525f1086d4d45a6b3af9a26786dc37ce5af625d901b3e7bd',
        'aarch64-apple-darwin': '973766004aab5c7e58ab03e661778e856e5ed8dc49489662c3ee9ec4c9e1c068',
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
