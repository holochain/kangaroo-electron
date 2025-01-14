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
  bins: {
    holochain: {
      version: '0.4.1-rc.0',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '45b36583aa66984f949e8e3bba9673075c3d21989bfe715aa54ea2e9877389c1',
        'x86_64-pc-windows-msvc.exe':
          'f7d0ae85efac4b1101f7d208e9f86347bf0af0f972fa839eb4f008757fb86b7b',
        'x86_64-apple-darwin': '7852e3d7ec2799eca4e0495ba6a36d19c7d0e2bc107da349b64b188b7655cd01',
        'aarch64-apple-darwin': '92b376a6cb49c0f68c30f26192221355b3c4f7ea1f9fbbdf0d3584f8e1c1880f',
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
