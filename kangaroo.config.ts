import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.kangaroo-electron',
  productName: 'Holochain Kangaroo Electron',
  version: '0.3.0-rc.2',
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
      version: '0.5.0-rc.4',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'dc2d4e877edf21b1e385ed0a982f7795a5517db2147544e580dead2ec4a7b105',
        'x86_64-pc-windows-msvc.exe':
          '160f03b75be0c4a818245a88898c989a5f44bc2f80c57e945a2d26684de04547',
        'x86_64-apple-darwin': '629a7f0f8a7ba3e059470e015f1c31b6d8cb9af3dfbb53d9ee803526916f00c5',
        'aarch64-apple-darwin': '7d6495488dd62668f92385a0bded3fb556ae7aaba5d56377d22c73a4b01bfb01',
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
