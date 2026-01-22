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
  relayUrl: "https://use1-1.relay.n0.iroh-canary.iroh.link./",
  iceUrls: ['stun:stun.cloudflare.com:3478', 'stun:stun.l.google.com:19302'],
  bins: {
    holochainVersion: '0.6.1-rc.0',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '1aa9dc82b298c99d1a7fddfbd1a9aa2511040217026f4ad975939a0e00d38f93',
        'aarch64-unknown-linux-gnu':
          '4429ce2b42b05fc6c31ac1f1631de2af30b26f53aa422da35852d4e6e14878aa',
        'x86_64-pc-windows-msvc.exe':
          '47b839405c3dc7b7d669a53cb919bcdd5aa5833de48d09ea68b8920132f073f6',
        'x86_64-apple-darwin': '97c678bbe8068b936484a8a0a0c374c37a0198316565fbbbc7558187e8c5a1d5',
        'aarch64-apple-darwin': '79401c5f58c35e18e62785731986f6b55d6fa6647d389c92ac4f80b3f01f29d6',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '134292a46ff3302a6a36db74db4288451796f0861adabcd9e42b60fcc33bbd3d',
        'aarch64-unknown-linux-gnu':
          '726a5e5634420c573e0bbaf2e05a96a3cae92d97518aad14a71ae8ffa29f9c33',
        'x86_64-pc-windows-msvc.exe':
          'f9b67704d0dfd1017fc9098f2fcad1fca92cb576f97acfb7eb104d68f8691e4f',
        'x86_64-apple-darwin': 'b232448f345c9508c26ede5e0cb9ddd0de0116d4eab77b974414b2271897c1b3',
        'aarch64-apple-darwin': 'd67f0aded092bb221547fe64af87a520c0c087b49e3774d5fe50a04255473de1',
      },
    },
  },
});
