import { defineConfig } from "./src/main/defineConfig";

export default defineConfig({
  appId: "org.holochain.kangaroo-electron",
  productName: "Holochain Kangaroo Electron",
  version: "0.1.1",
  macOSCodeSigning: false,
  windowsEVCodeSigning: false,
  fallbackToIndexHtml: true,
  autoUpdates: true,
  bins: {
    holochain: {
      version: "0.3.3",
      sha256: {
        "x86_64-unknown-linux-gnu":
          "889f517e5353287e6656b9516582ae806194eddaae86e2a546afcb8007c6adc1",
        "x86_64-pc-windows-msvc.exe":
          "d8702733568791e4e42afaa6bb49b9a992fc0874498fe87b818c64d5e9848e6a",
        "x86_64-apple-darwin":
          "b5444f43056abf545176dcea724afe43790d5531e5d1ecde4425d3ecabbcb24c",
        "aarch64-apple-darwin":
          "93ddcc2beb19e13dd3789b322bba5dcaa9cefd52cd60f1505a764a090673c993",
      },
    },
    lair: {
      version: "0.4.5",
      sha256: {
        "x86_64-unknown-linux-gnu":
          "67b5a8d06575fc14c6295fec05cd2dcd338de76a051ceac6dd7b03e921ee1762",
        "x86_64-pc-windows-msvc.exe":
          "77cb4e51a9816048520a30293760214483a0a372ab554ad496955167e6009c99",
        "x86_64-apple-darwin":
          "60c81104bbaa37e69749a7f53b079d06414d07418a1514a3c676503ce2861c4a",
        "aarch64-apple-darwin":
          "f6e427557271d13ab32bdd8672f0408b8b248117840adc64c858d55a6ae56583",
      },
    },
  },
});
