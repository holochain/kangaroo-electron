import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.kangaroo-electron',
  productName: 'Holochain Kangaroo Electron',
  version: "0.3.0-rc.1",
  macOSCodeSigning: false,
  windowsEVCodeSigning: false,
  fallbackToIndexHtml: true,
  autoUpdates: true,
  systray: true,
  passwordMode: 'password-optional',
  webhapp: {
    url: 'https://github.com/holochain/ziptest/releases/download/ziptest-v0.2.1/ziptest.webhapp',
    sha256: '447332e383074d6a36328f158160679dba7dcf1e6096ce635f3ace7ec35493b3',
  },
  bins: {
    holochain: {
      version: '0.5.0-rc.3',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '0526620ebcee757e259bde386553fd064c1584b37045883c387980768042f70f',
        'x86_64-pc-windows-msvc.exe':
          '82311f0f3183c3eef0f50902e43b2412e18789e54cd4e64cf852752c727dc204',
        'x86_64-apple-darwin': '22ec15728b903e53562850a438a0efc638457605e01f256f0985517f55182ccf',
        'aarch64-apple-darwin': '8cce24ed85cf54d89f7cd0e0d5268dfa3795de0057566ddd9b7de35cf576df33',
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
