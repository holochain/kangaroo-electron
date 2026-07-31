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
  bootstrapUrl: 'https://dev-test-bootstrap2.holochain.org/',
  relayUrl: 'https://dev-test-bootstrap2.holochain.org/',
  bins: {
    holochainVersion: '0.7.0',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          'ffa40a0c6fab5ce062c4af76328dfe2de143256ddf791a504d72bca698a9ba20',
        'aarch64-unknown-linux-gnu':
          'a01a6b0be4a6fa52276fb0aca94559a05457bbad495bdd01802208d3f3649e51',
        'x86_64-pc-windows-msvc.exe':
          '5d9bd8cf28c45645158d56198cfec38d04ac4cf620ba89ca37db2f7c46d7b3d2',
        'x86_64-apple-darwin': '53d48d0f92fdfb2d70cd302a3782df142ab324c023943319d2c33226a79dea0c',
        'aarch64-apple-darwin': 'fa44e56402294221cad34933bfe12e079460aa22acf98723f5b4e68e3e33cc3b',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '7a77822ab5e0020d0f3c358030d4ccfa8c6c144407a5c075d302c7b0fcf670c1',
        'aarch64-unknown-linux-gnu':
          'efb5894d76ee8d58845445e1b6a3ff18d721345943e545457331825fb799b08c',
        'x86_64-pc-windows-msvc.exe':
          '2c1fded6eb7c6ec4b3d033c6a310d7c2cc916d6e0ac10c2f71047ebb6b623f6b',
        'x86_64-apple-darwin': 'afcaefac4f93828e59566f185d7398b7d5d7afaa43ef4b95bd9c42f0b967d7b8',
        'aarch64-apple-darwin': 'e8fcdf26c0b1a51e5ab93a82333b5db92f0a8a6effb8494fdbb0dc000856ded8',
      },
    },
  },
});
