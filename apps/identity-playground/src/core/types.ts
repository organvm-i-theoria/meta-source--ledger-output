export interface PersonalIdentity {
  id: string;
  name: string;
  birthdate: string; // ISO 8601 YYYY-MM-DD
  meaningfulWords: string[];
  created: Date;
  updated: Date;
}

export type NumerologySystem = 'pythagorean' | 'chaldean' | 'gematria';

export interface NumerologyProfile {
  system: NumerologySystem;
  destiny: number;      // Derived from full name
  lifePath: number;     // Derived from birthdate
  soulUrge: number;     // Derived from vowels
  personality: number;  // Derived from consonants
  expression: number;   // Synonymous with Destiny in some systems, keeping for completeness
  rawSum: number;       // Unreduced sum
  isMasterNumber: boolean; // 11, 22, 33
}

export interface VisualConfig {
  mode: '2d' | '3d';
  width: number;
  height: number;
  pointCount: number;
  colorPrimary: string; // Hex
  animationSpeed: number; // 0.1 to 2.0
  seed: number;
}

export interface GeneratedOutput {
    id: string;
    identityId: string;
    timestamp: Date;
    config: VisualConfig;
    profile: NumerologyProfile;
    imageData: string; // Base64 or Blob URL
}
