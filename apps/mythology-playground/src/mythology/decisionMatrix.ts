/**
 * Decision Matrix - 4-7-6 Framework for Structured Decision Making
 * Core (4 questions), Engine (7 questions), Interface (6 questions) = 12 total
 * Note: The actual implementation uses 4-4-4 = 12 for balanced scoring
 */

import type { DecisionQuestion, DecisionResult } from '@meta-source/core';

export interface DecisionSession {
  id: string;
  title: string;
  description?: string;
  questions: DecisionQuestion[];
  result?: DecisionResult;
  createdAt: number;
  completedAt?: number;
}

/**
 * The 12 questions of the 4-7-6 decision matrix
 * Grouped into three filters based on the numerological stack
 */
export const DECISION_QUESTIONS: DecisionQuestion[] = [
  // Filter 1: Core (4) - Foundation/Stability
  {
    filter: 'core',
    question: 'Does this align with my core values and identity?',
  },
  {
    filter: 'core',
    question: 'Is this built on a stable foundation?',
  },
  {
    filter: 'core',
    question: 'Does this have structural integrity?',
  },
  {
    filter: 'core',
    question: 'Can I commit to this long-term?',
  },

  // Filter 2: Engine (7) - Analysis/Wisdom
  {
    filter: 'engine',
    question: 'Have I analyzed this thoroughly?',
  },
  {
    filter: 'engine',
    question: 'Does the data support this decision?',
  },
  {
    filter: 'engine',
    question: 'Have I considered alternative approaches?',
  },
  {
    filter: 'engine',
    question: 'Does my intuition support this path?',
  },

  // Filter 3: Interface (6) - Harmony/Relationships
  {
    filter: 'interface',
    question: 'Does this create harmony with my environment?',
  },
  {
    filter: 'interface',
    question: 'Will this positively impact my relationships?',
  },
  {
    filter: 'interface',
    question: 'Is this responsible and ethical?',
  },
  {
    filter: 'interface',
    question: 'Can I communicate this decision clearly?',
  },
];

/**
 * Get questions for a specific filter
 */
export function getQuestionsByFilter(filter: 'core' | 'engine' | 'interface'): DecisionQuestion[] {
  return DECISION_QUESTIONS.filter((q) => q.filter === filter);
}

/**
 * Calculate decision result from answered questions
 */
export function calculateResult(questions: DecisionQuestion[]): DecisionResult {
  const answered = questions.filter((q) => q.answer !== undefined);

  if (answered.length !== 12) {
    throw new Error(`Expected 12 answered questions, got ${answered.length}`);
  }

  // Count yes answers
  const score = answered.filter((q) => q.answer === true).length;

  // Check which filters failed (less than 3/4 yes for each filter)
  const failedFilters: Array<'core' | 'engine' | 'interface'> = [];

  const coreYes = questions.filter((q) => q.filter === 'core' && q.answer === true).length;
  const engineYes = questions.filter((q) => q.filter === 'engine' && q.answer === true).length;
  const interfaceYes = questions.filter((q) => q.filter === 'interface' && q.answer === true).length;

  if (coreYes < 3) failedFilters.push('core');
  if (engineYes < 3) failedFilters.push('engine');
  if (interfaceYes < 3) failedFilters.push('interface');

  // Determine recommendation
  let recommendation: DecisionResult['recommendation'];
  let feedback: string;

  if (score === 12) {
    recommendation = 'proceed_confident';
    feedback = 'All criteria met. Proceed with full confidence.';
  } else if (score >= 9) {
    recommendation = 'proceed_monitor';
    feedback = `Strong alignment (${score}/12). Proceed with monitoring on weaker areas.`;
  } else if (score >= 6) {
    recommendation = 'proceed_caution';
    feedback = `Mixed signals (${score}/12). Proceed with caution and address concerns.`;
  } else {
    recommendation = 'reconsider';
    feedback = `Significant concerns (${score}/12). Consider pausing or reconsidering this decision.`;
  }

  // Add filter-specific feedback
  if (failedFilters.length > 0) {
    const filterNames = failedFilters.map((f) => {
      if (f === 'core') return 'Foundation/Stability';
      if (f === 'engine') return 'Analysis/Wisdom';
      return 'Harmony/Relationships';
    });
    feedback += ` Weak areas: ${filterNames.join(', ')}.`;
  }

  return {
    score,
    recommendation,
    failedFilters,
    feedback,
  };
}

/**
 * Create a new decision session
 */
export function createDecisionSession(title: string, description?: string): DecisionSession {
  return {
    id: `decision-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title,
    description,
    questions: DECISION_QUESTIONS.map((q) => ({ ...q })), // Clone questions
    createdAt: Date.now(),
  };
}

/**
 * Answer a question in a session
 */
export function answerQuestion(
  session: DecisionSession,
  questionIndex: number,
  answer: boolean
): DecisionSession {
  const questions = [...session.questions];
  questions[questionIndex] = { ...questions[questionIndex], answer };

  return {
    ...session,
    questions,
  };
}

/**
 * Complete a decision session
 */
export function completeSession(session: DecisionSession): DecisionSession {
  const result = calculateResult(session.questions);

  return {
    ...session,
    result,
    completedAt: Date.now(),
  };
}

/**
 * Get progress of a decision session
 */
export function getSessionProgress(session: DecisionSession): {
  answered: number;
  total: number;
  percentage: number;
  byFilter: Record<'core' | 'engine' | 'interface', { answered: number; total: number }>;
} {
  const answered = session.questions.filter((q) => q.answer !== undefined).length;
  const total = session.questions.length;

  const byFilter = {
    core: {
      answered: session.questions.filter((q) => q.filter === 'core' && q.answer !== undefined).length,
      total: session.questions.filter((q) => q.filter === 'core').length,
    },
    engine: {
      answered: session.questions.filter((q) => q.filter === 'engine' && q.answer !== undefined).length,
      total: session.questions.filter((q) => q.filter === 'engine').length,
    },
    interface: {
      answered: session.questions.filter((q) => q.filter === 'interface' && q.answer !== undefined).length,
      total: session.questions.filter((q) => q.filter === 'interface').length,
    },
  };

  return {
    answered,
    total,
    percentage: Math.round((answered / total) * 100),
    byFilter,
  };
}

/**
 * Get recommendation color
 */
export function getRecommendationColor(recommendation: DecisionResult['recommendation']): string {
  switch (recommendation) {
    case 'proceed_confident':
      return '#27ae60'; // Green
    case 'proceed_monitor':
      return '#3498db'; // Blue
    case 'proceed_caution':
      return '#f39c12'; // Orange
    case 'reconsider':
      return '#e74c3c'; // Red
    default:
      return '#7f8c8d'; // Gray
  }
}

/**
 * Get recommendation label
 */
export function getRecommendationLabel(recommendation: DecisionResult['recommendation']): string {
  switch (recommendation) {
    case 'proceed_confident':
      return 'Proceed with Confidence';
    case 'proceed_monitor':
      return 'Proceed with Monitoring';
    case 'proceed_caution':
      return 'Proceed with Caution';
    case 'reconsider':
      return 'Reconsider or Pause';
    default:
      return 'Unknown';
  }
}
