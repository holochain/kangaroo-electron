import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.kangaroo-electron',
  productName: 'Holochain Kangaroo Electron',
  version: '0.1.0',
  macOSCodeSigning: false,
  windowsEVCodeSigning: false,
  fallbackToIndexHtml: true,
  autoUpdates: true,
  passwordMode: 'password-optional',
  bins: {
    holochain: {
      version: '0.4.0',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'f2e5d5c5c90a0c5eb85641bd8ab207396ddbbc304aaa51982dfde24037a0d0a9',
        'x86_64-pc-windows-msvc.exe':
          '9b893527d1f4c1e69fa3c9fbd605987065087ca15ebc72bbe598edef9ab5b27a',
        'x86_64-apple-darwin': '9d8e4996dd86441ec859faf9fa90c31bdfaddd49d5079bf67492d9c93d17c503',
        'aarch64-apple-darwin': '1d206d09ddf90c85b781457514df3c87d8c7e38a6dab4e53f01a8f089acfa3d1',
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
