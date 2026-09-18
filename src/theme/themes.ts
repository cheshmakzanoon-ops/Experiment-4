/**
 * Engineering Study Guide App - Theme Configuration
 * 
 * Phase 4: Brand Identity & Visual Language
 * 
 * This file provides theme configurations for different modes (dark, light, OLED)
 * and exports ready-to-use theme objects for the app.
 */

import {
  PRIMARY_COLORS,
  ACCENT_COLORS,
  BACKGROUND_COLORS,
  TEXT_COLORS,
  BORDER_COLORS,
  FONT_FAMILIES,
  FONT_SIZES,
  FONT_WEIGHTS,
  SHADOWS,
} from './brandConstants';

// ============================================================================
// DARK MODE THEME (Default - Optimized for Late-Night Studying)
// ============================================================================

export const darkTheme = {
  id: 'dark',
  name: 'Dark Mode',
  isDark: true,
  
  colors: {
    // Backgrounds
    background: {
      primary: BACKGROUND_COLORS.DEEP_SLATE_950.HEX,
      secondary: BACKGROUND_COLORS.DEEP_SLATE_900.HEX,
      tertiary: BACKGROUND_COLORS.DEEP_SLATE_800.HEX,
      quaternary: BACKGROUND_COLORS.DEEP_SLATE_700.HEX,
    },
    
    // Primary brand colors
    primary: {
      main: PRIMARY_COLORS.ELECTRIC_BLUE.HEX,
      light: '#60A5FA',
      dark: '#2563EB',
      contrastText: TEXT_COLORS.PRIMARY_LIGHT.HEX,
    },
    
    secondary: {
      main: PRIMARY_COLORS.NEON_CYAN.HEX,
      light: '#22D3EE',
      dark: '#0891B2',
      contrastText: TEXT_COLORS.PRIMARY_LIGHT.HEX,
    },
    
    tertiary: {
      main: PRIMARY_COLORS.QUANTUM_PURPLE.HEX,
      light: '#A78BFA',
      dark: '#7C3AED',
      contrastText: TEXT_COLORS.PRIMARY_LIGHT.HEX,
    },
    
    // Accent colors
    accent: {
      success: ACCENT_COLORS.PLASMA_GREEN.HEX,
      warning: ACCENT_COLORS.FUSION_ORANGE.HEX,
      error: ACCENT_COLORS.REACTOR_RED.HEX,
      info: ACCENT_COLORS.PHOTON_PINK.HEX,
      premium: ACCENT_COLORS.STELLAR_GOLD.HEX,
    },
    
    // Text colors
    text: {
      primary: TEXT_COLORS.PRIMARY_LIGHT.HEX,
      secondary: TEXT_COLORS.SECONDARY_LIGHT.HEX,
      tertiary: TEXT_COLORS.TERTIARY_LIGHT.HEX,
      disabled: '#64748B',
    },
    
    // Border colors
    border: {
      subtle: BORDER_COLORS.SUBTLE.HEX,
      moderate: BORDER_COLORS.MODERATE.HEX,
      strong: BORDER_COLORS.STRONG.HEX,
    },
    
    // Special states
    state: {
      hover: 'rgba(255, 255, 255, 0.08)',
      pressed: 'rgba(255, 255, 255, 0.12)',
      focused: PRIMARY_COLORS.ELECTRIC_BLUE.HEX,
      selected: 'rgba(59, 130, 246, 0.2)',
    },
  },
  
  shadows: {
    sm: SHADOWS.SM,
    md: SHADOWS.MD,
    lg: SHADOWS.LG,
    xl: SHADOWS.XL,
    '2xl': SHADOWS['2XL'],
    inner: SHADOWS.INNER,
    // Glow effects for gamification elements
    glowBlue: SHADOWS.GLOW_BLUE,
    glowCyan: SHADOWS.GLOW_CYAN,
    glowPurple: SHADOWS.GLOW_PURPLE,
    glowGreen: SHADOWS.GLOW_GREEN,
    glowOrange: SHADOWS.GLOW_ORANGE,
    glowGold: SHADOWS.GLOW_GOLD,
  },
  
  typography: {
    fontFamily: {
      primary: FONT_FAMILIES.INTER.NAME,
      mono: FONT_FAMILIES.JETBRAINS_MONO.NAME,
    },
    fontSize: FONT_SIZES,
    fontWeight: FONT_WEIGHTS,
  },
};

// ============================================================================
// LIGHT MODE THEME (For Daytime Use & Accessibility Compliance)
// ============================================================================

export const lightTheme = {
  id: 'light',
  name: 'Light Mode',
  isDark: false,
  
  colors: {
    // Backgrounds
    background: {
      primary: BACKGROUND_COLORS.LIGHT_MODE.WHITE,
      secondary: BACKGROUND_COLORS.LIGHT_MODE.GRAY_50,
      tertiary: BACKGROUND_COLORS.LIGHT_MODE.GRAY_100,
      quaternary: BACKGROUND_COLORS.LIGHT_MODE.GRAY_200,
    },
    
    // Primary brand colors (same as dark mode for consistency)
    primary: {
      main: PRIMARY_COLORS.ELECTRIC_BLUE.HEX,
      light: '#60A5FA',
      dark: '#2563EB',
      contrastText: '#FFFFFF',
    },
    
    secondary: {
      main: PRIMARY_COLORS.NEON_CYAN.HEX,
      light: '#22D3EE',
      dark: '#0891B2',
      contrastText: '#FFFFFF',
    },
    
    tertiary: {
      main: PRIMARY_COLORS.QUANTUM_PURPLE.HEX,
      light: '#A78BFA',
      dark: '#7C3AED',
      contrastText: '#FFFFFF',
    },
    
    // Accent colors
    accent: {
      success: ACCENT_COLORS.PLASMA_GREEN.HEX,
      warning: ACCENT_COLORS.FUSION_ORANGE.HEX,
      error: ACCENT_COLORS.REACTOR_RED.HEX,
      info: ACCENT_COLORS.PHOTON_PINK.HEX,
      premium: ACCENT_COLORS.STELLAR_GOLD.HEX,
    },
    
    // Text colors
    text: {
      primary: TEXT_COLORS.PRIMARY_DARK.HEX,
      secondary: TEXT_COLORS.SECONDARY_DARK.HEX,
      tertiary: '#64748B',
      disabled: '#94A3B8',
    },
    
    // Border colors
    border: {
      subtle: '#E2E8F0',
      moderate: '#CBD5E1',
      strong: '#94A3B8',
    },
    
    // Special states
    state: {
      hover: 'rgba(0, 0, 0, 0.04)',
      pressed: 'rgba(0, 0, 0, 0.08)',
      focused: PRIMARY_COLORS.ELECTRIC_BLUE.HEX,
      selected: 'rgba(59, 130, 246, 0.1)',
    },
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    // Glow effects (reduced intensity for light mode)
    glowBlue: '0 0 20px rgba(59, 130, 246, 0.3)',
    glowCyan: '0 0 20px rgba(6, 182, 212, 0.3)',
    glowPurple: '0 0 20px rgba(139, 92, 246, 0.3)',
    glowGreen: '0 0 20px rgba(16, 185, 129, 0.3)',
    glowOrange: '0 0 20px rgba(249, 115, 22, 0.3)',
    glowGold: '0 0 20px rgba(234, 179, 8, 0.3)',
  },
  
  typography: {
    fontFamily: {
      primary: FONT_FAMILIES.INTER.NAME,
      mono: FONT_FAMILIES.JETBRAINS_MONO.NAME,
    },
    fontSize: FONT_SIZES,
    fontWeight: FONT_WEIGHTS,
  },
};

// ============================================================================
// OLED BLACK THEME (True Black for AMOLED Screens - Battery Saving)
// ============================================================================

export const oledTheme = {
  id: 'oled',
  name: 'OLED Black',
  isDark: true,
  
  colors: {
    // Backgrounds - True black for pixel-level off state
    background: {
      primary: '#000000',
      secondary: '#0A0A0A',
      tertiary: '#121212',
      quaternary: '#1A1A1A',
    },
    
    // Primary brand colors (slightly adjusted for better contrast on pure black)
    primary: {
      main: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
      contrastText: '#FFFFFF',
    },
    
    secondary: {
      main: '#06B6D4',
      light: '#22D3EE',
      dark: '#0891B2',
      contrastText: '#FFFFFF',
    },
    
    tertiary: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED',
      contrastText: '#FFFFFF',
    },
    
    // Accent colors
    accent: {
      success: ACCENT_COLORS.PLASMA_GREEN.HEX,
      warning: ACCENT_COLORS.FUSION_ORANGE.HEX,
      error: ACCENT_COLORS.REACTOR_RED.HEX,
      info: ACCENT_COLORS.PHOTON_PINK.HEX,
      premium: ACCENT_COLORS.STELLAR_GOLD.HEX,
    },
    
    // Text colors
    text: {
      primary: '#FFFFFF',
      secondary: '#E2E8F0',
      tertiary: '#94A3B8',
      disabled: '#64748B',
    },
    
    // Border colors
    border: {
      subtle: '#1E293B',
      moderate: '#334155',
      strong: '#475569',
    },
    
    // Special states
    state: {
      hover: 'rgba(255, 255, 255, 0.06)',
      pressed: 'rgba(255, 255, 255, 0.1)',
      focused: PRIMARY_COLORS.ELECTRIC_BLUE.HEX,
      selected: 'rgba(59, 130, 246, 0.15)',
    },
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.5)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.6)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 10px 10px -5px rgba(0, 0, 0, 0.6)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.5)',
    // Enhanced glow effects for OLED
    glowBlue: '0 0 25px rgba(59, 130, 246, 0.6)',
    glowCyan: '0 0 25px rgba(6, 182, 212, 0.6)',
    glowPurple: '0 0 25px rgba(139, 92, 246, 0.6)',
    glowGreen: '0 0 25px rgba(16, 185, 129, 0.6)',
    glowOrange: '0 0 25px rgba(249, 115, 22, 0.6)',
    glowGold: '0 0 25px rgba(234, 179, 8, 0.6)',
  },
  
  typography: {
    fontFamily: {
      primary: FONT_FAMILIES.INTER.NAME,
      mono: FONT_FAMILIES.JETBRAINS_MONO.NAME,
    },
    fontSize: FONT_SIZES,
    fontWeight: FONT_WEIGHTS,
  },
};

// ============================================================================
// THEME EXPORT MAP
// ============================================================================

/**
 * All available themes mapped by ID
 */
export const THEMES = {
  dark: darkTheme,
  light: lightTheme,
  oled: oledTheme,
} as const;

/**
 * Default theme (Dark mode as per brand guidelines)
 */
export const DEFAULT_THEME = darkTheme;

/**
 * System preference detection helper
 * Returns the appropriate theme based on user's system preference
 */
export function getSystemTheme(): typeof darkTheme | typeof lightTheme {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? darkTheme
      : lightTheme;
  }
  return darkTheme; // Fallback to dark mode
}

export default THEMES;
