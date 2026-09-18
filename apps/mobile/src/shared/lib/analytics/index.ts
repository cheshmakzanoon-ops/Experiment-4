import { Analytics } from '@firebase/analytics';
import { getAnalytics, logEvent, setUserProperties, setUserId } from 'firebase/analytics';

/**
 * Analytics service for tracking user behavior and app events
 */
export class AnalyticsService {
  private static instance: AnalyticsService;
  private analytics: Analytics | null = null;
  private isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  /**
   * Initialize Firebase Analytics
   */
  initialize(): void {
    try {
      this.analytics = getAnalytics();
      this.isInitialized = true;
      console.log('Analytics initialized successfully');
    } catch (error) {
      console.error('Failed to initialize analytics:', error);
      this.isInitialized = false;
    }
  }

  /**
   * Log a custom event
   */
  logEvent(eventName: string, eventParams?: Record<string, any>): void {
    if (!this.isInitialized || !this.analytics) {
      console.warn('Analytics not initialized');
      return;
    }

    try {
      logEvent(this.analytics, eventName, eventParams);
    } catch (error) {
      console.error(`Error logging event ${eventName}:`, error);
    }
  }

  /**
   * Track screen view
   */
  trackScreenView(screenName: string, screenClass?: string): void {
    this.logEvent('screen_view', {
      screen_name: screenName,
      screen_class: screenClass || screenName,
    });
  }

  /**
   * Track user engagement
   */
  trackEngagement(action: string, content?: string): void {
    this.logEvent('engagement', {
      action,
      content_type: content,
    });
  }

  /**
   * Track study session
   */
  trackStudySession(
    lessonId: string,
    mode: 'flashcard' | 'quiz' | 'practice',
    duration: number,
    score?: number
  ): void {
    this.logEvent('study_session', {
      lesson_id: lessonId,
      study_mode: mode,
      duration_seconds: duration,
      score: score,
    });
  }

  /**
   * Track quiz completion
   */
  trackQuizCompletion(
    lessonId: string,
    questionsTotal: number,
    questionsCorrect: number,
    timeSpent: number
  ): void {
    this.logEvent('quiz_completed', {
      lesson_id: lessonId,
      questions_total: questionsTotal,
      questions_correct: questionsCorrect,
      accuracy: questionsCorrect / questionsTotal,
      time_spent_seconds: timeSpent,
    });
  }

  /**
   * Track achievement unlocked
   */
  trackAchievementUnlocked(achievementId: string, achievementName: string): void {
    this.logEvent('achievement_unlocked', {
      achievement_id: achievementId,
      achievement_name: achievementName,
    });
  }

  /**
   * Track level up
   */
  trackLevelUp(newLevel: number, xpEarned: number): void {
    this.logEvent('level_up', {
      new_level: newLevel,
      xp_earned: xpEarned,
    });
  }

  /**
   * Track streak milestone
   */
  trackStreakMilestone(streakDays: number): void {
    this.logEvent('streak_milestone', {
      streak_days: streakDays,
    });
  }

  /**
   * Track purchase (for premium features or gear coins)
   */
  trackPurchase(
    itemId: string,
    itemName: string,
    price: number,
    currency: string = 'USD'
  ): void {
    this.logEvent('purchase', {
      transaction_id: `${Date.now()}-${itemId}`,
      item_id: itemId,
      item_name: itemName,
      value: price,
      currency,
    });
  }

  /**
   * Track error
   */
  trackError(errorCode: string, errorMessage: string, fatal?: boolean): void {
    this.logEvent('error', {
      error_code: errorCode,
      error_message: errorMessage,
      fatal: fatal || false,
    });
  }

  /**
   * Set user ID for analytics
   */
  setUserId(userId: string): void {
    if (!this.isInitialized || !this.analytics) {
      console.warn('Analytics not initialized');
      return;
    }

    try {
      setUserId(this.analytics, userId);
    } catch (error) {
      console.error('Error setting user ID:', error);
    }
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, any>): void {
    if (!this.isInitialized || !this.analytics) {
      console.warn('Analytics not initialized');
      return;
    }

    try {
      setUserProperties(this.analytics, properties);
    } catch (error) {
      console.error('Error setting user properties:', error);
    }
  }

  /**
   * Track onboarding completion
   */
  trackOnboardingComplete(step: string): void {
    this.logEvent('onboarding_step_completed', {
      step,
    });
  }

  /**
   * Track feature adoption
   */
  trackFeatureAdoption(featureName: string): void {
    this.logEvent('feature_adoption', {
      feature_name: featureName,
    });
  }
}

// Export singleton instance
export const analyticsService = AnalyticsService.getInstance();
