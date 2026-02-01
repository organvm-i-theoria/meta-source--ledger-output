/**
 * Ledger Types - Phase 5 blockchain perpetuity types
 */

/** Universal state stored on-chain */
export interface UniversalState {
  seed: bigint;
  activeCipherId: number;
  chaosLevel: number;
  globalHarmonics: number[];
  blockNumber: bigint;
  timestamp: bigint;
}

/** Waterfall event emitted on pulse */
export interface WaterfallEvent {
  blockNumber: bigint;
  previousSeed: bigint;
  newSeed: bigint;
  activeCipherId: number;
  chaosLevel: number;
  timestamp: bigint;
}

/** Manifest NFT metadata */
export interface ManifestMetadata {
  tokenId: bigint;
  blockNumber: bigint;
  seed: bigint;
  minter: string;
  timestamp: bigint;
  visual?: string; // IPFS hash or data URI
}

/** Pulse transaction result */
export interface PulseResult {
  success: boolean;
  blockNumber: bigint;
  newState: UniversalState;
  waterfallEvent: WaterfallEvent;
}
