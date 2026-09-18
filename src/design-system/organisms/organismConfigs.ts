/**
 * Engineering Study Guide App - Design System Organisms
 * 
 * Phase 6: Advanced UI Design System (Atomic)
 * Objective: Build a reusable, animated component library
 * 
 * This file defines the organism components - complex UI patterns
 * composed of molecules and atoms that form distinct sections of the interface.
 * 
 * ORGANISMS INCLUDED:
 * - Leaderboard tables
 * - Course modules with lesson lists
 * - Navigation headers
 * - Bottom tab navigation
 * - Dashboard widgets
 * - Study session containers
 */

import { BRAND_CONFIG } from '../brand/brandConstants';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

/**
 * Leaderboard time range filters
 */
export type LeaderboardRange = 'daily' | 'weekly' | 'monthly' | 'alltime' | 'friends';

/**
 * Leaderboard entry data structure
 */
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  trend?: 'up' | 'down' | 'same';
  isCurrentUser?: boolean;
}

/**
 * Navigation item structure
 */
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  activeIcon?: string;
  badge?: number | string;
}

/**
 * Dashboard widget types
 */
export type WidgetType = 'streak' | 'xp-progress' | 'todays-mission' | 'recent-activity' | 'achievements' | 'quick-stats';

// ============================================================================
// LEADERBOARD TABLE ORGANISM CONFIGURATION
// ============================================================================

/**
 * Leaderboard table with rankings, user info, and XP
 * Combines: Header, Row Items, Rank Indicators, Filter Tabs
 */
export const LEADERBOARD_CONFIG = {
  // Container
  container: {
    backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_900.HEX,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.XL,
    padding: BRAND_CONFIG.SPACING[4],
  },

  // Filter tabs
  filterTabs: {
    container: {
      flexDirection: 'row' as const,
      marginBottom: BRAND_CONFIG.SPACING[4],
      gap: BRAND_CONFIG.SPACING[2],
    },
    tab: {
      paddingHorizontal: BRAND_CONFIG.SPACING[4],
      paddingVertical: BRAND_CONFIG.SPACING[2],
      borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
      fontWeight: BRAND_CONFIG.FONT_WEIGHTS.MEDIUM,
    },
    activeTab: {
      backgroundColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      textColor: '#FFFFFF',
    },
    inactiveTab: {
      backgroundColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
      textColor: BRAND_CONFIG.TEXT_COLORS.SECONDARY_LIGHT.HEX,
    },
  },

  // Table header
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingBottom: BRAND_CONFIG.SPACING[3],
    borderBottomWidth: 1,
    borderBottomColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
  },
  headerRank: {
    width: 50,
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.SEMIBOLD,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
  },
  headerUser: {
    flex: 1,
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.SEMIBOLD,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
  },
  headerXP: {
    width: 80,
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.SEMIBOLD,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    textAlign: 'right' as const,
  },

  // Row items
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: BRAND_CONFIG.SPACING[3],
    borderBottomWidth: 1,
    borderBottomColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
  },
  rowHighlight: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.MD,
    marginHorizontal: -BRAND_CONFIG.SPACING[4],
    paddingHorizontal: BRAND_CONFIG.SPACING[4],
  },

  // Rank display
  rank: {
    width: 50,
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.BOLD,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
  },
  rankTop3: {
    1: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
    2: BRAND_CONFIG.BORDER_COLORS.STRONG.HEX,
    3: 'rgba(234, 179, 8, 0.7)',
  },

  // User info
  userInfo: {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  username: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.MEDIUM,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
    marginLeft: BRAND_CONFIG.SPACING[3],
  },
  level: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    marginLeft: BRAND_CONFIG.SPACING[2],
  },

  // XP display
  xp: {
    width: 80,
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.SEMIBOLD,
    color: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
    textAlign: 'right' as const,
  },

  // Trend indicator
  trend: {
    width: 24,
    marginLeft: BRAND_CONFIG.SPACING[2],
    fontSize: 12,
  },

  // Pagination
  pagination: {
    flexDirection: 'row' as const,
    justifyContent: 'center' as const,
    marginTop: BRAND_CONFIG.SPACING[4],
    gap: BRAND_CONFIG.SPACING[2],
  },
} as const;

// ============================================================================
// COURSE MODULE WITH LESSONS ORGANISM CONFIGURATION
// ============================================================================

/**
 * Course module with expandable lesson list
 * Combines: Module Header, Progress Bar, Lesson List, Expand/Collapse
 */
export const COURSE_MODULE_WITH_LESSONS_CONFIG = {
  // Module container
  moduleContainer: {
    backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_900.HEX,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.LG,
    marginBottom: BRAND_CONFIG.SPACING[3],
    overflow: 'hidden' as const,
  },

  // Module header (always visible)
  header: {
    padding: BRAND_CONFIG.SPACING[4],
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  headerContent: {
    flex: 1,
    marginLeft: BRAND_CONFIG.SPACING[3],
  },
  title: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.SEMIBOLD,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
  },
  subtitle: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    marginTop: BRAND_CONFIG.SPACING[1],
  },

  // Expand/collapse chevron
  chevron: {
    size: 24,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    transitionDuration: 200,
  },

  // Lesson list (expandable)
  lessonList: {
    backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_800.HEX,
    borderTopWidth: 1,
    borderTopColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
  },

  // Individual lesson item
  lessonItem: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingVertical: BRAND_CONFIG.SPACING[3],
    paddingHorizontal: BRAND_CONFIG.SPACING[4],
    borderBottomWidth: 1,
    borderBottomColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
  },
  lessonNumber: {
    width: 32,
    height: 32,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
    backgroundColor: BRAND_CONFIG.BORDER_COLORS.MODERATE.HEX,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: BRAND_CONFIG.SPACING[3],
  },
  lessonNumberCompleted: {
    backgroundColor: BRAND_CONFIG.COLORS.ACCENT.PLASMA_GREEN.HEX,
  },
  lessonNumberText: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.SEMIBOLD,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    color: BRAND_CONFIG.TEXT_COLORS.SECONDARY_LIGHT.HEX,
  },
  lessonDuration: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    marginTop: BRAND_CONFIG.SPACING[1],
  },
  lessonStatus: {
    width: 20,
    height: 20,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
} as const;

// ============================================================================
// NAVIGATION HEADER ORGANISM CONFIGURATION
// ============================================================================

/**
 * Top navigation header with title, actions, and back button
 * Combines: Back Button, Title, Action Buttons, Status Bar Area
 */
export const NAV_HEADER_CONFIG = {
  // Container
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: BRAND_CONFIG.SPACING[4],
    paddingVertical: BRAND_CONFIG.SPACING[3],
    minHeight: 56,
    backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_950.HEX,
    borderBottomWidth: 1,
    borderBottomColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
  },

  // Left section (back button + title)
  leftSection: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    flex: 1,
  },

  // Back button
  backButton: {
    width: 40,
    height: 40,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: BRAND_CONFIG.SPACING[2],
  },
  backButtonIcon: {
    size: 24,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
  },

  // Title
  title: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XL.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.SEMIBOLD,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
  },
  subtitle: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    marginTop: BRAND_CONFIG.SPACING[1],
  },

  // Right section (action buttons)
  rightSection: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: BRAND_CONFIG.SPACING[2],
  },

  // Action button
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  actionButtonIcon: {
    size: 24,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
  },

  // Notification badge on action buttons
  notificationBadge: {
    position: 'absolute' as const,
    top: 8,
    right: 8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingHorizontal: BRAND_CONFIG.SPACING[1],
  },
  notificationText: {
    fontSize: 10,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.BOLD,
    color: '#FFFFFF',
  },
} as const;

// ============================================================================
// BOTTOM TAB NAVIGATION ORGANISM CONFIGURATION
// ============================================================================

/**
 * Bottom tab bar navigation
 * Combines: Tab Items, Icons, Labels, Active Indicator
 */
export const BOTTOM_TAB_NAV_CONFIG = {
  // Container
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-around' as const,
    backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_900.HEX,
    borderTopWidth: 1,
    borderTopColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
    paddingBottom: BRAND_CONFIG.SPACING[2],
    paddingTop: BRAND_CONFIG.SPACING[2],
    minHeight: 64,
  },

  // Individual tab item
  tabItem: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    flex: 1,
    paddingVertical: BRAND_CONFIG.SPACING[2],
  },

  // Icon container
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.MD,
  },

  // Icon sizes
  icon: {
    size: 24,
    activeSize: 28,
  },

  // Colors
  colors: {
    active: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
    inactive: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
  },

  // Label
  label: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.MEDIUM,
    marginTop: BRAND_CONFIG.SPACING[1],
  },
  labelActive: {
    color: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
  },
  labelInactive: {
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
  },

  // Active indicator (optional dot/bar)
  activeIndicator: {
    enabled: true,
    type: 'dot', // 'dot' | 'bar'
    dot: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      marginTop: BRAND_CONFIG.SPACING[1],
    },
    bar: {
      height: 3,
      borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
      backgroundColor: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
      marginTop: BRAND_CONFIG.SPACING[1],
    },
  },

  // Badge for notifications
  badge: {
    position: 'absolute' as const,
    top: 4,
    right: '20%',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: BRAND_CONFIG.COLORS.ACCENT.REACTOR_RED.HEX,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingHorizontal: BRAND_CONFIG.SPACING[1],
  },
  badgeText: {
    fontSize: 10,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.BOLD,
    color: '#FFFFFF',
  },
} as const;

// ============================================================================
// DASHBOARD WIDGET ORGANISM CONFIGURATION
// ============================================================================

/**
 * Dashboard widget container with various content types
 * Combines: Header, Content Area, Actions, Footer
 */
export const DASHBOARD_WIDGET_CONFIG = {
  // Base container
  container: {
    backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_900.HEX,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.XL,
    padding: BRAND_CONFIG.SPACING[4],
    marginBottom: BRAND_CONFIG.SPACING[4],
  },

  // Widget header
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    marginBottom: BRAND_CONFIG.SPACING[3],
  },
  headerLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.MD,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: BRAND_CONFIG.SPACING[3],
  },
  title: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.SEMIBOLD,
    color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
  },
  subtitle: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
    marginTop: BRAND_CONFIG.SPACING[1],
  },

  // Action button in header
  actionButton: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: BRAND_CONFIG.SPACING[3],
    paddingVertical: BRAND_CONFIG.SPACING[2],
    borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  actionText: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.MEDIUM,
    color: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
    marginLeft: BRAND_CONFIG.SPACING[1],
  },

  // Content area (varies by widget type)
  content: {
    flex: 1,
  },

  // Footer (optional)
  footer: {
    marginTop: BRAND_CONFIG.SPACING[3],
    paddingTop: BRAND_CONFIG.SPACING[3],
    borderTopWidth: 1,
    borderTopColor: BRAND_CONFIG.BORDER_COLORS.SUBTLE.HEX,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  footerText: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
  },
  footerAction: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.MEDIUM,
    color: BRAND_CONFIG.COLORS.PRIMARY.ELECTRIC_BLUE.HEX,
  },
} as const;

// ============================================================================
// STUDY SESSION CONTAINER ORGANISM CONFIGURATION
// ============================================================================

/**
 * Study session container with timer, content, and controls
 * Combines: Timer Display, Content Area, Control Buttons, Progress
 */
export const STUDY_SESSION_CONFIG = {
  // Full screen container
  container: {
    flex: 1,
    backgroundColor: BRAND_CONFIG.COLORS.BACKGROUND.DEEP_SLATE_950.HEX,
  },

  // Minimal header
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    paddingHorizontal: BRAND_CONFIG.SPACING[4],
    paddingVertical: BRAND_CONFIG.SPACING[3],
  },
  topicText: {
    fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.BASE.SIZE_PX,
    fontWeight: BRAND_CONFIG.FONT_WEIGHTS.MEDIUM,
    color: BRAND_CONFIG.TEXT_COLORS.SECONDARY_LIGHT.HEX,
  },
  exitButton: {
    padding: BRAND_CONFIG.SPACING[2],
  },

  // Timer display
  timer: {
    container: {
      alignItems: 'center' as const,
      justifyContent: 'center' as const,
      paddingVertical: BRAND_CONFIG.SPACING[6],
    },
    timeDisplay: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES['5XL'].SIZE_PX,
      fontWeight: BRAND_CONFIG.FONT_WEIGHTS.BOLD,
      color: BRAND_CONFIG.TEXT_COLORS.PRIMARY_LIGHT.HEX,
      fontFamily: BRAND_CONFIG.TYPOGRAPHY.FAMILIES.JETBRAINS_MONO.NAME,
      letterSpacing: '0.05em',
    },
    label: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
      color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
      marginTop: BRAND_CONFIG.SPACING[2],
    },
  },

  // Content area (flashcard/question)
  contentArea: {
    flex: 1,
    paddingHorizontal: BRAND_CONFIG.SPACING[4],
  },

  // Control buttons at bottom
  controls: {
    container: {
      flexDirection: 'row' as const,
      justifyContent: 'space-around' as const,
      alignItems: 'center' as const,
      paddingHorizontal: BRAND_CONFIG.SPACING[4],
      paddingVertical: BRAND_CONFIG.SPACING[5],
      paddingBottom: BRAND_CONFIG.SPACING[8],
    },
    hintButton: {
      flexDirection: 'row' as const,
      alignItems: 'center' as const,
      paddingHorizontal: BRAND_CONFIG.SPACING[4],
      paddingVertical: BRAND_CONFIG.SPACING[3],
      borderRadius: BRAND_CONFIG.BORDER_RADIUS.FULL,
      backgroundColor: 'rgba(236, 72, 153, 0.1)',
    },
    hintIcon: {
      size: 20,
      color: BRAND_CONFIG.COLORS.ACCENT.PHOTON_PINK.HEX,
    },
    hintText: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
      fontWeight: BRAND_CONFIG.FONT_WEIGHTS.MEDIUM,
      color: BRAND_CONFIG.COLORS.ACCENT.PHOTON_PINK.HEX,
      marginLeft: BRAND_CONFIG.SPACING[2],
    },
    costBadge: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.XS.SIZE_PX,
      color: BRAND_CONFIG.COLORS.ACCENT.STELLAR_GOLD.HEX,
      marginLeft: BRAND_CONFIG.SPACING[1],
    },
  },

  // Progress indicator at bottom
  progress: {
    container: {
      flexDirection: 'row' as const,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      paddingHorizontal: BRAND_CONFIG.SPACING[4],
      paddingBottom: BRAND_CONFIG.SPACING[4],
    },
    text: {
      fontSize: BRAND_CONFIG.TYPOGRAPHY.SIZES.SM.SIZE_PX,
      color: BRAND_CONFIG.TEXT_COLORS.TERTIARY_LIGHT.HEX,
      marginRight: BRAND_CONFIG.SPACING[3],
    },
    bar: {
      width: 100,
      height: 4,
    },
  },
} as const;

// ============================================================================
// EXPORT ALL ORGANISM CONFIGS
// ============================================================================

export const ORGANISM_CONFIGS = {
  LEADERBOARD: LEADERBOARD_CONFIG,
  COURSE_MODULE_WITH_LESSONS: COURSE_MODULE_WITH_LESSONS_CONFIG,
  NAV_HEADER: NAV_HEADER_CONFIG,
  BOTTOM_TAB_NAV: BOTTOM_TAB_NAV_CONFIG,
  DASHBOARD_WIDGET: DASHBOARD_WIDGET_CONFIG,
  STUDY_SESSION: STUDY_SESSION_CONFIG,
} as const;

export default ORGANISM_CONFIGS;
