/**
 * Re-export shared types from @meta-source/core
 * and define app-specific extensions
 */

// Re-export shared types
export type {
  NumerologySystem,
  NumerologyProfile,
  PersonalIdentity,
} from '@meta-source/core';

// App-specific visual config (extends shared with runtime fields)
export interface VisualConfig {
  mode: '2d' | '3d';
  width: number;
  height: number;
  pointCount: number;
  colorPrimary: string; // Hex color
  animationSpeed: number; // 0.1 to 2.0
  seed: number;
}

// App-specific generated output
export interface GeneratedOutput {
  id: string;
  identityId: string;
  timestamp: number;
  config: VisualConfig;
  profile: import('@meta-source/core').NumerologyProfile;
  imageData: string; // Base64 or Blob URL
}
