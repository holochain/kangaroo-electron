import { defineConfig } from "./src/main/defineConfig";

export default defineConfig({
  appId: "org.holochain.kangaroo-electron",
  productName: "Holochain Kangaroo Electron",
  version: "0.1.0",
  macOSCodeSigning: false,
  windowsEVCodeSigning: false,
  fallbackToIndexHtml: true,
  bins: {
    holochain: {
      version: "0.4.0-rc.1",
      sha256: {
        "x86_64-unknown-linux-gnu":
          "6e111ff588628c8da0b64340a0e2fa9291146c5033b21102ce115fbecf8aa36c",
        "x86_64-pc-windows-msvc.exe":
          "4268aac469304cd1b6bb6a90631a3a018e6f08a236088e7a7045a9969ba4458f",
        "x86_64-apple-darwin":
          "b377612a817310dc4f747662003e68b96b9058d22464d28db8b807cbe7d6704d",
        "aarch64-apple-darwin":
          "23b60ae414b1525a41aabcd213b29922cc4f581f3d748750393357847b10f3fb",
      },
    },
    lair: {
      version: "0.5.2",
      sha256: {
        "x86_64-unknown-linux-gnu":
          "5fa1b2ece8896208c313c01b531d99d861e156de8f2d2ddc2709a82bc2533550",
        "x86_64-pc-windows-msvc.exe":
          "42a4a6eaf3cd1cb52bdc6512b392e874467bc6d7f5763b89a303767a9d979ad9",
        "x86_64-apple-darwin":
          "22cadfb73435ce0c97e6581123b4fc3fe9ff0a5ef5b04eed3b4895a84f5cbb79",
        "aarch64-apple-darwin":
          "246bb1090e9e875babe056df413f75ad8dd1ba4971f293dd5e94ea05ea364aa0",
      },
    },
  },
});
