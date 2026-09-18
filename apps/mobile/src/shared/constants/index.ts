// App-wide constants

/**
 * Color Palette
 */
export const COLORS = {
  // Primary colors
  primary: '#2563EB',
  primaryLight: '#60A5FA',
  primaryDark: '#1E40AF',
  
  // Secondary colors
  secondary: '#7C3AED',
  secondaryLight: '#A78BFA',
  secondaryDark: '#5B21B6',
  
  // Accent colors
  accent: '#F59E0B',
  accentLight: '#FCD34D',
  accentDark: '#D97706',
  
  // Semantic colors
  success: '#10B981',
  successLight: '#34D399',
  error: '#EF4444',
  errorLight: '#F87171',
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  info: '#3B82F6',
  infoLight: '#60A5FA',
  
  // Neutral colors
  background: '#FFFFFF',
  backgroundSecondary: '#F3F4F6',
  surface: '#FFFFFF',
  surfaceSecondary: '#F9FAFB',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  
  // Text colors
  text: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  // Dark mode colors
  darkBackground: '#111827',
  darkBackgroundSecondary: '#1F2937',
  darkSurface: '#1F2937',
  darkSurfaceSecondary: '#374151',
  darkBorder: '#374151',
  darkText: '#F9FAFB',
  darkTextSecondary: '#9CA3AF',
} as const;

/**
 * Typography
 */
export const TYPOGRAPHY = {
  fontFamily: 'Inter',
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
} as const;

/**
 * Spacing values (in pixels)
 */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

/**
 * Border radius values (in pixels)
 */
export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

/**
 * Shadow definitions
 */
export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

/**
 * Animation durations (in milliseconds)
 */
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  phone: 0,
  tablet: 768,
  desktop: 1024,
} as const;

/**
 * Z-index values
 */
export const Z_INDEX = {
  base: 0,
  dropdown: 100,
  sticky: 200,
  fixed: 300,
  modalBackdrop: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
} as const;

/**
 * Route names for navigation
 */
export const ROUTES = {
  HOME: 'Home',
  COURSES: 'Courses',
  COURSE_DETAIL: 'CourseDetail',
  STUDY: 'Study',
  PROFILE: 'Profile',
  SETTINGS: 'Settings',
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  LEADERBOARD: 'Leaderboard',
  ACHIEVEMENTS: 'Achievements',
} as const;

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
  USER_TOKEN: '@engineering_study:user_token',
  USER_DATA: '@engineering_study:user_data',
  THEME_MODE: '@engineering_study:theme_mode',
  ONBOARDING_COMPLETE: '@engineering_study:onboarding_complete',
} as const;

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
    UPDATE_PROFILE: '/user/profile/update',
    PROGRESS: '/user/progress',
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: (id: string) => `/courses/${id}`,
    MODULES: (id: string) => `/courses/${id}/modules`,
  },
  LESSONS: {
    DETAIL: (id: string) => `/lessons/${id}`,
    COMPLETE: (id: string) => `/lessons/${id}/complete`,
  },
  QUESTIONS: {
    LIST: '/questions',
    ANSWER: '/questions/answer',
  },
  GAMIFICATION: {
    XP: '/gamification/xp',
    LEVEL: '/gamification/level',
    STREAK: '/gamification/streak',
    ACHIEVEMENTS: '/gamification/achievements',
    LEADERBOARD: '/gamification/leaderboard',
  },
} as const;

/**
 * Error codes
 */
export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
} as const;
