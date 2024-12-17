import { EventEmitter } from 'events';

export type LAIR_ERROR = 'lair-error';
export const LAIR_ERROR = 'lair-error';
export type LAIR_FATAL_PANIC = 'lair-fatal-panic';
export const LAIR_FATAL_PANIC = 'lair-fatal-panic';
export type LAIR_LOG = 'lair-log';
export const LAIR_LOG = 'lair-log';
export type LAIR_READY = 'lair-ready';
export const LAIR_READY = 'lair-ready';
export type HOLOCHAIN_ERROR = 'holochain-error';
export const HOLOCHAIN_ERROR = 'holochain-error';
export type HOLOCHAIN_FATAL_PANIC = 'holochain-fatal-panic';
export const HOLOCHAIN_FATAL_PANIC = 'holochain-fatal-panic';
export type HOLOCHAIN_LOG = 'holochain-log';
export const HOLOCHAIN_LOG = 'holochain-log';
export type KANGAROO_ERROR = 'kangaroo-error';
export const KANGAROO_ERROR = 'kangaroo-error';
export type KANGAROO_LOG = 'kangaroo-log';
export const KANGAROO_LOG = 'kangaroo-log';
export type WASM_LOG = 'wasm-log';
export const WASM_LOG = 'wasm-log';
export type WRONG_PASSWORD = 'wrong-password';
export const WRONG_PASSWORD = 'wrong-password';
export type HAPP_INSTALLED = 'happ-installed';
export const HAPP_INSTALLED = 'happ-installed';

export declare interface WeEmitter {
  on(
    event:
      | LAIR_ERROR
      | LAIR_FATAL_PANIC
      | LAIR_LOG
      | LAIR_READY
      | WRONG_PASSWORD
      | HOLOCHAIN_ERROR
      | HOLOCHAIN_FATAL_PANIC
      | HOLOCHAIN_LOG
      | KANGAROO_ERROR
      | KANGAROO_LOG
      | WASM_LOG
      | HAPP_INSTALLED
      | string, // arbitrary string, e.g. a one-time event with a unique id
    listener: (event: HolochainData | string | Error) => void
  ): this;
}

export class KangarooEmitter extends EventEmitter {
  emitLairError(error: string) {
    this.emit(LAIR_ERROR, error);
  }
  emitLairFatalPanic(panic: string) {
    this.emit(LAIR_FATAL_PANIC, panic);
  }
  emitLairLog(log: string) {
    this.emit(LAIR_LOG, log);
  }
  emitLairReady(url: string) {
    this.emit(LAIR_READY, url);
  }
  emitKangarooError(error: string) {
    this.emit(KANGAROO_ERROR, error);
  }
  emitKangarooLog(log: string) {
    this.emit(KANGAROO_LOG, log);
  }
  emitWrongPassword() {
    this.emit(WRONG_PASSWORD);
  }
  emitHolochainError(error: HolochainData) {
    this.emit(HOLOCHAIN_ERROR, error);
  }
  emitHolochainFatalPanic(panic: HolochainData) {
    this.emit(HOLOCHAIN_FATAL_PANIC, panic);
  }
  emitHolochainLog(log: HolochainData) {
    this.emit(HOLOCHAIN_LOG, log);
  }
  emitWasmLog(log: HolochainData) {
    this.emit(WASM_LOG, log);
  }
  emitHappInstalled() {
    this.emit(HAPP_INSTALLED);
  }
}

export type HolochainVersion = string;

export interface HolochainData {
  version: HolochainVersion;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}
