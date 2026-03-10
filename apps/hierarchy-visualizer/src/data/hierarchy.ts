/**
 * Universal Hierarchy data — mirrors the Python hierarchy.py lens catalog.
 *
 * Each lens is positioned in a stratum. The strata form a vertical tower
 * with the strange loop connecting /dev/ back to /boot/.
 */

export interface Lens {
  id: string;
  name: string;
  stratum: string;
  category: string;
  summonWhen: string;
  adds: string;
  critique: string;
}

export interface Stratum {
  path: string;
  label: string;
  yPosition: number; // Vertical position in the scene
  color: string;
}

export const STRATA: Stratum[] = [
  { path: '/boot/', label: 'Foundation',  yPosition: 0,  color: '#4a90d9' },
  { path: '/sys/',  label: 'Substrate',   yPosition: 3,  color: '#e67e22' },
  { path: '/lib/',  label: 'Composition', yPosition: 6,  color: '#2ecc71' },
  { path: '/bin/',  label: 'Architecture', yPosition: 9,  color: '#9b59b6' },
  { path: '/usr/',  label: 'Emergent',    yPosition: 12, color: '#e74c3c' },
  { path: '/net/',  label: 'Environment', yPosition: 15, color: '#1abc9c' },
  { path: '/dev/',  label: 'Entropy',     yPosition: 18, color: '#f39c12' },
];

export const LENSES: Lens[] = [
  // /boot/
  { id: 'mathematics', name: 'Mathematics', stratum: '/boot/', category: 'structure', summonWhen: 'Verifying state machine completeness', adds: 'DFA/category theory reveals structural gaps', critique: 'Cannot capture meaning, only structure' },
  { id: 'information_theory', name: 'Information Theory', stratum: '/boot/', category: 'tooling', summonWhen: 'Measuring complexity, diagnosing bottlenecks', adds: 'Entropy and compression ratios', critique: 'Cannot capture value, only surprise' },
  { id: 'metaphysics', name: 'Metaphysics', stratum: '/boot/', category: 'foundation', summonWhen: 'Ontological confusion', adds: 'Permission for ontological polymorphism', critique: 'Can paralyze with infinite alternatives' },
  // /sys/
  { id: 'thermodynamics', name: 'Thermodynamics', stratum: '/sys/', category: 'tooling', summonWhen: 'Diagnosing decay', adds: 'Entropy accumulation is measurable', critique: 'Treats all disorder as equivalent' },
  { id: 'quantum_mechanics', name: 'Quantum Mechanics', stratum: '/sys/', category: 'foundation', summonWhen: 'Understanding measurement effects', adds: 'State is indefinite between observations', critique: 'Analogies can overextend' },
  // /lib/
  { id: 'chemistry', name: 'Chemistry', stratum: '/lib/', category: 'tooling', summonWhen: 'Planning repo composition', adds: 'Valence rules constrain valid combinations', critique: 'Not all bonds are chemical' },
  { id: 'cosmology', name: 'Cosmology', stratum: '/lib/', category: 'foundation', summonWhen: 'Understanding temporal arc', adds: 'The system has epochs, not just states', critique: 'Can mythologize mundane history' },
  // /bin/
  { id: 'organismal_biology', name: 'Organismal Biology', stratum: '/bin/', category: 'structure', summonWhen: 'Health diagnostics', adds: 'Homeostasis demands automatic response', critique: 'Can anthropomorphize software' },
  { id: 'cellular_biology', name: 'Cellular Biology', stratum: '/bin/', category: 'structure', summonWhen: 'Template design, context sync', adds: 'DNA/expression/apoptosis map to seed.yaml', critique: "Cells don't have agency" },
  { id: 'infrastructure', name: 'Infrastructure', stratum: '/bin/', category: 'tooling', summonWhen: 'Reliability, redundancy', adds: 'Critical path demands explicit triage', critique: 'Deprioritizes innovation' },
  // /usr/
  { id: 'neuroscience', name: 'Neuroscience', stratum: '/usr/', category: 'structure', summonWhen: 'Cognitive load, attention', adds: '7±2 is a hard limit', critique: 'Reductive about meaning' },
  { id: 'ecology', name: 'Ecology', stratum: '/usr/', category: 'structure', summonWhen: 'Capacity planning, sprawl', adds: 'Carrying capacity is finite', critique: 'Can naturalize what is designed' },
  { id: 'governance', name: 'Governance', stratum: '/usr/', category: 'authority', summonWhen: 'Authority questions, rules', adds: 'Constitutional/statutory/case law hierarchy', critique: 'Expands to fill available attention' },
  { id: 'economics', name: 'Economics', stratum: '/usr/', category: 'authority', summonWhen: 'Resource allocation', adds: 'Attention has opportunity costs', critique: 'Can commodify the uncommodifiable' },
  // /net/
  { id: 'academia', name: 'Academia', stratum: '/net/', category: 'authority', summonWhen: 'Promotion decisions', adds: 'Tenure track maps to promotion', critique: 'Too slow for a startup' },
  { id: 'belief_systems', name: 'Belief Systems', stratum: '/net/', category: 'foundation', summonWhen: 'Doctrine maintenance', adds: 'Sacred texts need amendment', critique: 'Can prevent needed changes' },
  { id: 'cultural_expression', name: 'Cultural Expression', stratum: '/net/', category: 'generative', summonWhen: 'Aesthetic decisions', adds: 'Style requires variation', critique: 'Can excuse poor engineering' },
  { id: 'sociology', name: 'Sociology', stratum: '/net/', category: 'authority', summonWhen: 'Self-critique', adds: 'Identifies performative vs. functional', critique: 'Deconstructs but does not construct' },
  { id: 'the_technium', name: 'The Technium', stratum: '/net/', category: 'generative', summonWhen: 'Technology adoption', adds: 'Infrastructure has autonomous growth tendencies', critique: 'Can excuse feature creep' },
  // /dev/
  { id: 'chaos', name: 'Chaos', stratum: '/dev/', category: 'generative', summonWhen: 'Harvesting novelty', adds: 'Order/disorder boundary IS the creative engine', critique: "Can justify any disorder as 'productive'" },
  { id: 'the_noosphere', name: 'The Noosphere', stratum: '/dev/', category: 'foundation', summonWhen: 'External impact', adds: 'Internal convergence without transmission is solipsism', critique: 'Can justify anything as contribution' },
];

export const STRANGE_LOOP_EDGES: [string, string][] = [
  ['the_noosphere', 'mathematics'],
  ['chaos', 'information_theory'],
];

export const CROSS_STRATUM_EDGES: [string, string][] = [
  ['mathematics', 'thermodynamics'],
  ['thermodynamics', 'chemistry'],
  ['chemistry', 'organismal_biology'],
  ['chemistry', 'cellular_biology'],
  ['organismal_biology', 'neuroscience'],
  ['organismal_biology', 'ecology'],
  ['cellular_biology', 'ecology'],
  ['infrastructure', 'governance'],
  ['neuroscience', 'economics'],
  ['ecology', 'economics'],
  ['governance', 'academia'],
  ['governance', 'sociology'],
  ['economics', 'the_technium'],
  ['academia', 'belief_systems'],
  ['cultural_expression', 'chaos'],
  ['the_technium', 'the_noosphere'],
  ['sociology', 'the_noosphere'],
];

export function getLensByStratum(stratum: string): Lens[] {
  return LENSES.filter(l => l.stratum === stratum);
}

export function getStratumByPath(path: string): Stratum | undefined {
  return STRATA.find(s => s.path === path);
}
