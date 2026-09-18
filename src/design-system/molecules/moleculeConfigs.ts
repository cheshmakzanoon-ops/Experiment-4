/**
 * Engineering Study Guide App - Design System Molecules
 * 
 * Phase 6: Advanced UI Design System (Atomic)
 * Objective: Build a reusable, animated component library
 * 
 * This file defines the molecular components - combinations of atoms
 * that work together to form more complex UI elements.
 * 
 * MOLECULES INCLUDED:
 * - Flashcard components
 * - Progress rings with liquid fill animation
 * - Search bars
 * - Form field groups
 * - Stat cards
 * - Achievement badges
 * - Course module cards
 */

import { ViewStyle } from 'react-native';
import { BRAND_CONFIG } from '../brand/brandConstants';
import { BUTTON_CONFIG, INPUT_CONFIG, BADGE_CONFIG, AVATAR_CONFIG, PROGRESS_CONFIG, TEXT_CONFIG } from './atoms/atomConfigs';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Flashcard states for study sessions
 */
export type FlashcardState = 'front' | 'back' | 'revealing' | 'swiping-left' | 'swiping-right';

/**
 * Flashcard difficulty rating (for spaced repetition)
 */
export type FlashcardDifficulty = 'again' | 'hard' | 'good' | 'easy';

/**
 * Progress ring variants
 */
export type ProgressRingVariant = 'default' | 'streak' | 'xp' | 'course-completion';

/**
 * Stat card types for profile/dashboard
 */
export type StatCardType = 'streak' | 'xp' | 'level' | 'accuracy' | 'sessions' | 'time-spent';

/**
 * Course module status
 */
export type ModuleStatus = 'locked' | 'available' | 'in-progress' | 'completed';

// ============================================================================
// FLASHCARD MOLECULE CONFIGURATION
// ============================================================================

/**
 * Flashcard component configuration
 * Combines: Container, Content Area, Flip Animation, Action Buttons
 */
export const FLASHCARD_CONFIG = {
  // Card container
  container: {
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.XL,
    backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_900.HEX,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 280,
    padding: BRAND_CONFIG.SPACING[6],
  },

  // Front side (question)
  front: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },

  // Back side (answer)
  back: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: 'rgba(59, 130, 246, 0.05)',
  },

  // Question text styling
  questionText: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES['2XL'].SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.SEMIBOLD,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
    textAlign: 'center' as const,
  },

  // Answer text styling
  answerText: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
    lineHeight: 1.6,
    color: BRAND_CONFIG.TEXT_COLORS.SECONDARY_LIGHT.HEX,
    textAlign: 'center' as const,
  },

  // Hint indicator
  hint: {
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      marginTop: BRAND_CONFIG.SPACING[4],
      paddingHorizontal: BRAND_CONFIG.SPACING[4],
      paddingVertical: BRAND_CONFIG.SPACING[2],
      borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
    },
    icon: {
      size: 16,
      color: BRAND_CONFIG.COLORS.ACCENT.PHOTON_PINK.HEX,
    },
    text: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
      color: BRAND_CONFIG.COLORS.ACCENT.PHOTON_PINK.HEX,
      marginLeft: BRAND_CONFIG.SPACING[2],
    },
  },

  // Swipe gesture thresholds
  swipeThresholds: {
    left: -100,  // Hard
    right: 100,  // Easy
    up: -150,    // Again
    down: 150,   // Good
  },

  // Animation config
  animations: {
    flipDuration: BRAND_CONFIG.MICRO_INTERACTIONS.CARD_SWIPE.THRESHOLD > 0 ? 300 : 300,
    swipeRotation: BRAND_CONFIG.MICRO_INTERACTIONS.CARD_SWIPE.ROTATION_RANGE,
    opacityFade: BRAND_CONFIG.MICRO_INTERACTIONS.CARD_SWIPE.OPACITY_FADE,
  },

  // Rating buttons (Again, Hard, Good, Easy)
  ratingButtons: {
    container: {
      flexDirection: 'row' as const,
      justifyContent: 'space-between' as const,
      paddingHorizontal: BRAND_CONFIG.SPACING[4],
      marginTop: BRAND_CONFIG.SPACING[5],
    },
    again: {
      variant: 'error' as const,
      label: 'Again',
      width: 80,
    },
    hard: {
      variant: 'warning' as const,
      label: 'Hard',
      width: 80,
    },
    good: {
      variant: 'success' as const,
      label: 'Good',
      width: 80,
    },
    easy: {
      variant: 'primary' as const,
      label: 'Easy',
      width: 80,
    },
  },
} as const;

// ============================================================================
// PROGRESS RING MOLECULE CONFIGURATION
// ============================================================================

/**
 * Progress ring with liquid fill animation
 * Combines: Circular SVG, Fill Animation, Center Label
 */
export const PROGRESS_RING_CONFIG = {
  // Base circular container
  container: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },

  // Ring sizes
  sizes: {
    sm: {
      size: 64,
      strokeWidth: 4,
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    },
    md: {
      size: 96,
      strokeWidth: 6,
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.LG.SIZE_PX,
    },
    lg: {
      size: 128,
      strokeWidth: 8,
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES['2XL'].SIZE_PX,
    },
    xl: {
      size: 160,
      strokeWidth: 10,
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES['3XL'].SIZE_PX,
    },
  },

  // Track (background circle)
  track: {
    color: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
  },

  // Fill colors by variant
  fills: {
    default: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
    streak: BRAND_CONFIG.COLORS.ACCENT.FUSION_ORANGE.HEX,
    xp: BRAND_CONFIG.COLORS.PRIMARY.QUANTUM_PURPLE.HEX,
    courseCompletion: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
  },

  // Glow effects for gamification
  glow: {
    enabled: true,
    colors: {
      streak: BRAND_CONFIG.SHADOWS.GLOW_ORANGE,
      xp: BRAND_CONFIG.SHADOWS.GLOW_PURPLE,
      course: BRAND_CONFIG.SHADOWS.GLOW_GREEN,
    },
  },

  // Center label
  label: {
    fontFamily: BRAND_CONFIG.TYPOGRAPHY.FAMILIES.INTER.NAME,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.BOLD,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
  },

  // Subtitle (optional, e.g., "Day Streak")
  subtitle: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    marginTop: BRAND_CONFIG.SPACING[1],
  },

  // Animation config
  animation: {
    duration: 1000,
    easing: 'ease-out' as const,
    liquidEffect: true,
    waveAmplitude: 3,
    waveFrequency: 0.5,
  },
} as const;

// ============================================================================
// SEARCH BAR MOLECULE CONFIGURATION
// ============================================================================

/**
 * Search bar with filters
 * Combines: Input, Search Icon, Clear Button, Filter Trigger
 */
export const SEARCH_BAR_CONFIG = {
  // Container
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_800.HEX,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
    paddingHorizontal: BRAND_CONFIG.SPACING[4],
    paddingVertical: BRAND_CONFIG.SPACING[2],
    borderWidth: 1,
    borderColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
  },

  // Focused state
  focused: {
    borderColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
    shadowColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  // Search icon
  searchIcon: {
    size: BRAND_CONFIG.ICON_SYSTEM.SIZES.MD,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    marginRight: BRAND_CONFIG.SPACING[3],
  },

  // Input field
  input: {
    flex: 1,
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
    placeholderColor: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    paddingVertical: BRAND_CONFIG.SPACING[2],
  },

  // Clear button (X)
  clearButton: {
    size: 24,
    iconSize: 16,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    marginLeft: BRAND_CONFIG.SPACING[2],
    hitSlop: { top: 8, right: 8, bottom: 8, left: 8 },
  },

  // Filter button
  filterButton: {
    marginLeft: BRAND_CONFIG.SPACING[3],
    padding: BRAND_CONFIG.SPACING[2],
    iconSize: BRAND_CONFIG.ICON_SYSTEM.SIZES.MD,
    color: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
  },
} as const;

// ============================================================================
// FORM FIELD GROUP MOLECULE CONFIGURATION
// ============================================================================

/**
 * Form field group with label, input, and validation
 * Combines: Label, Input, Helper/Error Text, Optional Icon
 */
export const FORM_FIELD_CONFIG = {
  // Container
  container: {
    marginBottom: BRAND_CONFIG.SPACING[5],
  },

  // Label
  label: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.MEDIUM,
    color: BRAND_CONFIG.TEXT_COLORS.SECONDARY_LIGHT.HEX,
    marginBottom: BRAND_CONFIG.SPACING[2],
  },

  // Required indicator
  required: {
    color: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
    marginLeft: BRAND_CONFIG.SPACING[1],
  },

  // Input wrapper
  inputWrapper: {
    position: 'relative' as const,
  },

  // Left icon
  leftIcon: {
    position: 'absolute' as const,
    left: BRAND_CONFIG.SPACING[3],
    top: '50%',
    transform: [{ translateY: -12 }],
    size: BRAND_CONFIG.ICON_SYSTEM.SIZES.MD,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
  },

  // Right icon (e.g., password visibility toggle)
  rightIcon: {
    position: 'absolute' as const,
    right: BRAND_CONFIG.SPACING[3],
    top: '50%',
    transform: [{ translateY: -12 }],
    size: BRAND_CONFIG.ICON_SYSTEM.SIZES.MD,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
  },

  // Helper text
  helperText: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    marginTop: BRAND_CONFIG.SPACING[1],
  },

  // Error text
  errorText: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
    color: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
    marginTop: BRAND_CONFIG.SPACING[1],
  },
} as const;

// ============================================================================
// STAT CARD MOLECULE CONFIGURATION
// ============================================================================

/**
 * Stat card for displaying metrics
 * Combines: Icon/Badge, Value, Label, Trend Indicator
 */
export const STAT_CARD_CONFIG = {
  // Base container
  container: {
    backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_900.HEX,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.LG,
    padding: BRAND_CONFIG.SPACING[4],
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    minWidth: 100,
  },

  // Icon container
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.MD,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginBottom: BRAND_CONFIG.SPACING[3],
  },

  // Icon background colors by stat type
  iconBackgrounds: {
    streak: 'rgba(249, 115, 22, 0.2)',
    xp: 'rgba(139, 92, 246, 0.2)',
    level: 'rgba(234, 179, 8, 0.2)',
    accuracy: 'rgba(16, 185, 129, 0.2)',
    sessions: 'rgba(59, 130, 246, 0.2)',
    timeSpent: 'rgba(6, 182, 212, 0.2)',
  },

  // Icon colors by stat type
  iconColors: {
    streak: BRAND_CONFIG.COLORS.ACCENT.FUSION_ORANGE.HEX,
    xp: BRAND_CONFIG.COLORS.PRIMARY.QUANTUM_PURPLE.HEX,
    level: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
    accuracy: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
    sessions: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
    timeSpent: BRAND_CONFIG.COLORS.PRIMARY.NEON_CYAN.HEX,
  },

  // Value text
  value: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES['3XL'].SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.EXTRABOLD,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
    letterSpacing: '-0.02em',
  },

  // Label text
  label: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    marginTop: BRAND_CONFIG.SPACING[1],
    textAlign: 'center' as const,
  },

  // Trend indicator (up/down arrow)
  trend: {
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      marginTop: BRAND_CONFIG.SPACING[2],
    },
    up: {
      color: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
    },
    down: {
      color: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
    },
    text: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
      marginLeft: BRAND_CONFIG.SPACING[1],
    },
  },
} as const;

// ============================================================================
// ACHIEVEMENT BADGE MOLECULE CONFIGURATION
// ============================================================================

/**
 * Achievement badge display
 * Combines: Badge Icon, Title, Description, Progress/Lock State
 */
export const ACHIEVEMENT_BADGE_CONFIG = {
  // Container
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_900.HEX,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.LG,
    padding: BRAND_CONFIG.SPACING[4],
    marginBottom: BRAND_CONFIG.SPACING[3],
  },

  // Badge icon container
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: BRAND_CONFIG.SPACING[4],
  },

  // Unlocked badge
  unlocked: {
    background: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
    glow: BRAND_CONFIG.SHADOWS.GLOW_GOLD,
    opacity: 1,
  },

  // Locked badge
  locked: {
    background: BRAND_CONFIG.BORDER_COLORS.MODERATE.HEX,
    opacity: 0.5,
    overlay: '🔒',
  },

  // Content area
  content: {
    flex: 1,
  },

  // Title
  title: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.SEMIBOLD,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
  },

  // Description
  description: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    marginTop: BRAND_CONFIG.SPACING[1],
  },

  // Progress bar (for partially completed achievements)
  progress: {
    container: {
      marginTop: BRAND_CONFIG.SPACING[2],
      height: 4,
    },
    track: {
      backgroundColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
      borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
    },
    fill: {
      backgroundColor: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
      borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
    },
  },

  // Reward indicator
  reward: {
    container: {
      alignItems: 'center' as const,
      marginLeft: BRAND_CONFIG.SPACING[3],
    },
    amount: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
      fontWeight: BRAND_CONFIG.FONT_WEIGHTS.BOLD,
      color: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
    },
    label: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
      color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    },
  },
} as const;

// ============================================================================
// COURSE MODULE CARD MOLECULE CONFIGURATION
// ============================================================================

/**
 * Course module card
 * Combines: Thumbnail/Icon, Title, Progress, Status Indicator
 */
export const COURSE_MODULE_CONFIG = {
  // Container
  container: {
    backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_900.HEX,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.LG,
    padding: BRAND_CONFIG.SPACING[4],
    marginBottom: BRAND_CONFIG.SPACING[3],
  },

  // Header row
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginBottom: BRAND_CONFIG.SPACING[3],
  },

  // Module icon/thumbnail
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.MD,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: BRAND_CONFIG.SPACING[3],
  },

  // Subject-specific colors
  subjectColors: {
    mechanical: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
    electrical: BRAND_CONFIG.COLORS.PRIMARY.NEON_CYAN.HEX,
    civil: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
    chemical: BRAND_CONFIG.COLORS.ACCENT.FUSION_ORANGE.HEX,
    computer: BRAND_CONFIG.COLORS.PRIMARY.QUANTUM_PURPLE.HEX,
    aerospace: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
  },

  // Title
  title: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.SEMIBOLD,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
    flex: 1,
  },

  // Status badge
  statusBadge: {
    locked: {
      backgroundColor: BRAND_CONFIG.BORDER_COLORS.MODERATE.HEX,
      textColor: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
      icon: '🔒',
    },
    available: {
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      textColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      icon: '▶',
    },
    inProgress: {
      backgroundColor: 'rgba(249, 115, 22, 0.2)',
      textColor: BRAND_CONFIG.COLORS.ACCENT.FUSION_ORANGE.HEX,
      icon: '⏳',
    },
    completed: {
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      textColor: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
      icon: '✓',
    },
  },

  // Lesson count
  lessonCount: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    marginTop: BRAND_CONFIG.SPACING[1],
  },

  // Progress bar
  progress: {
    container: {
      marginTop: BRAND_CONFIG.SPACING[3],
      height: 6,
    },
    track: {
      backgroundColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
      borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
    },
    fill: {
      backgroundColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
    },
  },

  // XP reward indicator
  xpReward: {
    container: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      marginTop: BRAND_CONFIG.SPACING[2],
    },
    icon: {
      size: 14,
      color: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
    },
    text: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
      color: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
      marginLeft: BRAND_CONFIG.SPACING[1],
    },
  },
} as const;

// ============================================================================
// EXPORT ALL MOLECULE CONFIGS
// ============================================================================

export const MOLECULE_CONFIGS = {
  FLASHCARD: FLASHCARD_CONFIG,
  PROGRESS_RING: PROGRESS_RING_CONFIG,
  SEARCH_BAR: SEARCH_BAR_CONFIG,
  FORM_FIELD: FORM_FIELD_CONFIG,
  STAT_CARD: STAT_CARD_CONFIG,
  ACHIEVEMENT_BADGE: ACHIEVEMENT_BADGE_CONFIG,
  COURSE_MODULE: COURSE_MODULE_CONFIG,
} as const;

export default MOLECULE_CONFIGS;
