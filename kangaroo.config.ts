import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.kangaroo-electron',
  productName: 'Holochain Kangaroo Electron',
  version: '0.3.6',
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
  iceUrls: ['stun://stun.l.google.com:19302,stun.cloudflare.com:3478'],
  bins: {
    holochain: {
      version: '0.5.2-rc.2',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'e4a3999265e5809efdeb55a5cf72bd9b99b9438176fce48bda31dd39965a5a39',
        'x86_64-pc-windows-msvc.exe':
          '419ef356f51a05bb2ddc2284132961d1b1c384ef7650ee4a440ea132e5cc69c9',
        'x86_64-apple-darwin': '5116fc4b6c397af381525d7b541587a425b611d802691a5dc8062e675dc36cb0',
        'aarch64-apple-darwin': 'f98011c87683283536bdd662d10ceb074738a6e3ee4f705521d0bc2ac67f54cd',
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
