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
    holochainVersion: '0.6.0',
    holochainFeature: "go-pion",
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '8ae1282b93bcba7eaee1343831895dd3b8628d4fd8ebc5fad74def3e073e6055',
        'aarch64-unknown-linux-gnu':
          '9e5e8d81625201f7146d42e628b563e6db4be1b866dc06e053266cb971e4c952',
        'x86_64-pc-windows-msvc.exe':
          '9f838ab57b277e895b949cfec5c8a88c36d5936cce2e902706f92133d8029e77',
        'x86_64-apple-darwin': 'd927ae095e5dbc683ae47cca336a220529f7b705d77d456cb7e4a3f2fec56adc',
        'aarch64-apple-darwin': '0fcb1b7080496368438576b59a360a68bfa5c077ec8c83d6b5fd3d12b63b9e21',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '19bde044278161948958c8b32d9bc0744550eccd6d29260da0045fc8c0480ccd',
        'aarch64-unknown-linux-gnu':
          '2f4d084bb4904be8669bceb63516e5db201deee97294ba01c94ab62ba9ee8c02',
        'x86_64-pc-windows-msvc.exe':
          'b7b29197e028f807924c1f31cd6a332af63fd3c21d8fd563ba3c0a16f7197499',
        'x86_64-apple-darwin': '030ae46320780b53db5a8047df534da4fd1e5d8900e7864b965b1243b2dfcb40',
        'aarch64-apple-darwin': '4ae31f48ea92c7b6f472c2f57535f5c427918bf1876ab75b89673e0b242aaa1c',
      },
    },
  },
});
