/**
 * Four As Framework - Governance domains for creative decision-making
 * Auctor (Author/Vision), Ars (Art/Craft), Archive (Memory/Reference), Apparatus (System/Tools)
 */

import type { FourAsDomain, FourAsState } from '@meta-source/core';

export interface FourAsDomainInfo {
  id: FourAsDomain;
  name: string;
  latin: string;
  focus: string;
  description: string;
  questions: string[];
  color: string;
}

export const FOUR_AS_INFO: Record<FourAsDomain, FourAsDomainInfo> = {
  auctor: {
    id: 'auctor',
    name: 'Auctor',
    latin: 'Author',
    focus: 'Vision & Intent',
    description: 'The authorial domain: vision setting, decision-making, creative direction.',
    questions: [
      'What is the intent behind this work?',
      'Who is the audience?',
      'What story are we telling?',
      'What change do we seek to create?',
    ],
    color: '#9b59b6', // Purple
  },
  ars: {
    id: 'ars',
    name: 'Ars',
    latin: 'Art/Craft',
    focus: 'Execution & Skill',
    description: 'The craftsmanship domain: technique, execution, quality of work.',
    questions: [
      'What techniques will we employ?',
      'How do we ensure quality?',
      'What skills are required?',
      'How do we measure craftsmanship?',
    ],
    color: '#e74c3c', // Red
  },
  archive: {
    id: 'archive',
    name: 'Archive',
    latin: 'Archive',
    focus: 'Memory & Reference',
    description: 'The archival domain: documentation, history, precedent, learning.',
    questions: [
      'What precedents exist?',
      'What have we learned before?',
      'How do we document this?',
      'What references inform our work?',
    ],
    color: '#3498db', // Blue
  },
  apparatus: {
    id: 'apparatus',
    name: 'Apparatus',
    latin: 'System',
    focus: 'Tools & Infrastructure',
    description: 'The systemic domain: tools, processes, infrastructure, automation.',
    questions: [
      'What tools do we need?',
      'How does the system support our work?',
      'What processes must be in place?',
      'How do we maintain the infrastructure?',
    ],
    color: '#27ae60', // Green
  },
};

/**
 * Get workflow recommendation based on active Four As
 */
export function getWorkflowRecommendation(state: FourAsState): string {
  const activeCount = Object.values(state.active).filter(Boolean).length;
  const activeDomains = (Object.entries(state.active) as [FourAsDomain, boolean][])
    .filter(([, active]) => active)
    .map(([domain]) => domain);

  if (activeCount === 0) {
    return 'Dormant mode: Activate at least one domain to begin working.';
  }

  if (activeCount === 1) {
    const domain = activeDomains[0];
    const info = FOUR_AS_INFO[domain];
    return `Single focus: ${info.name} mode - ${info.focus}. Consider activating complementary domains.`;
  }

  if (activeCount === 2) {
    const [a, b] = activeDomains;
    const combos: Record<string, string> = {
      'auctor-ars': 'Creation workflow: Define intent, then execute with craft.',
      'auctor-archive': 'Research workflow: Vision guided by historical context.',
      'auctor-apparatus': 'System design: Vision driving tool selection.',
      'ars-archive': 'Refinement workflow: Craft informed by precedent.',
      'ars-apparatus': 'Production workflow: Execution supported by tools.',
      'archive-apparatus': 'Maintenance workflow: Documentation and infrastructure focus.',
    };
    const key = [a, b].sort().join('-');
    return combos[key] || `Combined focus: ${FOUR_AS_INFO[a].name} + ${FOUR_AS_INFO[b].name}`;
  }

  if (activeCount === 3) {
    const inactive = (Object.entries(state.active) as [FourAsDomain, boolean][])
      .find(([, active]) => !active)?.[0];
    if (inactive) {
      return `Near-complete mode: All except ${FOUR_AS_INFO[inactive].name}. Consider if ${FOUR_AS_INFO[inactive].focus.toLowerCase()} is being neglected.`;
    }
  }

  return 'Full engagement: All Four As active. Comprehensive creative workflow enabled.';
}

/**
 * Get domain for current day of week (ritual mapping)
 */
export function getDailyDomain(dayOfWeek: number): FourAsDomain {
  // Monday(1) = Auctor, Tuesday(2) = Ars, Wednesday(3) = Archive, Thursday(4) = Apparatus
  // Friday(5) = Integration, Weekend = Reflection
  const mapping: Record<number, FourAsDomain> = {
    0: 'archive', // Sunday - reflection/review
    1: 'auctor', // Monday - vision/planning
    2: 'ars', // Tuesday - execution/craft
    3: 'archive', // Wednesday - documentation
    4: 'apparatus', // Thursday - systems/tools
    5: 'ars', // Friday - finishing/craft
    6: 'auctor', // Saturday - creative exploration
  };
  return mapping[dayOfWeek] || 'auctor';
}

/**
 * Get domain for current week of month
 */
export function getWeeklyDomain(weekOfMonth: number): FourAsDomain {
  const mapping: FourAsDomain[] = ['auctor', 'ars', 'archive', 'apparatus'];
  return mapping[(weekOfMonth - 1) % 4];
}

/**
 * Get domain for current month
 */
export function getMonthlyDomain(month: number): FourAsDomain {
  // Q1 (1-3) = Auctor, Q2 (4-6) = Ars, Q3 (7-9) = Archive, Q4 (10-12) = Apparatus
  const quarter = Math.floor((month - 1) / 3);
  const mapping: FourAsDomain[] = ['auctor', 'ars', 'archive', 'apparatus'];
  return mapping[quarter];
}

/**
 * Create initial Four As state
 */
export function createInitialFourAsState(): FourAsState {
  return {
    active: {
      auctor: false,
      ars: false,
      archive: false,
      apparatus: false,
    },
    focus: null,
  };
}

/**
 * Toggle a domain's active state
 */
export function toggleDomain(state: FourAsState, domain: FourAsDomain): FourAsState {
  const newActive = { ...state.active, [domain]: !state.active[domain] };

  // If we're deactivating the focus domain, clear focus
  let newFocus = state.focus;
  if (state.focus === domain && !newActive[domain]) {
    // Find another active domain to focus on
    const stillActive = (Object.entries(newActive) as [FourAsDomain, boolean][])
      .find(([, active]) => active)?.[0];
    newFocus = stillActive || null;
  }

  // If we're activating and no focus, set this as focus
  if (!state.focus && newActive[domain]) {
    newFocus = domain;
  }

  return {
    ...state,
    active: newActive,
    focus: newFocus,
  };
}

/**
 * Set focus domain (must be active)
 */
export function setFocusDomain(state: FourAsState, domain: FourAsDomain): FourAsState {
  if (!state.active[domain]) {
    return state; // Cannot focus on inactive domain
  }
  return { ...state, focus: domain };
}
