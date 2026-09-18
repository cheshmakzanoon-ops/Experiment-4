/**
 * Engineering Study Guide App - Brand Index
 * 
 * Phase 4: Brand Identity & Visual Language
 * 
 * Central export file for all brand-related constants and configurations.
 * Import from this file to access the complete brand system.
 */

// Export all brand constants
export {
  // Logo configuration
  LOGO_CONFIG,
  
  // Color systems
  PRIMARY_COLORS,
  ACCENT_COLORS,
  BACKGROUND_COLORS,
  TEXT_COLORS,
  BORDER_COLORS,
  
  // Typography
  FONT_FAMILIES,
  FONT_SIZES,
  FONT_WEIGHTS,
  HEADING_STYLES,
  
  // Icon system
  ICON_SYSTEM,
  ICON_CATEGORIES,
  ICON_3D_SPECS,
  
  // Layout
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  
  // Animation
  ANIMATION_TIMING,
  MICRO_INTERACTIONS,
  
  // Accessibility
  ACCESSIBILITY,
  
  // Complete brand config
  BRAND_CONFIG,
} from './brandConstants';

// Export themes
export {
  darkTheme,
  lightTheme,
  oledTheme,
  THEMES,
  DEFAULT_THEME,
  getSystemTheme,
} from '../theme/themes';

// Re-export complete brand config as default
export { BRAND_CONFIG as default } from './brandConstants';
