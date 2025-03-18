import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.kangaroo-electron2',
  productName: 'Holochain Kangaroo Electron2',
  version: '0.1.0',
  macOSCodeSigning: false,
  windowsEVCodeSigning: false,
  fallbackToIndexHtml: true,
  autoUpdates: true,
  systray: true,
  passwordMode: 'password-optional',
  bins: {
    holochain: {
      version: '0.4.1',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'ee713408a31d2e17826b18e2eaea0b3e200b42aa0cc8e3562c899b0b5ebcaa0c',
        'x86_64-pc-windows-msvc.exe':
          '9aa248f6e500915085ebf3fd093541cbbdad59a994e7f904260cb4ad788bd1e3',
        'x86_64-apple-darwin': '0ce19dfde7db6521cd96e2fef924c62d319d204e7f79bc0379674a7a6122c74f',
        'aarch64-apple-darwin': '74dc8d8529a50d24e8338ddd2e9913d6fb34414f6588d11243e6ccb29feda029',
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
