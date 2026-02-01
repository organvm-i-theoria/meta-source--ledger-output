import { hashIdentity, generateSeed } from '@meta-source/utils';
import type { PersonalIdentity, NumerologyProfile } from '../core/types';
import type { VisualConfig } from '../core/types';

/**
 * Export metadata structure
 * Contains no raw personal data - only hashes and configuration
 */
export interface ExportMetadata {
  version: string;
  generator: string;
  timestamp: string;
  identityHash: string;
  seed: string;
  algorithm: string;
  profile: {
    system: string;
    destiny: number;
    lifePath: number | null;
    soulUrge: number;
    personality: number;
    isMasterNumber: boolean;
  };
  visualConfig: {
    mode: string;
    pointCount: number;
    animationSpeed: number;
    primaryColor: string;
    resolution: number;
  };
}

/**
 * Generate export metadata from identity and configuration
 * This metadata is safe to embed in images as it contains no raw personal data
 */
export function generateExportMetadata(
  identity: PersonalIdentity,
  profile: NumerologyProfile,
  config: VisualConfig,
  resolution: number
): ExportMetadata {
  // Hash the identity data - no raw personal info in output
  const identityHash = hashIdentity(
    identity.name ?? '',
    identity.birthdate ?? '',
    identity.meaningfulWords
  );

  // Generate deterministic seed from identity
  const seed = generateSeed(`${identity.name}:${identity.birthdate || ''}`);

  return {
    version: '1.0.0',
    generator: 'Identity Playground',
    timestamp: new Date().toISOString(),
    identityHash,
    seed,
    algorithm: 'phyllotaxis-spiral',
    profile: {
      system: profile.system ?? 'pythagorean',
      destiny: profile.destiny ?? profile.expression,
      lifePath: profile.lifePath,
      soulUrge: profile.soulUrge,
      personality: profile.personality,
      isMasterNumber: profile.isMasterNumber ?? false,
    },
    visualConfig: {
      mode: config.mode,
      pointCount: config.pointCount,
      animationSpeed: config.animationSpeed,
      primaryColor: config.colorPrimary,
      resolution,
    },
  };
}

/**
 * Encode metadata as a JSON string for embedding
 */
export function encodeMetadataForEmbed(metadata: ExportMetadata): string {
  return JSON.stringify(metadata);
}

/**
 * Generate a filename for export
 */
export function generateFilename(
  prefix: string,
  profile: NumerologyProfile,
  extension: string
): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const systemAbbrev = (profile.system ?? 'pyt').slice(0, 3).toUpperCase();
  const destiny = profile.destiny ?? profile.expression ?? 0;
  return `${prefix}_${systemAbbrev}_${destiny}-${profile.lifePath || 'X'}_${timestamp}.${extension}`;
}
