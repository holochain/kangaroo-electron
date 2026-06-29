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
  relayUrl: "https://iroh-relay-hc.holochain.org/",
  iceUrls: ['stun:stun.cloudflare.com:3478', 'stun:stun.l.google.com:19302'],
  bins: {
    holochainVersion: '0.6.2-rc.0',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          'e6f174b1d3840c8dad008cf7b5be0c3b0a62086983df91bf7cef88c1ca04ac20',
        'aarch64-unknown-linux-gnu':
          '176fd160be96c55d208875e9f8465240f3ef0be9663ee677701849690e6d8503',
        'x86_64-pc-windows-msvc.exe':
          '0b38a9a36dfc003f4a3281847f6c9cfda92bf4fd44dec69e1e55ff7b6653752f',
        'x86_64-apple-darwin': 'fdbcb6503900d7d3d1c20a448744902b1e129e4d74057b9f43cd732c4fea6d21',
        'aarch64-apple-darwin': '1b7fb440f4503e8b28f4596dc25d1a67aaffa1d1298d57691892ce2a734d086c',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          'b1d0dc98e6e427a9e46264633ad1a2e66efb946806c41f26cc0da54254b85e68',
        'aarch64-unknown-linux-gnu':
          'a36ca8ec993baaf7782de62f75c2b23ca1afcf7f1c0ebf4e6991ccad83394184',
        'x86_64-pc-windows-msvc.exe':
          '9a6830ee237997683dcef05f4b3748114a0e50f25edcd4740fe0e8c0c8e1ec9e',
        'x86_64-apple-darwin': '4c637cacb93ad9d7370a99f523d79e2ad752fe6864dc0b05797809a6ad7e44ab',
        'aarch64-apple-darwin': '9f5d99aa0f27c0cb9a7fd243e7c837411c3e96b68ae114451efc10869d79f0c0',
      },
    },
  },
});
