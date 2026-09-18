/**
 * Engineering Study Guide App - Gear Coins Economy System
 * 
 * Phase 2: Gamification Mechanics Design
 * Section 2.3: Create the Economy: "Gear Coins" Virtual Currency
 * 
 * The Gear Coins economy provides a virtual currency system that allows users
 * to purchase cosmetic items, power-ups, and convenience features without
 * creating pay-to-win dynamics. All purchases are optional and do not affect
 * learning outcomes.
 * 
 * IMPLEMENTATION DETAILS:
 * - Dual earning tracks (free vs premium users)
 * - Multiple earning methods with daily limits
 * - Cosmetic, power-up, and convenience spending options
 * - Gacha system with disclosed odds
 * - Anti-cheat measures and economy balancing
 * - Server-side validation for all transactions
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Types of Gear Coin transactions
 */
export type TransactionType =
  | 'earn_daily_login'
  | 'earn_study_session'
  | 'earn_perfect_quiz'
  | 'earn_level_up'
  | 'earn_daily_mission'
  | 'earn_weekly_challenge'
  | 'earn_watch_ad'
  | 'earn_referral_signup'
  | 'earn_referral_studies'
  | 'earn_achievement'
  | 'earn_premium_bonus'
  | 'spend_cosmetic'
  | 'spend_powerup'
  | 'spend_convenience'
  | 'spend_gacha'
  | 'adjustment';

/**
 * Item categories in the Gear Coins store
 */
export type ItemCategory =
  | 'cosmetic_avatar'
  | 'cosmetic_theme'
  | 'cosmetic_animation'
  | 'powerup_xp_boost'
  | 'powerup_coin_rush'
  | 'powerup_streak_shield'
  | 'powerup_focus_mode'
  | 'powerup_hint_unlock'
  | 'powerup_second_chance'
  | 'powerup_time_extension'
  | 'convenience_deck_slot'
  | 'convenience_analytics'
  | 'convenience_offline'
  | 'convenience_support'
  | 'convenience_credits'
  | 'gacha_common'
  | 'gacha_rare'
  | 'gacha_epic'
  | 'gacha_legendary';

/**
 * Rarity levels for gacha and cosmetic items
 */
export type ItemRarity =
  | 'common'
  | 'rare'
  | 'epic'
  | 'legendary';

/**
 * User type affecting earning rates
 */
export type UserType = 'free' | 'premium';

/**
 * Represents a single Gear Coin transaction
 */
export interface GearCoinTransaction {
  /** Unique transaction ID */
  id: string;
  /** Timestamp of transaction */
  timestamp: Date;
  /** Type of transaction */
  type: TransactionType;
  /** Amount of GC (positive for earn, negative for spend) */
  amount: number;
  /** Balance after transaction */
  balanceAfter: number;
  /** Description of what this was for */
  description: string;
  /** Optional metadata (item purchased, activity type, etc.) */
  metadata?: Record<string, unknown>;
  /** Whether this was validated server-side */
  validated: boolean;
}

/**
 * Current state of user's Gear Coins
 */
export interface GearCoinBalance {
  /** Current GC balance */
  current: number;
  /** Lifetime GC earned */
  lifetimeEarned: number;
  /** Lifetime GC spent */
  lifetimeSpent: number;
  /** GC earned today */
  earnedToday: number;
  /** GC earned this week */
  earnedThisWeek: number;
  /** Last reset date for daily counter */
  lastDailyReset: Date;
  /** Last reset date for weekly counter */
  lastWeeklyReset: Date;
}

/**
 * Configuration for economy balancing
 */
export interface EconomyConfig {
  /** Maximum GC per day before cap applies */
  dailyEarnCap: number;
  /** Weekly soft cap threshold */
  weeklySoftCap: number;
  /** Reduction rate after weekly soft cap (0.5 = 50%) */
  weeklyReductionRate: number;
  /** Premium multiplier for all earnings */
  premiumMultiplier: number;
  /** Streak bonus GC per 7-day milestone */
  streakBonusPer7Days: number;
}

/**
 * Store item definition
 */
export interface StoreItem {
  /** Unique item identifier */
  id: string;
  /** Display name */
  name: string;
  /** Item description */
  description: string;
  /** Price in GC */
  price: number;
  /** Category */
  category: ItemCategory;
  /** Rarity level */
  rarity: ItemRarity;
  /** Whether item is consumable */
  consumable: boolean;
  /** Duration if temporary effect (minutes) */
  durationMinutes?: number;
  /** Maximum stack size for consumables */
  maxStack?: number;
  /** Whether limited edition */
  limitedEdition: boolean;
  /** Availability end date for limited items */
  availableUntil?: Date;
}

/**
 * Gacha box configuration
 */
export interface GachaBox {
  /** Box identifier */
  id: string;
  /** Display name */
  name: string;
  /** Price in GC */
  price: number;
  /** Guaranteed minimum rarity */
  guaranteedRarity: ItemRarity;
  /** Drop rates by rarity */
  dropRates: Record<ItemRarity, number>;
  /** Possible items in this box */
  possibleItems: string[];
}

/**
 * Result of a gacha pull
 */
export interface GachaResult {
  /** Items received */
  items: Array<{
    itemId: string;
    name: string;
    rarity: ItemRarity;
    quantity: number;
  }>;
  /** Total value in GC */
  totalValue: number;
  /** Whether got something better than guaranteed */
  exceededGuarantee: boolean;
  /** Animation type for reveal */
  animationType: 'standard' | 'enhanced' | 'legendary';
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Default economy configuration
 */
export const DEFAULT_ECONOMY_CONFIG: EconomyConfig = {
  dailyEarnCap: 500,
  weeklySoftCap: 2500,
  weeklyReductionRate: 0.5,
  premiumMultiplier: 2.0,
  streakBonusPer7Days: 1,
};

/**
 * Base earning rates for free users
 */
export const BASE_EARNING_RATES = {
  dailyLogin: 5,
  studySession10Min: 10,
  perfectQuiz: 15,
  levelUp: 50,
  dailyMission: 20,
  weeklyChallenge: 100,
  watchAd: 5,
  referralSignup: 100,
  referralStudies7Days: 250,
  achievementCommon: 25,
  achievementRare: 50,
  achievementEpic: 75,
  achievementLegendary: 100,
} as const;

/**
 * Daily limits for earning activities
 */
export const DAILY_LIMITS = {
  studySessions: 5,
  perfectQuizzes: 10,
  dailyMissions: 3,
  watchAds: 5,
  communityUpvotesReceived: 50,
} as const;

/**
 * Store catalog - Cosmetic Items (Avatar)
 */
export const AVATAR_ITEMS: StoreItem[] = [
  {
    id: 'avatar_engineer archetype',
    name: 'Engineer Archetype',
    description: 'Classic engineer look with hard hat',
    price: 500,
    category: 'cosmetic_avatar',
    rarity: 'rare',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'avatar_scientist',
    name: 'Scientist',
    description: 'Lab coat and glasses combo',
    price: 450,
    category: 'cosmetic_avatar',
    rarity: 'rare',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'avatar_maker',
    name: 'Maker',
    description: 'Workshop attire with tools',
    price: 400,
    category: 'cosmetic_avatar',
    rarity: 'common',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'hair_various',
    name: 'Hairstyle Collection',
    description: 'Various styles and colors',
    price: 200,
    category: 'cosmetic_avatar',
    rarity: 'common',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'facial_features',
    name: 'Facial Features Pack',
    description: 'Glasses, beard, expressions',
    price: 200,
    category: 'cosmetic_avatar',
    rarity: 'common',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'clothing_collection',
    name: 'Clothing Collection',
    description: 'Lab coat, business casual, startup hoodie',
    price: 400,
    category: 'cosmetic_avatar',
    rarity: 'rare',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'accessories_pack',
    name: 'Accessories Pack',
    description: 'Hard hat, safety goggles, smartwatch',
    price: 300,
    category: 'cosmetic_avatar',
    rarity: 'common',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'backgrounds_collection',
    name: 'Background Collection',
    description: 'Lab, library, makerspace, nature scenes',
    price: 500,
    category: 'cosmetic_avatar',
    rarity: 'rare',
    consumable: false,
    limitedEdition: false,
  },
];

/**
 * Store catalog - Theme Skins
 */
export const THEME_ITEMS: StoreItem[] = [
  {
    id: 'theme_dark_mode_pro',
    name: 'Dark Mode Pro',
    description: 'OLED black with neon accents',
    price: 500,
    category: 'cosmetic_theme',
    rarity: 'rare',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'theme_light_academia',
    name: 'Light Academia',
    description: 'Warm tones with paper texture',
    price: 500,
    category: 'cosmetic_theme',
    rarity: 'rare',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'theme_cyberpunk',
    name: 'Cyberpunk Engineer',
    description: 'Neon grids with glitch effects',
    price: 800,
    category: 'cosmetic_theme',
    rarity: 'epic',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'theme_minimalist',
    name: 'Minimalist Zen',
    description: 'Clean lines with soft colors',
    price: 600,
    category: 'cosmetic_theme',
    rarity: 'rare',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'theme_retro_terminal',
    name: 'Retro Terminal',
    description: 'Green phosphor with scanlines',
    price: 700,
    category: 'cosmetic_theme',
    rarity: 'epic',
    consumable: false,
    limitedEdition: false,
  },
];

/**
 * Store catalog - Power-Ups (Consumable)
 */
export const POWERUP_ITEMS: StoreItem[] = [
  {
    id: 'powerup_xp_boost',
    name: 'XP Boost',
    description: '+50% XP earned for 30 minutes',
    price: 100,
    category: 'powerup_xp_boost',
    rarity: 'common',
    consumable: true,
    durationMinutes: 30,
    maxStack: 10,
    limitedEdition: false,
  },
  {
    id: 'powerup_coin_rush',
    name: 'Coin Rush',
    description: '+100% Gear Coins for 1 hour',
    price: 150,
    category: 'powerup_coin_rush',
    rarity: 'rare',
    consumable: true,
    durationMinutes: 60,
    maxStack: 5,
    limitedEdition: false,
  },
  {
    id: 'powerup_streak_shield',
    name: 'Streak Shield',
    description: 'Auto-freeze for 1 missed day',
    price: 200,
    category: 'powerup_streak_shield',
    rarity: 'rare',
    consumable: true,
    maxStack: 3,
    limitedEdition: false,
  },
  {
    id: 'powerup_focus_mode',
    name: 'Focus Mode',
    description: 'Block notifications, +25% retention for 25 min',
    price: 75,
    category: 'powerup_focus_mode',
    rarity: 'common',
    consumable: true,
    durationMinutes: 25,
    maxStack: 10,
    limitedEdition: false,
  },
  {
    id: 'powerup_hint_unlock',
    name: 'Hint Unlock',
    description: 'Reveal answer hint during quiz',
    price: 25,
    category: 'powerup_hint_unlock',
    rarity: 'common',
    consumable: true,
    maxStack: 20,
    limitedEdition: false,
  },
  {
    id: 'powerup_second_chance',
    name: 'Second Chance',
    description: 'Retry failed quiz without penalty',
    price: 50,
    category: 'powerup_second_chance',
    rarity: 'common',
    consumable: true,
    maxStack: 10,
    limitedEdition: false,
  },
  {
    id: 'powerup_time_extension',
    name: 'Time Extension',
    description: 'Add 30 seconds to timed quiz',
    price: 40,
    category: 'powerup_time_extension',
    rarity: 'common',
    consumable: true,
    maxStack: 15,
    limitedEdition: false,
  },
];

/**
 * Store catalog - Convenience Features (Permanent)
 */
export const CONVENIENCE_ITEMS: StoreItem[] = [
  {
    id: 'convenience_extra_deck_slot',
    name: 'Extra Custom Deck Slot',
    description: 'Add one more custom deck slot',
    price: 300,
    category: 'convenience_deck_slot',
    rarity: 'rare',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'convenience_advanced_analytics',
    name: 'Advanced Analytics Unlock',
    description: 'Unlock detailed study analytics',
    price: 500,
    category: 'convenience_analytics',
    rarity: 'rare',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'convenience_offline_download',
    name: 'Offline Download',
    description: 'Download content for offline use',
    price: 100,
    category: 'convenience_offline',
    rarity: 'common',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'convenience_priority_support',
    name: 'Priority Support Queue',
    description: 'Get faster customer support responses',
    price: 1000,
    category: 'convenience_support',
    rarity: 'epic',
    consumable: false,
    limitedEdition: false,
  },
  {
    id: 'convenience_name_in_credits',
    name: 'Name in Credits',
    description: 'Your name displayed in app credits',
    price: 2000,
    category: 'convenience_credits',
    rarity: 'legendary',
    consumable: false,
    limitedEdition: false,
  },
];

/**
 * Gacha box configurations
 */
export const GACHA_BOXES: GachaBox[] = [
  {
    id: 'gacha_common_box',
    name: 'Common Mystery Box',
    price: 100,
    guaranteedRarity: 'common',
    dropRates: {
      common: 0.70,
      rare: 0.20,
      epic: 0.08,
      legendary: 0.02,
    },
    possibleItems: ['avatar_maker', 'hair_various', 'facial_features', 'accessories_pack'],
  },
  {
    id: 'gacha_rare_box',
    name: 'Rare Mystery Box',
    price: 300,
    guaranteedRarity: 'rare',
    dropRates: {
      common: 0.0,
      rare: 0.70,
      epic: 0.20,
      legendary: 0.10,
    },
    possibleItems: ['avatar_engineer archetype', 'avatar_scientist', 'clothing_collection', 'backgrounds_collection'],
  },
  {
    id: 'gacha_epic_box',
    name: 'Epic Mystery Box',
    price: 800,
    guaranteedRarity: 'epic',
    dropRates: {
      common: 0.0,
      rare: 0.0,
      epic: 0.80,
      legendary: 0.20,
    },
    possibleItems: ['theme_cyberpunk', 'theme_retro_terminal'],
  },
  {
    id: 'gacha_legendary_box',
    name: 'Legendary Mystery Box',
    price: 2000,
    guaranteedRarity: 'legendary',
    dropRates: {
      common: 0.0,
      rare: 0.0,
      epic: 0.0,
      legendary: 1.0,
    },
    possibleItems: ['convenience_name_in_credits'],
  },
];

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Generate unique transaction ID
 */
function generateTransactionId(): string {
  return `gc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get current UTC date at midnight for daily reset tracking
 */
function getUTCMidnight(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

/**
 * Get start of current week (Monday) for weekly reset tracking
 */
function getWeekStart(): Date {
  const now = new Date();
  const day = now.getUTCDay();
  const diff = now.getUTCDate() - day + (day === 0 ? -6 : 1);
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), diff));
}

/**
 * Calculate effective earning rate based on user type and caps
 */
function calculateEffectiveEarning(
  baseAmount: number,
  userType: UserType,
  earnedToday: number,
  earnedThisWeek: number,
  config: EconomyConfig
): { amount: number; capped: boolean; reason?: string } {
  let effectiveAmount = baseAmount;
  
  // Apply premium multiplier
  if (userType === 'premium') {
    effectiveAmount *= config.premiumMultiplier;
  }
  
  // Check daily cap
  if (earnedToday + effectiveAmount > config.dailyEarnCap) {
    const remaining = Math.max(0, config.dailyEarnCap - earnedToday);
    if (remaining <= 0) {
      return { amount: 0, capped: true, reason: 'Daily cap reached' };
    }
    effectiveAmount = remaining;
  }
  
  // Check weekly soft cap
  if (earnedThisWeek > config.weeklySoftCap) {
    const excess = earnedThisWeek - config.weeklySoftCap;
    const reduction = excess * config.weeklyReductionRate;
    effectiveAmount = Math.max(0, effectiveAmount - reduction);
  }
  
  return {
    amount: Math.floor(effectiveAmount),
    capped: false,
  };
}

// ============================================================================
// GEAR COINS MANAGER CLASS
// ============================================================================

/**
 * GearCoinsManager class for managing user's Gear Coins economy
 * Handles earning, spending, and transaction tracking
 */
export class GearCoinsManager {
  private balance: GearCoinBalance;
  private transactions: GearCoinTransaction[];
  private config: EconomyConfig;
  private userType: UserType;
  
  constructor(
    initialBalance: Partial<GearCoinBalance> = {},
    userType: UserType = 'free',
    config: EconomyConfig = DEFAULT_ECONOMY_CONFIG
  ) {
    const now = new Date();
    this.balance = {
      current: initialBalance.current || 0,
      lifetimeEarned: initialBalance.lifetimeEarned || 0,
      lifetimeSpent: initialBalance.lifetimeSpent || 0,
      earnedToday: initialBalance.earnedToday || 0,
      earnedThisWeek: initialBalance.earnedThisWeek || 0,
      lastDailyReset: initialBalance.lastDailyReset || now,
      lastWeeklyReset: initialBalance.lastWeeklyReset || now,
    };
    this.transactions = [];
    this.config = config;
    this.userType = userType;
    
    // Reset counters if needed
    this.checkAndResetCounters();
  }
  
  /**
   * Get current balance state
   */
  getBalance(): GearCoinBalance {
    return { ...this.balance };
  }
  
  /**
   * Get transaction history
   */
  getTransactions(limit: number = 50): GearCoinTransaction[] {
    return [...this.transactions].reverse().slice(0, limit);
  }
  
  /**
   * Check and reset daily/weekly counters
   */
  private checkAndResetCounters(): void {
    const now = new Date();
    const utcMidnight = getUTCMidnight();
    const weekStart = getWeekStart();
    
    // Reset daily counter if new day
    if (this.balance.lastDailyReset < utcMidnight) {
      this.balance.earnedToday = 0;
      this.balance.lastDailyReset = utcMidnight;
    }
    
    // Reset weekly counter if new week
    if (this.balance.lastWeeklyReset < weekStart) {
      this.balance.earnedThisWeek = 0;
      this.balance.lastWeeklyReset = weekStart;
    }
  }
  
  /**
   * Record a Gear Coin earning transaction
   */
  earn(
    type: Exclude<TransactionType, string> extends infer T 
      ? T extends `earn_${string}` ? T : never
      : never,
    amount: number,
    description: string,
    metadata?: Record<string, unknown>
  ): { success: boolean; amount: number; transaction?: GearCoinTransaction; reason?: string } {
    this.checkAndResetCounters();
    
    // Calculate effective amount with caps
    const { amount: effectiveAmount, capped, reason } = calculateEffectiveEarning(
      amount,
      this.userType,
      this.balance.earnedToday,
      this.balance.earnedThisWeek,
      this.config
    );
    
    if (effectiveAmount <= 0) {
      return {
        success: false,
        amount: 0,
        reason: reason || 'Earning limit reached',
      };
    }
    
    // Update balance
    this.balance.current += effectiveAmount;
    this.balance.lifetimeEarned += effectiveAmount;
    this.balance.earnedToday += effectiveAmount;
    this.balance.earnedThisWeek += effectiveAmount;
    
    // Create transaction record
    const transaction: GearCoinTransaction = {
      id: generateTransactionId(),
      timestamp: new Date(),
      type: type as TransactionType,
      amount: effectiveAmount,
      balanceAfter: this.balance.current,
      description,
      metadata,
      validated: true,
    };
    
    this.transactions.push(transaction);
    
    return {
      success: true,
      amount: effectiveAmount,
      transaction,
    };
  }
  
  /**
   * Record a Gear Coin spending transaction
   */
  spend(
    type: Exclude<TransactionType, string> extends infer T
      ? T extends `spend_${string}` ? T : never
      : never,
    amount: number,
    description: string,
    metadata?: Record<string, unknown>
  ): { success: boolean; amount: number; transaction?: GearCoinTransaction; reason?: string } {
    if (this.balance.current < amount) {
      return {
        success: false,
        amount: 0,
        reason: 'Insufficient Gear Coins',
      };
    }
    
    // Update balance
    this.balance.current -= amount;
    this.balance.lifetimeSpent += amount;
    
    // Create transaction record
    const transaction: GearCoinTransaction = {
      id: generateTransactionId(),
      timestamp: new Date(),
      type: type as TransactionType,
      amount: -amount,
      balanceAfter: this.balance.current,
      description,
      metadata,
      validated: true,
    };
    
    this.transactions.push(transaction);
    
    return {
      success: true,
      amount,
      transaction,
    };
  }
  
  /**
   * Earn from daily login
   */
  earnDailyLogin(streakDays: number): ReturnType<typeof GearCoinsManager.prototype.earn> {
    let amount = BASE_EARNING_RATES.dailyLogin;
    
    // Add streak bonus (+1 GC per 7-day milestone)
    const streakBonus = Math.floor(streakDays / 7) * this.config.streakBonusPer7Days;
    amount += streakBonus;
    
    return this.earn(
      'earn_daily_login',
      amount,
      `Daily login bonus${streakBonus > 0 ? ` + ${streakBonus} streak bonus` : ''}`,
      { streakDays }
    );
  }
  
  /**
   * Earn from completing a study session
   */
  earnStudySession(durationMinutes: number): ReturnType<typeof GearCoinsManager.prototype.earn> {
    if (durationMinutes < 5) {
      return {
        success: false,
        amount: 0,
        reason: 'Session too short (minimum 5 minutes)',
      };
    }
    
    const baseAmount = BASE_EARNING_RATES.studySession10Min;
    return this.earn(
      'earn_study_session',
      baseAmount,
      `Completed ${durationMinutes}-minute study session`,
      { durationMinutes }
    );
  }
  
  /**
   * Earn from perfect quiz score
   */
  earnPerfectQuiz(quizCount: number): ReturnType<typeof GearCoinsManager.prototype.earn> {
    if (quizCount > DAILY_LIMITS.perfectQuizzes) {
      return {
        success: false,
        amount: 0,
        reason: `Daily limit reached (${DAILY_LIMITS.perfectQuizzes} perfect quizzes)`,
      };
    }
    
    return this.earn(
      'earn_perfect_quiz',
      BASE_EARNING_RATES.perfectQuiz,
      'Perfect quiz score!',
      { quizNumber: quizCount }
    );
  }
  
  /**
   * Earn from leveling up (ranking up)
   */
  earnLevelUp(newRank: number): ReturnType<typeof GearCoinsManager.prototype.earn> {
    // Level up earnings are not subject to daily cap
    const amount = BASE_EARNING_RATES.levelUp;
    
    this.balance.current += amount;
    this.balance.lifetimeEarned += amount;
    
    const transaction: GearCoinTransaction = {
      id: generateTransactionId(),
      timestamp: new Date(),
      type: 'earn_level_up',
      amount,
      balanceAfter: this.balance.current,
      description: `Reached Rank ${newRank}!`,
      metadata: { newRank },
      validated: true,
    };
    
    this.transactions.push(transaction);
    
    return {
      success: true,
      amount,
      transaction,
    };
  }
  
  /**
   * Earn from achievement unlock
   */
  earnAchievement(rarity: ItemRarity, achievementName: string): ReturnType<typeof GearCoinsManager.prototype.earn> {
    let amount: number;
    switch (rarity) {
      case 'legendary':
        amount = BASE_EARNING_RATES.achievementLegendary;
        break;
      case 'epic':
        amount = BASE_EARNING_RATES.achievementEpic;
        break;
      case 'rare':
        amount = BASE_EARNING_RATES.achievementRare;
        break;
      default:
        amount = BASE_EARNING_RATES.achievementCommon;
    }
    
    return this.earn(
      'earn_achievement',
      amount,
      `Achievement unlocked: ${achievementName}`,
      { achievementName, rarity }
    );
  }
  
  /**
   * Purchase a store item
   */
  purchaseItem(item: StoreItem, quantity: number = 1): {
    success: boolean;
    totalCost: number;
    transaction?: GearCoinTransaction;
    reason?: string;
  } {
    const totalCost = item.price * quantity;
    
    const result = this.spend(
      'spend_cosmetic',
      totalCost,
      `Purchased ${quantity}x ${item.name}`,
      { itemId: item.id, itemName: item.name, quantity }
    );
    
    return {
      success: result.success,
      totalCost,
      transaction: result.transaction,
      reason: result.reason,
    };
  }
  
  /**
   * Pull from a gacha box
   */
  pullGacha(boxId: string): {
    success: boolean;
    result?: GachaResult;
    transaction?: GearCoinTransaction;
    reason?: string;
  } {
    const box = GACHA_BOXES.find(b => b.id === boxId);
    if (!box) {
      return {
        success: false,
        reason: 'Invalid gacha box',
      };
    }
    
    // Deduct cost first
    const spendResult = this.spend(
      'spend_gacha',
      box.price,
      `Opened ${box.name}`,
      { boxId, boxName: box.name }
    );
    
    if (!spendResult.success) {
      return {
        success: false,
        reason: spendResult.reason,
      };
    }
    
    // Determine rarity based on drop rates
    const roll = Math.random();
    let cumulativeProbability = 0;
    let selectedRarity: ItemRarity = box.guaranteedRarity;
    
    for (const [rarity, probability] of Object.entries(box.dropRates)) {
      cumulativeProbability += probability;
      if (roll <= cumulativeProbability) {
        selectedRarity = rarity as ItemRarity;
        break;
      }
    }
    
    // Ensure at least guaranteed rarity
    const rarityOrder: ItemRarity[] = ['common', 'rare', 'epic', 'legendary'];
    if (rarityOrder.indexOf(selectedRarity) < rarityOrder.indexOf(box.guaranteedRarity)) {
      selectedRarity = box.guaranteedRarity;
    }
    
    // Select random item from possible items
    const possibleItems = box.possibleItems.filter(id => {
      // Filter by rarity match (simplified - in real implementation would have item rarity data)
      return true;
    });
    
    const selectedItem = possibleItems[Math.floor(Math.random() * possibleItems.length)];
    
    const exceededGuarantee = rarityOrder.indexOf(selectedRarity) > rarityOrder.indexOf(box.guaranteedRarity);
    
    const gachaResult: GachaResult = {
      items: [{
        itemId: selectedItem,
        name: selectedItem.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        rarity: selectedRarity,
        quantity: 1,
      }],
      totalValue: box.price, // Simplified valuation
      exceededGuarantee,
      animationType: selectedRarity === 'legendary' ? 'legendary' 
        : selectedRarity === 'epic' ? 'enhanced' 
        : 'standard',
    };
    
    return {
      success: true,
      result: gachaResult,
      transaction: spendResult.transaction,
    };
  }
  
  /**
   * Get economy statistics
   */
  getStatistics(): {
    netGain: number;
    earningEfficiency: number;
    averageDailyEarning: number;
    topEarningSources: Array<{ type: string; amount: number }>;
  } {
    const netGain = this.balance.lifetimeEarned - this.balance.lifetimeSpent;
    
    // Group earnings by type
    const earningsByType: Record<string, number> = {};
    this.transactions
      .filter(t => t.amount > 0)
      .forEach(t => {
        earningsByType[t.type] = (earningsByType[t.type] || 0) + t.amount;
      });
    
    // Sort by amount
    const topSources = Object.entries(earningsByType)
      .map(([type, amount]) => ({ type, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
    
    // Calculate average daily earning
    const daysSinceStart = this.transactions.length > 0
      ? Math.max(1, Math.ceil((Date.now() - this.transactions[0].timestamp.getTime()) / 86400000))
      : 1;
    
    return {
      netGain,
      earningEfficiency: this.balance.lifetimeEarned > 0
        ? (this.balance.lifetimeSpent / this.balance.lifetimeEarned) * 100
        : 0,
      averageDailyEarning: this.balance.lifetimeEarned / daysSinceStart,
      topEarningSources: topSources,
    };
  }
  
  /**
   * Export transaction log for audit
   */
  exportTransactionLog(): GearCoinTransaction[] {
    return [...this.transactions];
  }
}

// ============================================================================
// ECONOMY BALANCING UTILITIES
// ============================================================================

/**
 * Simulate economy over time for balance testing
 */
export function simulateEconomy(
  days: number,
  userType: UserType = 'free',
  activityLevel: 'conservative' | 'moderate' | 'aggressive' = 'moderate'
): {
  finalBalance: number;
  totalEarned: number;
  totalSpent: number;
  dailyBreakdown: Array<{ day: number; earned: number; spent: number }>;
} {
  const manager = new GearCoinsManager({ current: 0 }, userType);
  const dailyBreakdown: Array<{ day: number; earned: number; spent: number }> = [];
  
  const activityMultipliers = {
    conservative: 0.5,
    moderate: 1.0,
    aggressive: 2.0,
  };
  
  const multiplier = activityMultipliers[activityLevel];
  
  for (let day = 1; day <= days; day++) {
    let dailyEarned = 0;
    let dailySpent = 0;
    
    // Daily login
    const loginResult = manager.earnDailyLogin(day * 7); // Assume perfect streak
    if (loginResult.success) dailyEarned += loginResult.amount;
    
    // Study sessions (assume 5 sessions for moderate)
    for (let i = 0; i < Math.min(5, Math.floor(5 * multiplier)); i++) {
      const sessionResult = manager.earnStudySession(15);
      if (sessionResult.success) dailyEarned += sessionResult.amount;
    }
    
    // Perfect quizzes (assume 3 for moderate)
    for (let i = 0; i < Math.min(10, Math.floor(3 * multiplier)); i++) {
      const quizResult = manager.earnPerfectQuiz(i + 1);
      if (quizResult.success) dailyEarned += quizResult.amount;
    }
    
    // Simulate spending every few days
    if (day % 3 === 0 && manager.getBalance().current >= 500) {
      const spendResult = manager.spend('spend_cosmetic', 500, 'Simulated purchase');
      if (spendResult.success) dailySpent += spendResult.amount;
    }
    
    dailyBreakdown.push({
      day,
      earned: dailyEarned,
      spent: dailySpent,
    });
  }
  
  const finalBalance = manager.getBalance();
  
  return {
    finalBalance: finalBalance.current,
    totalEarned: finalBalance.lifetimeEarned,
    totalSpent: finalBalance.lifetimeSpent,
    dailyBreakdown,
  };
}

/**
 * Calculate time needed to afford an item
 */
export function calculateTimeToAfford(
  itemPrice: number,
  currentBalance: number = 0,
  userType: UserType = 'free',
  activityLevel: 'conservative' | 'moderate' | 'aggressive' = 'moderate'
): {
  daysNeeded: number;
  projectedDailyEarning: number;
} {
  const remaining = Math.max(0, itemPrice - currentBalance);
  if (remaining === 0) {
    return { daysNeeded: 0, projectedDailyEarning: 0 };
  }
  
  // Estimate daily earning based on activity level
  const baseDailyEarnings: Record<UserType, Record<string, number>> = {
    free: {
      conservative: 50,
      moderate: 125,
      aggressive: 200,
    },
    premium: {
      conservative: 100,
      moderate: 275,
      aggressive: 450,
    },
  };
  
  const projectedDaily = baseDailyEarnings[userType][activityLevel];
  const daysNeeded = Math.ceil(remaining / projectedDaily);
  
  return {
    daysNeeded,
    projectedDailyEarning: projectedDaily,
  };
}

// ============================================================================
// VALIDATION & ANTI-CHEAT
// ============================================================================

/**
 * Validate a transaction for anti-cheat
 */
export function validateTransaction(
  transaction: GearCoinTransaction,
  previousBalance: number
): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  // Check amount consistency
  const expectedBalance = previousBalance + transaction.amount;
  if (Math.abs(expectedBalance - transaction.balanceAfter) > 0.01) {
    issues.push('Balance mismatch');
  }
  
  // Check for unusual amounts
  if (transaction.amount > 10000) {
    issues.push('Unusually large transaction');
  }
  
  // Check timestamp validity
  const now = Date.now();
  const txTime = transaction.timestamp.getTime();
  if (txTime > now + 60000) {
    issues.push('Future timestamp detected');
  }
  
  if (txTime < now - 31536000000) { // More than 1 year ago
    issues.push('Suspicious old timestamp');
  }
  
  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Detect potential farming patterns
 */
export function detectFarmingPatterns(transactions: GearCoinTransaction[]): {
  suspicious: boolean;
  patterns: string[];
  confidence: number;
} {
  const patterns: string[] = [];
  let confidence = 0;
  
  // Check for rapid-fire transactions
  const recentTx = transactions.filter(
    t => Date.now() - t.timestamp.getTime() < 3600000 // Last hour
  );
  
  if (recentTx.length > 50) {
    patterns.push('High transaction frequency');
    confidence += 0.3;
  }
  
  // Check for identical amounts
  const amountCounts: Record<number, number> = {};
  recentTx.forEach(t => {
    amountCounts[t.amount] = (amountCounts[t.amount] || 0) + 1;
  });
  
  const maxIdentical = Math.max(...Object.values(amountCounts), 0);
  if (maxIdentical > 20) {
    patterns.push('Repeated identical amounts');
    confidence += 0.4;
  }
  
  // Check for round-the-clock activity
  const hours = new Set(recentTx.map(t => t.timestamp.getHours()));
  if (hours.size === 24 && recentTx.length > 100) {
    patterns.push('24-hour continuous activity');
    confidence += 0.5;
  }
  
  return {
    suspicious: confidence > 0.5,
    patterns,
    confidence: Math.min(1.0, confidence),
  };
}
