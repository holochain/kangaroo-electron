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
      version: '0.6.0-dev.27',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'bfac7ac1d0dd5af2408f728677a87aeb5aa8878bb4810e675f610473cdf0290c',
        'x86_64-pc-windows-msvc.exe':
          'd1014d8637f02d52724ca39e6f3fdc73b51e71a79d6eccee31cd35ab11740d43',
        'x86_64-apple-darwin': 'b7be0bb0513a4d83e802787bcfa90bfb1ae33a4cecd559c785fd31a65a71097b',
        'aarch64-apple-darwin': '724ca3d1166e892ade86f454faaa8ed2eee76c9a459d758c1f09987b94aff6f9',
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
