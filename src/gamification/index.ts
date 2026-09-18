/**
 * Engineering Study Guide App - Gamification Module
 * 
 * Phase 2: Gamification Mechanics Design
 * Phase Group: 1 - Foundation & Strategy
 * 
 * This module implements the psychological hooks that make studying addictive 
 * for engineering students. It leverages behavioral psychology principles:
 * - Variable rewards
 * - Loss aversion
 * - Social proof
 * - Progression systems
 * 
 * The gamification system is designed to feel authentic to the engineering 
 * student experience, not like a superficial layer. Every game mechanic serves 
 * a pedagogical purpose and aligns with core personas' motivations.
 * 
 * MODULES INCLUDED:
 * - rankSystem.ts: Engineering Rank progression (50 ranks, 5 tiers)
 * - streakSystem.ts: Streak management with freeze mechanics
 * - xpMultiplier.ts: XP calculation with stacked multipliers
 * - gearCoinsEconomy.ts: Virtual currency economy
 * - variableRewards.ts: Random reward schedules
 * - index.ts: Public API exports
 */

// Export all gamification modules
export * from './rankSystem';
export * from './streakSystem';
export * from './xpMultiplier';
export * from './gearCoinsEconomy';
export * from './variableRewards';

// Export types
export type {
  RankData,
  RankTier,
  TierBenefits,
  RankUpResult,
} from './rankSystem';

export type {
  StreakData,
  FreezeType,
  StreakRecoveryMethod,
  StreakUpdateResult,
} from './streakSystem';

export type {
  XPBreakdown,
  MultiplierCondition,
  MultiplierInfo,
} from './xpMultiplier';

export type {
  GearCoinTransaction,
  TransactionType,
  EconomyConfig,
} from './gearCoinsEconomy';

export type {
  VariableRewardConfig,
  MysteryChestTier,
  CollectionItem,
  RewardResult,
} from './variableRewards';
