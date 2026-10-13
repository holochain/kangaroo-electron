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
    holochainVersion: '0.7.1-rc.2',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          'e6d178eee6e0082ea7bbb32c69b454c19196848932fca877b9c61e6787e90543',
        'aarch64-unknown-linux-gnu':
          'd2917feddf2620cc83c40c663139cfbc19ddff410cf44afaf5188efd9c8e399b',
        'x86_64-pc-windows-msvc.exe':
          'afcf16b49226c178c9e00584d52bd7ba7568f52a82722e1e21489845744bd16c',
        'x86_64-apple-darwin': '8cf2ff15bd3e91469a93472b3425782b52501eaa73f570e5a7d45fb1949122aa',
        'aarch64-apple-darwin': '1192d09ff9fd032f48537067e021fe1826911f20f30c21633834082359efd0f4',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '0fa6069131037cd27887049fcb6eaa3c94262b0ec1eb4b45b9f32059473b1569',
        'aarch64-unknown-linux-gnu':
          '1e6fd052be5194d45c97a918721939c5454d0616ca4439f9bdb5a15eb2a04a6e',
        'x86_64-pc-windows-msvc.exe':
          'c07851ba4339e7a985b4e8b0a9d18511362329f475f616bc620f5c85a73ba1a9',
        'x86_64-apple-darwin': 'e85d4a56f592b8f68c7606add9bdb18c833c818ae9efcfc234cc335942980c19',
        'aarch64-apple-darwin': '31e9d87ddce30b0dfccff1086e63dc8b605a122595c7eafb50073f175bbb2a43',
      },
    },
  },
});
