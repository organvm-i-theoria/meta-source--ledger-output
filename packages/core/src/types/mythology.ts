/**
 * Mythology Types - 4444jPP governance system types
 */

/** BLOCK-HINGE-POSTS token decomposition */
export interface MythologyToken {
  raw: string;
  block: string;
  hinge: string;
  posts: string;
  hash: string;
}

/** Numerological stack from token components */
export interface NumerologicalStack {
  core: number;
  engine: number;
  interface: number;
  signature: string;
}

/** Four As governance domains */
export type FourAsDomain = 'auctor' | 'ars' | 'archive' | 'apparatus';

/** Four As framework state */
export interface FourAsState {
  active: Record<FourAsDomain, boolean>;
  focus: FourAsDomain | null;
  auctorVision?: string;
  arsTools?: string[];
  archiveRefs?: string[];
  apparatusStatus?: string;
}

/** Mythology configuration bundle */
export interface MythologyConfig {
  token: MythologyToken; // allow-secret (mythology token, not credential)
  stack: NumerologicalStack;
  fourAs: FourAsState;
  masterSeed: string;
}

/** Phi operators */
export type PhiOperator =
  | 'phi_plus'
  | 'phi_minus'
  | 'phi_approx'
  | 'phi_recal'
  | 'phi_recurse'
  | 'phi_blend'
  | 'phi_invert'
  | 'phi_project'
  | 'phi_retro'
  | 'phi_parallel'
  | 'phi_focus'
  | 'phi_cycle'
  | 'phi_liminal';

/** Decision question for 4-7-6 matrix */
export interface DecisionQuestion {
  filter: 'core' | 'engine' | 'interface';
  question: string;
  answer?: boolean;
}

/** Decision result with recommendation */
export interface DecisionResult {
  score: number;
  recommendation: 'proceed_confident' | 'proceed_monitor' | 'proceed_caution' | 'reconsider';
  failedFilters: Array<'core' | 'engine' | 'interface'>;
  feedback: string;
}
