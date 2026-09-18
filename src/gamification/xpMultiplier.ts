/**
 * Engineering Study Guide App - XP Multiplier System
 * 
 * Phase 2: Gamification Mechanics Design
 * Section 2.2: Design the "Streak Freeze" and "XP Multiplier" Logic
 * 
 * The XP multiplier system rewards users with bonus XP for various positive
 * behaviors and conditions. Multiple multipliers can stack together, creating
 * exciting combo opportunities that encourage optimal study habits.
 * 
 * IMPLEMENTATION DETAILS:
 * - Base XP calculation for activities
 * - Streak-based multipliers (highest applicable only)
 * - Time-based multipliers (mutually exclusive)
 * - Activity-based multipliers (all stack)
 * - Maximum multiplier cap at 5.0x to prevent exploitation
 * - Detailed breakdown for transparency
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Information about a single multiplier
 */
export interface MultiplierInfo {
  /** Name of the multiplier (for display) */
  name: string;
  /** Multiplier value (e.g., 1.2 for +20%) */
  value: number;
}

/**
 * Conditions that affect XP multipliers
 */
export interface MultiplierCondition {
  /** Current streak length in days */
  streak?: number;
  /** Whether this is the first study session today */
  firstSessionToday?: boolean;
  /** Whether daily mission is complete */
  dailyMissionComplete?: boolean;
  /** Whether it's weekend (Saturday/Sunday) */
  isWeekend?: boolean;
  /** Whether studying in a group */
  studyGroup?: boolean;
  /** Whether achieved perfect score (100%) */
  perfectScore?: boolean;
  /** Whether completed under time limit (speed run) */
  speedRun?: boolean;
  /** Hour of day (0-23) for time-based multipliers */
  hour?: number;
}

/**
 * Complete breakdown of XP calculation
 */
export interface XPBreakdown {
  /** Base XP before any multipliers */
  baseXP: number;
  /** Total bonus XP from multipliers */
  bonusXP: number;
  /** Final XP after all multipliers applied */
  finalXP: number;
  /** Total multiplier applied (capped if necessary) */
  multiplier: number;
  /** List of all active multipliers */
  breakdown: MultiplierInfo[];
  /** Whether the multiplier was capped at maximum */
  capped: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Maximum allowed multiplier (prevents exploitation)
 */
const MAX_MULTIPLIER = 5.0;

/**
 * Multiplier values for different conditions
 */
export const MULTIPLIER_VALUES = {
  // Streak multipliers (highest applicable only)
  STREAK_7_DAYS: 1.1,
  STREAK_30_DAYS: 1.2,
  STREAK_90_DAYS: 1.5,
  
  // Time-based multipliers (mutually exclusive)
  EARLY_BIRD: 1.2,      // 5AM-8AM
  NIGHT_OWL: 1.1,       // 12AM-5AM
  WEEKEND_WARRIOR: 1.1, // Saturday/Sunday
  
  // Activity-based multipliers (all stack)
  FIRST_SESSION: 1.2,
  DAILY_MISSION: 1.3,
  STUDY_GROUP: 1.15,
  PERFECT_SCORE: 1.25,
  SPEED_RUN: 1.2,
} as const;

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Calculate final XP with all applicable multipliers
 * 
 * @param baseXP - Base XP for the activity
 * @param conditions - Active multiplier conditions
 * @returns XPBreakdown with full details
 */
export function calculateFinalXP(baseXP: number, conditions: MultiplierCondition): XPBreakdown {
  const multipliers: MultiplierInfo[] = [];
  let totalMultiplier = 1.0;
  
  // ==========================================================================
  // Streak multiplier (highest applicable only)
  // ==========================================================================
  if (conditions.streak !== undefined) {
    if (conditions.streak >= 90) {
      multipliers.push({ name: '90+ Day Streak', value: MULTIPLIER_VALUES.STREAK_90_DAYS });
    } else if (conditions.streak >= 30) {
      multipliers.push({ name: '30+ Day Streak', value: MULTIPLIER_VALUES.STREAK_30_DAYS });
    } else if (conditions.streak >= 7) {
      multipliers.push({ name: '7+ Day Streak', value: MULTIPLIER_VALUES.STREAK_7_DAYS });
    }
  }
  
  // ==========================================================================
  // Time-based multipliers (mutually exclusive)
  // ==========================================================================
  const hour = conditions.hour !== undefined ? conditions.hour : new Date().getHours();
  
  if (hour >= 5 && hour < 8) {
    // Early bird: 5AM-8AM
    multipliers.push({ name: 'Early Bird', value: MULTIPLIER_VALUES.EARLY_BIRD });
  } else if (hour >= 0 && hour < 5) {
    // Night owl: 12AM-5AM
    multipliers.push({ name: 'Night Owl', value: MULTIPLIER_VALUES.NIGHT_OWL });
  }
  
  // ==========================================================================
  // Activity-based multipliers (all stack)
  // ==========================================================================
  if (conditions.firstSessionToday) {
    multipliers.push({ name: 'First Session', value: MULTIPLIER_VALUES.FIRST_SESSION });
  }
  
  if (conditions.dailyMissionComplete) {
    multipliers.push({ name: 'Daily Mission', value: MULTIPLIER_VALUES.DAILY_MISSION });
  }
  
  if (conditions.isWeekend) {
    multipliers.push({ name: 'Weekend Warrior', value: MULTIPLIER_VALUES.WEEKEND_WARRIOR });
  }
  
  if (conditions.studyGroup) {
    multipliers.push({ name: 'Study Group', value: MULTIPLIER_VALUES.STUDY_GROUP });
  }
  
  if (conditions.perfectScore) {
    multipliers.push({ name: 'Perfect Score', value: MULTIPLIER_VALUES.PERFECT_SCORE });
  }
  
  if (conditions.speedRun) {
    multipliers.push({ name: 'Speed Run', value: MULTIPLIER_VALUES.SPEED_RUN });
  }
  
  // ==========================================================================
  // Multiply all together
  // ==========================================================================
  multipliers.forEach(m => {
    totalMultiplier *= m.value;
  });
  
  // Cap maximum multiplier
  const cappedMultiplier = Math.min(totalMultiplier, MAX_MULTIPLIER);
  
  // Calculate final XP
  const finalXP = Math.floor(baseXP * cappedMultiplier);
  const bonusXP = finalXP - baseXP;
  
  return {
    baseXP,
    bonusXP,
    finalXP,
    multiplier: cappedMultiplier,
    breakdown: multipliers,
    capped: totalMultiplier > MAX_MULTIPLIER,
  };
}

/**
 * Get potential XP for an activity with optimal conditions
 * Useful for showing users what they could earn
 * 
 * @param baseXP - Base XP for the activity
 * @returns Maximum possible XP with all multipliers
 */
export function calculateMaxPotentialXP(baseXP: number): XPBreakdown {
  const optimalConditions: MultiplierCondition = {
    streak: 365,              // Max streak bonus
    firstSessionToday: true,
    dailyMissionComplete: true,
    isWeekend: true,
    studyGroup: true,
    perfectScore: true,
    speedRun: true,
    hour: 6,                  // Early bird hours
  };
  
  return calculateFinalXP(baseXP, optimalConditions);
}

/**
 * Get the next available multiplier a user can achieve
 * Helps motivate users toward specific goals
 * 
 * @param currentConditions - User's current conditions
 * @returns Description of next achievable multiplier
 */
export function getNextAvailableMultiplier(currentConditions: MultiplierCondition): string | null {
  // Check streak milestones
  if (!currentConditions.streak || currentConditions.streak < 7) {
    return '7-day streak for 1.1x multiplier';
  }
  if (currentConditions.streak < 30) {
    return '30-day streak for 1.2x multiplier';
  }
  if (currentConditions.streak < 90) {
    return '90-day streak for 1.5x multiplier';
  }
  
  // Check activity-based
  if (!currentConditions.firstSessionToday) {
    return 'First session of the day for 1.2x multiplier';
  }
  
  if (!currentConditions.dailyMissionComplete) {
    return 'Complete daily mission for 1.3x multiplier';
  }
  
  if (!currentConditions.perfectScore) {
    return 'Perfect quiz score for 1.25x multiplier';
  }
  
  if (!currentConditions.speedRun) {
    return 'Speed run completion for 1.2x multiplier';
  }
  
  if (!currentConditions.studyGroup) {
    return 'Study group session for 1.15x multiplier';
  }
  
  return null; // All multipliers active
}

/**
 * Format multiplier for display (e.g., 1.25 -> "+25%")
 * 
 * @param multiplier - The multiplier value
 * @returns Formatted percentage string
 */
export function formatMultiplierDisplay(multiplier: number): string {
  const percentIncrease = Math.round((multiplier - 1) * 100);
  return `+${percentIncrease}%`;
}

/**
 * Calculate XP needed to reach a goal with current multiplier
 * 
 * @param targetXP - Target XP amount
 * @param currentMultiplier - Current effective multiplier
 * @returns Base XP needed to reach target
 */
export function calculateBaseXPForTarget(targetXP: number, currentMultiplier: number): number {
  const effectiveMultiplier = Math.min(currentMultiplier, MAX_MULTIPLIER);
  return Math.ceil(targetXP / effectiveMultiplier);
}

/**
 * Compare two XP scenarios side by side
 * Useful for showing benefit of certain actions
 * 
 * @param baseXP - Base XP
 * @param conditions1 - First set of conditions
 * @param conditions2 - Second set of conditions
 * @returns Comparison object
 */
export function compareXPScenarios(
  baseXP: number,
  conditions1: MultiplierCondition,
  conditions2: MultiplierCondition
): {
  scenario1: XPBreakdown;
  scenario2: XPBreakdown;
  difference: number;
  percentBetter: number;
  betterScenario: 1 | 2;
} {
  const scenario1 = calculateFinalXP(baseXP, conditions1);
  const scenario2 = calculateFinalXP(baseXP, conditions2);
  
  const difference = Math.abs(scenario1.finalXP - scenario2.finalXP);
  const worseXP = Math.min(scenario1.finalXP, scenario2.finalXP);
  const percentBetter = worseXP > 0 
    ? Math.round((difference / worseXP) * 100) 
    : 0;
  
  return {
    scenario1,
    scenario2,
    difference,
    percentBetter,
    betterScenario: scenario1.finalXP > scenario2.finalXP ? 1 : 2,
  };
}

/**
 * Get all active multiplier names for display
 * 
 * @param conditions - Current conditions
 * @returns Array of active multiplier names
 */
export function getActiveMultiplierNames(conditions: MultiplierCondition): string[] {
  const result = calculateFinalXP(100, conditions); // Base doesn't matter for names
  return result.breakdown.map(m => m.name);
}

/**
 * Calculate effective hourly XP rate with multipliers
 * 
 * @param baseXPPerHour - Base XP earned per hour
 * @param conditions - Current multiplier conditions
 * @returns Effective XP per hour
 */
export function calculateEffectiveHourlyRate(baseXPPerHour: number, conditions: MultiplierCondition): number {
  const result = calculateFinalXP(baseXPPerHour, conditions);
  return result.finalXP;
}

// ============================================================================
// ACTIVITY BASE XP CONFIGURATION
// ============================================================================

/**
 * Base XP values for different activity types
 */
export const BASE_XP_VALUES = {
  // Study sessions
  STUDY_SESSION_PER_MINUTE: 2,
  STUDY_SESSION_BONUS_30MIN: 20,
  STUDY_SESSION_BONUS_60MIN: 50,
  
  // Quizzes and assessments
  QUIZ_CORRECT_ANSWER: 5,
  QUIZ_PERFECT_SCORE_BONUS: 50,
  PRACTICE_TEST_COMPLETE: 100,
  
  // Content creation
  FLASHCARD_CREATED: 10,
  NOTE_SHARED: 25,
  STUDY_GUIDE_CREATED: 75,
  
  // Social activities
  GROUP_STUDY_SESSION: 30,
  PEER_TUTORING_SESSION: 50,
  FORUM_HELPFUL_ANSWER: 15,
  
  // Achievements
  DAILY_CHALLENGE_COMPLETE: 40,
  WEEKLY_CHALLENGE_COMPLETE: 150,
  MILESTONE_REACHED: 200,
} as const;

/**
 * Calculate base XP for a study session based on duration
 * 
 * @param durationMinutes - Length of study session
 * @returns Base XP for the session
 */
export function calculateStudySessionXP(durationMinutes: number): number {
  let xp = durationMinutes * BASE_XP_VALUES.STUDY_SESSION_PER_MINUTE;
  
  // Bonus for longer sessions
  if (durationMinutes >= 60) {
    xp += BASE_XP_VALUES.STUDY_SESSION_BONUS_60MIN;
  } else if (durationMinutes >= 30) {
    xp += BASE_XP_VALUES.STUDY_SESSION_BONUS_30MIN;
  }
  
  return xp;
}

/**
 * Calculate base XP for a quiz based on performance
 * 
 * @param totalQuestions - Total questions in quiz
 * @param correctAnswers - Number of correct answers
 * @returns Base XP for the quiz
 */
export function calculateQuizXP(totalQuestions: number, correctAnswers: number): number {
  const baseXP = correctAnswers * BASE_XP_VALUES.QUIZ_CORRECT_ANSWER;
  
  // Perfect score bonus
  if (correctAnswers === totalQuestions) {
    return baseXP + BASE_XP_VALUES.QUIZ_PERFECT_SCORE_BONUS;
  }
  
  return baseXP;
}

/**
 * Get XP summary for a complete study session
 * Combines base calculation with multiplier application
 * 
 * @param durationMinutes - Study session duration
 * @param conditions - Multiplier conditions
 * @returns Complete XP breakdown
 */
export function getStudySessionXPBreakdown(
  durationMinutes: number,
  conditions: MultiplierCondition
): {
  baseXP: number;
  withMultipliers: XPBreakdown;
  effectivePerMinute: number;
} {
  const baseXP = calculateStudySessionXP(durationMinutes);
  const withMultipliers = calculateFinalXP(baseXP, conditions);
  
  return {
    baseXP,
    withMultipliers,
    effectivePerMinute: withMultipliers.finalXP / durationMinutes,
  };
}

// ============================================================================
// ANALYTICS & TRACKING
// ============================================================================

/**
 * Track multiplier usage statistics
 */
export interface MultiplierStats {
  /** Most frequently used multiplier */
  mostCommon: string;
  /** Average multiplier achieved */
  averageMultiplier: number;
  /** Times reached max multiplier cap */
  maxCapReached: number;
  /** Total bonus XP earned */
  totalBonusXP: number;
}

/**
 * Analyze multiplier patterns from history
 * 
 * @param breakdowns - Array of XP breakdowns from past sessions
 * @returns MultiplierStats object
 */
export function analyzeMultiplierPatterns(breakdowns: XPBreakdown[]): MultiplierStats {
  if (breakdowns.length === 0) {
    return {
      mostCommon: 'None',
      averageMultiplier: 1.0,
      maxCapReached: 0,
      totalBonusXP: 0,
    };
  }
  
  // Count multiplier occurrences
  const multiplierCounts: Record<string, number> = {};
  let totalMultiplier = 0;
  let maxCapReached = 0;
  let totalBonusXP = 0;
  
  breakdowns.forEach(breakdown => {
    totalMultiplier += breakdown.multiplier;
    totalBonusXP += breakdown.bonusXP;
    
    if (breakdown.capped) {
      maxCapReached++;
    }
    
    breakdown.breakdown.forEach(m => {
      multiplierCounts[m.name] = (multiplierCounts[m.name] || 0) + 1;
    });
  });
  
  // Find most common
  let mostCommon = 'None';
  let maxCount = 0;
  Object.entries(multiplierCounts).forEach(([name, count]) => {
    if (count > maxCount) {
      maxCount = count;
      mostCommon = name;
    }
  });
  
  return {
    mostCommon,
    averageMultiplier: totalMultiplier / breakdowns.length,
    maxCapReached,
    totalBonusXP,
  };
}

/**
 * Get personalized tips to improve XP earnings
 * 
 * @param stats - User's multiplier statistics
 * @param recentConditions - Recent multiplier conditions used
 * @returns Array of tip strings
 */
export function getXPImprovementTips(stats: MultiplierStats, recentConditions: MultiplierCondition[]): string[] {
  const tips: string[] = [];
  
  // Check for low average multiplier
  if (stats.averageMultiplier < 1.3) {
    tips.push('Try studying during early morning hours (5-8 AM) for a 1.2x bonus!');
  }
  
  // Check if never used certain multipliers
  const hasUsedPerfectScore = recentConditions.some(c => c.perfectScore);
  if (!hasUsedPerfectScore) {
    tips.push('Aim for 100% on quizzes to earn the Perfect Score 1.25x multiplier!');
  }
  
  const hasUsedStudyGroup = recentConditions.some(c => c.studyGroup);
  if (!hasUsedStudyGroup) {
    tips.push('Join a study group for an extra 1.15x multiplier!');
  }
  
  const hasUsedSpeedRun = recentConditions.some(c => c.speedRun);
  if (!hasUsedSpeedRun) {
    tips.push('Challenge yourself with timed practice for the Speed Run bonus!');
  }
  
  // Check streak status
  const latestStreak = recentConditions[recentConditions.length - 1]?.streak || 0;
  if (latestStreak > 0 && latestStreak < 7) {
    tips.push(`Keep your streak going! ${7 - latestStreak} more days for the 1.1x streak bonus.`);
  } else if (latestStreak >= 7 && latestStreak < 30) {
    tips.push(`You're on fire! ${30 - latestStreak} more days for the 1.2x streak bonus.`);
  } else if (latestStreak >= 30 && latestStreak < 90) {
    tips.push(`Amazing streak! ${90 - latestStreak} more days for the massive 1.5x bonus!`);
  }
  
  return tips;
}
