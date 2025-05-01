import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.kangaroo-electron',
  productName: 'Holochain Kangaroo Electron',
  version: '0.3.3',
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
  bootstrapUrl: 'https://dev-test-bootstrap2.holochain.org/',
  signalUrl: 'wss://dev-test-bootstrap2.holochain.org/',
  iceUrls: ['stun:stun-0.main.infra.holo.host:443', 'stun:stun-1.main.infra.holo.host:443'],
  bins: {
    holochain: {
      version: '0.5.2-rc.1',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '11b4a9b71f789ff172dc3c31f80d905d8f40f31d15e572314f7ef05491f45024',
        'x86_64-pc-windows-msvc.exe':
          '48ce20b56d33db42805a35878e320ae5606352d7ca0efb4aea0ce96474122bae',
        'x86_64-apple-darwin': '9d59fff4b0ddd4d52313fee418260047d76c868a2d3a0de467aaadf5a649dd5a',
        'aarch64-apple-darwin': 'd153428bedc8494af019ba2852a9f5b4c5d9c23ca04a7d5bceb907c5a68baa7a',
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
