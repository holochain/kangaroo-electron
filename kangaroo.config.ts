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
      version: '0.5.4',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '4ee7f7286b0c4a7c15ee3f46f5e6e3d78484eb61b261479bb782ec0ef82c6cc8',
        'x86_64-pc-windows-msvc.exe':
          '5f8d189b3d763ee146ac24aed01c4eb2bdec8ba80bf0fa4546a68e755b847aef',
        'x86_64-apple-darwin': '6229a0a696da6cb3e549269009f923448890a88de69448be40e8e2dbd08062fb',
        'aarch64-apple-darwin': 'd1fa2d979845492cad3fdb9fb6a2d950eb52ec7c4c8990dbc06d4162a595d880',
      },
    },
    lair: {
      version: '0.6.2',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '3c9ea3dbfc0853743dad3874856fdcfe391dca1769a6a81fc91b7578c73e92a7',
        'x86_64-pc-windows-msvc.exe':
          '6392ce85e985483d43fa01709bfd518f8f67aed8ddfa5950591b4ed51d226b8e',
        'x86_64-apple-darwin': '746403e5d1655ecf14d95bccaeef11ad1abfc923e428c2f3d87c683edb6fdcdc',
        'aarch64-apple-darwin': '05c7270749bb1a5cf61b0eb344a7d7a562da34090d5ea81b4c5b6cf040dd32e8',
      },
    },
  },
});
