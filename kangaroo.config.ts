import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.kangaroo-electron',
  productName: 'Holochain Kangaroo Electron',
  version: '0.2.1',
  macOSCodeSigning: false,
  windowsEVCodeSigning: false,
  fallbackToIndexHtml: true,
  autoUpdates: true,
  systray: true,
  passwordMode: 'password-optional',
  bins: {
    holochain: {
      version: '0.4.1-rc.2',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'b4d7f42f6e58b2b3d3e8f8cc977e6ef03e5c3a545b5e3b396f66a13609d9adfc',
        'x86_64-pc-windows-msvc.exe':
          'f346ed6c804afcd1ca6ea73c3d12daaabc36ed7526a71275e38365347eea138a',
        'x86_64-apple-darwin': '174a76224bf752a8186762e23d69009a4e0b313f610ade923724f1b82faeae1c',
        'aarch64-apple-darwin': '7eae1f18154832764b70784044a772fdd5f046306af9d2a11b7b64b1b6ccf310',
      },
    },
    lair: {
      version: '0.5.3',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '96a28b9b37c73ef46d8b5c56b9d799d558fd2fe77b41c577e2bcb37685a46396',
        'x86_64-pc-windows-msvc.exe':
          '68b6453a19921072aac04dae52a4e94e725e7482005d2f54f907aec680e078de',
        'x86_64-apple-darwin': 'a53bfb8e501431870b99243cbac24f6103d67f8be094930f174829bb249f34c4',
        'aarch64-apple-darwin': '6b15d977408847ac977c2e060c7aab84a69e6e90c79390098dd40a6b75256e50',
      },
    },
  },
});
