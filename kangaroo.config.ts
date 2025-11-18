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
      version: '0.6.0-rc.2',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '8e17587186b6d41fcfda0ce8a4b8b4930d8c38e813973fe0c6138bb51447f68b',
        'x86_64-pc-windows-msvc.exe':
          '7ccdc2f90285f3db64c632dd860bbc5a5a2862b01337a42f16aae329278a5c56',
        'x86_64-apple-darwin': 'a9e347843f659eac09f89775896db9d3c1d26c46839333b93cb0881d4b89193a',
        'aarch64-apple-darwin': '75d67aabdaed45b3dab37648dac24cee57b6afe463ffe11769b39571f118c0fb',
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
