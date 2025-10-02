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
      version: '0.6.0-dev.24',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '85c97fdc130def1074a289f53c2bfc9b4d817949a8e015a4edd0b6e1d176f9ef',
        'x86_64-pc-windows-msvc.exe':
          '297b56dbc8ad9cbe6aac081c8852b6efce93061dfd0c1b8846fb77d399c90566',
        'x86_64-apple-darwin': '1da49577ecf8d34fdb0ac5bad634219db21cb796a098590e2550677656561707',
        'aarch64-apple-darwin': '8845cd0e76454e3393d4dcc08e9422719318bfe6642ba8daf32f6b1d7cdc563a',
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
