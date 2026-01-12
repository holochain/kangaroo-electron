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
    holochainVersion: '0.7.0-dev.6',
    holochainFeature: 'go-pion',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '55da5ab99c69bfad860e3e3c9f52cd348827828f59d86676569b953b081dd6d2',
        'aarch64-unknown-linux-gnu':
          '60b61b77d0b89855a51699f52239d2deae9e3c06041d16bfdec2ed42239f67f6',
        'x86_64-pc-windows-msvc.exe':
          'e05e84e1f366fa126c1bf2959227806d21db36e706edfa460ad9cfbeb8a38478',
        'x86_64-apple-darwin': 'cfc7bc3d0cdcba26b4e2ecbc86a51f41abad056d0ff49fe49ff92157ec3c5e7d',
        'aarch64-apple-darwin': '890c3c1ff71e117b8f3cc6c2259b2bed5875efbaf28042e0e4749f0159f32766',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          'abd747b505a89ff19350c9f2f311e8c084e9efc5af4597469e36d2cc6560eca1',
        'aarch64-unknown-linux-gnu':
          '253a3575787223dfda147fac26047c979137886283f277f73456d8985797ed1f',
        'x86_64-pc-windows-msvc.exe':
          '7f273fcbd35e78d84d4bc5d23f1edd1ee3339b415b5cd69d328ada8ed02814be',
        'x86_64-apple-darwin': '14281be29b9a7eb3ba9f19aa66c07f9370ad39baf344d161122463d3a1c9b1cb',
        'aarch64-apple-darwin': '072c24de6e2fa8ae8f8fbda1cb3de0475f061913e8e388cfdd17a2d378069c7e',
      },
    },
  },
});
