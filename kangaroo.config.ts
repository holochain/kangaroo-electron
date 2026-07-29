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
    holochainVersion: '0.7.0-rc.5',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          'd04c0bb63b704c2977960ec4ee247246c1d1a795fafbdeb669fed557863c2b99',
        'aarch64-unknown-linux-gnu':
          'a3f43992a5705fdcb1e15ee757b99f28177a09c51348fa246c683a29361c66a6',
        'x86_64-pc-windows-msvc.exe':
          '45ed158070ae52a107811c28cf12623831ff8b12b65fd7076fd6626e1df61c8f',
        'x86_64-apple-darwin': '1f4a13840090720f0d626799cc297b9b1ff0c347f4d39f5233cb13de04fecbe1',
        'aarch64-apple-darwin': '6ff03513fe759aa2a62b9041e0b36f2e0e9425b1d7d606fd86b58aae0ec1624b',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '94dd9de3d9a77b0806f2f8f586f726f96cace319568fc8ec2930b8d3e84abac2',
        'aarch64-unknown-linux-gnu':
          '5ca630cafa3a9c5e85fcd3b2a7bde5a22f89c67515e8d9014ea13c13771b690f',
        'x86_64-pc-windows-msvc.exe':
          'ddb5cf1bb9569e0aafdb04fbc7717622f6e2b7867fb110207e9f2c16b0cfa152',
        'x86_64-apple-darwin': '4df6b5e038cf01cdab32e643e1e5d439191712fb90d062ac21a0a719e9b7937b',
        'aarch64-apple-darwin': 'e6098b3344d59002e8c9675e442569fdd7705b67613b68bb3b7f5e10cdfb16c9',
      },
    },
  },
});
