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
          '9bc6b80e138bab64f3cfea83c0cf317725983a382b4818a90842d708ecd857c7',
        'x86_64-pc-windows-msvc.exe':
          '7ace57451dd503fea27be8d589b5a20593fe7b797ccd76695e5b1598ba9adce2',
        'x86_64-apple-darwin': '49e4aa1345e80b329d44a05e391245d46ca29c8fe33a1639d0f81eea96ad7313',
        'aarch64-apple-darwin': 'ff3983fa07e696dbae42b1b99ad7c502d4ee2eb557c0d8667b349e6c194d39ac',
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
