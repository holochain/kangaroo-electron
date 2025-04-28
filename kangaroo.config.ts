import { defineConfig } from './src/main/defineConfig';

export default defineConfig({
  appId: 'org.holochain.kangaroo-electron',
  productName: 'Holochain Kangaroo Electron',
  version: '0.3.1',
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
      version: '0.5.2-rc.0',
      sha256: {
        'x86_64-unknown-linux-gnu':
          '074a73e4cde857b1246a2a478947a0c397ab9506823a723862fc9757d172ddac',
        'x86_64-pc-windows-msvc.exe':
          'ffa5e4450f7912e8898c3814041ca44874fc48ec033b92da45bea0aa39c3bf13',
        'x86_64-apple-darwin': '21e2ccdb3d6a3be10732c653fe49eb9e07bff7e22d76ee01de3fcc16c6a7f4e3',
        'aarch64-apple-darwin': '75533cb868b88b9976bd0d15d0ecf1047036c298b08572768a2fbe4589a4bec4',
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
