/**
 * Engineering Study Guide App - Rank System
 * 
 * Phase 2: Gamification Mechanics Design
 * Section 2.1: Define the "Engineering Rank" System
 * 
 * The Engineering Rank system is the core progression mechanic that gives users
 * a long-term goal and visible representation of their growth. It transforms
 * abstract academic improvement into concrete, trackable advancement.
 * 
 * IMPLEMENTATION DETAILS:
 * - 50 ranks divided into 5 tiers (10 ranks each)
 * - Exponential XP curve with 15% growth per rank
 * - Tier-specific benefits and unlocks
 * - Visual rank badges with tier color schemes
 * - Promotion animations at tier boundaries
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Tier identifiers for the 5-tier rank system
 */
export type RankTier = 
  | 'freshman_novice'      // Ranks 1-10
  | 'sophomore_apprentice' // Ranks 11-20
  | 'junior_journeyman'    // Ranks 21-30
  | 'senior_expert'        // Ranks 31-40
  | 'phd_sage';            // Ranks 41-50

/**
 * Benefits unlocked at each tier
 */
export interface TierBenefits {
  /** Features unlocked at this tier */
  unlocks: string[];
  /** Badge color scheme */
  badgeGradient: string;
  /** Minimum rank in this tier */
  minRank: number;
  /** Maximum rank in this tier */
  maxRank: number;
}

/**
 * Complete rank data structure
 */
export interface RankData {
  /** Current rank (1-50) */
  rank: number;
  /** Rank title (e.g., "Syllabus Reader") */
  title: string;
  /** XP required to reach this rank from previous */
  xpRequired: number;
  /** Total cumulative XP to reach this rank */
  cumulativeXP: number;
  /** Current tier */
  tier: RankTier;
  /** Progress to next rank (0-1) */
  progressToNext: number;
  /** Current XP within this rank */
  currentXPInRank: number;
}

/**
 * Result of a rank-up operation
 */
export interface RankUpResult {
  /** Whether user ranked up */
  rankedUp: boolean;
  /** New rank after XP gain */
  newRank: number;
  /** Previous rank */
  oldRank: number;
  /** Tiers crossed (if any) */
  tierCrossed: RankTier | null;
  /** XP overflow into next rank */
  overflowXP: number;
  /** Gear Coins bonus for ranking up */
  gearCoinsBonus: number;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Base XP required for rank 1
 */
const BASE_XP = 100;

/**
 * Growth rate per rank (15% increase)
 */
const GROWTH_RATE = 1.15;

/**
 * Gear Coins awarded per rank up
 */
const RANK_UP_GEAR_COINS = 50;

/**
 * Tier definitions with benefits
 */
export const TIER_DEFINITIONS: Record<RankTier, TierBenefits> = {
  freshman_novice: {
    unlocks: [
      'Basic flashcards',
      'Standard quizzes',
      'Daily streaks',
    ],
    badgeGradient: 'linear-gradient(135deg, #CD7F32 0%, #B87333 50%, #8B4513 100%)',
    minRank: 1,
    maxRank: 10,
  },
  sophomore_apprentice: {
    unlocks: [
      'Custom deck creation',
      'Study groups',
      'Avatar customization',
    ],
    badgeGradient: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 50%, #A8A8A8 100%)',
    minRank: 11,
    maxRank: 20,
  },
  junior_journeyman: {
    unlocks: [
      'Leaderboard access',
      'Peer tutoring mode',
      'Advanced analytics',
    ],
    badgeGradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
    minRank: 21,
    maxRank: 30,
  },
  senior_expert: {
    unlocks: [
      'Content creation tools',
      'Mentorship program',
      'Exclusive themes',
    ],
    badgeGradient: 'linear-gradient(135deg, #E5E4E2 0%, #CCCCCC 50%, #B3B3B3 100%)',
    minRank: 31,
    maxRank: 40,
  },
  phd_sage: {
    unlocks: [
      'Beta feature access',
      'Community moderator status',
      'Real-world rewards',
    ],
    badgeGradient: 'linear-gradient(135deg, #9370DB 0%, #8B00FF 25%, #FF1493 50%, #00CED1 75%, #9370DB 100%)',
    minRank: 41,
    maxRank: 50,
  },
};

/**
 * Rank titles for all 50 ranks
 */
export const RANK_TITLES: string[] = [
  // Tier 1: Freshman Novice (Ranks 1-10)
  'Orientation Attendee',
  'Syllabus Reader',
  'Textbook Opener',
  'Lecture Attender',
  'Homework Starter',
  'Office Hours Visitor',
  'Study Group Joiner',
  'Practice Problem Solver',
  'Exam Preparer',
  'Semester Survivor',
  
  // Tier 2: Sophomore Apprentice (Ranks 11-20)
  'Core Course Tackler',
  'Lab Report Writer',
  'Equation Memorizer',
  'Concept Connector',
  'Midterm Master',
  'Group Project Leader',
  'Tutorial Session Host',
  'Peer Tutor',
  "Dean's List Contender",
  'Year Two Completer',
  
  // Tier 3: Junior Journeyman (Ranks 21-30)
  'Specialization Selector',
  'Technical Elective Taker',
  'Design Project Initiator',
  'Internship Applicant',
  'FE Exam Registrant',
  'Research Assistant',
  'Conference Presenter',
  'Capstone Team Lead',
  'Industry Certified',
  'Third Year Triumph',
  
  // Tier 4: Senior Expert (Ranks 31-40)
  'Thesis Proposer',
  'Graduate School Applicant',
  'Journal Publisher',
  'Patent Filer',
  'Teaching Assistant',
  'Competition Winner',
  'Startup Founder',
  'Professional Engineer (EIT)',
  'Graduation Candidate',
  'Degree Achiever',
  
  // Tier 5: PhD Sage (Ranks 41-50)
  "Master's Graduate",
  'Doctoral Candidate',
  'Published Researcher',
  'Conference Chair',
  'University Professor',
  'Industry Innovator',
  'Field Expert',
  'Thought Leader',
  'Legend',
  'Engineering Sage',
];

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Calculate XP required to reach a specific rank from the previous rank
 * Formula: XP = base * (growthRate ^ (rank - 1))
 * 
 * @param rank - The target rank (1-50)
 * @returns XP required to advance from previous rank to this rank
 * @throws Error if rank is outside valid range
 */
export function calculateXPForRank(rank: number): number {
  if (rank < 1 || rank > 50) {
    throw new Error(`Invalid rank: ${rank}. Must be between 1 and 50.`);
  }
  
  // Use exponential curve: XP = base * (growthRate ^ (rank - 1))
  const xp = BASE_XP * Math.pow(GROWTH_RATE, rank - 1);
  return Math.floor(xp);
}

/**
 * Calculate total cumulative XP needed to reach a specific rank
 * This sums all XP requirements from rank 1 to the target rank
 * 
 * @param targetRank - The rank to calculate cumulative XP for (1-50)
 * @returns Total XP accumulated from rank 1 to target rank
 */
export function calculateCumulativeXP(targetRank: number): number {
  if (targetRank < 1 || targetRank > 50) {
    throw new Error(`Invalid rank: ${targetRank}. Must be between 1 and 50.`);
  }
  
  let totalXP = 0;
  for (let i = 1; i <= targetRank; i++) {
    totalXP += calculateXPForRank(i);
  }
  return totalXP;
}

/**
 * Determine which tier a rank belongs to
 * 
 * @param rank - The rank to check (1-50)
 * @returns The tier identifier
 */
export function getTierForRank(rank: number): RankTier {
  if (rank >= 1 && rank <= 10) return 'freshman_novice';
  if (rank >= 11 && rank <= 20) return 'sophomore_apprentice';
  if (rank >= 21 && rank <= 30) return 'junior_journeyman';
  if (rank >= 31 && rank <= 40) return 'senior_expert';
  if (rank >= 41 && rank <= 50) return 'phd_sage';
  
  throw new Error(`Invalid rank: ${rank}`);
}

/**
 * Get the title for a specific rank
 * 
 * @param rank - The rank (1-50)
 * @returns The title string for that rank
 */
export function getTitleForRank(rank: number): string {
  if (rank < 1 || rank > 50) {
    throw new Error(`Invalid rank: ${rank}. Must be between 1 and 50.`);
  }
  return RANK_TITLES[rank - 1];
}

/**
 * Get the rank number from a title (reverse lookup)
 * 
 * @param title - The rank title
 * @returns The rank number (1-50), or -1 if not found
 */
export function getRankFromTitle(title: string): number {
  const index = RANK_TITLES.indexOf(title);
  return index !== -1 ? index + 1 : -1;
}

// ============================================================================
// USER STATE MANAGEMENT
// ============================================================================

/**
 * Calculate user's current rank data based on total accumulated XP
 * 
 * @param totalXP - User's total accumulated XP
 * @returns Complete RankData object with all rank information
 */
export function calculateRankFromXP(totalXP: number): RankData {
  // Find current rank by comparing against cumulative XP thresholds
  let currentRank = 1;
  let cumulativeXP = 0;
  
  for (let rank = 1; rank <= 50; rank++) {
    const xpNeeded = calculateXPForRank(rank);
    
    if (totalXP >= cumulativeXP + xpNeeded) {
      cumulativeXP += xpNeeded;
      currentRank = rank + 1;
    } else {
      break;
    }
  }
  
  // Cap at max rank
  if (currentRank > 50) {
    currentRank = 50;
  }
  
  // Calculate progress to next rank
  const xpForCurrentRank = calculateXPForRank(currentRank);
  const xpInCurrentRank = totalXP - cumulativeXP + xpForCurrentRank;
  const progressToNext = currentRank === 50 
    ? 1.0 
    : Math.min(1, xpInCurrentRank / xpForCurrentRank);
  
  return {
    rank: currentRank,
    title: getTitleForRank(currentRank),
    xpRequired: xpForCurrentRank,
    cumulativeXP: calculateCumulativeXP(currentRank),
    tier: getTierForRank(currentRank),
    progressToNext,
    currentXPInRank: xpInCurrentRank,
  };
}

/**
 * Process XP gain and determine if user ranks up
 * 
 * @param currentTotalXP - User's current total XP before gain
 * @param xpGained - Amount of XP gained
 * @returns RankUpResult with details about rank changes
 */
export function processXPGain(currentTotalXP: number, xpGained: number): RankUpResult {
  const oldRankData = calculateRankFromXP(currentTotalXP);
  const newTotalXP = currentTotalXP + xpGained;
  const newRankData = calculateRankFromXP(newTotalXP);
  
  const rankedUp = newRankData.rank > oldRankData.rank;
  const tiersCrossed = oldRankData.tier !== newRankData.tier;
  
  // Calculate overflow XP (XP beyond what's needed for current rank)
  const xpNeededForNewRank = calculateXPForRank(newRankData.rank);
  const overflowXP = newRankData.currentXPInRank - xpNeededForNewRank;
  
  // Calculate Gear Coins bonus (50 per rank gained)
  const ranksGained = newRankData.rank - oldRankData.rank;
  const gearCoinsBonus = ranksGained * RANK_UP_GEAR_COINS;
  
  return {
    rankedUp,
    newRank: newRankData.rank,
    oldRank: oldRankData.rank,
    tierCrossed: tiersCrossed ? newRankData.tier : null,
    overflowXP: Math.max(0, overflowXP),
    gearCoinsBonus,
  };
}

/**
 * Check if a rank-up triggers a tier promotion
 * 
 * @param oldRank - Previous rank
 * @param newRank - New rank after XP gain
 * @returns True if tier was promoted
 */
export function isTierPromotion(oldRank: number, newRank: number): boolean {
  const oldTier = getTierForRank(oldRank);
  const newTier = getTierForRank(newRank);
  return oldTier !== newTier;
}

/**
 * Get all ranks within a specific tier
 * 
 * @param tier - The tier to get ranks for
 * @returns Array of rank numbers in that tier
 */
export function getRanksInTier(tier: RankTier): number[] {
  const tierDef = TIER_DEFINITIONS[tier];
  const ranks: number[] = [];
  
  for (let i = tierDef.minRank; i <= tierDef.maxRank; i++) {
    ranks.push(i);
  }
  
  return ranks;
}

/**
 * Get remaining ranks to complete a tier
 * 
 * @param currentRank - User's current rank
 * @returns Number of ranks remaining in current tier
 */
export function getRanksRemainingInTier(currentRank: number): number {
  const tier = getTierForRank(currentRank);
  const tierDef = TIER_DEFINITIONS[tier];
  return tierDef.maxRank - currentRank;
}

/**
 * Calculate XP needed to reach a specific target rank from current rank
 * 
 * @param currentRank - User's current rank
 * @param targetRank - Desired rank to reach
 * @returns XP needed to go from current to target rank
 */
export function calculateXPToReachRank(currentRank: number, targetRank: number): number {
  if (targetRank <= currentRank) {
    return 0;
  }
  
  if (targetRank > 50) {
    throw new Error(`Invalid target rank: ${targetRank}. Maximum is 50.`);
  }
  
  const currentCumulative = calculateCumulativeXP(currentRank);
  const targetCumulative = calculateCumulativeXP(targetRank);
  
  return targetCumulative - currentCumulative;
}

/**
 * Get preview of next N ranks for motivation display
 * 
 * @param currentRank - User's current rank
 * @param previewCount - Number of future ranks to preview
 * @returns Array of upcoming rank info
 */
export function getNextRanksPreview(currentRank: number, previewCount: number = 3): Array<{
  rank: number;
  title: string;
  xpRequired: number;
  cumulativeXP: number;
}> {
  const previews: Array<{
    rank: number;
    title: string;
    xpRequired: number;
    cumulativeXP: number;
  }> = [];
  
  for (let i = 1; i <= previewCount; i++) {
    const nextRank = Math.min(currentRank + i, 50);
    if (nextRank > currentRank) {
      previews.push({
        rank: nextRank,
        title: getTitleForRank(nextRank),
        xpRequired: calculateXPForRank(nextRank),
        cumulativeXP: calculateCumulativeXP(nextRank),
      });
    }
  }
  
  return previews;
}

// ============================================================================
// VISUAL CONFIGURATION HELPERS
// ============================================================================

/**
 * Get visual configuration for rank badge
 * 
 * @param rank - The rank to get badge config for
 * @returns Badge gradient and styling info
 */
export function getRankBadgeConfig(rank: number): {
  gradient: string;
  tier: RankTier;
  isMaxRank: boolean;
  isTierBoundary: boolean;
} {
  const tier = getTierForRank(rank);
  const tierDef = TIER_DEFINITIONS[tier];
  
  return {
    gradient: tierDef.badgeGradient,
    tier,
    isMaxRank: rank === 50,
    isTierBoundary: [10, 20, 30, 40].includes(rank),
  };
}

/**
 * Check if rank is a tier boundary (ranks 10, 20, 30, 40)
 * These trigger special celebration animations
 * 
 * @param rank - The rank to check
 * @returns True if this is a tier boundary rank
 */
export function isTierBoundary(rank: number): boolean {
  return [10, 20, 30, 40].includes(rank);
}

/**
 * Get animation intensity based on achievement significance
 * 
 * @param oldRank - Previous rank
 * @param newRank - New rank
 * @returns Animation intensity level (1-3)
 */
export function getAnimationIntensity(oldRank: number, newRank: number): number {
  const ranksGained = newRank - oldRank;
  
  // Tier promotion (crossing 10, 20, 30, 40)
  if (isTierBoundary(newRank)) {
    return 3; // Maximum intensity
  }
  
  // Multiple rank ups
  if (ranksGained >= 3) {
    return 2; // High intensity
  }
  
  // Single rank up
  if (ranksGained >= 1) {
    return 1; // Standard intensity
  }
  
  return 0; // No animation
}

// ============================================================================
// STATISTICS & ANALYTICS
// ============================================================================

/**
 * Calculate percentile rank compared to user base
 * 
 * @param userCumulativeXP - User's total cumulative XP
 * @param distributionData - XP distribution percentiles from analytics
 * @returns Percentile (0-100)
 */
export function calculatePercentile(userCumulativeXP: number, distributionData: number[]): number {
  const sorted = [...distributionData].sort((a, b) => a - b);
  const below = sorted.filter(xp => xp < userCumulativeXP).length;
  return Math.round((below / sorted.length) * 100);
}

/**
 * Estimate time to next rank based on average XP/hour
 * 
 * @param currentRank - User's current rank
 * @param avgXPPerHour - User's average XP earned per study hour
 * @returns Estimated hours to next rank
 */
export function estimateHoursToNextRank(currentRank: number, avgXPPerHour: number): number {
  if (currentRank >= 50) {
    return 0; // Max rank reached
  }
  
  const xpNeeded = calculateXPForRank(currentRank + 1);
  return Math.ceil(xpNeeded / avgXPPerHour);
}

/**
 * Generate rank progression statistics
 * 
 * @param totalXP - User's total XP
 * @returns Statistics object
 */
export function generateRankStats(totalXP: number): {
  currentRank: number;
  title: string;
  tier: RankTier;
  percentToNextRank: number;
  xpIntoCurrentRank: number;
  xpNeededForNext: number;
  totalRanksAchieved: number;
  ranksRemaining: number;
} {
  const rankData = calculateRankFromXP(totalXP);
  
  return {
    currentRank: rankData.rank,
    title: rankData.title,
    tier: rankData.tier,
    percentToNextRank: Math.round(rankData.progressToNext * 100),
    xpIntoCurrentRank: rankData.currentXPInRank,
    xpNeededForNext: calculateXPForRank(Math.min(rankData.rank + 1, 50)),
    totalRanksAchieved: rankData.rank,
    ranksRemaining: 50 - rankData.rank,
  };
}
