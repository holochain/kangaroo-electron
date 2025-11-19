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
    holochain: {
      version: '0.6.0',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'ba767ac0f65ab426d01e1c4131c63c33030e41a2b8c3da7e4bdcb5d30fa2284a',
        'x86_64-pc-windows-msvc.exe':
          '0ada079819a7ae8ea915c8319c104319a16634f0d4710a9a939d4e4109a87251',
        'x86_64-apple-darwin': '552529ca506db2f13eb6528f628df38f1f3fac6e0e552ee75ef846a66ca16bd2',
        'aarch64-apple-darwin': '139536e14638c7506aa6cb0816c7b5d170e71655f5590a3f458bf7bce9497515',
      },
    },
    lair: {
      version: '0.6.3',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '56beb19ca4abf39c8e2b90401a9ade10e5c395f6b95cd1853aac05643dce5a11',
        'x86_64-pc-windows-msvc.exe':
          '504e7e3d1afc4426990a4aee190f1137bb474ccb072f7049c23f43fc01c07009',
        'x86_64-apple-darwin': 'd7521a0299ea425700091b78e02672b05ad4c97c2ca82643ea9ba2349b0e1e69',
        'aarch64-apple-darwin': 'cb26b8065f52f7e3ff2d24a09100f60f61a3214e25e170ac2ef607dd040800d7',
      },
    },
  },
});
