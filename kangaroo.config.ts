import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.lightningrodlabs.acorn',
  productName: 'Acorn',
  version: '11.3.2',
  macOSCodeSigning: true,
  windowsEVCodeSigning: true,
  fallbackToIndexHtml: true,
  autoUpdates: true,
  systray: true,
  webhapp: {
    url: 'https://github.com/lightningrodlabs/acorn/releases/download/v11.3.1-alpha/acorn.webhapp',
    sha256: '948cac0497cc9402c71e11aaa6195b1eb24762384d6a67472b7f0c465140ed15',
  },
  passwordMode: 'password-optional',
  bootstrapUrl: 'https://dev-test-bootstrap2.holochain.org/',
  signalUrl: 'wss://dev-test-bootstrap2.holochain.org/',
  iceUrls: ['stun:stun.cloudflare.com:3478', 'stun:stun.l.google.com:19302'],
  bins: {
    holochain: {
      version: '0.5.3',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '1165646324ad6ebd60fe8063a91ec4981dd1d7da64375603560fcc6b7ef511f7',
        'x86_64-pc-windows-msvc.exe':
          '143791e1c59dd718c5b60face20792a85b752ac3bba0e58b57469690c4be6a19',
        'x86_64-apple-darwin': '540ef02bcfce6c91379e07df03d51afedc73a1f13df74e0cb9da6be58e147878',
        'aarch64-apple-darwin': 'a42edb4e8580456c95f8c91ab0699d2b5fd1f73a5df0bdb9e4f20a102de0e988',
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
