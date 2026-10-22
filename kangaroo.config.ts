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
    holochainVersion: '0.7.1',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '0c14700874349c8417c4bfebfe845e7ab036757442e4388e50dd622bb3c89974',
        'aarch64-unknown-linux-gnu':
          'dcf9ad7f90ae32b2a3dab6b6bae560760403c5bba94d7c02da608930c42cb2fa',
        'x86_64-pc-windows-msvc.exe':
          '59261119a3ad3e51cd33d996be3110d39a5c4d1cc7c34c173a28efec137bb5b1',
        'x86_64-apple-darwin': '9fcbcb770ef7d60bd6c6a8ca94a4a715ffd24d8b4daf43fb1b76a162b0493a40',
        'aarch64-apple-darwin': '5a2a4b1db5e2aa2cfa6b2b480c12633de92a20850852a2c58a97721a19771ad6',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '87c7a02556d47d950f0d4284bfdb4e37737b0bc98afe038955817793606d669a',
        'aarch64-unknown-linux-gnu':
          '69a96c3b06eec29a288f04ecf0210bb281697423a3ee10bc393ceea0d712c823',
        'x86_64-pc-windows-msvc.exe':
          '16750b08e5ddd50a04f493142bc85b33cc6bfaf0ef7c7fe9cb215129787a923f',
        'x86_64-apple-darwin': '34a40c1b4324801db1c028dafaf82ea3276c808971c6ad1830fcf445e6f35419',
        'aarch64-apple-darwin': '1e074d8587b8bc2125d9a379a443c27363b8e60955cad5faa8638d653dd19289',
      },
    },
  },
});
