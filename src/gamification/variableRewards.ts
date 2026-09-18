/**
 * Engineering Study Guide App - Variable Rewards System
 * 
 * Phase 2: Gamification Mechanics Design
 * Section 2.4: Map Out Variable Reward Schedules
 * 
 * Variable rewards are more effective than fixed rewards at driving habitual
 * behavior (Skinner, 1953). This system implements three types of variable rewards:
 * 1. Rewards of the Tribe: Social validation, competition, cooperation
 * 2. Rewards of the Hunt: Material resources, information, collectibles
 * 3. Rewards of the Self: Mastery, competence, accomplishment
 * 
 * IMPLEMENTATION DETAILS:
 * - Random bonus XP with weighted probability distribution
 * - Mystery reward chests (daily, weekly, achievement)
 * - Surprise & delight moments (golden sessions, lucky streaks)
 * - Collection mechanics with badge sets
 * - Luck booster for players on dry spells
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Reward tier levels for variable rewards
 */
export type RewardTier = 
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'epic'
  | 'legendary';

/**
 * Types of mystery chests available
 */
export type ChestType =
  | 'daily'
  | 'weekly_challenge'
  | 'achievement_bronze'
  | 'achievement_silver'
  | 'achievement_gold'
  | 'achievement_platinum';

/**
 * Collection item types
 */
export type CollectionItemType =
  | 'badge_engineering_discipline'
  | 'badge_study_milestone'
  | 'badge_social_achievement'
  | 'badge_special_event'
  | 'fragment_cosmetic'
  | 'fragment_powerup';

/**
 * Configuration for a reward tier
 */
export interface RewardTierConfig {
  /** Probability of this tier being selected (0-1) */
  probability: number;
  /** XP range [min, max] for this tier */
  xpRange: [number, number];
  /** Gear Coin range [min, max] for this tier */
  gcRange?: [number, number];
  /** Possible messages for this tier */
  messages: string[];
  /** Visual effect intensity (1-3) */
  effectIntensity: number;
}

/**
 * Result of a variable reward calculation
 */
export interface VariableRewardResult {
  /** Selected reward tier */
  tier: RewardTier;
  /** Bonus XP awarded */
  xpBonus: number;
  /** Bonus Gear Coins awarded */
  gcBonus: number;
  /** Total XP including base */
  totalXP: number;
  /** Display message */
  message: string;
  /** Whether has special visual effect */
  hasSpecialEffect: boolean;
  /** Effect type for animation */
  effectType: 'none' | 'simpleParticles' | 'enhancedParticles' | 'fullScreenCelebration';
  /** Whether this is shareable on social */
  shareable: boolean;
  /** Base XP before bonus */
  baseXP: number;
}

/**
 * Mystery chest contents
 */
export interface ChestContents {
  /** Items received */
  items: Array<{
    itemId: string;
    name: string;
    type: CollectionItemType;
    quantity: number;
    rarity?: RewardTier;
  }>;
  /** Total Gear Coins value */
  totalGC: number;
  /** Total XP value */
  totalXP: number;
  /** Animation type for opening */
  animationType: 'standard' | 'enhanced' | 'legendary';
  /** Whether got something rare+ */
  hasRareItem: boolean;
}

/**
 * Badge collection set definition
 */
export interface BadgeCollectionSet {
  /** Set identifier */
  id: string;
  /** Display name */
  name: string;
  /** Description */
  description: string;
  /** Badges required to complete set */
  requiredBadges: string[];
  /** Completion reward in GC */
  completionRewardGC: number;
  /** Special title unlocked */
  unlockTitle?: string;
  /** Icon for the set */
  icon: string;
}

/**
 * User's collection progress
 */
export interface CollectionProgress {
  /** Collected badge IDs */
  collectedBadgeIds: string[];
  /** Fragment counts by type */
  fragments: Record<string, number>;
  /** Completed set IDs */
  completedSets: string[];
}

/**
 * Configuration for variable reward system
 */
export interface VariableRewardConfig {
  /** Base probabilities for each tier */
  tierProbabilities: Record<RewardTier, number>;
  /** Maximum luck booster percentage */
  maxLuckBooster: number;
  /** Luck increase per day without rare */
  luckBoosterPerDay: number;
  /** Reset luck after rare drop */
  resetLuckOnRare: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default reward tier configurations
 */
export const DEFAULT_REWARD_TIERS: Record<RewardTier, RewardTierConfig> = {
  common: {
    probability: 0.70,
    xpRange: [5, 15],
    gcRange: [0, 5],
    messages: ['Nice!', 'Keep going!', '+XP!', 'Good job!', 'Solid work!'],
    effectIntensity: 1,
  },
  uncommon: {
    probability: 0.20,
    xpRange: [20, 40],
    gcRange: [5, 15],
    messages: ['Great job!', 'Bonus XP!', 'On fire!', 'Nice one!', 'Impressive!'],
    effectIntensity: 1,
  },
  rare: {
    probability: 0.07,
    xpRange: [50, 100],
    gcRange: [15, 30],
    messages: ['RARE FIND!', 'Amazing!', 'Jackpot!', 'Lucky you!', 'Outstanding!'],
    effectIntensity: 2,
  },
  epic: {
    probability: 0.025,
    xpRange: [150, 300],
    gcRange: [30, 60],
    messages: ['EPIC BONUS!', 'Unbelievable!', 'Incredible!', 'You\'re crushing it!'],
    effectIntensity: 3,
  },
  legendary: {
    probability: 0.005,
    xpRange: [500, 1000],
    gcRange: [100, 200],
    messages: ['🎱 LEGENDARY DROP! 🎱', 'HISTORY MADE!', 'SHARE THIS!', 'ABSOLUTELY INSANE!', 'ONE IN A MILLION!'],
    effectIntensity: 3,
  },
};

/**
 * Default variable reward configuration
 */
export const DEFAULT_VARIABLE_REWARD_CONFIG: VariableRewardConfig = {
  tierProbabilities: {
    common: 0.70,
    uncommon: 0.20,
    rare: 0.07,
    epic: 0.025,
    legendary: 0.005,
  },
  maxLuckBooster: 0.15,
  luckBoosterPerDay: 0.01,
  resetLuckOnRare: true,
};

/**
 * Badge collection sets
 */
export const BADGE_COLLECTION_SETS: BadgeCollectionSet[] = [
  {
    id: 'engineering_disciplines',
    name: 'Engineering Disciplines',
    description: 'Master quizzes across all engineering fields',
    requiredBadges: [
      'badge_mechanical',
      'badge_electrical',
      'badge_computer_science',
      'badge_civil',
      'badge_chemical',
    ],
    completionRewardGC: 1000,
    unlockTitle: 'Polymath Engineer',
    icon: '🎓',
  },
  {
    id: 'study_marathon',
    name: 'Study Marathon',
    description: 'Complete increasingly long study sessions',
    requiredBadges: [
      'badge_30min_session',
      'badge_60min_session',
      'badge_120min_session',
      'badge_180min_session',
      'badge_240min_session',
    ],
    completionRewardGC: 750,
    unlockTitle: 'Marathon Runner',
    icon: '⏱️',
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Engage with the community',
    requiredBadges: [
      'badge_first_group_study',
      'badge_peer_tutor',
      'badge_content_creator',
      'badge_helpful_answer',
      'badge_community_leader',
    ],
    completionRewardGC: 850,
    unlockTitle: 'Community Champion',
    icon: '🦋',
  },
  {
    id: 'perfect_scores',
    name: 'Perfectionist',
    description: 'Achieve perfect scores on various quiz types',
    requiredBadges: [
      'badge_perfect_math',
      'badge_perfect_science',
      'badge_perfect_engineering',
      'badge_perfect_speed',
      'badge_perfect_streak',
    ],
    completionRewardGC: 1200,
    unlockTitle: 'Perfectionist',
    icon: '💯',
  },
];

/**
 * Mystery chest configurations
 */
export const MYSTERY_CHEST_CONFIGS: Record<ChestType, {
  name: string;
  guaranteedMinGC: number;
  possibleItems: CollectionItemType[];
  rareChance: number;
}> = {
  daily: {
    name: 'Daily Reward Chest',
    guaranteedMinGC: 10,
    possibleItems: ['fragment_cosmetic', 'fragment_powerup'],
    rareChance: 0.1,
  },
  weekly_challenge: {
    name: 'Weekly Challenge Chest',
    guaranteedMinGC: 100,
    possibleItems: ['badge_study_milestone', 'fragment_cosmetic'],
    rareChance: 0.25,
  },
  achievement_bronze: {
    name: 'Bronze Achievement Chest',
    guaranteedMinGC: 25,
    possibleItems: ['badge_special_event'],
    rareChance: 0.05,
  },
  achievement_silver: {
    name: 'Silver Achievement Chest',
    guaranteedMinGC: 50,
    possibleItems: ['badge_special_event', 'fragment_cosmetic'],
    rareChance: 0.15,
  },
  achievement_gold: {
    name: 'Gold Achievement Chest',
    guaranteedMinGC: 100,
    possibleItems: ['badge_special_event', 'badge_study_milestone'],
    rareChance: 0.3,
  },
  achievement_platinum: {
    name: 'Platinum Achievement Chest',
    guaranteedMinGC: 250,
    possibleItems: ['badge_special_event', 'badge_engineering_discipline'],
    rareChance: 0.5,
  },
};

// ============================================================================
// VARIABLE REWARD SYSTEM CLASS
// ============================================================================

/**
 * VariableRewardSystem class for managing random rewards
 * Implements weighted probability distribution and luck boosting
 */
export class VariableRewardSystem {
  private config: VariableRewardConfig;
  private tiers: Record<RewardTier, RewardTierConfig>;
  private daysWithoutRare: number;
  private currentLuckBooster: number;
  
  constructor(
    config: VariableRewardConfig = DEFAULT_VARIABLE_REWARD_CONFIG,
    tiers: Record<RewardTier, RewardTierConfig> = DEFAULT_REWARD_TIERS
  ) {
    this.config = config;
    this.tiers = tiers;
    this.daysWithoutRare = 0;
    this.currentLuckBooster = 0;
  }
  
  /**
   * Calculate random bonus reward after study session
   * @param baseXP - Base XP earned from activity
   * @returns VariableRewardResult with full details
   */
  calculateRandomBonus(baseXP: number): VariableRewardResult {
    // Apply luck booster to rare+ probabilities
    const adjustedProbabilities = this.getAdjustedProbabilities();
    
    // Roll for tier
    const roll = Math.random();
    let cumulativeProbability = 0;
    let selectedTier: RewardTier = 'common';
    
    const tierOrder: RewardTier[] = ['common', 'uncommon', 'rare', 'epic', 'legendary'];
    
    for (const tier of tierOrder) {
      cumulativeProbability += adjustedProbabilities[tier];
      if (roll <= cumulativeProbability) {
        selectedTier = tier;
        break;
      }
    }
    
    // Update luck tracking
    if (['rare', 'epic', 'legendary'].includes(selectedTier)) {
      if (this.config.resetLuckOnRare) {
        this.daysWithoutRare = 0;
        this.currentLuckBooster = 0;
      }
    } else {
      this.daysWithoutRare++;
      this.currentLuckBooster = Math.min(
        this.currentLuckBooster + this.config.luckBoosterPerDay,
        this.config.maxLuckBooster
      );
    }
    
    // Get tier configuration
    const tierConfig = this.tiers[selectedTier];
    
    // Calculate random XP bonus within range
    const xpBonus = this.getRandomInRange(tierConfig.xpRange);
    
    // Calculate random GC bonus (if applicable)
    const gcBonus = tierConfig.gcRange 
      ? this.getRandomInRange(tierConfig.gcRange)
      : 0;
    
    // Select random message
    const message = tierConfig.messages[
      Math.floor(Math.random() * tierConfig.messages.length)
    ];
    
    // Determine effect type
    const hasSpecialEffect = ['rare', 'epic', 'legendary'].includes(selectedTier);
    const effectType = selectedTier === 'legendary' ? 'fullScreenCelebration'
      : selectedTier === 'epic' ? 'enhancedParticles'
      : hasSpecialEffect ? 'simpleParticles'
      : 'none';
    
    return {
      tier: selectedTier,
      xpBonus,
      gcBonus,
      totalXP: baseXP + xpBonus,
      message,
      hasSpecialEffect,
      effectType,
      shareable: selectedTier === 'legendary',
      baseXP,
    };
  }
  
  /**
   * Get probabilities adjusted by luck booster
   */
  private getAdjustedProbabilities(): Record<RewardTier, number> {
    const probs = { ...this.config.tierProbabilities };
    
    if (this.currentLuckBooster <= 0) {
      return probs;
    }
    
    // Reduce common/uncommon probability proportionally
    const boostAmount = this.currentLuckBooster;
    const rarePlusTotal = probs.rare + probs.epic + probs.legendary;
    
    // Distribute boost among rare+ tiers
    probs.rare += boostAmount * (probs.rare / rarePlusTotal);
    probs.epic += boostAmount * (probs.epic / rarePlusTotal);
    probs.legendary += boostAmount * (probs.legendary / rarePlusTotal);
    
    // Reduce common to compensate
    probs.common -= boostAmount;
    
    // Ensure probabilities sum to 1
    const total = Object.values(probs).reduce((sum, p) => sum + p, 0);
    Object.keys(probs).forEach(key => {
      probs[key as RewardTier] /= total;
    });
    
    return probs;
  }
  
  /**
   * Get random number in range
   */
  private getRandomInRange(range: [number, number]): number {
    return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
  }
  
  /**
   * Get current luck booster status
   */
  getLuckStatus(): {
    daysWithoutRare: number;
    currentBooster: number;
    maxBooster: number;
    nextBoostAt: number;
  } {
    return {
      daysWithoutRare: this.daysWithoutRare,
      currentBooster: this.currentLuckBooster,
      maxBooster: this.config.maxLuckBooster,
      nextBoostAt: Math.ceil((this.config.maxLuckBooster - this.currentLuckBooster) / this.config.luckBoosterPerDay),
    };
  }
  
  /**
   * Reset luck state (for testing or admin purposes)
   */
  resetLuck(): void {
    this.daysWithoutRare = 0;
    this.currentLuckBooster = 0;
  }
}

// ============================================================================
// MYSTERY CHEST SYSTEM
// ============================================================================

/**
 * Open a mystery chest and receive rewards
 */
export function openMysteryChest(
  chestType: ChestType,
  userCollection: CollectionProgress
): {
  success: boolean;
  contents: ChestContents;
  isNewItem: boolean;
  message: string;
} {
  const config = MYSTERY_CHEST_CONFIGS[chestType];
  
  // Generate guaranteed GC
  const baseGC = config.guaranteedMinGC + Math.floor(Math.random() * config.guaranteedMinGC);
  
  // Determine if we get a rare item
  const isRare = Math.random() < config.rareChance;
  
  // Generate items
  const items: ChestContents['items'] = [];
  const itemCount = isRare ? 2 : 1;
  
  for (let i = 0; i < itemCount; i++) {
    const itemType = config.possibleItems[Math.floor(Math.random() * config.possibleItems.length)];
    const quantity = itemType.includes('fragment') ? Math.floor(Math.random() * 3) + 1 : 1;
    
    items.push({
      itemId: `${itemType}_${Date.now()}_${i}`,
      name: getItemName(itemType),
      type: itemType,
      quantity,
      rarity: isRare && i === 0 ? 'rare' : 'common',
    });
  }
  
  // Check if any item is new to collection
  const isNewItem = items.some(item => 
    !userCollection.collectedBadgeIds.includes(item.itemId)
  );
  
  // Determine animation type
  const animationType = isRare ? 'enhanced' : 'standard';
  
  return {
    success: true,
    contents: {
      items,
      totalGC: baseGC,
      totalXP: 0,
      animationType,
      hasRareItem: isRare,
    },
    isNewItem,
    message: isRare ? 'You found a rare item!' : 'Daily reward collected!',
  };
}

/**
 * Get display name for collection item type
 */
function getItemName(type: CollectionItemType): string {
  const names: Record<CollectionItemType, string> = {
    'badge_engineering_discipline': 'Engineering Badge',
    'badge_study_milestone': 'Milestone Badge',
    'badge_social_achievement': 'Social Badge',
    'badge_special_event': 'Event Badge',
    'fragment_cosmetic': 'Cosmetic Fragment',
    'fragment_powerup': 'Power-Up Fragment',
  };
  return names[type] || 'Unknown Item';
}

// ============================================================================
// COLLECTION MANAGEMENT
// ============================================================================

/**
 * Add badge to user's collection
 */
export function addBadgeToCollection(
  collection: CollectionProgress,
  badgeId: string
): {
  success: boolean;
  isNew: boolean;
  newlyCompletedSets: string[];
} {
  const isNew = !collection.collectedBadgeIds.includes(badgeId);
  
  if (isNew) {
    collection.collectedBadgeIds.push(badgeId);
  }
  
  // Check for newly completed sets
  const newlyCompletedSets: string[] = [];
  
  BADGE_COLLECTION_SETS.forEach(set => {
    if (!collection.completedSets.includes(set.id)) {
      const hasAllBadges = set.requiredBadges.every(
        badge => collection.collectedBadgeIds.includes(badge)
      );
      
      if (hasAllBadges) {
        collection.completedSets.push(set.id);
        newlyCompletedSets.push(set.id);
      }
    }
  });
  
  return {
    success: true,
    isNew,
    newlyCompletedSets,
  };
}

/**
 * Add fragment to collection (fragments combine into items)
 */
export function addFragmentToCollection(
  collection: CollectionProgress,
  fragmentType: string,
  quantity: number = 1
): {
  success: boolean;
  totalFragments: number;
  canCraft: boolean;
  fragmentsNeeded: number;
} {
  const FRAGMENTS_FOR_CRAFT = 10;
  
  const currentCount = collection.fragments[fragmentType] || 0;
  collection.fragments[fragmentType] = currentCount + quantity;
  
  const totalFragments = collection.fragments[fragmentType];
  const canCraft = totalFragments >= FRAGMENTS_FOR_CRAFT;
  const fragmentsNeeded = Math.max(0, FRAGMENTS_FOR_CRAFT - totalFragments);
  
  return {
    success: true,
    totalFragments,
    canCraft,
    fragmentsNeeded,
  };
}

/**
 * Get collection statistics
 */
export function getCollectionStats(collection: CollectionProgress): {
  totalBadges: number;
  totalFragments: number;
  completedSets: number;
  totalSets: number;
  completionPercentage: number;
  nextGoal?: string;
} {
  const totalFragments = Object.values(collection.fragments).reduce(
    (sum, count) => sum + count, 0
  );
  
  const completionPercentage = BADGE_COLLECTION_SETS.length > 0
    ? (collection.completedSets.length / BADGE_COLLECTION_SETS.length) * 100
    : 0;
  
  // Find next goal
  let nextGoal: string | undefined;
  for (const set of BADGE_COLLECTION_SETS) {
    if (!collection.completedSets.includes(set.id)) {
      const missing = set.requiredBadges.filter(
        badge => !collection.collectedBadgeIds.includes(badge)
      );
      nextGoal = `Collect ${missing.length} more badges for "${set.name}"`;
      break;
    }
  }
  
  return {
    totalBadges: collection.collectedBadgeIds.length,
    totalFragments,
    completedSets: collection.completedSets.length,
    totalSets: BADGE_COLLECTION_SETS.length,
    completionPercentage,
    nextGoal,
  };
}

// ============================================================================
// SURPRISE & DELIGHT EVENTS
// ============================================================================

/**
 * Check for random surprise events during study session
 */
export function checkSurpriseEvents(
  sessionData: {
    durationMinutes: number;
    hourOfDay: number;
    isWeekend: boolean;
    isPerfectScore: boolean;
    currentStreak: number;
    isReturnAfterAbsence: boolean;
    daysAbsent?: number;
  }
): Array<{
  eventType: string;
  triggerName: string;
  reward: { xp?: number; gc?: number };
  message: string;
}> {
  const events: Array<{
    eventType: string;
    triggerName: string;
    reward: { xp?: number; gc?: number };
    message: string;
  }> = [];
  
  // Golden Study Session (1% chance)
  if (Math.random() < 0.01) {
    events.push({
      eventType: 'golden_session',
      triggerName: 'Golden Study Session',
      reward: { xp: sessionData.durationMinutes * 10 }, // 5x normal XP
      message: '✨ GOLDEN SESSION! 5x XP for this study session! ✨',
    });
  }
  
  // Lucky Streak (0.5% chance)
  if (Math.random() < 0.005) {
    events.push({
      eventType: 'lucky_streak',
      triggerName: 'Lucky Streak',
      reward: { gc: 100 },
      message: '🍀 Lucky Streak! Free streak freeze awarded! 🍀',
    });
  }
  
  // Midnight Scholar (random late-night)
  if (sessionData.hourOfDay >= 0 && sessionData.hourOfDay < 5 && Math.random() < 0.1) {
    events.push({
      eventType: 'midnight_scholar',
      triggerName: 'Midnight Scholar',
      reward: { gc: 100 },
      message: '🌙 Burning the midnight oil? Here\'s 100 GC! 🌙',
    });
  }
  
  // Early Bird Special (random early morning)
  if (sessionData.hourOfDay >= 5 && sessionData.hourOfDay < 8 && Math.random() < 0.1) {
    events.push({
      eventType: 'early_bird',
      triggerName: 'Early Bird Special',
      reward: { gc: 100 },
      message: '🐦 Early bird gets the worm! 100 GC bonus! 🐦',
    });
  }
  
  // Comeback Kid (returning after absence)
  if (sessionData.isReturnAfterAbsence && sessionData.daysAbsent && sessionData.daysAbsent >= 30) {
    events.push({
      eventType: 'comeback_kid',
      triggerName: 'Comeback Kid',
      reward: { gc: 500 },
      message: '🎉 Welcome back! We missed you! Here\'s 500 GC to get started! 🎉',
    });
  }
  
  return events;
}

/**
 * Generate hidden milestone surprises
 */
export function checkHiddenMilestones(totalXP: number): {
  isHiddenMilestone: boolean;
  milestoneName?: string;
  bonusGC?: number;
  message?: string;
} {
  // Easter egg milestones at non-round numbers
  const easterEggMilestones = [347, 1337, 2500, 4200, 6900, 8888, 9999];
  
  for (const milestone of easterEggMilestones) {
    if (totalXP >= milestone && totalXP < milestone + 100) {
      return {
        isHiddenMilestone: true,
        milestoneName: `Hidden Milestone ${milestone}`,
        bonusGC: 50,
        message: `🎯 Hidden milestone reached! You've earned ${totalXP} XP! +50 GC bonus!`,
      };
    }
  }
  
  return { isHiddenMilestone: false };
}

// ============================================================================
// ANALYTICS & TRACKING
// ============================================================================

/**
 * Track variable reward statistics
 */
export interface RewardAnalytics {
  totalRewardsGiven: number;
  tierDistribution: Record<RewardTier, number>;
  averageXPBonus: number;
  averageGCBonus: number;
  legendaryDrops: number;
  luckBoosterActivations: number;
}

/**
 * Analyze reward patterns from history
 */
export function analyzeRewardPatterns(results: VariableRewardResult[]): RewardAnalytics {
  const analytics: RewardAnalytics = {
    totalRewardsGiven: results.length,
    tierDistribution: {
      common: 0,
      uncommon: 0,
      rare: 0,
      epic: 0,
      legendary: 0,
    },
    averageXPBonus: 0,
    averageGCBonus: 0,
    legendaryDrops: 0,
    luckBoosterActivations: 0,
  };
  
  if (results.length === 0) {
    return analytics;
  }
  
  let totalXP = 0;
  let totalGC = 0;
  
  results.forEach(result => {
    analytics.tierDistribution[result.tier]++;
    totalXP += result.xpBonus;
    totalGC += result.gcBonus;
    
    if (result.tier === 'legendary') {
      analytics.legendaryDrops++;
    }
  });
  
  analytics.averageXPBonus = totalXP / results.length;
  analytics.averageGCBonus = totalGC / results.length;
  
  return analytics;
}

/**
 * Validate reward distribution matches expected probabilities
 */
export function validateRewardDistribution(
  results: VariableRewardResult[],
  expectedProbabilities: Record<RewardTier, number>,
  tolerance: number = 0.05
): {
  isValid: boolean;
  deviations: Record<RewardTier, number>;
  warnings: string[];
} {
  const warnings: string[] = [];
  const deviations: Record<RewardTier, number> = {
    common: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
  };
  
  const actualDistribution: Record<RewardTier, number> = {
    common: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
  };
  
  results.forEach(r => actualDistribution[r.tier]++);
  
  Object.keys(actualDistribution).forEach(key => {
    const tier = key as RewardTier;
    actualDistribution[tier] /= results.length;
    deviations[tier] = Math.abs(actualDistribution[tier] - expectedProbabilities[tier]);
    
    if (deviations[tier] > tolerance) {
      warnings.push(
        `${tier} distribution off by ${(deviations[tier] * 100).toFixed(2)}%`
      );
    }
  });
  
  return {
    isValid: warnings.length === 0,
    deviations,
    warnings,
  };
}
