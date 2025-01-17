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
      version: '0.4.1-rc.1',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'c20ada573375a4cda60e117df3303954bc48b4b55dfd03a7e6c4eb33d8a4a4fc',
        'x86_64-pc-windows-msvc.exe':
          '3d5225093af376cef42931f57566d6d60742d8f9fa558bc4e2f6a9b2e6f883fe',
        'x86_64-apple-darwin': 'e31ac19e677cf16c3257fdcfe8504d53758a62cb52359d9e6310170bf3dfea77',
        'aarch64-apple-darwin': 'faf9618167fa6da97d01c005fa6fe7b24966214364d5f02fc0c88408a4dcc35b',
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
