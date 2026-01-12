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
    holochainFeature: 'iroh',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '8cbbdf96f65d502aa827ff8c5f813a1599d4b7220c0a320f8a652fc4fdcbb086',
        'aarch64-unknown-linux-gnu':
          '54cda827ef805b57b20e97d8f55ea64cae96583387a976a5bce3bc5f022a32fe',
        'x86_64-pc-windows-msvc.exe':
          'fc597e43dfbe8dfb907adaf23a3f6ee2204fc11718bb9cb15e055ced5d894de7',
        'x86_64-apple-darwin': '252109620eba91bd29cd64610e53fbf789f5967becef4f087ca049f4b20e0a3d',
        'aarch64-apple-darwin': '98396bae8f227c63e4b83d32dd9d0a017e2aac5f4082f1ad646b4a20255913be',
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
