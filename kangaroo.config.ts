import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.kangaroo-electron',
  productName: 'Holochain Kangaroo Electron',
  version: '0.1.0',
  macOSCodeSigning: false,
  windowsEVCodeSigning: false,
  fallbackToIndexHtml: true,
  bins: {
    holochain: {
      version: '0.4.0-rc.2',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '7110f9b0c9c2b4bbc974543df1b633299c7fa8d3d16f3cde4dc894ac64c0670f',
        'x86_64-pc-windows-msvc.exe':
          '959fca4b575c6791196fcd1fb9c6c7a92359191dbd60e95b7800c6e79bb21687',
        'x86_64-apple-darwin': 'a62d1b6413f2791ec4df87338d794a7ba29a0890f1a2ceb1ed9eeddb0efc94a7',
        'aarch64-apple-darwin': 'f25bee4cb2615b1970a8ef89c82dcfb867682a3502962343d4842571aafb9bc3',
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
