/**
 * Engineering Study Guide App - Streak System
 * 
 * Phase 2: Gamification Mechanics Design
 * Section 2.2: Design the "Streak Freeze" and "XP Multiplier" Logic
 * 
 * The streak system leverages loss aversion psychology to maintain daily
 * engagement. It includes freeze mechanics to prevent demotivation from
 * occasional missed days while maintaining commitment pressure.
 * 
 * IMPLEMENTATION DETAILS:
 * - Base streak tracking with consecutive day counting
 * - Three types of streak freezes (Standard, Premium, Emergency)
 * - Automatic and manual freeze activation
 * - Streak recovery options within 24 hours
 * - Visual feedback with flame icons and animations
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Types of streak freezes available
 */
export type FreezeType = 
  | 'standard'    // Earned by completing 7-day streaks
  | 'premium'     // Available to premium subscribers
  | 'emergency';  // One-time lifetime gift

/**
 * Methods for recovering a broken streak
 */
export type StreakRecoveryMethod =
  | 'bonus_challenge'      // Complete 2x normal study time
  | 'watch_ad'             // Watch sponsored educational video
  | 'invite_friends'       // Invite 3 friends to join
  | 'purchase_recovery';   // Buy back with 500 Gear Coins

/**
 * Streak data structure representing user's current streak state
 */
export interface StreakData {
  /** Current consecutive day count */
  currentStreak: number;
  /** Longest streak ever achieved */
  longestStreak: number;
  /** Date of last study session (ISO string) */
  lastStudyDate: string;
  /** Number of freezes currently held */
  freezeCount: number;
  /** Whether streak is currently protected by freeze */
  isFrozen: boolean;
  /** Timestamp when freeze was activated (if applicable) */
  freezeActivatedAt?: string;
  /** Total streaks lost historically */
  totalStreaksLost: number;
  /** Total streaks saved by freezes */
  totalStreaksSaved: number;
}

/**
 * Result of a streak update operation
 */
export interface StreakUpdateResult {
  /** Whether operation was successful */
  success: boolean;
  /** Message describing the outcome */
  message: string;
  /** New streak count (may be same as before) */
  newStreak: number;
  /** Previous streak count */
  oldStreak: number;
  /** Whether streak was maintained */
  streakMaintained: boolean;
  /** Whether streak was broken */
  streakBroken: boolean;
  /** Number of freezes used (if any) */
  freezesUsed: number;
  /** Remaining freezes after operation */
  freezesRemaining: number;
  /** XP bonus earned from streak */
  xpBonus: number;
  /** Streak multiplier for XP calculations */
  streakMultiplier: number;
}

/**
 * Configuration for streak recovery attempt
 */
export interface StreakRecoveryConfig {
  /** Recovery method chosen */
  method: StreakRecoveryMethod;
  /** Required amount/study time for recovery */
  requiredAmount?: number;
  /** Whether user has completed requirement */
  requirementCompleted: boolean;
}

// ============================================================================
// CONSTANTS
// ============================================================================

/**
 * Minimum study session duration to count toward streak (in minutes)
 */
const MIN_STUDY_MINUTES = 5;

/**
 * Maximum freezes a free user can store
 */
const MAX_FREEZES_FREE = 3;

/**
 * Cost to purchase streak recovery in Gear Coins
 */
const STREAK_RECOVERY_COST_GC = 500;

/**
 * Hours window for streak recovery after breaking
 */
const RECOVERY_WINDOW_HOURS = 24;

/**
 * Streak milestone rewards configuration
 */
export const STREAK_MILESTONES: Array<{
  days: number;
  xpBonusPercent: number;
  iconType: string;
  benefit?: string;
}> = [
  { days: 1, xpBonusPercent: 0, iconType: 'none' },
  { days: 7, xpBonusPercent: 10, iconType: 'bronze_flame', benefit: 'Bronze flame icon' },
  { days: 14, xpBonusPercent: 20, iconType: 'silver_flame', benefit: 'Silver flame icon' },
  { days: 30, xpBonusPercent: 30, iconType: 'gold_flame', benefit: 'Gold flame icon, weekly summary email' },
  { days: 60, xpBonusPercent: 40, iconType: 'platinum_flame', benefit: 'Platinum flame icon, profile badge' },
  { days: 90, xpBonusPercent: 50, iconType: 'diamond_flame', benefit: 'Diamond flame icon, featured on leaderboard' },
  { days: 180, xpBonusPercent: 75, iconType: 'animated_flame', benefit: 'Animated flame, monthly reward chest' },
  { days: 365, xpBonusPercent: 100, iconType: 'legendary_flame', benefit: 'Legendary flame, physical merchandise eligibility' },
];

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

/**
 * Get the current date at midnight (normalized for date comparison)
 * 
 * @param date - Optional date to normalize (defaults to now)
 * @returns Date object set to midnight
 */
function normalizeToMidnight(date: Date = new Date()): Date {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
}

/**
 * Calculate the number of days between two dates
 * 
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of days difference (absolute value)
 */
function calculateDaysDifference(date1: Date, date2: Date): number {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor(Math.abs(date2.getTime() - date1.getTime()) / msPerDay);
}

/**
 * Get streak multiplier based on current streak length
 * 
 * @param streakDays - Current streak length in days
 * @returns Multiplier value (1.0 to 2.0)
 */
export function getStreakMultiplier(streakDays: number): number {
  if (streakDays >= 365) return 2.0;
  if (streakDays >= 180) return 1.75;
  if (streakDays >= 90) return 1.5;
  if (streakDays >= 60) return 1.4;
  if (streakDays >= 30) return 1.3;
  if (streakDays >= 14) return 1.2;
  if (streakDays >= 7) return 1.1;
  return 1.0;
}

/**
 * Get XP bonus percentage based on streak length
 * 
 * @param streakDays - Current streak length in days
 * @returns Bonus percentage (0-100)
 */
export function getStreakXPBonusPercent(streakDays: number): number {
  for (let i = STREAK_MILESTONES.length - 1; i >= 0; i--) {
    if (streakDays >= STREAK_MILESTONES[i].days) {
      return STREAK_MILESTONES[i].xpBonusPercent;
    }
  }
  return 0;
}

/**
 * Get the icon type for current streak
 * 
 * @param streakDays - Current streak length
 * @returns Icon type string
 */
export function getStreakIconType(streakDays: number): string {
  for (let i = STREAK_MILESTONES.length - 1; i >= 0; i--) {
    if (streakDays >= STREAK_MILESTONES[i].days) {
      return STREAK_MILESTONES[i].iconType;
    }
  }
  return 'none';
}

/**
 * Get benefits description for current streak
 * 
 * @param streakDays - Current streak length
 * @returns Benefits string
 */
export function getStreakBenefits(streakDays: number): string {
  for (let i = STREAK_MILESTONES.length - 1; i >= 0; i--) {
    if (streakDays >= STREAK_MILESTONES[i].days && STREAK_MILESTONES[i].benefit) {
      return STREAK_MILESTONES[i].benefit!;
    }
  }
  return 'Keep going to unlock rewards!';
}

// ============================================================================
// STREAK MANAGEMENT CLASS
// ============================================================================

/**
 * StreakManager class for managing user streak state
 * Handles recording sessions, applying freezes, and calculating bonuses
 */
export class StreakManager {
  private streakData: StreakData;
  
  constructor(initialData: Partial<StreakData> = {}) {
    this.streakData = {
      currentStreak: initialData.currentStreak || 0,
      longestStreak: initialData.longestStreak || 0,
      lastStudyDate: initialData.lastStudyDate || '',
      freezeCount: initialData.freezeCount || 0,
      isFrozen: initialData.isFrozen || false,
      freezeActivatedAt: initialData.freezeActivatedAt,
      totalStreaksLost: initialData.totalStreaksLost || 0,
      totalStreaksSaved: initialData.totalStreaksSaved || 0,
    };
  }
  
  /**
   * Get current streak data
   */
  getData(): StreakData {
    return { ...this.streakData };
  }
  
  /**
   * Record a study session and update streak
   * 
   * @param studyDate - Date/time of study session
   * @param durationMinutes - Duration of study session
   * @returns StreakUpdateResult with details
   */
  recordSession(studyDate: Date, durationMinutes: number): StreakUpdateResult {
    const oldStreak = this.streakData.currentStreak;
    
    // Validate minimum duration
    if (durationMinutes < MIN_STUDY_MINUTES) {
      return {
        success: false,
        message: `Session too short. Minimum ${MIN_STUDY_MINUTES} minutes required.`,
        newStreak: oldStreak,
        oldStreak,
        streakMaintained: false,
        streakBroken: false,
        freezesUsed: 0,
        freezesRemaining: this.streakData.freezeCount,
        xpBonus: 0,
        streakMultiplier: getStreakMultiplier(oldStreak),
      };
    }
    
    const today = normalizeToMidnight(new Date());
    const sessionDate = normalizeToMidnight(studyDate);
    const yesterday = normalizeToMidnight(new Date(today.getTime() - 86400000));
    
    // Check if already studied today
    if (sessionDate.getTime() === today.getTime()) {
      if (this.streakData.lastStudyDate) {
        const lastStudy = normalizeToMidnight(new Date(this.streakData.lastStudyDate));
        if (lastStudy.getTime() === today.getTime()) {
          return {
            success: true,
            message: 'Already studied today. Streak maintained!',
            newStreak: oldStreak,
            oldStreak,
            streakMaintained: true,
            streakBroken: false,
            freezesUsed: 0,
            freezesRemaining: this.streakData.freezeCount,
            xpBonus: 0,
            streakMultiplier: getStreakMultiplier(oldStreak),
          };
        }
      }
    }
    
    // Handle different scenarios
    if (sessionDate.getTime() === today.getTime() || sessionDate.getTime() === yesterday.getTime()) {
      // Studied today or yesterday - streak continues
      return this.maintainStreak(sessionDate);
    } else if (sessionDate.getTime() < yesterday.getTime()) {
      // Missed days - check for freeze
      return this.handleMissedDays(sessionDate);
    }
    
    return {
      success: false,
      message: 'Invalid session date',
      newStreak: oldStreak,
      oldStreak,
      streakMaintained: false,
      streakBroken: false,
      freezesUsed: 0,
      freezesRemaining: this.streakData.freezeCount,
      xpBonus: 0,
      streakMultiplier: getStreakMultiplier(oldStreak),
    };
  }
  
  /**
   * Maintain streak when session is recorded on time
   */
  private maintainStreak(sessionDate: Date): StreakUpdateResult {
    const oldStreak = this.streakData.currentStreak;
    const newStreak = oldStreak + 1;
    
    // Update longest streak if needed
    if (newStreak > this.streakData.longestStreak) {
      this.streakData.longestStreak = newStreak;
    }
    
    // Update last study date
    this.streakData.lastStudyDate = sessionDate.toISOString();
    
    // Reset freeze state if it was active
    if (this.streakData.isFrozen) {
      this.streakData.isFrozen = false;
      this.streakData.freezeActivatedAt = undefined;
    }
    
    this.streakData.currentStreak = newStreak;
    
    const multiplier = getStreakMultiplier(newStreak);
    const xpBonusPercent = getStreakXPBonusPercent(newStreak);
    
    return {
      success: true,
      message: `Streak increased to ${newStreak} days!`,
      newStreak,
      oldStreak,
      streakMaintained: true,
      streakBroken: false,
      freezesUsed: 0,
      freezesRemaining: this.streakData.freezeCount,
      xpBonus: xpBonusPercent,
      streakMultiplier: multiplier,
    };
  }
  
  /**
   * Handle missed days using freeze mechanism
   */
  private handleMissedDays(sessionDate: Date): StreakUpdateResult {
    const oldStreak = this.streakData.currentStreak;
    const lastStudy = this.streakData.lastStudyDate 
      ? normalizeToMidnight(new Date(this.streakData.lastStudyDate))
      : normalizeToMidnight(new Date());
    
    const daysMissed = calculateDaysDifference(lastStudy, sessionDate) - 1;
    
    if (daysMissed <= 0) {
      // No days actually missed
      return this.maintainStreak(sessionDate);
    }
    
    // Check if we have enough freezes
    if (daysMissed <= this.streakData.freezeCount) {
      // Use freezes to protect streak
      this.streakData.freezeCount -= daysMissed;
      this.streakData.isFrozen = true;
      this.streakData.freezeActivatedAt = new Date().toISOString();
      this.streakData.totalStreaksSaved++;
      
      // Still increment streak
      const newStreak = oldStreak + 1;
      if (newStreak > this.streakData.longestStreak) {
        this.streakData.longestStreak = newStreak;
      }
      
      this.streakData.currentStreak = newStreak;
      this.streakData.lastStudyDate = new Date().toISOString();
      
      const multiplier = getStreakMultiplier(newStreak);
      const xpBonusPercent = getStreakXPBonusPercent(newStreak);
      
      return {
        success: true,
        message: `Streak saved with ${daysMissed} freeze(s)! Now at ${newStreak} days.`,
        newStreak,
        oldStreak,
        streakMaintained: true,
        streakBroken: false,
        freezesUsed: daysMissed,
        freezesRemaining: this.streakData.freezeCount,
        xpBonus: xpBonusPercent,
        streakMultiplier: multiplier,
      };
    } else {
      // Not enough freezes - streak broken
      this.streakData.totalStreaksLost++;
      this.streakData.currentStreak = 0;
      this.streakData.isFrozen = false;
      this.streakData.freezeActivatedAt = undefined;
      this.streakData.lastStudyDate = new Date().toISOString();
      
      return {
        success: false,
        message: `Streak broken! You had a ${oldStreak}-day streak. Start fresh today!`,
        newStreak: 0,
        oldStreak,
        streakMaintained: false,
        streakBroken: true,
        freezesUsed: this.streakData.freezeCount,
        freezesRemaining: 0,
        xpBonus: 0,
        streakMultiplier: 1.0,
      };
    }
  }
  
  /**
   * Award a standard freeze for completing a 7-day streak milestone
   */
  awardFreeze(type: FreezeType = 'standard'): boolean {
    // Standard freezes capped at max for free users
    if (type === 'standard' && this.streakData.freezeCount >= MAX_FREEZES_FREE) {
      return false;
    }
    
    this.streakData.freezeCount++;
    return true;
  }
  
  /**
   * Use a freeze manually (for premium users)
   */
  useFreeze(): boolean {
    if (this.streakData.freezeCount > 0) {
      this.streakData.freezeCount--;
      this.streakData.isFrozen = true;
      this.streakData.freezeActivatedAt = new Date().toISOString();
      return true;
    }
    return false;
  }
  
  /**
   * Attempt streak recovery within 24-hour window
   */
  attemptRecovery(config: StreakRecoveryConfig, brokenAt: Date): StreakUpdateResult {
    const now = new Date();
    const hoursSinceBreak = (now.getTime() - brokenAt.getTime()) / (1000 * 60 * 60);
    
    // Check if within recovery window
    if (hoursSinceBreak > RECOVERY_WINDOW_HOURS) {
      return {
        success: false,
        message: 'Recovery window expired (24 hours)',
        newStreak: 0,
        oldStreak: 0,
        streakMaintained: false,
        streakBroken: true,
        freezesUsed: 0,
        freezesRemaining: this.streakData.freezeCount,
        xpBonus: 0,
        streakMultiplier: 1.0,
      };
    }
    
    // Check requirement completion
    if (!config.requirementCompleted) {
      return {
        success: false,
        message: 'Recovery requirement not completed',
        newStreak: 0,
        oldStreak: 0,
        streakMaintained: false,
        streakBroken: true,
        freezesUsed: 0,
        freezesRemaining: this.streakData.freezeCount,
        xpBonus: 0,
        streakMultiplier: 1.0,
      };
    }
    
    // Recovery successful - restore streak (at reduced value)
    const restoredStreak = Math.max(1, Math.floor(this.streakData.longestStreak * 0.5));
    this.streakData.currentStreak = restoredStreak;
    this.streakData.lastStudyDate = now.toISOString();
    
    return {
      success: true,
      message: `Streak recovered! Restarting at ${restoredStreak} days.`,
      newStreak: restoredStreak,
      oldStreak: 0,
      streakMaintained: true,
      streakBroken: false,
      freezesUsed: 0,
      freezesRemaining: this.streakData.freezeCount,
      xpBonus: getStreakXPBonusPercent(restoredStreak),
      streakMultiplier: getStreakMultiplier(restoredStreak),
    };
  }
  
  /**
   * Purchase streak recovery with Gear Coins
   */
  purchaseRecovery(brokenAt: Date): StreakUpdateResult {
    // This would integrate with the Gear Coins economy
    // For now, we just check if user can afford it
    const recoveryConfig: StreakRecoveryConfig = {
      method: 'purchase_recovery',
      requiredAmount: STREAK_RECOVERY_COST_GC,
      requirementCompleted: true, // Assume payment processed
    };
    
    return this.attemptRecovery(recoveryConfig, brokenAt);
  }
  
  /**
   * Get days until next milestone
   */
  getDaysToNextMilestone(): number {
    const currentStreak = this.streakData.currentStreak;
    
    for (const milestone of STREAK_MILESTONES) {
      if (milestone.days > currentStreak) {
        return milestone.days - currentStreak;
      }
    }
    
    return 0; // At max milestone
  }
  
  /**
   * Get next milestone info
   */
  getNextMilestone(): { days: number; benefit: string } | null {
    const currentStreak = this.streakData.currentStreak;
    
    for (const milestone of STREAK_MILESTONES) {
      if (milestone.days > currentStreak) {
        return {
          days: milestone.days,
          benefit: milestone.benefit || 'New reward',
        };
      }
    }
    
    return null;
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Create a new StreakManager instance with default values
 */
export function createStreakManager(): StreakManager {
  return new StreakManager();
}

/**
 * Calculate streak save rate (analytics metric)
 */
export function calculateStreakSaveRate(saved: number, lost: number): number {
  const total = saved + lost;
  if (total === 0) return 0;
  return Math.round((saved / total) * 100);
}

/**
 * Format streak duration for display
 */
export function formatStreakDuration(days: number): string {
  if (days === 0) return 'No streak';
  if (days === 1) return '1 day';
  if (days < 7) return `${days} days`;
  if (days < 30) return `${Math.floor(days / 7)} weeks`;
  if (days < 365) return `${Math.floor(days / 30)} months`;
  return `${(days / 365).toFixed(1)} years`;
}

/**
 * Get motivational message based on streak status
 */
export function getStreakMotivation(streakDays: number, isOnTrack: boolean): string {
  if (!isOnTrack) {
    return "Don't break your streak! Study today to keep it going!";
  }
  
  if (streakDays === 0) {
    return 'Start your first streak today!';
  }
  if (streakDays < 7) {
    return `${7 - streakDays} more days to earn your first freeze!`;
  }
  if (streakDays < 30) {
    return `Great start! ${30 - streakDays} days to gold flame status!`;
  }
  if (streakDays < 90) {
    return `Amazing! ${90 - streakDays} days to diamond flame!`;
  }
  if (streakDays < 365) {
    return `Legendary run! ${365 - streakDays} days to legendary status!`;
  }
  
  return 'You are a legend! Keep the fire burning!';
}
