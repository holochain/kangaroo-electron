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
      version: '0.6.0-rc.0',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'a0aca0bb811cae2dd0a4ba49ae50efc87557bb105dadd90765ef0b8664482a7f',
        'x86_64-pc-windows-msvc.exe':
          '42d7febb2c332cdb9a562cd790be53667d15979a1f08405d02bb9c863222f493',
        'x86_64-apple-darwin': '6ff66bcd18dcfc1392653e8e9d71f3a376e1adb2cd36c5fa8066e804b7fb4551',
        'aarch64-apple-darwin': '8f56ff9ff61a384512662e13ef5531d2402cd9af25a97c9e2294612e5737ddd3',
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
