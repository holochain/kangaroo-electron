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
      version: '0.4.2-rc.1',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'df16f3eb4be09ce720996b4c11689408c635fd51d358a2e8ddefd601c3195bde',
        'x86_64-pc-windows-msvc.exe':
          'be1146216ef5ace20b020222dee33f136a65d313bcd95dd6bf8f51a663ba7c54',
        'x86_64-apple-darwin': 'da7daa4450e4cae29684a8d513042ad388dbf26b7b9a2b5a6c570e46fc3668ea',
        'aarch64-apple-darwin': '7f43c855a1244ecd29cc4d98bb7f209a561fd7480c1091e867335d4429e7c905',
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
