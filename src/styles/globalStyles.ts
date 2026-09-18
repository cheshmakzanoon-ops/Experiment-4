/**
 * Engineering Study Guide App - Global Styles
 * 
 * Phase 4: Brand Identity & Visual Language
 * 
 * This file contains the global CSS/styles that apply to the entire application.
 * Includes reset styles, base typography, and theme-aware variables.
 */

import { BRAND_CONFIG } from '../brand/brandConstants';
import { THEMES, DEFAULT_THEME } from '../theme/themes';

// ============================================================================
// CSS-IN-JS GLOBAL STYLES (for React Native / Styled Components)
// ============================================================================

/**
 * Global style constants derived from brand configuration
 * These can be used with styled-components, emotion, or React Native StyleSheet
 */

export const GLOBAL_STYLES = {
  // Reset-like base styles
  reset: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  
  // Base body styles
  body: {
    fontFamily: BRAND_CONFIG.TYPOGRAPHY.FAMILIES.INTER.STACK,
    fontSize: `${BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX}px`,
    lineHeight: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.LINE_HEIGHT,
    backgroundColor: DEFAULT_THEME.colors.background.primary,
    color: DEFAULT_THEME.colors.text.primary,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  
  // Code/monospace elements
  code: {
    fontFamily: BRAND_CONFIG.TYPOGRAPHY.FAMILIES.JETBRAINS_MONO.STACK,
    fontSize: '0.9em',
    backgroundColor: DEFAULT_THEME.colors.background.tertiary,
    padding: '0.2em 0.4em',
    borderRadius: `${BRAND_CONFIG.BORDER_RADIUS.SM}px`,
  },
  
  // Selection colors
  selection: {
    backgroundColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
    color: DEFAULT_THEME.colors.text.primary,
  },
  
  // Link styles
  link: {
    color: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  
  linkHover: {
    color: BRAND_CONFIG.COLORS.PRIMARY.NEON_CYAN.HEX,
    textDecoration: 'underline',
  },
  
  // Focus styles for accessibility
  focusOutline: {
    outline: `${BRAND_CONFIG.ACCESSIBILITY.FOCUS_RING.WIDTH}px solid ${BRAND_CONFIG.ACCESSIBILITY.FOCUS_RING.COLOR}`,
    outlineOffset: `${BRAND_CONFIG.ACCESSIBILITY.FOCUS_RING.OFFSET}px`,
  },
  
  // Scrollbar styling (WebKit browsers)
  scrollbar: {
    width: '8px',
    track: {
      backgroundColor: DEFAULT_THEME.colors.background.secondary,
    },
    thumb: {
      backgroundColor: DEFAULT_THEME.colors.border.moderate,
      borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
    },
    thumbHover: {
      backgroundColor: DEFAULT_THEME.colors.border.strong,
    },
  },
};

// ============================================================================
// CSS VARIABLE GENERATION
// For use with CSS custom properties in web projects
// ============================================================================

/**
 * Generate CSS custom properties (variables) from theme
 * Can be injected into :root or [data-theme] selectors
 */
export function generateCSSVariables(theme: typeof DEFAULT_THEME): Record<string, string> {
  const vars: Record<string, string> = {};
  
  // Colors
  vars['--color-bg-primary'] = theme.colors.background.primary;
  vars['--color-bg-secondary'] = theme.colors.background.secondary;
  vars['--color-bg-tertiary'] = theme.colors.background.tertiary;
  vars['--color-bg-quaternary'] = theme.colors.background.quaternary;
  
  vars['--color-primary-main'] = theme.colors.primary.main;
  vars['--color-primary-light'] = theme.colors.primary.light;
  vars['--color-primary-dark'] = theme.colors.primary.dark;
  vars['--color-primary-contrast'] = theme.colors.primary.contrastText;
  
  vars['--color-secondary-main'] = theme.colors.secondary.main;
  vars['--color-secondary-light'] = theme.colors.secondary.light;
  vars['--color-secondary-dark'] = theme.colors.secondary.dark;
  
  vars['--color-tertiary-main'] = theme.colors.tertiary.main;
  
  vars['--color-accent-success'] = theme.colors.accent.success;
  vars['--color-accent-warning'] = theme.colors.accent.warning;
  vars['--color-accent-error'] = theme.colors.accent.error;
  vars['--color-accent-info'] = theme.colors.accent.info;
  vars['--color-accent-premium'] = theme.colors.accent.premium;
  
  vars['--color-text-primary'] = theme.colors.text.primary;
  vars['--color-text-secondary'] = theme.colors.text.secondary;
  vars['--color-text-tertiary'] = theme.colors.text.tertiary;
  vars['--color-text-disabled'] = theme.colors.text.disabled;
  
  vars['--color-border-subtle'] = theme.colors.border.subtle;
  vars['--color-border-moderate'] = theme.colors.border.moderate;
  vars['--color-border-strong'] = theme.colors.border.strong;
  
  // State colors
  vars['--color-state-hover'] = theme.colors.state.hover;
  vars['--color-state-pressed'] = theme.colors.state.pressed;
  vars['--color-state-focused'] = theme.colors.state.focused;
  vars['--color-state-selected'] = theme.colors.state.selected;
  
  // Shadows
  vars['--shadow-sm'] = theme.shadows.sm;
  vars['--shadow-md'] = theme.shadows.md;
  vars['--shadow-lg'] = theme.shadows.lg;
  vars['--shadow-xl'] = theme.shadows.xl;
  vars['--shadow-2xl'] = theme.shadows['2xl'];
  vars['--shadow-inner'] = theme.shadows.inner;
  
  // Glow effects
  vars['--glow-blue'] = theme.shadows.glowBlue;
  vars['--glow-cyan'] = theme.shadows.glowCyan;
  vars['--glow-purple'] = theme.shadows.glowPurple;
  vars['--glow-green'] = theme.shadows.glowGreen;
  vars['--glow-orange'] = theme.shadows.glowOrange;
  vars['--glow-gold'] = theme.shadows.glowGold;
  
  // Typography
  vars['--font-family-primary'] = theme.typography.fontFamily.primary;
  vars['--font-family-mono'] = theme.typography.fontFamily.mono;
  
  // Font sizes
  vars['--text-xs'] = `${BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_REM}rem`;
  vars['--text-sm'] = `${BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_REM}rem`;
  vars['--text-base'] = `${BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_REM}rem`;
  vars['--text-lg'] = `${BRAND_CONFIG.TYPOGRAPHY.SIZES.LG.SIZE_REM}rem`;
  vars['--text-xl'] = `${BRAND_CONFIG.TYPOGRAPHY.SIZES.XL.SIZE_REM}rem`;
  vars['--text-2xl'] = `${BRAND_CONFIG.TYPOGRAPHY.SIZES['2XL'].SIZE_REM}rem`;
  vars['--text-3xl'] = `${BRAND_CONFIG.TYPOGRAPHY.SIZES['3XL'].SIZE_REM}rem`;
  vars['--text-4xl'] = `${BRAND_CONFIG.TYPOGRAPHY.SIZES['4XL'].SIZE_REM}rem`;
  vars['--text-5xl'] = `${BRAND_CONFIG.TYPOGRAPHY.SIZES['5XL'].SIZE_REM}rem`;
  vars['--text-6xl'] = `${BRAND_CONFIG.TYPOGRAPHY.SIZES['6XL'].SIZE_REM}rem`;
  
  // Spacing
  for (const [key, value] of Object.entries(BRAND_CONFIG.SPACING)) {
    vars[`--spacing-${key}`] = `${value}px`;
  }
  
  // Border radius
  vars['--radius-none'] = `${BRAND_CONFIG.BORDER_RADIUS.NONE}px`;
  vars['--radius-sm'] = `${BRAND_CONFIG.BORDER_RADIUS.SM}px`;
  vars['--radius-md'] = `${BRAND_CONFIG.BORDER_RADIUS.MD}px`;
  vars['--radius-lg'] = `${BRAND_CONFIG.BORDER_RADIUS.LG}px`;
  vars['--radius-xl'] = `${BRAND_CONFIG.BORDER_RADIUS.XL}px`;
  vars['--radius-2xl'] = `${BRAND_CONFIG.BORDER_RADIUS['2XL']}px`;
  vars['--radius-3xl'] = `${BRAND_CONFIG.BORDER_RADIUS['3XL']}px`;
  vars['--radius-full'] = `${BRAND_CONFIG.BORDER_RADIUS.FULL}px`;
  
  return vars;
}

/**
 * Convert CSS variables object to a CSS string
 * Useful for injecting into <style> tags
 */
export function cssVariablesToString(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');
}

/**
 * Generate complete CSS for theme injection
 */
export function generateThemeCSS(
  themeId: string = 'dark',
  theme: typeof DEFAULT_THEME = THEMES.dark
): string {
  const vars = generateCSSVariables(theme);
  const selector = themeId === 'dark' ? ':root' : `[data-theme="${themeId}"]`;
  
  return `${selector} {\n${cssVariablesToString(vars)}\n}`;
}

/**
 * Generate all theme CSS at once
 */
export function generateAllThemesCSS(): string {
  const darkCSS = generateThemeCSS('dark', THEMES.dark);
  const lightCSS = generateThemeCSS('light', THEMES.light);
  const oledCSS = generateThemeCSS('oled', THEMES.oled);
  
  return `${darkCSS}\n\n${lightCSS}\n\n${oledCSS}`;
}

// ============================================================================
// REACT NATIVE STYLESHEET HELPERS
// ============================================================================

/**
 * Convert spacing values to React Native StyleSheet format
 */
export const RN_SPACING = Object.entries(BRAND_CONFIG.SPACING).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [`spacing${key}`]: value,
  }),
  {} as Record<string, number>
);

/**
 * Common React Native style patterns
 */
export const RN_COMMON_STYLES = {
  container: {
    flex: 1,
    backgroundColor: DEFAULT_THEME.colors.background.primary,
  },
  
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  row: {
    flexDirection: 'row' as const,
  },
  
  column: {
    flexDirection: 'column' as const,
  },
  
  flex1: {
    flex: 1,
  },
  
  // Text variants
  textPrimary: {
    color: DEFAULT_THEME.colors.text.primary,
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
    fontFamily: BRAND_CONFIG.TYPOGRAPHY.FAMILIES.INTER.NAME,
  },
  
  textSecondary: {
    color: DEFAULT_THEME.colors.text.secondary,
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    fontFamily: BRAND_CONFIG.TYPOGRAPHY.FAMILIES.INTER.NAME,
  },
  
  textMono: {
    fontFamily: BRAND_CONFIG.TYPOGRAPHY.FAMILIES.JETBRAINS_MONO.NAME,
  },
  
  // Button base
  buttonBase: {
    paddingHorizontal: BRAND_CONFIG.SPACING[6],
    paddingVertical: BRAND_CONFIG.SPACING[3],
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.MD,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  
  // Card base
  cardBase: {
    backgroundColor: DEFAULT_THEME.colors.background.secondary,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.LG,
    padding: BRAND_CONFIG.SPACING[4],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  // Input base
  inputBase: {
    backgroundColor: DEFAULT_THEME.colors.background.tertiary,
    borderWidth: 1,
    borderColor: DEFAULT_THEME.colors.border.subtle,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.MD,
    paddingHorizontal: BRAND_CONFIG.SPACING[4],
    paddingVertical: BRAND_CONFIG.SPACING[3],
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
    color: DEFAULT_THEME.colors.text.primary,
  },
};

export default GLOBAL_STYLES;
