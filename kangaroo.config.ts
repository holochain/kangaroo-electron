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
    holochainVersion: '0.6.1-rc.4',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          'c0a2ba6266c38cc9ea0a5cad181f9473bf691663242415396e95ed13dcf38611',
        'aarch64-unknown-linux-gnu':
          '9ef9ddfa399d2bfdce8563555fcb10a6c2b863660876c69d065f02034033f320',
        'x86_64-pc-windows-msvc.exe':
          'f3e88f844b96fbd39ad8ef991a473987c1ad09885ce407b76897162920bbb751',
        'x86_64-apple-darwin': 'b89370b154a6c4fe0c1b2986469f1f1bf730b0df01fbb92461d474449a483fe3',
        'aarch64-apple-darwin': '5a2cd7f45b03177dd33901872d0ea012b7973085e348242dae86929d1577cfea',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '82f725ef8b22109452661903e2b76d07ea7a4e7472b53bc8990cb245d9cda03a',
        'aarch64-unknown-linux-gnu':
          'e021ca9aa01f63a812800a8a35f8bce7d40500944870dc9cc520f69fbe5dfa55',
        'x86_64-pc-windows-msvc.exe':
          'd7ad70c04d3f0503d0351b76ca2e7618dc6002c9e6d677214a36047e1664a73b',
        'x86_64-apple-darwin': '58521bff58d82dcc996a4da7173c8b3786ae30a7f4c8e1877e132fcbb043f499',
        'aarch64-apple-darwin': 'f78b2e44e9b9269049ef301bf6484290ee9cf6c5c9a1985bdc7df3b91fd2f9f2',
      },
    },
  },
});
