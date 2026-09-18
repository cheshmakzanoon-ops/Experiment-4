/**
 * Engineering Study Guide App - Design System Micro-interactions
 * 
 * Phase 6: Advanced UI Design System (Atomic)
 * Objective: Build a reusable, animated component library
 * 
 * This file defines the micro-interaction specifications and animation
 * configurations that bring the UI to life with delightful, meaningful feedback.
 * 
 * MICRO-INTERACTIONS INCLUDED:
 * - Button press scale & haptic feedback
 * - Success celebration animations (confetti, pop)
 * - Card swipe gestures
 * - Progress fill animations
 * - Loading states
 * - Transition animations
 * - Haptic feedback patterns
 */

import { BRAND_CONFIG } from '../brand/brandConstants';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Haptic feedback intensity levels
 */
export type HapticIntensity = 'light' | 'medium' | 'heavy' | 'rigid' | 'soft';

/**
 * Animation preset types
 */
export type AnimationPreset = 
  | 'fade-in'
  | 'fade-out'
  | 'scale-up'
  | 'scale-down'
  | 'slide-left'
  | 'slide-right'
  | 'slide-up'
  | 'slide-down'
  | 'bounce'
  | 'shake'
  | 'rotate'
  | 'pulse';

/**
 * Gesture types for interactive elements
 */
export type GestureType = 'tap' | 'press' | 'swipe' | 'pinch' | 'rotate' | 'long-press';

/**
 * Celebration animation types
 */
export type CelebrationType = 'confetti' | 'sparkles' | 'fireworks' | 'balloons' | 'level-up';

// ============================================================================
// HAPTIC FEEDBACK CONFIGURATION
// ============================================================================

/**
 * Haptic feedback patterns mapped to iOS/Android APIs
 */
export const HAPTIC_CONFIG = {
  // Light impact - subtle feedback
  light: {
    ios: 'UIImpactFeedbackStyleLight',
    android: 0, // VibrationEffect.createOneShot(10, ...)
    duration: 10,
    intensity: 0.3,
  },

  // Medium impact - standard feedback
  medium: {
    ios: 'UIImpactFeedbackStyleMedium',
    android: 20,
    duration: 20,
    intensity: 0.5,
  },

  // Heavy impact - strong feedback
  heavy: {
    ios: 'UIImpactFeedbackStyleHeavy',
    android: 40,
    duration: 40,
    intensity: 0.8,
  },

  // Rigid impact - very strong, sharp feedback
  rigid: {
    ios: 'UIImpactFeedbackStyleRigid',
    android: 60,
    duration: 60,
    intensity: 1.0,
  },

  // Soft impact - gentle feedback
  soft: {
    ios: 'UIImpactFeedbackStyleSoft',
    android: 5,
    duration: 5,
    intensity: 0.2,
  },

  // Success notification
  success: {
    ios: 'UINotificationFeedbackTypeSuccess',
    android: [50, 100], // pattern: wait, vibrate
  },

  // Error/warning notification
  error: {
    ios: 'UINotificationFeedbackTypeError',
    android: [50, 100, 50, 100], // double vibration
  },

  // Warning notification
  warning: {
    ios: 'UINotificationFeedbackTypeWarning',
    android: [50, 150],
  },
} as const;

// ============================================================================
// BUTTON PRESS MICRO-INTERACTION
// ============================================================================

/**
 * Button press animation with scale and haptic
 */
export const BUTTON_PRESS_ANIMATION = {
  // Scale transform on press
  scale: {
    idle: 1.0,
    pressing: BRAND_CONFIG.MICRO_INTERACTIONS.BUTTON_PRESS.SCALE_DOWN,
    released: 1.0,
  },

  // Timing
  timing: {
    pressDuration: BRAND_CONFIG.MICRO_INTERACTIONS.BUTTON_PRESS.DURATION,
    releaseDuration: BRAND_CONFIG.MICRO_INTERACTIONS.BUTTON_PRESS.DURATION,
    easing: BRAND_CONFIG.MICRO_INTERACTIONS.BUTTON_PRESS.TIMING,
  },

  // Haptic feedback trigger
  haptic: {
    on_press: 'medium' as const,
    on_release: null,
  },

  // Opacity change (optional alternative to scale)
  opacity: {
    idle: 1.0,
    pressing: 0.85,
  },

  // Shadow elevation change
  shadow: {
    idle: {
      offset: { width: 0, height: 2 },
      opacity: 0.25,
      radius: 4,
    },
    pressing: {
      offset: { width: 0, height: 1 },
      opacity: 0.15,
      radius: 2,
    },
  },
} as const;

// ============================================================================
// SUCCESS CELEBRATION ANIMATIONS
// ============================================================================

/**
 * Success feedback animations for correct answers, achievements, etc.
 */
export const SUCCESS_CELEBRATION = {
  // Pop animation (small success)
  pop: {
    scale: {
      start: 1.0,
      peak: BRAND_CONFIG.MICRO_INTERACTIONS.SUCCESS_POP.SCALE_UP,
      end: 1.0,
    },
    rotation: BRAND_CONFIG.MICRO_INTERACTIONS.SUCCESS_POP.ROTATION,
    duration: BRAND_CONFIG.MICRO_INTERACTIONS.SUCCESS_POP.DURATION,
    haptic: BRAND_CONFIG.MICRO_INTERACTIONS.SUCCESS_POP.HAPTIC,
  },

  // Confetti burst (major achievement)
  confetti: {
    particleCount: BRAND_CONFIG.MICRO_INTERACTIONS.CONFETTI.PARTICLE_COUNT,
    spread: BRAND_CONFIG.MICRO_INTERACTIONS.CONFETTI.SPREAD,
    velocity: BRAND_CONFIG.MICRO_INTERACTIONS.CONFETTI.VELOCITY,
    gravity: BRAND_CONFIG.MICRO_INTERACTIONS.CONFETTI.GRAVITY,
    drag: BRAND_CONFIG.MICRO_INTERACTIONS.CONFETTI.DRAG,
    colors: [
      BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      BRAND_CONFIG.COLORS.PRIMARY.NEON_CYAN.HEX,
      BRAND_CONFIG.COLORS.PRIMARY.QUANTUM_PURPLE.HEX,
      BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
      BRAND_CONFIG.COLORS.ACCENT.FUSION_ORANGE.HEX,
      BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
    ],
    shapes: ['circle', 'square', 'triangle'],
    duration: 2000,
    haptic: 'heavy' as const,
  },

  // Sparkles effect
  sparkles: {
    count: 12,
    spreadAngle: 360,
    particleSize: { min: 4, max: 8 },
    colors: [
      BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
      BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      '#FFFFFF',
    ],
    animationDuration: 800,
    fadeOutDelay: 400,
  },

  // Level up celebration (complex multi-part)
  levelUp: {
    parts: [
      { type: 'flash', duration: 200 },
      { type: 'scale-up', duration: 400, delay: 100 },
      { type: 'confetti', duration: 2000, delay: 300 },
      { type: 'glow', duration: 600, delay: 200 },
    ],
    sound: 'level-up-fanfare',
    haptic: [
      { type: 'heavy', delay: 0 },
      { type: 'medium', delay: 200 },
      { type: 'light', delay: 400 },
    ],
  },
} as const;

// ============================================================================
// CARD SWIPE GESTURE ANIMATION
// ============================================================================

/**
 * Flashcard swipe gesture with rotation and opacity
 */
export const CARD_SWIPE_ANIMATION = {
  // Rotation based on swipe distance
  rotation: {
    range: BRAND_CONFIG.MICRO_INTERACTIONS.CARD_SWIPE.ROTATION_RANGE,
    threshold: BRAND_CONFIG.MICRO_INTERACTIONS.CARD_SWIPE.THRESHOLD,
    maxRotation: 15, // degrees
  },

  // Opacity fade during swipe
  opacity: {
    start: 1.0,
    min: BRAND_CONFIG.MICRO_INTERACTIONS.CARD_SWIPE.OPACITY_FADE,
  },

  // Scale effect
  scale: {
    idle: 1.0,
    dragging: 1.05,
  },

  // Snap back animation (if swipe not completed)
  snapBack: {
    duration: 300,
    easing: 'spring' as const,
    springConfig: BRAND_CONFIG.ANIMATION.TIMING.SPRING_DEFAULT,
  },

  // Swipe away animation (when threshold passed)
  swipeAway: {
    duration: 200,
    easing: 'ease-in' as const,
    continueVelocity: true,
  },

  // Direction indicators
  indicators: {
    left: {
      color: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
      icon: '✕',
      label: 'Again',
    },
    right: {
      color: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
      icon: '✓',
      label: 'Got it',
    },
    up: {
      color: BRAND_CONFIG.COLORS.ACCENT.FUSION_ORANGE.HEX,
      icon: '🔄',
      label: 'Hard',
    },
    down: {
      color: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      icon: '📚',
      label: 'Easy',
    },
  },
} as const;

// ============================================================================
// PROGRESS FILL ANIMATION
// ============================================================================

/**
 * Progress bar fill with liquid/spring effect
 */
export const PROGRESS_FILL_ANIMATION = {
  // Base animation
  base: {
    duration: BRAND_CONFIG.MICRO_INTERACTIONS.PROGRESS_FILL.DURATION,
    easing: BRAND_CONFIG.MICRO_INTERACTIONS.PROGRESS_FILL.TIMING,
  },

  // Liquid wave effect
  liquid: {
    enabled: true,
    amplitude: 3, // px
    frequency: 0.5, // waves per second
    phaseSpeed: 2,
  },

  // Spring bounce at completion
  springBounce: {
    enabled: true,
    overshoot: 1.05, // 5% overshoot
    bounceCount: 2,
    springConfig: BRAND_CONFIG.ANIMATION.TIMING.SPRING_BOUNCY,
  },

  // Glow effect when reaching milestones
  milestoneGlow: {
    enabled: true,
    thresholds: [25, 50, 75, 100],
    glowColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
    glowRadius: 20,
    duration: 600,
  },

  // Color gradient shift
  colorShift: {
    enabled: false,
    from: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
    to: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
  },
} as const;

// ============================================================================
// LOADING STATE ANIMATIONS
// ============================================================================

/**
 * Loading indicator animations
 */
export const LOADING_ANIMATIONS = {
  // Spinner rotation
  spinner: {
    duration: 1000,
    easing: 'linear' as const,
    infinite: true,
  },

  // Pulse effect
  pulse: {
    scale: { min: 0.95, max: 1.0 },
    opacity: { min: 0.6, max: 1.0 },
    duration: 800,
    easing: 'ease-in-out' as const,
    infinite: true,
  },

  // Skeleton shimmer
  skeleton: {
    gradientAngle: 45, // degrees
    shimmerWidth: 0.5, // percentage of total width
    duration: 1500,
    easing: 'ease-in-out' as const,
    infinite: true,
    colors: {
      base: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
      highlight: BRAND_CONFIG.BORDER_COLORS.MODERATE.HEX,
    },
  },

  // Dots bouncing
  dots: {
    count: 3,
    size: 8,
    spacing: 4,
    bounceHeight: 12,
    staggerDelay: 150, // ms between each dot
    duration: 600,
    color: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
  },

  // Progress bar loading
  progressBar: {
    indeterminate: {
      duration: 1500,
      easing: 'ease-in-out' as const,
      minProgress: 0.1,
      maxProgress: 0.9,
    },
  },
} as const;

// ============================================================================
// TRANSITION ANIMATIONS
// ============================================================================

/**
 * Screen and element transition animations
 */
export const TRANSITION_ANIMATIONS = {
  // Fade transitions
  fade: {
    in: {
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: BRAND_CONFIG.ANIMATION.TIMING.DURATION.NORMAL,
      easing: BRAND_CONFIG.ANIMATION.TIMING.EASE_IN_OUT,
    },
    out: {
      from: { opacity: 1 },
      to: { opacity: 0 },
      duration: BRAND_CONFIG.ANIMATION.TIMING.DURATION.FAST,
      easing: BRAND_CONFIG.ANIMATION.TIMING.EASE_IN_OUT,
    },
  },

  // Slide transitions
  slide: {
    left: {
      enter: { from: { translateX: 300 }, to: { translateX: 0 } },
      exit: { from: { translateX: 0 }, to: { translateX: -300 } },
      duration: BRAND_CONFIG.ANIMATION.TIMING.DURATION.NORMAL,
    },
    right: {
      enter: { from: { translateX: -300 }, to: { translateX: 0 } },
      exit: { from: { translateX: 0 }, to: { translateX: 300 } },
      duration: BRAND_CONFIG.ANIMATION.TIMING.DURATION.NORMAL,
    },
    up: {
      enter: { from: { translateY: 300 }, to: { translateY: 0 } },
      exit: { from: { translateY: 0 }, to: { translateY: -300 } },
      duration: BRAND_CONFIG.ANIMATION.TIMING.DURATION.NORMAL,
    },
    down: {
      enter: { from: { translateY: -300 }, to: { translateY: 0 } },
      exit: { from: { translateY: 0 }, to: { translateY: 300 } },
      duration: BRAND_CONFIG.ANIMATION.TIMING.DURATION.NORMAL,
    },
  },

  // Scale transitions
  scale: {
    up: {
      enter: { from: { scale: 0.8, opacity: 0 }, to: { scale: 1, opacity: 1 } },
      exit: { from: { scale: 1, opacity: 1 }, to: { scale: 1.1, opacity: 0 } },
      duration: BRAND_CONFIG.ANIMATION.TIMING.DURATION.NORMAL,
    },
    down: {
      enter: { from: { scale: 1.2, opacity: 0 }, to: { scale: 1, opacity: 1 } },
      exit: { from: { scale: 1, opacity: 1 }, to: { scale: 0.9, opacity: 0 } },
      duration: BRAND_CONFIG.ANIMATION.TIMING.DURATION.NORMAL,
    },
  },

  // Shared element transition
  sharedElement: {
    duration: BRAND_CONFIG.ANIMATION.TIMING.DURATION.SLOW,
    easing: BRAND_CONFIG.ANIMATION.TIMING.EASE_IN_OUT,
    resize: true,
    clip: true,
  },
} as const;

// ============================================================================
// ERROR STATE ANIMATIONS
// ============================================================================

/**
 * Error/shake animations for incorrect inputs or actions
 */
export const ERROR_ANIMATIONS = {
  // Shake animation
  shake: {
    translation: [-10, 10, -10, 10, -5, 5, 0],
    duration: 400,
    easing: 'ease-in-out' as const,
    haptic: 'heavy' as const,
  },

  // Red flash
  flash: {
    backgroundColor: {
      from: 'transparent',
      to: 'rgba(239, 68, 68, 0.2)',
    },
    duration: 300,
  },

  // Error bounce
  bounce: {
    scale: { start: 1, peak: 1.1, end: 1 },
    rotation: [-5, 5, 0],
    duration: 400,
  },
} as const;

// ============================================================================
// REDUCED MOTION SUPPORT
// ============================================================================

/**
 * Accessibility configuration for users who prefer reduced motion
 */
export const REDUCED_MOTION_CONFIG = {
  // When reduced motion is enabled
  enabled: {
    disableAnimations: true,
    useFadesOnly: true,
    instantTransitions: true,
    noParallax: true,
    noAutoPlay: true,
  },

  // Alternative animations (simpler versions)
  alternatives: {
    slide: 'fade',
    scale: 'fade',
    rotate: 'none',
    bounce: 'fade',
    confetti: 'static-icon',
  },

  // Respect system preference
  respectSystemPreference: true,
} as const;

// ============================================================================
// EXPORT ALL MICRO-INTERACTION CONFIGS
// ============================================================================

export const MICRO_INTERACTION_CONFIGS = {
  HAPTIC: HAPTIC_CONFIG,
  BUTTON_PRESS: BUTTON_PRESS_ANIMATION,
  SUCCESS_CELEBRATION: SUCCESS_CELEBRATION,
  CARD_SWIPE: CARD_SWIPE_ANIMATION,
  PROGRESS_FILL: PROGRESS_FILL_ANIMATION,
  LOADING: LOADING_ANIMATIONS,
  TRANSITIONS: TRANSITION_ANIMATIONS,
  ERROR: ERROR_ANIMATIONS,
  REDUCED_MOTION: REDUCED_MOTION_CONFIG,
} as const;

export default MICRO_INTERACTION_CONFIGS;
