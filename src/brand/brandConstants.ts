/**
 * Engineering Study Guide App - Brand Identity Constants
 * 
 * Phase 4: Brand Identity & Visual Language
 * Objective: Create a visual identity that feels "premium" and "engineering-focused" but fun.
 * 
 * This file defines the core brand constants including logo specifications,
 * color palette, typography, and icon system references.
 */

// ============================================================================
// LOGO SPECIFICATIONS
// ============================================================================

/**
 * Logo Configuration
 * Concept: Abstract gear/brain hybrid
 * - Represents the fusion of engineering (gear) and learning (brain)
 * - Designed to be recognizable at small sizes (favicon, app icon)
 * - Works in both light and dark contexts
 */
export const LOGO_CONFIG = {
  // Aspect ratio for the logo (width / height)
  ASPECT_RATIO: 1, // Square format for app icon compatibility
  
  // Minimum clear space around logo (as multiple of logo height)
  MIN_CLEAR_SPACE: 0.25,
  
  // Minimum display size in pixels
  MIN_SIZE_SM: 24,
  MIN_SIZE_MD: 48,
  MIN_SIZE_LG: 96,
  
  // Logo variants
  VARIANTS: {
    PRIMARY: 'logo-primary',      // Full color on light background
    INVERSE: 'logo-inverse',      // White/light on dark background
    MONOCHROME: 'logo-mono',      // Single color (for print/merchandise)
    ICON_ONLY: 'logo-icon',       // Gear/brain symbol without text
    TEXT_ONLY: 'logo-wordmark',   // Text logotype only
  },
  
  // File formats available
  FORMATS: ['svg', 'png', 'webp'],
} as const;

// ============================================================================
// COLOR PALETTE
// ============================================================================

/**
 * Color System Philosophy:
 * - Dark mode native: Deep slate backgrounds with neon accents
 * - Optimized for late-night studying (reduced eye strain)
 * - High contrast ratios for accessibility (WCAG AA minimum)
 * - Engineering-inspired colors (technical, precise, professional)
 */

/**
 * Primary Colors - Core brand identity
 */
export const PRIMARY_COLORS = {
  // Main brand color - Electric Blue
  ELECTRIC_BLUE: {
    HEX: '#3B82F6',
    RGB: 'rgb(59, 130, 246)',
    HSL: 'hsl(217, 91%, 60%)',
    TAILWIND: 'blue-500',
    // Accessibility: Use on backgrounds darker than #1a1a2e
    CONTRAST_ON_DARK: 8.2, // WCAG AAA
  },
  
  // Secondary accent - Neon Cyan
  NEON_CYAN: {
    HEX: '#06B6D4',
    RGB: 'rgb(6, 182, 212)',
    HSL: 'hsl(187, 95%, 43%)',
    TAILWIND: 'cyan-500',
    // Best for highlights and interactive elements
    CONTRAST_ON_DARK: 6.8, // WCAG AA
  },
  
  // Tertiary accent - Quantum Purple
  QUANTUM_PURPLE: {
    HEX: '#8B5CF6',
    RGB: 'rgb(139, 92, 246)',
    HSL: 'hsl(263, 83%, 66%)',
    TAILWIND: 'violet-500',
    // Used for premium features and achievements
    CONTRAST_ON_DARK: 5.9, // WCAG AA (use larger text)
  },
} as const;

/**
 * Accent Colors - For gamification, alerts, and special states
 */
export const ACCENT_COLORS = {
  // Success/Growth - Plasma Green
  PLASMA_GREEN: {
    HEX: '#10B981',
    RGB: 'rgb(16, 185, 129)',
    HSL: 'hsl(160, 84%, 39%)',
    USAGE: ['success-states', 'streak-indicators', 'correct-answers'],
    CONTRAST_ON_DARK: 5.5,
  },
  
  // Energy/XP - Fusion Orange
  FUSION_ORANGE: {
    HEX: '#F97316',
    RGB: 'rgb(249, 115, 22)',
    HSL: 'hsl(27, 95%, 53%)',
    USAGE: ['xp-gains', 'warnings', 'attention-grabbers'],
    CONTRAST_ON_DARK: 4.8, // Use with care on dark backgrounds
  },
  
  // Premium/Rare - Stellar Gold
  STELLAR_GOLD: {
    HEX: '#EAB308',
    RGB: 'rgb(234, 179, 8)',
    HSL: 'hsl(48, 96%, 47%)',
    USAGE: ['premium-features', 'rare-achievements', 'currency'],
    CONTRAST_ON_DARK: 7.1,
  },
  
  // Error/Danger - Reactor Red
  REACTOR_RED: {
    HEX: '#EF4444',
    RGB: 'rgb(239, 68, 68)',
    HSL: 'hsl(0, 83%, 60%)',
    USAGE: ['errors', 'incorrect-answers', 'critical-alerts'],
    CONTRAST_ON_DARK: 5.2,
  },
  
  // Info/Help - Photon Pink
  PHOTON_PINK: {
    HEX: '#EC4899',
    RGB: 'rgb(236, 72, 153)',
    HSL: 'hsl(330, 81%, 60%)',
    USAGE: ['info-notifications', 'hints', 'special-events'],
    CONTRAST_ON_DARK: 5.8,
  },
} as const;

/**
 * Background Colors - Deep slate family for dark mode
 */
export const BACKGROUND_COLORS = {
  // Deepest level - Main app background
  DEEP_SLATE_950: {
    HEX: '#0F172A',
    RGB: 'rgb(15, 23, 42)',
    HSL: 'hsl(222, 47%, 11%)',
    TAILWIND: 'slate-950',
    USAGE: ['main-background', 'dark-mode-base'],
  },
  
  // Surface level 1 - Cards, modals
  DEEP_SLATE_900: {
    HEX: '#1E293B',
    RGB: 'rgb(30, 41, 59)',
    HSL: 'hsl(222, 47%, 17%)',
    TAILWIND: 'slate-900',
    USAGE: ['card-backgrounds', 'modal-surfaces'],
  },
  
  // Surface level 2 - Elevated elements
  DEEP_SLATE_800: {
    HEX: '#334155',
    RGB: 'rgb(51, 65, 85)',
    HSL: 'hsl(217, 25%, 26%)',
    TAILWIND: 'slate-800',
    USAGE: ['hover-states', 'elevated-surfaces'],
  },
  
  // Surface level 3 - Interactive elements
  DEEP_SLATE_700: {
    HEX: '#475569',
    RGB: 'rgb(71, 85, 105)',
    HSL: 'hsl(215, 20%, 34%)',
    TAILWIND: 'slate-700',
    USAGE: ['button-backgrounds', 'input-fields'],
  },
  
  // Light mode backgrounds (for accessibility/compliance)
  LIGHT_MODE: {
    WHITE: '#FFFFFF',
    GRAY_50: '#F8FAFC',
    GRAY_100: '#F1F5F9',
    GRAY_200: '#E2E8F0',
  },
} as const;

/**
 * Text Colors - Optimized for readability
 */
export const TEXT_COLORS = {
  // Primary text - Highest emphasis
  PRIMARY_LIGHT: {
    HEX: '#F8FAFC',
    RGB: 'rgb(248, 250, 252)',
    USAGE: ['headings', 'primary-content', 'active-states'],
    CONTRAST_ON_DARK_BG: 18.5, // Excellent
  },
  
  // Secondary text - Body content
  SECONDARY_LIGHT: {
    HEX: '#CBD5E1',
    RGB: 'rgb(203, 213, 225)',
    USAGE: ['body-text', 'descriptions', 'labels'],
    CONTRAST_ON_DARK_BG: 11.2, // Excellent
  },
  
  // Tertiary text - Low emphasis
  TERTIARY_LIGHT: {
    HEX: '#94A3B8',
    RGB: 'rgb(148, 163, 184)',
    USAGE: ['placeholders', 'disabled-text', 'timestamps'],
    CONTRAST_ON_DARK_BG: 6.1, // Good (AA)
  },
  
  // Light mode text
  PRIMARY_DARK: {
    HEX: '#0F172A',
    USAGE: ['light-mode-headings'],
  },
  
  SECONDARY_DARK: {
    HEX: '#334155',
    USAGE: ['light-mode-body'],
  },
} as const;

/**
 * Border & Divider Colors
 */
export const BORDER_COLORS = {
  SUBTLE: {
    HEX: '#334155',
    TAILWIND: 'slate-700',
    USAGE: ['card-borders', 'section-dividers'],
  },
  
  MODERATE: {
    HEX: '#475569',
    TAILWIND: 'slate-600',
    USAGE: ['input-borders', 'active-states'],
  },
  
  STRONG: {
    HEX: '#64748B',
    TAILWIND: 'slate-500',
    USAGE: ['focus-states', 'selected-items'],
  },
} as const;

// ============================================================================
// TYPOGRAPHY SYSTEM
// ============================================================================

/**
 * Typography Philosophy:
 * - Inter: Clean, modern, highly readable UI font
 * - JetBrains Mono: Technical precision for code snippets and equations
 * - Optimized for screen reading at various sizes
 * - Supports extensive character sets (including Greek letters for equations)
 */

/**
 * Font Families
 */
export const FONT_FAMILIES = {
  // Primary UI Font - Inter
  INTER: {
    NAME: 'Inter',
    STACK: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    USAGE: ['all-ui-text', 'headings', 'body-copy', 'buttons', 'labels'],
    WEIGHTS: [300, 400, 500, 600, 700, 800],
    GOOGLE_FONTS_URL: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    LICENSE: 'Open Font License (OFL)',
  },
  
  // Monospace Font - JetBrains Mono
  JETBRAINS_MONO: {
    NAME: 'JetBrains Mono',
    STACK: '"JetBrains Mono", "Fira Code", "Consolas", "Monaco", monospace',
    USAGE: ['code-snippets', 'equations', 'technical-data', 'counters'],
    WEIGHTS: [400, 500, 600, 700],
    GOOGLE_FONTS_URL: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap',
    LICENSE: 'Open Font License (OFL)',
    FEATURES: ['ligatures', 'alternate-characters', 'coding-optimized'],
  },
} as const;

/**
 * Font Size Scale
 * Based on a modular scale (1.25 ratio - Major Third)
 */
export const FONT_SIZES = {
  XS: {
    SIZE_REM: 0.75,
    SIZE_PX: 12,
    LINE_HEIGHT: 1.5,
    LETTER_SPACING: '0.025em',
    USAGE: ['captions', 'footnotes', 'legal-text'],
  },
  SM: {
    SIZE_REM: 0.875,
    SIZE_PX: 14,
    LINE_HEIGHT: 1.5,
    LETTER_SPACING: '0.025em',
    USAGE: ['secondary-text', 'labels', 'helper-text'],
  },
  BASE: {
    SIZE_REM: 1,
    SIZE_PX: 16,
    LINE_HEIGHT: 1.6,
    LETTER_SPACING: 'normal',
    USAGE: ['body-text', 'default-text'],
  },
  LG: {
    SIZE_REM: 1.125,
    SIZE_PX: 18,
    LINE_HEIGHT: 1.6,
    LETTER_SPACING: '-0.01em',
    USAGE: ['lead-paragraphs', 'emphasis-text'],
  },
  XL: {
    SIZE_REM: 1.25,
    SIZE_PX: 20,
    LINE_HEIGHT: 1.6,
    LETTER_SPACING: '-0.01em',
    USAGE: ['subheadings', 'card-titles'],
  },
  '2XL': {
    SIZE_REM: 1.5,
    SIZE_PX: 24,
    LINE_HEIGHT: 1.5,
    LETTER_SPACING: '-0.02em',
    USAGE: ['section-headings', 'modal-titles'],
  },
  '3XL': {
    SIZE_REM: 1.875,
    SIZE_PX: 30,
    LINE_HEIGHT: 1.4,
    LETTER_SPACING: '-0.02em',
    USAGE: ['page-headings', 'hero-text'],
  },
  '4XL': {
    SIZE_REM: 2.25,
    SIZE_PX: 36,
    LINE_HEIGHT: 1.3,
    LETTER_SPACING: '-0.03em',
    USAGE: ['display-text', 'achievement-numbers'],
  },
  '5XL': {
    SIZE_REM: 3,
    SIZE_PX: 48,
    LINE_HEIGHT: 1.2,
    LETTER_SPACING: '-0.03em',
    USAGE: ['mega-display', 'streak-counts', 'level-numbers'],
  },
  '6XL': {
    SIZE_REM: 3.75,
    SIZE_PX: 60,
    LINE_HEIGHT: 1.1,
    LETTER_SPACING: '-0.04em',
    USAGE: ['hero-numbers', 'celebration-text'],
  },
} as const;

/**
 * Font Weights
 */
export const FONT_WEIGHTS = {
  LIGHT: 300,
  REGULAR: 400,
  MEDIUM: 500,
  SEMIBOLD: 600,
  BOLD: 700,
  EXTRABOLD: 800,
} as const;

/**
 * Heading Styles Preset
 */
export const HEADING_STYLES = {
  H1: {
    FONT_FAMILY: FONT_FAMILIES.INTER.NAME,
    FONT_SIZE: FONT_SIZES['4XL'].SIZE_REM,
    FONT_WEIGHT: FONT_WEIGHTS.EXTRABOLD,
    LINE_HEIGHT: 1.3,
    LETTER_SPACING: '-0.03em',
    TEXT_TRANSFORM: 'none' as const,
    MARGIN_BOTTOM: '1rem',
  },
  H2: {
    FONT_FAMILY: FONT_FAMILIES.INTER.NAME,
    FONT_SIZE: FONT_SIZES['3XL'].SIZE_REM,
    FONT_WEIGHT: FONT_WEIGHTS.BOLD,
    LINE_HEIGHT: 1.4,
    LETTER_SPACING: '-0.02em',
    MARGIN_BOTTOM: '0.875rem',
  },
  H3: {
    FONT_FAMILY: FONT_FAMILIES.INTER.NAME,
    FONT_SIZE: FONT_SIZES['2XL'].SIZE_REM,
    FONT_WEIGHT: FONT_WEIGHTS.SEMIBOLD,
    LINE_HEIGHT: 1.5,
    LETTER_SPACING: '-0.02em',
    MARGIN_BOTTOM: '0.75rem',
  },
  H4: {
    FONT_FAMILY: FONT_FAMILIES.INTER.NAME,
    FONT_SIZE: FONT_SIZES.XL.SIZE_REM,
    FONT_WEIGHT: FONT_WEIGHTS.SEMIBOLD,
    LINE_HEIGHT: 1.6,
    LETTER_SPACING: '-0.01em',
    MARGIN_BOTTOM: '0.625rem',
  },
  H5: {
    FONT_FAMILY: FONT_FAMILIES.INTER.NAME,
    FONT_SIZE: FONT_SIZES.LG.SIZE_REM,
    FONT_WEIGHT: FONT_WEIGHTS.MEDIUM,
    LINE_HEIGHT: 1.6,
    LETTER_SPACING: 'normal',
    MARGIN_BOTTOM: '0.5rem',
  },
  H6: {
    FONT_FAMILY: FONT_FAMILIES.INTER.NAME,
    FONT_SIZE: FONT_SIZES.BASE.SIZE_REM,
    FONT_WEIGHT: FONT_WEIGHTS.SEMIBOLD,
    LINE_HEIGHT: 1.6,
    LETTER_SPACING: '0.01em',
    MARGIN_BOTTOM: '0.5rem',
  },
} as const;

// ============================================================================
// ICON SYSTEM SPECIFICATIONS
// ============================================================================

/**
 * Icon System Philosophy:
 * - Custom 3D-rendered engineering icons for key features
 * - Consistent stroke width and corner radius
 * - Grid-based design for optical alignment
 * - Multiple sizes optimized for different contexts
 */

/**
 * Icon Grid & Sizing
 */
export const ICON_SYSTEM = {
  // Base grid size in pixels
  GRID_SIZE: 8,
  
  // Standard icon sizes (in pixels)
  SIZES: {
    XS: 16,   // Inline icons, small indicators
    SM: 20,   // List items, compact buttons
    MD: 24,   // Navigation, standard buttons
    LG: 32,   // Feature cards, prominent actions
    XL: 48,   // Empty states, illustrations
    '2XL': 64, // Hero sections, onboarding
    '3XL': 96, // Marketing, splash screens
    '4XL': 128, // Large displays
  },
  
  // Stroke widths for different sizes
  STROKE_WIDTHS: {
    XS: 1.5,
    SM: 1.5,
    MD: 2,
    LG: 2,
    XL: 2.5,
    '2XL': 3,
  },
  
  // Corner radius style
  CORNER_RADIUS: {
    STYLE: 'rounded', // Options: 'sharp', 'rounded', 'circular'
    RADIUS_SM: 2,
    RADIUS_MD: 3,
    RADIUS_LG: 4,
  },
  
  // Padding within icon bounds (for touch targets)
  TOUCH_TARGET_PADDING: 4,
} as const;

/**
 * Icon Categories - Engineering-themed
 */
export const ICON_CATEGORIES = {
  NAVIGATION: [
    'home',
    'courses',
    'flashcards',
    'quiz',
    'profile',
    'settings',
    'search',
    'notifications',
  ],
  
  ACTIONS: [
    'play',
    'pause',
    'stop',
    'restart',
    'next',
    'previous',
    'shuffle',
    'repeat',
    'download',
    'upload',
    'share',
    'bookmark',
    'favorite',
    'like',
    'edit',
    'delete',
    'copy',
    'paste',
  ],
  
  FEEDBACK: [
    'check',
    'close',
    'error',
    'warning',
    'info',
    'success',
    'loading',
    'spinner',
  ],
  
  ENGINEERING_DISCIPLINES: [
    'mechanical',      // Gear icon
    'electrical',      // Circuit/lightning
    'civil',           // Building/bridge
    'chemical',        // Flask/molecule
    'computer',        // CPU/code
    'aerospace',       // Rocket/plane
    'biomedical',      // DNA/medical
    'industrial',      // Factory/process
    'materials',       // Crystal/structure
    'environmental',   // Leaf/globe
  ],
  
  GAMIFICATION: [
    'trophy',
    'medal',
    'badge',
    'star',
    'crown',
    'gem',
    'coin',
    'chest',
    'level-up',
    'streak-fire',
    'xp-crystal',
  ],
  
  STUDY_TOOLS: [
    'book',
    'pencil',
    'calculator',
    'ruler',
    'compass',
    'protractor',
    'microscope',
    'telescope',
    'atom',
    'molecule',
    'graph',
    'chart',
  ],
  
  SOCIAL: [
    'user',
    'users',
    'chat',
    'comment',
    'message',
    'heart',
    'follow',
    'leaderboard',
  ],
  
  SYSTEM: [
    'sun',             // Light mode
    'moon',            // Dark mode
    'bell',            // Notifications
    'lock',            // Security
    'unlock',
    'logout',
    'help',
    'info-circle',
  ],
} as const;

/**
 * 3D Icon Rendering Specifications
 * For Blender renders and marketing assets
 */
export const ICON_3D_SPECS = {
  // Camera settings
  CAMERA: {
    FOV: 45,
    DISTANCE: 2.5,
    ANGLE: { X: 30, Y: 45 }, // Isometric-ish view
  },
  
  // Lighting setup
  LIGHTING: {
    KEY_LIGHT: { INTENSITY: 1.5, COLOR: '#FFFFFF', POSITION: [3, 3, 3] },
    FILL_LIGHT: { INTENSITY: 0.5, COLOR: '#3B82F6', POSITION: [-2, 1, 2] },
    RIM_LIGHT: { INTENSITY: 0.8, COLOR: '#06B6D4', POSITION: [0, -2, -2] },
    AMBIENT: { INTENSITY: 0.2, COLOR: '#1E293B' },
  },
  
  // Material styles
  MATERIALS: {
    METALLIC: {
      BASE_COLOR: '#3B82F6',
      METALLIC: 0.9,
      ROUGHNESS: 0.2,
    },
    GLASS: {
      BASE_COLOR: '#06B6D4',
      TRANSMISSION: 0.9,
      ROUGHNESS: 0.1,
      IOR: 1.5,
    },
    PLASTIC: {
      BASE_COLOR: '#8B5CF6',
      METALLIC: 0.0,
      ROUGHNESS: 0.4,
    },
    GLOW: {
      EMISSION_COLOR: '#10B981',
      EMISSION_STRENGTH: 2.0,
    },
  },
  
  // Render settings
  RENDER: {
    RESOLUTION: { WIDTH: 1024, HEIGHT: 1024 },
    SAMPLES: 128,
    FORMAT: 'PNG',
    TRANSPARENCY: true,
  },
} as const;

// ============================================================================
// SPACING & LAYOUT SYSTEM
// ============================================================================

/**
 * Spacing Scale
 * Based on 8px grid system for consistency
 */
export const SPACING = {
  0: 0,
  1: 4,    // 4px - Tight spacing
  2: 8,    // 8px - Base unit
  3: 12,   // 12px
  4: 16,   // 16px - Standard padding
  5: 20,   // 20px
  6: 24,   // 24px - Card padding
  7: 32,   // 32px - Section spacing
  8: 40,   // 40px
  9: 48,   // 48px
  10: 64,  // 64px - Large section gaps
  11: 80,  // 80px
  12: 96,  // 96px - Page margins
  13: 128, // 128px
  14: 160, // 160px
  15: 192, // 192px
  16: 256, // 256px
} as const;

/**
 * Border Radius Scale
 */
export const BORDER_RADIUS = {
  NONE: 0,
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  '2XL': 24,
  '3XL': 32,
  FULL: 9999, // Pill shape
} as const;

/**
 * Shadow System
 */
export const SHADOWS = {
  NONE: 'none',
  SM: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  MD: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  LG: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
  XL: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
  '2XL': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  INNER: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  // Glow effects for gamification
  GLOW_BLUE: '0 0 20px rgba(59, 130, 246, 0.5)',
  GLOW_CYAN: '0 0 20px rgba(6, 182, 212, 0.5)',
  GLOW_PURPLE: '0 0 20px rgba(139, 92, 246, 0.5)',
  GLOW_GREEN: '0 0 20px rgba(16, 185, 129, 0.5)',
  GLOW_ORANGE: '0 0 20px rgba(249, 115, 22, 0.5)',
  GLOW_GOLD: '0 0 20px rgba(234, 179, 8, 0.5)',
} as const;

// ============================================================================
// MOTION & ANIMATION PRINCIPLES
// ============================================================================

/**
 * Animation Timing Functions
 * Engineered for smooth, natural feel
 */
export const ANIMATION_TIMING = {
  // Standard easings
  LINEAR: 'linear',
  EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
  EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
  EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Spring physics (for Reanimated)
  SPRING_DEFAULT: {
    MASS: 1,
    STIFFNESS: 170,
    DAMPING: 19,
  },
  
  SPRING_BOUNCY: {
    MASS: 1,
    STIFFNESS: 200,
    DAMPING: 12,
  },
  
  SPRING_GENTLE: {
    MASS: 1,
    STIFFNESS: 120,
    DAMPING: 20,
  },
  
  // Duration presets (milliseconds)
  DURATION: {
    INSTANT: 100,
    FAST: 200,
    NORMAL: 300,
    SLOW: 400,
    VERY_SLOW: 500,
  },
} as const;

/**
 * Micro-interaction Specifications
 */
export const MICRO_INTERACTIONS = {
  // Button press
  BUTTON_PRESS: {
    SCALE_DOWN: 0.95,
    DURATION: ANIMATION_TIMING.DURATION.FAST,
    TIMING: ANIMATION_TIMING.EASE_OUT,
    HAPTIC: 'light',
  },
  
  // Success feedback
  SUCCESS_POP: {
    SCALE_UP: 1.1,
    SCALE_RETURN: 1.0,
    ROTATION: [-5, 5, 0],
    DURATION: ANIMATION_TIMING.DURATION.NORMAL,
    HAPTIC: 'medium',
  },
  
  // Card swipe
  CARD_SWIPE: {
    ROTATION_RANGE: [-15, 15],
    OPACITY_FADE: 0.8,
    THRESHOLD: 100, // px to trigger swipe
  },
  
  // Progress fill
  PROGRESS_FILL: {
    DURATION: ANIMATION_TIMING.DURATION.SLOW,
    TIMING: ANIMATION_TIMING.EASE_IN_OUT,
  },
  
  // Confetti burst (achievements)
  CONFETTI: {
    PARTICLE_COUNT: 50,
    SPREAD: 360,
    VELOCITY: 15,
    GRAVITY: 0.5,
    DRAG: 0.05,
  },
} as const;

// ============================================================================
// ACCESSIBILITY GUIDELINES
// ============================================================================

/**
 * WCAG 2.1 Compliance Standards
 * Target: Level AA minimum, Level AAA where possible
 */
export const ACCESSIBILITY = {
  // Minimum contrast ratios
  CONTRAST_AA_NORMAL_TEXT: 4.5,
  CONTRAST_AA_LARGE_TEXT: 3.0,
  CONTRAST_AAA_NORMAL_TEXT: 7.0,
  CONTRAST_AAA_LARGE_TEXT: 4.5,
  
  // Touch target sizes
  MIN_TOUCH_TARGET: 44, // iOS HIG
  RECOMMENDED_TOUCH_TARGET: 48, // Material Design
  
  // Focus indicators
  FOCUS_RING: {
    WIDTH: 3,
    COLOR: PRIMARY_COLORS.ELECTRIC_BLUE.HEX,
    OFFSET: 2,
  },
  
  // Reduced motion support
  REDUCED_MOTION: {
    DISABLE_ANIMATIONS: true,
    FADE_ONLY: true,
    INSTANT_TRANSITIONS: true,
  },
  
  // Screen reader support
  SCREEN_READER: {
    ENABLE_LABELS: true,
    LIVE_REGION_POLITE: 'polite',
    LIVE_REGION_ASSERTIVE: 'assertive',
  },
} as const;

// ============================================================================
// EXPORT COMPILED BRAND CONFIG
// ============================================================================

/**
 * Complete Brand Configuration Object
 * Use this for quick access to all brand constants
 */
export const BRAND_CONFIG = {
  LOGO: LOGO_CONFIG,
  COLORS: {
    PRIMARY: PRIMARY_COLORS,
    ACCENT: ACCENT_COLORS,
    BACKGROUND: BACKGROUND_COLORS,
    TEXT: TEXT_COLORS,
    BORDER: BORDER_COLORS,
  },
  TYPOGRAPHY: {
    FAMILIES: FONT_FAMILIES,
    SIZES: FONT_SIZES,
    WEIGHTS: FONT_WEIGHTS,
    HEADINGS: HEADING_STYLES,
  },
  ICONS: {
    SYSTEM: ICON_SYSTEM,
    CATEGORIES: ICON_CATEGORIES,
    '3D_SPECS': ICON_3D_SPECS,
  },
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  ANIMATION: {
    TIMING: ANIMATION_TIMING,
    MICRO_INTERACTIONS: MICRO_INTERACTIONS,
  },
  ACCESSIBILITY,
} as const;

export default BRAND_CONFIG;
