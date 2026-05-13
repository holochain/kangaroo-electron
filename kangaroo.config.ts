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
  signalUrl: 'wss://dev-test-bootstrap2.holochain.org/',
  relayUrl: "https://iroh-relay-hc.holochain.org/",
  iceUrls: ['stun:stun.cloudflare.com:3478', 'stun:stun.l.google.com:19302'],
  bins: {
    holochainVersion: '0.6.1',
    holochain: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '423f1111773c83c4c4f07e0bb338289d9bf0c5fa53dd31414b05b0dc8119ada7',
        'aarch64-unknown-linux-gnu':
          '263be8307257a08c46a1b7d547c26cd213a7ab986602498c15eccb2618107246',
        'x86_64-pc-windows-msvc.exe':
          '8bf0355d5ff203a91d981c210676300ac12e3aa2669a0f002e6e6ae3747fe747',
        'x86_64-apple-darwin': '12e6424578899d5fa8847b0e4be709848370277587b552e7520eebfb03f9b7d8',
        'aarch64-apple-darwin': 'cfff436e181b7afb1e86cd12bb5a337954493328229c79c1dc9db5a1519c7851',
      },
    },
    lair: {
      sha256: {
        'x86_64-unknown-linux-gnu':
          '4d13042d70803d9556bad5f2bfcd01e7daf33ee51ced16cd8d2377a321cceed0',
        'aarch64-unknown-linux-gnu':
          '014e8cf91ff60dcf15c835104a69c46ee8387a83662ba1083156e88c4c2877de',
        'x86_64-pc-windows-msvc.exe':
          '2bbb29415da515a3732cb8d3c51fcf933eb2c44605de2036b8671821b5a414a0',
        'x86_64-apple-darwin': '5ec0c1a70b96ccc625efcee3e23f9d054cadccee379101e179eebb225d7b19d7',
        'aarch64-apple-darwin': 'c3312988eb14fcb0ee0d6cba01e8a41601f48c7a69e03135cbd737d0d9ad774d',
      },
    },
  },
});
