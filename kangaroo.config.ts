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
      version: '0.5.0-rc.0',
      sha256: {
        'x86_64-unknown-linux-gnu':
          'ebed39a335c0bac3680ff6fbca278ae96bf32208e4a5b48dbc33aedbcde4707f',
        'x86_64-pc-windows-msvc.exe':
          'afe9f55866cc6f77250cdff8b8eb5f92858a1912e445dd28604eb4255962006b',
        'x86_64-apple-darwin': '445f17d52a1896ee2575ddd4467a51ba4304fc6e943eeb1f5bb1434af91256ce',
        'aarch64-apple-darwin': 'c46ed1bb30e1efd5a6b5a5b34cbe27db7e375b2e1ef1e15b650e80c6b90c9991',
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
