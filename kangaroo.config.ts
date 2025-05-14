import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.kangaroo-electron',
  productName: 'Holochain Kangaroo Electron',
  version: '0.2.4',
  macOSCodeSigning: false,
  windowsEVCodeSigning: false,
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
      version: '0.4.3-rc.0',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '6a1d177229a31de95bedd91ee83c82ffe16d2f8ef4d46e452bf188bd61155b33',
        'x86_64-pc-windows-msvc.exe':
          '02dbabac490f6f3ab7bcaedf1de8ad9382d757a9879149fbd4a11ca782357d14',
        'x86_64-apple-darwin': '0235ee1075a996ded4bed36f82553507ceb92425d6be502453972619a330804a',
        'aarch64-apple-darwin': 'fcdb7dcdceb74c11a93df513a412d3f9401596bbb9074dd4765a2be05a1be809',
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
