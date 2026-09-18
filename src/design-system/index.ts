/**
 * Engineering Study Guide App - Design System Index
 * 
 * Phase 6: Advanced UI Design System (Atomic)
 * Objective: Build a reusable, animated component library
 * 
 * This is the main entry point for the design system, exporting all
 * configurations organized by atomic design principles.
 */

// ============================================================================
// ATOMS - Basic building blocks
// ============================================================================
export {
  ATOM_CONFIGS,
  BUTTON_CONFIG,
  INPUT_CONFIG,
  BADGE_CONFIG,
  AVATAR_CONFIG,
  ICON_CONFIG,
  PROGRESS_CONFIG,
  DIVIDER_CONFIG,
  TEXT_CONFIG,
} from './atoms/atomConfigs';

export type {
  ButtonVariant,
  ButtonSize,
  InputType,
  InputState,
  BadgeVariant,
  BadgeSize,
  AvatarSize,
  IconSize,
  ProgressType,
  AnimationState,
} from './atoms/atomConfigs';

// ============================================================================
// MOLECULES - Combinations of atoms
// ============================================================================
export {
  MOLECULE_CONFIGS,
  FLASHCARD_CONFIG,
  PROGRESS_RING_CONFIG,
  SEARCH_BAR_CONFIG,
  FORM_FIELD_CONFIG,
  STAT_CARD_CONFIG,
  ACHIEVEMENT_BADGE_CONFIG,
  COURSE_MODULE_CONFIG,
} from './molecules/moleculeConfigs';

export type {
  FlashcardState,
  FlashcardDifficulty,
  ProgressRingVariant,
  StatCardType,
  ModuleStatus,
} from './molecules/moleculeConfigs';

// ============================================================================
// ORGANISMS - Complex UI patterns
// ============================================================================
export {
  ORGANISM_CONFIGS,
  LEADERBOARD_CONFIG,
  COURSE_MODULE_WITH_LESSONS_CONFIG,
  NAV_HEADER_CONFIG,
  BOTTOM_TAB_NAV_CONFIG,
  DASHBOARD_WIDGET_CONFIG,
  STUDY_SESSION_CONFIG,
} from './organisms/organismConfigs';

export type {
  LeaderboardRange,
  LeaderboardEntry,
  NavItem,
  WidgetType,
} from './organisms/organismConfigs';

// ============================================================================
// MICRO-INTERACTIONS - Animations and feedback
// ============================================================================
export {
  MICRO_INTERACTION_CONFIGS,
  HAPTIC_CONFIG,
  BUTTON_PRESS_ANIMATION,
  SUCCESS_CELEBRATION,
  CARD_SWIPE_ANIMATION,
  PROGRESS_FILL_ANIMATION,
  LOADING_ANIMATIONS,
  TRANSITION_ANIMATIONS,
  ERROR_ANIMATIONS,
  REDUCED_MOTION_CONFIG,
} from './micro-interactions/microInteractionConfigs';

export type {
  HapticIntensity,
  AnimationPreset,
  GestureType,
  CelebrationType,
} from './micro-interactions/microInteractionConfigs';

// ============================================================================
// DESIGN SYSTEM VERSION
// ============================================================================
export const DESIGN_SYSTEM_VERSION = '1.0.0' as const;
export const DESIGN_SYSTEM_PHASE = 'Phase 6' as const;

// ============================================================================
// DEFAULT EXPORT
// ============================================================================
import { ATOM_CONFIGS } from './atoms/atomConfigs';
import { MOLECULE_CONFIGS } from './molecules/moleculeConfigs';
import { ORGANISM_CONFIGS } from './organisms/organismConfigs';
import { MICRO_INTERACTION_CONFIGS } from './micro-interactions/microInteractionConfigs';

export const DesignSystem = {
  version: DESIGN_SYSTEM_VERSION,
  phase: DESIGN_SYSTEM_PHASE,
  atoms: ATOM_CONFIGS,
  molecules: MOLECULE_CONFIGS,
  organisms: ORGANISM_CONFIGS,
  microInteractions: MICRO_INTERACTION_CONFIGS,
} as const;

export default DesignSystem;
