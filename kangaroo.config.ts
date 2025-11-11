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
      version: '0.6.0-rc.1',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '91a200205768754fa8841f3f71ba637c3e228e1b6a415eeb254ee8c43b75fae5',
        'x86_64-pc-windows-msvc.exe':
          'af0c2c7391c7547d6fa6203278419755e933ec83c41fb4d112a40b65cf7b6c44',
        'x86_64-apple-darwin': 'b954e8f969677897055647ab5df0e4da9a7044a4648f71959874a16cd9cd4329',
        'aarch64-apple-darwin': '68b199575b55e528dae5fd5073273f0b6b23b0d454121eee0809f2a501afe3d1',
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
