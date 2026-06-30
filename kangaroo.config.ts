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
  bootstrapUrl: 'https://dev-test-bootstrap2-iroh.holochain.org/',
  relayUrl: 'https://dev-test-bootstrap2-iroh.holochain.org/',
  signalUrl: 'wss://dev-test-bootstrap2.holochain.org/',
  iceUrls: ['stun:stun.cloudflare.com:3478', 'stun:stun.l.google.com:19302'],
  bins: {
    holochainVersion: '0.7.0-dev.31',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          'efe975ec1003756ca73071c7a54c43356d7c201e3b7723a1cbefd3d9775637ad',
        'aarch64-unknown-linux-gnu':
          '62bf75aaaeb1e97d3f07c6b0f5b45032f71b8d325b4e8fe6f5ca53bbda2633e8',
        'x86_64-pc-windows-msvc.exe':
          'adf3d998b27641a3ec34637a2d9c3897d9d91ee3714edc74f4dde48037f97473',
        'x86_64-apple-darwin': '202e362fa0e127ce90c9b843977c465fa4e9c8a2bcbbe14a0a30fd08f89f6c9c',
        'aarch64-apple-darwin': '99a70e08cdcab33cbb67ad53c9e879bfe5258dab3d722241d9fcbce469158204',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '65c428ae60e4cb210113c29df5991fdda51a0bf8cb88de0166709abe5eb90a37',
        'aarch64-unknown-linux-gnu':
          'b176d23880916e56033ff4ff8bb27b49b973ffc62eed323fc906d5a0005cef27',
        'x86_64-pc-windows-msvc.exe':
          'dc7965ef315ac050add2cf24aeeb6fc33808814fa2fea3620bd40c3c87fee9ad',
        'x86_64-apple-darwin': 'acc534058f8daaefbcbe0418a45c0f6ca4fbae78aad47909f0987193c463417b',
        'aarch64-apple-darwin': '316704901ec7362bfae6c5e8207ae3f417b2f69b73bc3845ff89196a738ad2c4',
      },
    },
  },
});
