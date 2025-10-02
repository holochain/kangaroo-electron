import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.kangaroo-electron',
  productName: 'Holochain Kangaroo Electron',
  version: '0.1.0',
  macOSCodeSigning: false,
  windowsEVCodeSigning: false,
  fallbackToIndexHtml: true,
  autoUpdates: true,
  systray: true,
  passwordMode: 'password-optional',
  bootstrapUrl: 'https://dev-test-bootstrap2.holochain.org/',
  signalUrl: 'wss://dev-test-bootstrap2.holochain.org/',
  iceUrls: ['stun:stun.cloudflare.com:3478', 'stun:stun.l.google.com:19302'],
  bins: {
    holochain: {
      version: '0.6.0-dev.25',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '6512c3aca487fd41d1ceb6b3b0f5bca8311121b0298589e222c9d7aa70807353',
        'x86_64-pc-windows-msvc.exe':
          'aec13b516cf8bcb1834ee34a71fcfd5014d8bec26c58830292f29442f8af3ab7',
        'x86_64-apple-darwin': 'a57ead2e9c9d269b9053bf1394e913266b1659907b109edcc7166f85d3c7114f',
        'aarch64-apple-darwin': 'ec0bea8cc26899b477c5b4cd11ddea49b18654fc536323294bc7a49c57f372ba',
      },
    },
    lair: {
      version: '0.6.3',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '56beb19ca4abf39c8e2b90401a9ade10e5c395f6b95cd1853aac05643dce5a11',
        'x86_64-pc-windows-msvc.exe':
          '504e7e3d1afc4426990a4aee190f1137bb474ccb072f7049c23f43fc01c07009',
        'x86_64-apple-darwin': 'd7521a0299ea425700091b78e02672b05ad4c97c2ca82643ea9ba2349b0e1e69',
        'aarch64-apple-darwin': 'cb26b8065f52f7e3ff2d24a09100f60f61a3214e25e170ac2ef607dd040800d7',
      },
    },
  },
});
