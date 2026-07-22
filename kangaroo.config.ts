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
  relayUrl: 'https://dev-test-bootstrap2.holochain.org/',
  bins: {
    holochainVersion: '0.7.0-rc.1',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          'c4538d7b0e7f15053096967c4f779c84d214aaff814b62a77852cd0fbde108e5',
        'aarch64-unknown-linux-gnu':
          'f541f7b46332affabb1fdd53f9c9797586418782a021d293fb69f06fc0dacee3',
        'x86_64-pc-windows-msvc.exe':
          '82b87ecd87247db793b2971a5fc8a601def0a1d4827c74af9be893b978b794dc',
        'x86_64-apple-darwin': 'af2f64fb8711a3ebf86e288f47f26f3fb1ede08c6324bffff0341e4541e5ad1d',
        'aarch64-apple-darwin': 'd5454db7e2c3283cf753fc3d60f29e81103e1ccbc46ccdd5c4c734cfaeb3f935',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          'ac03e332adf4c08526ac24866931d9ce419b6512bcae76a5e38c36e7eeba1340',
        'aarch64-unknown-linux-gnu':
          '110581a12c5d46429fdc20f6999e1563d6dc1d32406afa2dc7c0c5d400798fa5',
        'x86_64-pc-windows-msvc.exe':
          'b09b859cdda1566a3524ab1ab467f6e94a16d1bc304d30546a705c3dca5a90b6',
        'x86_64-apple-darwin': '5de8ccf27d95a7bdf91860df09dd480c91826ec0b8e6ba2c47dc237cee221979',
        'aarch64-apple-darwin': 'ad44c70b0e13f8b33632e3e441bff225507c4ff0720bbfa465d9bf7e2e9c9e20',
      },
    },
  },
});
