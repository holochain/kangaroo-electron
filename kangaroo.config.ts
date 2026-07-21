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
    holochainVersion: '0.6.3',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          'e82116cfcf28e3009a369929f76fe9c752688f0497383442279ff160bdb4a9cd',
        'aarch64-unknown-linux-gnu':
          'ef94206be6abc9450985ef2bedc856444c67edccb922d0e42fd8fdfcce44b534',
        'x86_64-pc-windows-msvc.exe':
          '1e90a03b13dbb0698dfc03f87bf437061837d0316d2a0ead375696c3cca5c0d2',
        'x86_64-apple-darwin': '2aca132148522a6089e602a7d697efec539019d4625e8a6ce24fc743c845b531',
        'aarch64-apple-darwin': '3deb3a58489595dc277900d69cb8cbbda0298d62d6752946ce86202317ec7911',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '85dda5badd01c9203494b64da3ee704e57b4511f8eb93213bf8f65a9ee0d4f35',
        'aarch64-unknown-linux-gnu':
          '000cdf96723db44d94f639ddba2507b123c26752d7a471facf3f152caa3d8a66',
        'x86_64-pc-windows-msvc.exe':
          '521f7e44037afde4ccabcfd0e59e69a7313d78b042d2465d9c2f0c1ba307bb33',
        'x86_64-apple-darwin': '7d37fcc89c961d9d2758d378f9dc2bbdd40be67f75fd1cd515ed6cfd6f827056',
        'aarch64-apple-darwin': '04f1524c16491f9adabdcd414964048ef6234e4b15c46ebbc9a843350e77f853',
      },
    },
  },
});
