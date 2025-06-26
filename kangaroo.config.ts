import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.dino-adventure',
  productName: 'Dino Adventure',
  version: '0.1.2-rc.0',
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
      version: '0.5.3-rc.0',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'd969e03cd35716f34a3b75181ccf45ed9b3f422c58859595da4ccbad43cf07d6',
        'x86_64-pc-windows-msvc.exe':
          'dfadb70628c85f454feb6535016287058fa53df83f60bbd06f7c9f7a30f5f4d9',
        'x86_64-apple-darwin': '90c57274a5eb56c0d2b706307ebf0365bcc91019b0519256cfa7f4ed73386a9a',
        'aarch64-apple-darwin': '66baf5202c4a6dd1f22bcfd20853db95e0755a0e8514891b27d409a50968bcea',
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
