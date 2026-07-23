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
    holochainVersion: '0.7.0-rc.3',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          'a4c1a05f3ff4455c3a2379e11fbe1c54b8ee910108f40df9f2c1b4143db1c1a4',
        'aarch64-unknown-linux-gnu':
          '017505f57739620aba727fa798e09305e199bf546ff4bf3f31d8acb6f0c4b65d',
        'x86_64-pc-windows-msvc.exe':
          '775f73ed53874ace5fd5c5329fbfa954f826d6477de67022e703336c0cfca008',
        'x86_64-apple-darwin': '5e7b9e64ca92bce4fa7dd3a014d71092eb8f1d74ca0f9f649f972c13632928b8',
        'aarch64-apple-darwin': '80a8d210467c3e3e5920377f7b044c10dd068a53c188d71e7f522e792dc375c0',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '034f4bb82b285f7cd4c7e799df06ad11a2c1c0be63de910de466ce9b61c703e5',
        'aarch64-unknown-linux-gnu':
          '656eda61c84cac1dfac0afe6e26719b166e72d69e0064bb2feda0d3990a495e4',
        'x86_64-pc-windows-msvc.exe':
          'c0f61942c9469560d9379ca40481f978a35b4d63fa5cd8233e26c64b626dfa46',
        'x86_64-apple-darwin': '562feb4a20a0f8e4ae7d02045c047c93ff82e3b71e5493343f92719acaa0bed0',
        'aarch64-apple-darwin': 'd48549b1b85e25485cc0374957165290ae06922e30dd8f163a96df32e9679102',
      },
    },
  },
});
