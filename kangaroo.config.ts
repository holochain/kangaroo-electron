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
  bootstrapUrl: 'https://dev-test-bootstrap2-iroh.holochain.org/',
  relayUrl: 'https://dev-test-bootstrap2-iroh.holochain.org/',
  signalUrl: 'wss://dev-test-bootstrap2.holochain.org/',
  iceUrls: ['stun:stun.cloudflare.com:3478', 'stun:stun.l.google.com:19302'],
  bins: {
    holochainVersion: '0.7.0-dev.23',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '551591374ef46987873213d6c5e7471b85b0277a4087ded6fe37550841178348',
        'aarch64-unknown-linux-gnu':
          'd958e00a1c13dec2042670f1864d9c2ddadd3081434b0d62d4af5972b9a14d3c',
        'x86_64-pc-windows-msvc.exe':
          '353baacef121fa36b1c6e6ebd22d999f3f5402e3314a4ab351f4752cf1dbb10b',
        'x86_64-apple-darwin': '82f2f88fdff9113c5b3633a7f2d6bd13ea6a68ca830bc905614214785469f873',
        'aarch64-apple-darwin': '2f64b4a0bba3675def5fbf5dfdaf85c4dd99a4ec85c526a44b074a625d05de32',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          'cc62d387f37ab784a843c673a60926a1727ec30f67d7878c7fa3b260a86635e3',
        'aarch64-unknown-linux-gnu':
          '3cc0b0a75b611bc0802a2450221781157cafc4a4dc409d9712b6e1e8eba5dcae',
        'x86_64-pc-windows-msvc.exe':
          'ee3e06819e36ad672e5a37e6eb4b114c4899bf9bce416c71720afc88add789f6',
        'x86_64-apple-darwin': '3a62a36f0ebcfa4b8eb2faa79c6f0d30e6173d25126f3ae21b542935d10cf256',
        'aarch64-apple-darwin': '19bf01a6cbf1341bd69dc5876921b948f9f05cee8364f8e6e0a56fac52acdd8e',
      },
    },
  },
});
