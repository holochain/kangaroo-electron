import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.dino-adventure',
  productName: 'Dino Adventure',
  version: '0.1.2-rc.1',
  macOSCodeSigning: true,
  windowsEVCodeSigning: true,
  fallbackToIndexHtml: true,
  autoUpdates: true,
  systray: true,
  webhapp: {
    url: "https://github.com/holochain/dino-adventure/releases/download/v0.1.0/dino-adventure-v0.1.0.webhapp",
    sha256: "c1e03ff5ef71c397d4228123aa75ceb2fb30d7feea7720130853248cbcc397e7",
  },
  passwordMode: 'no-password',
  bootstrapUrl: 'https://dev-test-bootstrap2.holochain.org/',
  signalUrl: 'wss://dev-test-bootstrap2.holochain.org/',
  iceUrls: ['stun:stun.l.google.com:19302','stun:stun.cloudflare.com:3478'],
  bins: {
    holochain: {
      version: '0.5.4-rc.0',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '384610e53a747120bab4564b146c09c6bbfeb3abad5ecbaaaaa53d0437040cc7',
        'x86_64-pc-windows-msvc.exe':
          'da402d923896a98ff5328dbc3395171b8c49a8ba8e5f7deb3b1cd1e389fe5091',
        'x86_64-apple-darwin': 'a96bf5be9d2aaede143d34f0acac1a2125b1a73cc1f41432b80601e816b86e02',
        'aarch64-apple-darwin': '03485b499c2cef8455a031813f3f054b1dc0b8c38d924103707261e113dee16b',
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
