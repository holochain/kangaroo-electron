import { KANGAROO_CONFIG } from './const';
import { breakingAppVersion } from './filesystem';
import { app } from 'electron';

export interface CliOpts {
  profile?: string;
  networkSeed?: string | undefined;
  holochainPath?: string | undefined;
  lairPath?: string | undefined;
  holochainRustLog?: string | undefined;
  holochainWasmLog?: string | undefined;
  lairRustLog?: string | undefined;
  bootstrapUrl?: string;
  signalingUrl?: string;
  iceUrls?: string;
  printHolochainLogs?: boolean;
}

export interface RunOptions {
  profile: string | undefined;
  networkSeed: string;
  bootstrapUrl: string | undefined;
  signalingUrl: string | undefined;
  iceUrls: string[] | undefined;
  customHolochainBinary: string | undefined;
  customLairBinary: string | undefined;
  holochainRustLog: string | undefined;
  holochainWasmLog: string | undefined;
  lairRustLog: string | undefined;
  printHolochainLogs: boolean;
}

export function validateArgs(args: CliOpts): RunOptions {
  // validate --profile argument
  const allowedProfilePattern = /^[0-9a-zA-Z-]+$/;
  if (args.profile && !allowedProfilePattern.test(args.profile)) {
    throw new Error(
      `The --profile argument may only contain digits (0-9), letters (a-z,A-Z) and dashes (-) but got '${args.profile}'`,
    );
  }
  if (args.networkSeed && typeof args.networkSeed !== 'string') {
    throw new Error('The --network-seed argument must be of type string.');
  }
  if (args.bootstrapUrl && typeof args.bootstrapUrl !== 'string') {
    throw new Error('The --bootstrap-url argument must be of type string.');
  }
  if (args.signalingUrl && typeof args.signalingUrl !== 'string') {
    throw new Error('The --signaling-url argument must be of type string.');
  }
  console.log("ICE URLS arg: ", args.iceUrls);
  console.log("ICE URLS arg type: ", typeof args.iceUrls);
  if (args.iceUrls && typeof args.iceUrls !== 'string') {
    throw new Error('The --ice-urls argument must be of type string.');
  }
  if (args.holochainPath && typeof args.holochainPath !== 'string') {
    throw new Error('The --holochain-path argument must be of type string.');
  }
  if (args.lairPath && typeof args.lairPath !== 'string') {
    throw new Error('The --lair-path argument must be of type string.');
  }
  if (args.holochainRustLog && typeof args.holochainRustLog !== 'string') {
    throw new Error('The --holochain-rust-log argument must be of type string.');
  }
  if (args.holochainWasmLog && typeof args.holochainWasmLog !== 'string') {
    throw new Error('The --holochain-wasm-log argument must be of type string.');
  }
  if (args.lairRustLog && typeof args.lairRustLog !== 'string') {
    throw new Error('The --lair-rust-log argument must be of type string.');
  }

  const profile = args.profile ? args.profile : undefined;
  // If provided take the one provided, otherwise check whether it's applet dev mode
  const networkSeed = args.networkSeed
    ? args.networkSeed
    : defaultAppNetworkSeed();

  return {
    profile,
    networkSeed,
    bootstrapUrl: args.bootstrapUrl,
    signalingUrl: args.signalingUrl,
    iceUrls: args.iceUrls ? args.iceUrls.split(',') : undefined,
    customHolochainBinary: args.holochainPath ? args.holochainPath : undefined,
    customLairBinary: args.lairPath ? args.lairPath : undefined,
    holochainRustLog: args.holochainRustLog ? args.holochainRustLog : undefined,
    holochainWasmLog: args.holochainWasmLog ? args.holochainWasmLog : undefined,
    lairRustLog: args.lairRustLog ? args.lairRustLog : undefined,
    printHolochainLogs: args.printHolochainLogs ? true : false,
  };
}

function defaultAppNetworkSeed() {
  let networkSeed = `${KANGAROO_CONFIG.productName}-${breakingAppVersion(app)}`;
  if (!app.isPackaged) {
    networkSeed += "-dev";
  }
  return networkSeed;
}