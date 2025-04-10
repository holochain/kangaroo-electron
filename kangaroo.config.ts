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
      version: '0.5.0-rc.1',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'ec988f05566f41e61b65b1cde20f99a1805dd09c02cd538820793b00149abc33',
        'x86_64-pc-windows-msvc.exe':
          '86835bc32413b71eae79a2fffe2d619255266459fb7ac9eea7826196a07eb982',
        'x86_64-apple-darwin': '23fc7cca30f50d2e4845246c28131485e63ce866ea445201041525204311bb8b',
        'aarch64-apple-darwin': '022fabefe5862c4415b15085ca48e34b13c71f93b66a49f0d9bf177489a5289b',
      },
    },
    lair: {
      version: '0.6.1',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'c5d5d912af41f17def1c9d1027abd8eb6ce6f088871f4347ed38e124a93023cc',
        'x86_64-pc-windows-msvc.exe':
          'e11a0658c2d5a3c00409ea447241b3f1f3a215d70fa396b8a3ed633226f0a11f',
        'x86_64-apple-darwin': 'fed0e9c3fc32589031229fb177ef3b3324e0096e742802898976812174bdd12d',
        'aarch64-apple-darwin': 'dd36c33e495b8046501f0824fbc08f069973cab5ee210275ab9de3af932d79e8',
      },
    },
  },
});
