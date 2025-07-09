import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.kangaroo-electron',
  productName: 'Holochain Kangaroo Electron',
  version: '0.2.5',
  macOSCodeSigning: true,
  windowsEVCodeSigning: true,
  fallbackToIndexHtml: true,
  autoUpdates: true,
  systray: true,
  passwordMode: 'password-optional',
  webhapp: {
    url: "https://github.com/holochain/ziptest/releases/download/ziptest-v0.1.0/ziptest.webhapp",
    sha256: "e2be7667ef9c6a81e9169605d249d21a54862276c6ecf19d6396d60ae738ddc7"
  },
  bins: {
    holochain: {
      version: '0.4.4-rc.0',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '8dc3dc4f8aafc32cbd3706840fa81a7bc5dad9a0370c8ae6552246d5b2a6b904',
        'x86_64-pc-windows-msvc.exe':
          '160bcd0c25a7fc8d147aded376d152667655bc935700e9a1577ac409a7e46943',
        'x86_64-apple-darwin': '726844fc91bcd7da17b28659e9c19930d7ed2fa6960b5e68a464b6a22060bcb1',
        'aarch64-apple-darwin': '9f6bb39a86c1ebc05e10790f6af4d9a548f98cf2dde2dbe82b37661d5dd47880',
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
