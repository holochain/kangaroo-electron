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
  relayUrl: "https://iroh-relay-hc.holochain.org/",
  iceUrls: ['stun:stun.cloudflare.com:3478', 'stun:stun.l.google.com:19302'],
  bins: {
    holochainVersion: '0.6.2',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '5b340975e5f4cc96b63614d78567e5ff56488fe93e3943f144c62eb1847027d5',
        'aarch64-unknown-linux-gnu':
          '21e7a9d3b79a7f4165647cddae510710f3495f901997e3cb9b94c1dbc8c5964f',
        'x86_64-pc-windows-msvc.exe':
          'e4111bee861eb554586e681f84612a59fbca7f611d20fd223febd4d25ed636e5',
        'x86_64-apple-darwin': '506cf5c25215bc59ae9a99fa40ac442f7c69b7660bc940dc6b1a5dc294101d65',
        'aarch64-apple-darwin': '0578b015862b4d3e3b72cb283813f96f18d07a14a1f598a71520cb193a9ef6b8',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '59f0ef44f19697039c7166a9705307c37ad2ee930ad28336badfaf6e9b8f354b',
        'aarch64-unknown-linux-gnu':
          '4b554b9a6d71cb07d78b66817acf20be59e7e90cfb6a2f100c6cf5e34cf461c3',
        'x86_64-pc-windows-msvc.exe':
          '934f508109149d1ec976d3fedb475bd44dfa9606d6c707f696bf4d2fed3babaf',
        'x86_64-apple-darwin': 'be3753cfa13e48a09446861e65b63924f1e52946f4547962138a08e94a2e4752',
        'aarch64-apple-darwin': '4fff1f88e2e2aae855ca129257eb8806fbb249e39ac0c16bcc2da2d3f3f12582',
      },
    },
  },
});
