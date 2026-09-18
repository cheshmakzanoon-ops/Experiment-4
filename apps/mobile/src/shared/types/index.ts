# Shared TypeScript types for Engineering Study App

/**
 * User entity types
 */
export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  major?: string;
  university?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Course entity types
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  major: string;
  difficultyLevel: number;
  thumbnailUrl?: string;
  moduleId: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Module entity types
 */
export interface Module {
  id: string;
  courseId: string;
  title: string;
  orderIndex: number;
  estimatedDuration: number; // in minutes
  lessonIds: string[];
}

/**
 * Lesson entity types
 */
export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  contentType: 'text' | 'video' | 'interactive' | 'quiz';
  orderIndex: number;
  content?: string;
  videoUrl?: string;
  questionIds?: string[];
}

/**
 * Question entity types
 */
export interface Question {
  id: string;
  lessonId: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'flashcard';
  difficulty: 'easy' | 'medium' | 'hard';
  text: string;
  answerIds: string[];
  correctAnswerId?: string;
  explanation?: string;
  tags: string[];
}

/**
 * Answer entity types
 */
export interface Answer {
  id: string;
  questionId: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

/**
 * Achievement entity types
 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  criteria: AchievementCriteria;
  rewardXP: number;
  iconUrl?: string;
}

export interface AchievementCriteria {
  type: 'streak' | 'xp' | 'lessonsCompleted' | 'quizzesPassed' | 'questionsAnswered';
  threshold: number;
}

/**
 * User progress types
 */
export interface UserProgress {
  userId: string;
  lessonId: string;
  status: 'not-started' | 'in-progress' | 'completed';
  score?: number;
  completedAt?: Date;
  lastAccessedAt: Date;
}

/**
 * Spaced repetition types
 */
export interface SpacedRepetition {
  userId: string;
  questionId: string;
  interval: number; // days until next review
  easeFactor: number;
  nextReview: Date;
  lastReviewed: Date;
}

/**
 * Gamification types
 */
export interface UserGamification {
  userId: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  streak: number;
  longestStreak: number;
  gearCoins: number;
  achievementIds: string[];
  lastStreakDate: Date;
}

/**
 * Leaderboard entry types
 */
export interface LeaderboardEntry {
  userId: string;
  displayName: string;
  avatarUrl?: string;
  rank: number;
  xpEarned: number;
  period: 'daily' | 'weekly' | 'monthly' | 'all-time';
}

/**
 * API response types
 */
export interface ApiResponse<T> {
  data: T;
  error?: ApiError;
  meta?: {
    timestamp: Date;
    requestId: string;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

/**
 * Navigation types
 */
export type RootStackParamList = {
  Home: undefined;
  Courses: undefined;
  CourseDetail: { courseId: string };
  Study: { lessonId: string; mode: 'flashcard' | 'quiz' | 'practice' };
  Profile: undefined;
  Settings: undefined;
  Login: undefined;
  Signup: undefined;
};

/**
 * Theme types
 */
export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    error: string;
    success: string;
    warning: string;
    text: string;
    textSecondary: string;
    border: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    fontFamily: string;
    fontSizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    fontWeights: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  };
}
