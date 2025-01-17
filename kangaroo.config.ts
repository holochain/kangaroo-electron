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
      version: '0.4.1-rc.1',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '3713dfdc125087a09030409885ec241c027e1148e35a8fa696a5f815754f3312',
        'x86_64-pc-windows-msvc.exe':
          'c04dcca7609312b757500e59e74b614aca8d46ec43f35a188cd19aa706e5ad8a',
        'x86_64-apple-darwin': 'a8fdef959b061510697b9acc926db7ee3fd59a60e7a117dcdc21854cf0d52634',
        'aarch64-apple-darwin': 'd946a6a63a74eade501a4e8fc5688d25d51462a7cfcfe56bfa78d3d2199e82c2',
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
