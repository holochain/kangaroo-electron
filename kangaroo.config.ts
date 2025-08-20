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
      version: '0.5.5',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '8c1e0c6e72fb5dde157973ee280ee494bbbad1926820829339dc67b84bc86b6e',
        'x86_64-pc-windows-msvc.exe':
          'cb62f336c1be9fbf8c4a823b4e6b0248903f8e07c881497c8590e923142bbdaf',
        'x86_64-apple-darwin': '430bc76fa9561461cf038f9ce4939171712ba02ce6eefc4a0aa43ac3496e498c',
        'aarch64-apple-darwin': 'c7535f3ce81cb6a72397d5942da6bb4a16d9eb9afc78af7ce0b861ca237d51f7',
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
