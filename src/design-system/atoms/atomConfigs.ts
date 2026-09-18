/**
 * Engineering Study Guide App - Design System Atoms
 * 
 * Phase 6: Advanced UI Design System (Atomic)
 * Objective: Build a reusable, animated component library
 * 
 * This file defines the atomic components - the smallest building blocks
 * of the UI system. These are indivisible components that form the foundation
 * of the design system.
 * 
 * ATOMS INCLUDED:
 * - Buttons with haptic feedback states
 * - Animated inputs
 * - Text labels with typography tokens
 * - Icons with consistent sizing
 * - Badges and status indicators
 * - Progress bars (base)
 * - Dividers
 * - Avatars
 */

import { ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { BRAND_CONFIG } from '../brand/brandConstants';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Button variant types for different contexts
 */
export type ButtonVariant = 
  | 'primary'      // Main CTAs (Electric Blue)
  | 'secondary'    // Secondary actions (Neon Cyan)
  | 'tertiary'     // Tertiary actions (Quantum Purple)
  | 'success'      // Positive actions (Plasma Green)
  | 'warning'      // Caution actions (Fusion Orange)
  | 'error'        // Destructive actions (Reactor Red)
  | 'premium'      // Premium features (Stellar Gold)
  | 'ghost'        // Minimal, border-only
  | 'outline';     // Outlined with transparent fill

/**
 * Button size presets
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Input field types
 */
export type InputType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'search'
  | 'multiline';

/**
 * Input validation state
 */
export type InputState = 'default' | 'focused' | 'success' | 'error' | 'disabled';

/**
 * Badge variants for status indication
 */
export type BadgeVariant = 
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'premium';

/**
 * Badge sizes
 */
export type BadgeSize = 'sm' | 'md' | 'lg';

/**
 * Avatar sizes
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Icon sizes matching brand system
 */
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

/**
 * Progress bar types
 */
export type ProgressType = 'linear' | 'circular' | 'semicircular';

/**
 * Animation state for interactive elements
 */
export type AnimationState = 'idle' | 'pressing' | 'loading' | 'success' | 'error';

// ============================================================================
// BUTTON ATOM CONFIGURATION
// ============================================================================

/**
 * Button style configuration derived from brand constants
 */
export const BUTTON_CONFIG = {
  // Base styles applied to all buttons
  base: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flexDirection: 'row' as const,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.MD,
    borderWidth: 1,
  },

  // Size mappings
  sizes: {
    xs: {
      height: 28,
      paddingHorizontal: BRAND_CONFIG.SPACING[3],
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
      iconSize: BRAND_CONFIG.ICON_SYSTEM.SIZES.XS,
    },
    sm: {
      height: 32,
      paddingHorizontal: BRAND_CONFIG.SPACING[4],
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
      iconSize: BRAND_CONFIG.ICON_SYSTEM.SIZES.SM,
    },
    md: {
      height: 40,
      paddingHorizontal: BRAND_CONFIG.SPACING[5],
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
      iconSize: BRAND_CONFIG.ICON_SYSTEM.SIZES.MD,
    },
    lg: {
      height: 48,
      paddingHorizontal: BRAND_CONFIG.SPACING[6],
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.LG.SIZE_PX,
      iconSize: BRAND_CONFIG.ICON_SYSTEM.SIZES.LG,
    },
    xl: {
      height: 56,
      paddingHorizontal: BRAND_CONFIG.SPACING[7],
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XL.SIZE_PX,
      iconSize: BRAND_CONFIG.ICON_SYSTEM.SIZES.XL,
    },
  },

  // Variant color mappings
  variants: {
    primary: {
      backgroundColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      borderColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      textColor: '#FFFFFF',
      iconColor: '#FFFFFF',
      hoverOpacity: 0.9,
      pressedOpacity: 0.8,
    },
    secondary: {
      backgroundColor: BRAND_CONFIG.COLORS.PRIMARY.NEON_CYAN.HEX,
      borderColor: BRAND_CONFIG.COLORS.PRIMARY.NEON_CYAN.HEX,
      textColor: '#FFFFFF',
      iconColor: '#FFFFFF',
      hoverOpacity: 0.9,
      pressedOpacity: 0.8,
    },
    tertiary: {
      backgroundColor: BRAND_CONFIG.COLORS.PRIMARY.QUANTUM_PURPLE.HEX,
      borderColor: BRAND_CONFIG.COLORS.PRIMARY.QUANTUM_PURPLE.HEX,
      textColor: '#FFFFFF',
      iconColor: '#FFFFFF',
      hoverOpacity: 0.9,
      pressedOpacity: 0.8,
    },
    success: {
      backgroundColor: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
      borderColor: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
      textColor: '#FFFFFF',
      iconColor: '#FFFFFF',
      hoverOpacity: 0.9,
      pressedOpacity: 0.8,
    },
    warning: {
      backgroundColor: BRAND_CONFIG.COLORS.ACCENT.FUSION_ORANGE.HEX,
      borderColor: BRAND_CONFIG.COLORS.ACCENT.FUSION_ORANGE.HEX,
      textColor: '#FFFFFF',
      iconColor: '#FFFFFF',
      hoverOpacity: 0.9,
      pressedOpacity: 0.8,
    },
    error: {
      backgroundColor: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
      borderColor: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
      textColor: '#FFFFFF',
      iconColor: '#FFFFFF',
      hoverOpacity: 0.9,
      pressedOpacity: 0.8,
    },
    premium: {
      backgroundColor: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
      borderColor: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
      textColor: '#FFFFFF',
      iconColor: '#FFFFFF',
      hoverOpacity: 0.9,
      pressedOpacity: 0.8,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      textColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      iconColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      hoverOpacity: 1,
      pressedOpacity: 0.9,
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      textColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      iconColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      hoverOpacity: 1,
      pressedOpacity: 0.9,
    },
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
    backgroundColor: BRAND_CONFIG.BORDER_COLORS.MODERATE.HEX,
    borderColor: BRAND_CONFIG.BORDER_COLORS.MODERATE.HEX,
    textColor: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
  },

  // Animation config for button press
  pressAnimation: {
    scaleDown: BRAND_CONFIG.MICRO_INTERACTIONS.BUTTON_PRESS.SCALE_DOWN,
    duration: BRAND_CONFIG.MICRO_INTERACTIONS.BUTTON_PRESS.DURATION,
    easing: BRAND_CONFIG.MICRO_INTERACTIONS.BUTTON_PRESS.TIMING,
    haptic: BRAND_CONFIG.MICRO_INTERACTIONS.BUTTON_PRESS.HAPTIC,
  },
} as const;

// ============================================================================
// INPUT ATOM CONFIGURATION
// ============================================================================

/**
 * Input field style configuration
 */
export const INPUT_CONFIG = {
  // Base container styles
  base: {
    borderWidth: 1,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.MD,
    paddingHorizontal: BRAND_CONFIG.SPACING[4],
    paddingVertical: BRAND_CONFIG.SPACING[3],
    minHeight: 48,
  },

  // State-based styling
  states: {
    default: {
      borderColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
      backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_800.HEX,
    },
    focused: {
      borderColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_800.HEX,
      shadowColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 2,
    },
    success: {
      borderColor: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
      backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_800.HEX,
    },
    error: {
      borderColor: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
      backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_800.HEX,
    },
    disabled: {
      borderColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
      backgroundColor: 'rgba(51, 65, 85, 0.5)',
      opacity: 0.6,
    },
  },

  // Text styling
  text: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
    lineHeight: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.LINE_HEIGHT,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
    placeholderColor: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    fontFamily: BRAND_CONFIG.TYPOGRAPHY.FAMILIES.INTER.NAME,
  },

  // Label styling
  label: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.MEDIUM,
    color: BRAND_CONFIG.TEXT_COLORS.SECONDARY_LIGHT.HEX,
    marginBottom: BRAND_CONFIG.SPACING[2],
  },

  // Helper/error text
  helperText: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
    marginTop: BRAND_CONFIG.SPACING[1],
  },

  // Icon positioning
  icon: {
    size: BRAND_CONFIG.ICON_SYSTEM.SIZES.MD,
    leftPosition: BRAND_CONFIG.SPACING[3],
    rightPosition: BRAND_CONFIG.SPACING[3],
  },
} as const;

// ============================================================================
// BADGE ATOM CONFIGURATION
// ============================================================================

/**
 * Badge style configuration
 */
export const BADGE_CONFIG = {
  // Base styles
  base: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
    borderWidth: 0,
  },

  // Size mappings
  sizes: {
    sm: {
      height: 18,
      paddingHorizontal: BRAND_CONFIG.SPACING[2],
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
      iconSize: 10,
    },
    md: {
      height: 22,
      paddingHorizontal: BRAND_CONFIG.SPACING[3],
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
      iconSize: 12,
    },
    lg: {
      height: 28,
      paddingHorizontal: BRAND_CONFIG.SPACING[4],
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
      iconSize: 14,
    },
  },

  // Variant colors
  variants: {
    default: {
      backgroundColor: BRAND_CONFIG.BORDER_COLORS.MODERATE.HEX,
      textColor: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
    },
    success: {
      backgroundColor: 'rgba(16, 185, 129, 0.2)',
      textColor: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
      borderColor: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
    },
    warning: {
      backgroundColor: 'rgba(249, 115, 22, 0.2)',
      textColor: BRAND_CONFIG.COLORS.ACCENT.FUSION_ORANGE.HEX,
      borderColor: BRAND_CONFIG.COLORS.ACCENT.FUSION_ORANGE.HEX,
    },
    error: {
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      textColor: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
      borderColor: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
    },
    info: {
      backgroundColor: 'rgba(236, 72, 153, 0.2)',
      textColor: BRAND_CONFIG.COLORS.ACCENT.PHOTON_PINK.HEX,
      borderColor: BRAND_CONFIG.COLORS.ACCENT.PHOTON_PINK.HEX,
    },
    premium: {
      backgroundColor: 'rgba(234, 179, 8, 0.2)',
      textColor: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
      borderColor: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
    },
  },
} as const;

// ============================================================================
// AVATAR ATOM CONFIGURATION
// ============================================================================

/**
 * Avatar style configuration
 */
export const AVATAR_CONFIG = {
  // Base circular container
  base: {
    borderRadius: 9999,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    overflow: 'hidden' as const,
    backgroundColor: BRAND_CONFIG.BORDER_COLORS.MODERATE.HEX,
  },

  // Size mappings
  sizes: {
    xs: {
      width: 24,
      height: 24,
      fontSize: 10,
    },
    sm: {
      width: 32,
      height: 32,
      fontSize: 12,
    },
    md: {
      width: 40,
      height: 40,
      fontSize: 14,
    },
    lg: {
      width: 56,
      height: 56,
      fontSize: 18,
    },
    xl: {
      width: 80,
      height: 80,
      fontSize: 24,
    },
    '2xl': {
      width: 120,
      height: 120,
      fontSize: 36,
    },
  },

  // Status indicator (online/offline)
  statusIndicator: {
    size: 12,
    borderWidth: 2,
    borderColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_950.HEX,
    online: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
    offline: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    busy: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
  },
} as const;

// ============================================================================
// ICON ATOM CONFIGURATION
// ============================================================================

/**
 * Icon style configuration
 */
export const ICON_CONFIG = {
  // Size mappings from brand system
  sizes: {
    xs: BRAND_CONFIG.ICON_SYSTEM.SIZES.XS,
    sm: BRAND_CONFIG.ICON_SYSTEM.SIZES.SM,
    md: BRAND_CONFIG.ICON_SYSTEM.SIZES.MD,
    lg: BRAND_CONFIG.ICON_SYSTEM.SIZES.LG,
    xl: BRAND_CONFIG.ICON_SYSTEM.SIZES.XL,
    '2xl': BRAND_CONFIG.ICON_SYSTEM.SIZES['2XL'],
    '3xl': BRAND_CONFIG.ICON_SYSTEM.SIZES['3XL'],
    '4xl': BRAND_CONFIG.ICON_SYSTEM.SIZES['4XL'],
  },

  // Stroke widths for different sizes
  strokeWidths: {
    xs: BRAND_CONFIG.ICON_SYSTEM.STROKE_WIDTHS.XS,
    sm: BRAND_CONFIG.ICON_SYSTEM.STROKE_WIDTHS.SM,
    md: BRAND_CONFIG.ICON_SYSTEM.STROKE_WIDTHS.MD,
    lg: BRAND_CONFIG.ICON_SYSTEM.STROKE_WIDTHS.LG,
    xl: BRAND_CONFIG.ICON_SYSTEM.STROKE_WIDTHS.XL,
    '2xl': BRAND_CONFIG.ICON_SYSTEM.STROKE_WIDTHS['2XL'],
  },

  // Default color
  defaultColor: BRAND_CONFIG.TEXT_COLORS.SECONDARY_LIGHT.HEX,

  // Interactive icon behavior
  interactive: {
    activeColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
    pressScale: BRAND_CONFIG.MICRO_INTERACTIONS.BUTTON_PRESS.SCALE_DOWN,
    pressDuration: BRAND_CONFIG.MICRO_INTERACTIONS.BUTTON_PRESS.DURATION,
  },
} as const;

// ============================================================================
// PROGRESS BAR ATOM CONFIGURATION
// ============================================================================

/**
 * Progress bar configuration
 */
export const PROGRESS_CONFIG = {
  // Linear progress bar
  linear: {
    height: 4,
    heightLg: 8,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
    backgroundColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
    trackColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
  },

  // Circular progress
  circular: {
    strokeWidth: 4,
    strokeWidthLg: 8,
    backgroundColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
    trackColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
  },

  // Animation config
  animation: {
    duration: BRAND_CONFIG.MICRO_INTERACTIONS.PROGRESS_FILL.DURATION,
    easing: BRAND_CONFIG.MICRO_INTERACTIONS.PROGRESS_FILL.TIMING,
  },

  // Glow effect for gamification
  glowEnabled: true,
  glowColors: {
    blue: BRAND_CONFIG.SHADOWS.GLOW_BLUE,
    cyan: BRAND_CONFIG.SHADOWS.GLOW_CYAN,
    purple: BRAND_CONFIG.SHADOWS.GLOW_PURPLE,
    green: BRAND_CONFIG.SHADOWS.GLOW_GREEN,
    orange: BRAND_CONFIG.SHADOWS.GLOW_ORANGE,
    gold: BRAND_CONFIG.SHADOWS.GLOW_GOLD,
  },
} as const;

// ============================================================================
// DIVIDER ATOM CONFIGURATION
// ============================================================================

/**
 * Divider configuration
 */
export const DIVIDER_CONFIG = {
  // Default divider
  default: {
    height: 1,
    backgroundColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
    marginVertical: BRAND_CONFIG.SPACING[4],
  },

  // Subtle divider
  subtle: {
    height: 1,
    backgroundColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
    opacity: 0.5,
  },

  // Strong divider
  strong: {
    height: 2,
    backgroundColor: BRAND_CONFIG.BORDER_COLORS.STRONG.HEX,
  },

  // Vertical divider
  vertical: {
    width: 1,
    backgroundColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
    marginHorizontal: BRAND_CONFIG.SPACING[4],
  },
} as const;

// ============================================================================
// TEXT LABEL ATOM CONFIGURATION
// ============================================================================

/**
 * Text label configuration
 */
export const TEXT_CONFIG = {
  // Font families
  fonts: {
    primary: BRAND_CONFIG.TYPOGRAPHY.FAMILIES.INTER.STACK,
    mono: BRAND_CONFIG.TYPOGRAPHY.FAMILIES.JETBRAINS_MONO.STACK,
  },

  // Color mappings
  colors: {
    primary: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
    secondary: BRAND_CONFIG.TEXT_COLORS.SECONDARY_LIGHT.HEX,
    tertiary: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    disabled: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    electricBlue: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
    neonCyan: BRAND_CONFIG.COLORS.PRIMARY.NEON_CYAN.HEX,
    quantumPurple: BRAND_CONFIG.COLORS.PRIMARY.QUANTUM_PURPLE.HEX,
    plasmaGreen: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
    fusionOrange: BRAND_CONFIG.COLORS.ACCENT.FUSION_ORANGE.HEX,
    reactorRed: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
    stellarGold: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
    photonPink: BRAND_CONFIG.COLORS.ACCENT.PHOTON_PINK.HEX,
  },

  // Size mappings
  sizes: {
    xs: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
      lineHeight: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.LINE_HEIGHT,
      letterSpacing: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.LETTER_SPACING,
    },
    sm: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
      lineHeight: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.LINE_HEIGHT,
      letterSpacing: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.LETTER_SPACING,
    },
    base: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
      lineHeight: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.LINE_HEIGHT,
      letterSpacing: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.LETTER_SPACING,
    },
    lg: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.LG.SIZE_PX,
      lineHeight: BRAND_CONFIG.TYPOGRAPHY.SIZES.LG.LINE_HEIGHT,
      letterSpacing: BRAND_CONFIG.TYPOGRAPHY.SIZES.LG.LETTER_SPACING,
    },
    xl: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XL.SIZE_PX,
      lineHeight: BRAND_CONFIG.TYPOGRAPHY.SIZES.XL.LINE_HEIGHT,
      letterSpacing: BRAND_CONFIG.TYPOGRAPHY.SIZES.XL.LETTER_SPACING,
    },
    '2xl': {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES['2XL'].SIZE_PX,
      lineHeight: BRAND_CONFIG.TYPOGRAPHY.SIZES['2XL'].LINE_HEIGHT,
      letterSpacing: BRAND_CONFIG.TYPOGRAPHY.SIZES['2XL'].LETTER_SPACING,
    },
    '3xl': {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES['3XL'].SIZE_PX,
      lineHeight: BRAND_CONFIG.TYPOGRAPHY.SIZES['3XL'].LINE_HEIGHT,
      letterSpacing: BRAND_CONFIG.TYPOGRAPHY.SIZES['3XL'].LETTER_SPACING,
    },
    '4xl': {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES['4XL'].SIZE_PX,
      lineHeight: BRAND_CONFIG.TYPOGRAPHY.SIZES['4XL'].LINE_HEIGHT,
      letterSpacing: BRAND_CONFIG.TYPOGRAPHY.SIZES['4XL'].LETTER_SPACING,
    },
    '5xl': {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES['5XL'].SIZE_PX,
      lineHeight: BRAND_CONFIG.TYPOGRAPHY.SIZES['5XL'].LINE_HEIGHT,
      letterSpacing: BRAND_CONFIG.TYPOGRAPHY.SIZES['5XL'].LETTER_SPACING,
    },
    '6xl': {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES['6XL'].SIZE_PX,
      lineHeight: BRAND_CONFIG.TYPOGRAPHY.SIZES['6XL'].LINE_HEIGHT,
      letterSpacing: BRAND_CONFIG.TYPOGRAPHY.SIZES['6XL'].LETTER_SPACING,
    },
  },

  // Weight mappings
  weights: {
    light: BRAND_CONFIG.FONT_WEIGHTS.LIGHT,
    regular: BRAND_CONFIG.FONT_WEIGHTS.REGULAR,
    medium: BRAND_CONFIG.FONT_WEIGHTS.MEDIUM,
    semibold: BRAND_CONFIG.FONT_WEIGHTS.SEMIBOLD,
    bold: BRAND_CONFIG.FONT_WEIGHTS.BOLD,
    extrabold: BRAND_CONFIG.FONT_WEIGHTS.EXTRABOLD,
  },
} as const;

// ============================================================================
// EXPORT ALL ATOM CONFIGS
// ============================================================================

export const ATOM_CONFIGS = {
  BUTTON: BUTTON_CONFIG,
  INPUT: INPUT_CONFIG,
  BADGE: BADGE_CONFIG,
  AVATAR: AVATAR_CONFIG,
  ICON: ICON_CONFIG,
  PROGRESS: PROGRESS_CONFIG,
  DIVIDER: DIVIDER_CONFIG,
  TEXT: TEXT_CONFIG,
} as const;

export default ATOM_CONFIGS;
