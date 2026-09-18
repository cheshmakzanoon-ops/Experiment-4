/**
 * Phase 5: UX Wireframing - Core Flows
 * 
 * This file defines the TypeScript types and interfaces for the low-fidelity wireframes.
 * These types represent the structural components without visual styling, focusing purely
 * on user journey mapping and component hierarchy.
 */

// ============================================================================
// Base Wireframe Component Types
// ============================================================================

/**
 * Represents a generic wireframe element with positioning and layout properties
 */
export interface WireframeElement {
  /** Unique identifier for the element */
  id: string;
  /** Type of UI element (button, text, input, container, etc.) */
  elementType: WireframeElementType;
  /** Label or placeholder text for the element */
  label?: string;
  /** Hierarchical path in the wireframe (e.g., "onboarding.step1.nextButton") */
  path: string;
  /** Whether this element is interactive */
  isInteractive: boolean;
  /** Navigation target if element triggers navigation */
  navigationTarget?: string;
  /** Action triggered by this element */
  action?: WireframeAction;
}

/**
 * Types of wireframe elements available for low-fi prototyping
 */
export type WireframeElementType =
  | 'container'
  | 'header'
  | 'text'
  | 'button'
  | 'input'
  | 'image_placeholder'
  | 'list'
  | 'card'
  | 'navigation_bar'
  | 'tab_bar'
  | 'modal'
  | 'progress_indicator'
  | 'icon_placeholder';

/**
 * Actions that can be triggered by interactive wireframe elements
 */
export interface WireframeAction {
  /** Type of action */
  type: 'navigate' | 'submit' | 'cancel' | 'select' | 'swipe' | 'tap';
  /** Target screen or component */
  target?: string;
  /** Data payload associated with the action */
  payload?: Record<string, unknown>;
}

// ============================================================================
// Screen-Level Wireframe Definitions
// ============================================================================

/**
 * Defines a single wireframe screen with its constituent elements
 */
export interface WireframeScreen {
  /** Screen identifier */
  screenId: string;
  /** Display name of the screen */
  screenName: string;
  /** Description of the screen's purpose in the user journey */
  description: string;
  /** Ordered list of elements in the screen */
  elements: WireframeElement[];
  /** Entry point for this screen (which screens can navigate here) */
  entryPoints: string[];
  /** Exit points from this screen (where can user go from here) */
  exitPoints: string[];
  /** User flow step number */
  flowStep: number;
}

// ============================================================================
// Core Flow Wireframe Specifications
// ============================================================================

/**
 * Onboarding Flow Wireframes
 * Focus: Quick major selection -> Immediate value prop
 */
export const OnboardingFlowScreens: WireframeScreen[] = [
  {
    screenId: 'OB001',
    screenName: 'Welcome Splash',
    description: 'Initial app entry point with value proposition',
    flowStep: 1,
    elements: [
      {
        id: 'OB001-EL01',
        elementType: 'container',
        label: 'Main Container - Full Screen',
        path: 'onboarding.welcome.container',
        isInteractive: false,
      },
      {
        id: 'OB001-EL02',
        elementType: 'image_placeholder',
        label: 'App Logo / Hero Illustration',
        path: 'onboarding.welcome.logo',
        isInteractive: false,
      },
      {
        id: 'OB001-EL03',
        elementType: 'text',
        label: 'Headline: "Master Engineering, One Step at a Time"',
        path: 'onboarding.welcome.headline',
        isInteractive: false,
      },
      {
        id: 'OB001-EL04',
        elementType: 'text',
        label: 'Subheadline: "Join 500,000+ engineering students studying smarter"',
        path: 'onboarding.welcome.subheadline',
        isInteractive: false,
      },
      {
        id: 'OB001-EL05',
        elementType: 'button',
        label: 'Primary CTA: "Get Started"',
        path: 'onboarding.welcome.getStartedBtn',
        isInteractive: true,
        navigationTarget: 'OB002',
        action: { type: 'navigate', target: 'OB002' },
      },
      {
        id: 'OB001-EL06',
        elementType: 'button',
        label: 'Secondary CTA: "Already have an account? Sign In"',
        path: 'onboarding.welcome.signInBtn',
        isInteractive: true,
        navigationTarget: 'AUTH001',
        action: { type: 'navigate', target: 'AUTH001' },
      },
    ],
    entryPoints: ['app_launch'],
    exitPoints: ['OB002', 'AUTH001'],
  },
  {
    screenId: 'OB002',
    screenName: 'Major Selection',
    description: 'Quick major selection wizard for personalized content',
    flowStep: 2,
    elements: [
      {
        id: 'OB002-EL01',
        elementType: 'header',
        label: '"What are you studying?"',
        path: 'onboarding.major.header',
        isInteractive: false,
      },
      {
        id: 'OB002-EL02',
        elementType: 'text',
        label: 'Subtitle: "Select your major to customize your learning path"',
        path: 'onboarding.major.subtitle',
        isInteractive: false,
      },
      {
        id: 'OB002-EL03',
        elementType: 'list',
        label: 'Major Selection List',
        path: 'onboarding.major.majorList',
        isInteractive: true,
        action: { type: 'select', target: 'major_selection' },
      },
      {
        id: 'OB002-EL04',
        elementType: 'button',
        label: 'Continue Button (disabled until selection)',
        path: 'onboarding.major.continueBtn',
        isInteractive: true,
        navigationTarget: 'OB003',
        action: { type: 'navigate', target: 'OB003' },
      },
      {
        id: 'OB002-EL05',
        elementType: 'progress_indicator',
        label: 'Step 1 of 3',
        path: 'onboarding.major.progress',
        isInteractive: false,
      },
    ],
    entryPoints: ['OB001'],
    exitPoints: ['OB003'],
  },
  {
    screenId: 'OB003',
    screenName: 'Study Goal Setting',
    description: 'User sets initial study goals and time commitment',
    flowStep: 3,
    elements: [
      {
        id: 'OB003-EL01',
        elementType: 'header',
        label: '"Set Your Study Goals"',
        path: 'onboarding.goals.header',
        isInteractive: false,
      },
      {
        id: 'OB003-EL02',
        elementType: 'text',
        label: 'Subtitle: "How much time can you commit daily?"',
        path: 'onboarding.goals.subtitle',
        isInteractive: false,
      },
      {
        id: 'OB003-EL03',
        elementType: 'card',
        label: 'Goal Option: 15 min/day (Casual)',
        path: 'onboarding.goals.option15min',
        isInteractive: true,
        action: { type: 'select', target: 'goal_15min' },
      },
      {
        id: 'OB003-EL04',
        elementType: 'card',
        label: 'Goal Option: 30 min/day (Dedicated)',
        path: 'onboarding.goals.option30min',
        isInteractive: true,
        action: { type: 'select', target: 'goal_30min' },
      },
      {
        id: 'OB003-EL05',
        elementType: 'card',
        label: 'Goal Option: 60 min/day (Intensive)',
        path: 'onboarding.goals.option60min',
        isInteractive: true,
        action: { type: 'select', target: 'goal_60min' },
      },
      {
        id: 'OB003-EL06',
        elementType: 'button',
        label: 'Continue Button',
        path: 'onboarding.goals.continueBtn',
        isInteractive: true,
        navigationTarget: 'OB004',
        action: { type: 'navigate', target: 'OB004' },
      },
      {
        id: 'OB003-EL07',
        elementType: 'progress_indicator',
        label: 'Step 2 of 3',
        path: 'onboarding.goals.progress',
        isInteractive: false,
      },
    ],
    entryPoints: ['OB002'],
    exitPoints: ['OB004'],
  },
  {
    screenId: 'OB004',
    screenName: 'Immediate Value Prop - First Win',
    description: 'User experiences immediate value with a quick win',
    flowStep: 4,
    elements: [
      {
        id: 'OB004-EL01',
        elementType: 'header',
        label: '"Let\'s Try Your First Quick Quiz!"',
        path: 'onboarding.firstwin.header',
        isInteractive: false,
      },
      {
        id: 'OB004-EL02',
        elementType: 'text',
        label: 'Subtitle: "Answer this question to unlock your first achievement"',
        path: 'onboarding.firstwin.subtitle',
        isInteractive: false,
      },
      {
        id: 'OB004-EL03',
        elementType: 'card',
        label: 'Quiz Question Container',
        path: 'onboarding.firstwin.questionCard',
        isInteractive: false,
      },
      {
        id: 'OB004-EL04',
        elementType: 'button',
        label: 'Answer Option A',
        path: 'onboarding.firstwin.optionA',
        isInteractive: true,
        action: { type: 'select', target: 'answer_a' },
      },
      {
        id: 'OB004-EL05',
        elementType: 'button',
        label: 'Answer Option B',
        path: 'onboarding.firstwin.optionB',
        isInteractive: true,
        action: { type: 'select', target: 'answer_b' },
      },
      {
        id: 'OB004-EL06',
        elementType: 'button',
        label: 'Answer Option C',
        path: 'onboarding.firstwin.optionC',
        isInteractive: true,
        action: { type: 'select', target: 'answer_c' },
      },
      {
        id: 'OB004-EL07',
        elementType: 'modal',
        label: 'Success Celebration Modal (triggered on correct answer)',
        path: 'onboarding.firstwin.successModal',
        isInteractive: false,
      },
      {
        id: 'OB004-EL08',
        elementType: 'button',
        label: 'Continue to Dashboard',
        path: 'onboarding.firstwin.continueBtn',
        isInteractive: true,
        navigationTarget: 'DASH001',
        action: { type: 'navigate', target: 'DASH001' },
      },
      {
        id: 'OB004-EL09',
        elementType: 'progress_indicator',
        label: 'Step 3 of 3',
        path: 'onboarding.firstwin.progress',
        isInteractive: false,
      },
    ],
    entryPoints: ['OB003'],
    exitPoints: ['DASH001'],
  },
];

/**
 * Dashboard Flow Wireframes
 * Focus: "Today's Mission" focus
 */
export const DashboardFlowScreens: WireframeScreen[] = [
  {
    screenId: 'DASH001',
    screenName: 'Main Dashboard',
    description: 'Central hub showing today\'s mission, progress, and quick actions',
    flowStep: 1,
    elements: [
      {
        id: 'DASH001-EL01',
        elementType: 'header',
        label: 'Greeting + Streak Counter',
        path: 'dashboard.main.header',
        isInteractive: false,
      },
      {
        id: 'DASH001-EL02',
        elementType: 'card',
        label: '"Today\'s Mission" Card - Primary Focus',
        path: 'dashboard.main.todaysMission',
        isInteractive: true,
        navigationTarget: 'STUDY001',
        action: { type: 'navigate', target: 'STUDY001' },
      },
      {
        id: 'DASH001-EL03',
        elementType: 'progress_indicator',
        label: 'Daily XP Progress Bar',
        path: 'dashboard.main.xpProgress',
        isInteractive: false,
      },
      {
        id: 'DASH001-EL04',
        elementType: 'card',
        label: 'Current Course Module',
        path: 'dashboard.main.currentCourse',
        isInteractive: true,
        navigationTarget: 'COURSE001',
        action: { type: 'navigate', target: 'COURSE001' },
      },
      {
        id: 'DASH001-EL05',
        elementType: 'list',
        label: 'Upcoming Tasks/Deadlines',
        path: 'dashboard.main.upcomingTasks',
        isInteractive: true,
        action: { type: 'tap', target: 'task_detail' },
      },
      {
        id: 'DASH001-EL06',
        elementType: 'navigation_bar',
        label: 'Bottom Tab Navigation',
        path: 'dashboard.main.tabNav',
        isInteractive: true,
        action: { type: 'navigate', target: 'tab_navigation' },
      },
    ],
    entryPoints: ['OB004', 'tabnav_dashboard'],
    exitPoints: ['STUDY001', 'COURSE001', 'PROFILE001', 'SEARCH001'],
  },
];

/**
 * Study Session Flow Wireframes
 * Focus: Distraction-free zone
 */
export const StudySessionFlowScreens: WireframeScreen[] = [
  {
    screenId: 'STUDY001',
    screenName: 'Study Session - Active Mode',
    description: 'Distraction-free study interface with focus timer and content',
    flowStep: 1,
    elements: [
      {
        id: 'STUDY001-EL01',
        elementType: 'header',
        label: 'Minimal Header - Topic Name Only',
        path: 'study.active.header',
        isInteractive: false,
      },
      {
        id: 'STUDY001-EL02',
        elementType: 'container',
        label: 'Content Display Area (Flashcard/Question)',
        path: 'study.active.contentArea',
        isInteractive: true,
        action: { type: 'tap', target: 'flip_card' },
      },
      {
        id: 'STUDY001-EL03',
        elementType: 'button',
        label: 'Focus Timer Toggle',
        path: 'study.active.timerToggle',
        isInteractive: true,
        action: { type: 'tap', target: 'toggle_timer' },
      },
      {
        id: 'STUDY001-EL04',
        elementType: 'button',
        label: 'Hint Button (costs currency)',
        path: 'study.active.hintBtn',
        isInteractive: true,
        action: { type: 'tap', target: 'show_hint' },
      },
      {
        id: 'STUDY001-EL05',
        elementType: 'button',
        label: 'Mark as Complete',
        path: 'study.active.completeBtn',
        isInteractive: true,
        navigationTarget: 'STUDY002',
        action: { type: 'navigate', target: 'STUDY002' },
      },
      {
        id: 'STUDY001-EL06',
        elementType: 'button',
        label: 'Exit Session (minimal, corner placement)',
        path: 'study.active.exitBtn',
        isInteractive: true,
        navigationTarget: 'DASH001',
        action: { type: 'navigate', target: 'DASH001' },
      },
    ],
    entryPoints: ['DASH001', 'COURSE001'],
    exitPoints: ['STUDY002', 'DASH001'],
  },
  {
    screenId: 'STUDY002',
    screenName: 'Study Session Complete',
    description: 'Session summary with XP earned and next steps',
    flowStep: 2,
    elements: [
      {
        id: 'STUDY002-EL01',
        elementType: 'header',
        label: '"Session Complete!"',
        path: 'study.complete.header',
        isInteractive: false,
      },
      {
        id: 'STUDY002-EL02',
        elementType: 'text',
        label: 'XP Earned Display',
        path: 'study.complete.xpEarned',
        isInteractive: false,
      },
      {
        id: 'STUDY002-EL03',
        elementType: 'text',
        label: 'Accuracy Stats',
        path: 'study.complete.accuracy',
        isInteractive: false,
      },
      {
        id: 'STUDY002-EL04',
        elementType: 'button',
        label: 'Continue Learning',
        path: 'study.complete.continueBtn',
        isInteractive: true,
        navigationTarget: 'DASH001',
        action: { type: 'navigate', target: 'DASH001' },
      },
      {
        id: 'STUDY002-EL05',
        elementType: 'button',
        label: 'Share Achievement',
        path: 'study.complete.shareBtn',
        isInteractive: true,
        action: { type: 'tap', target: 'share_achievement' },
      },
    ],
    entryPoints: ['STUDY001'],
    exitPoints: ['DASH001'],
  },
];

/**
 * Profile Flow Wireframes
 * Focus: Stats and achievements center stage
 */
export const ProfileFlowScreens: WireframeScreen[] = [
  {
    screenId: 'PROFILE001',
    screenName: 'User Profile',
    description: 'Central hub for stats, achievements, and progress visualization',
    flowStep: 1,
    elements: [
      {
        id: 'PROFILE001-EL01',
        elementType: 'header',
        label: 'User Avatar + Display Name + Rank Badge',
        path: 'profile.main.header',
        isInteractive: true,
        action: { type: 'tap', target: 'edit_profile' },
      },
      {
        id: 'PROFILE001-EL02',
        elementType: 'card',
        label: 'Level Progress Bar with Current Rank',
        path: 'profile.main.levelProgress',
        isInteractive: false,
      },
      {
        id: 'PROFILE001-EL03',
        elementType: 'container',
        label: 'Stats Grid Container',
        path: 'profile.main.statsGrid',
        isInteractive: false,
      },
      {
        id: 'PROFILE001-EL04',
        elementType: 'text',
        label: 'Total XP',
        path: 'profile.main.totalXP',
        isInteractive: false,
      },
      {
        id: 'PROFILE001-EL05',
        elementType: 'text',
        label: 'Current Streak',
        path: 'profile.main.streak',
        isInteractive: false,
      },
      {
        id: 'PROFILE001-EL06',
        elementType: 'text',
        label: 'Lessons Completed',
        path: 'profile.main.lessonsCompleted',
        isInteractive: false,
      },
      {
        id: 'PROFILE001-EL07',
        elementType: 'card',
        label: 'Skill Radar Chart Container',
        path: 'profile.main.radarChart',
        isInteractive: false,
      },
      {
        id: 'PROFILE001-EL08',
        elementType: 'list',
        label: 'Achievement/Badge Collection',
        path: 'profile.main.badges',
        isInteractive: true,
        action: { type: 'tap', target: 'badge_detail' },
      },
      {
        id: 'PROFILE001-EL09',
        elementType: 'button',
        label: 'Settings Access',
        path: 'profile.main.settingsBtn',
        isInteractive: true,
        navigationTarget: 'SETTINGS001',
        action: { type: 'navigate', target: 'SETTINGS001' },
      },
      {
        id: 'PROFILE001-EL10',
        elementType: 'navigation_bar',
        label: 'Bottom Tab Navigation',
        path: 'profile.main.tabNav',
        isInteractive: true,
        action: { type: 'navigate', target: 'tab_navigation' },
      },
    ],
    entryPoints: ['tabnav_profile', 'DASH001'],
    exitPoints: ['SETTINGS001', 'DASH001'],
  },
];

// ============================================================================
// Wireframe Flow Aggregation
// ============================================================================

/**
 * Complete collection of all Phase 5 wireframe screens
 */
export const AllWireframeScreens: WireframeScreen[] = [
  ...OnboardingFlowScreens,
  ...DashboardFlowScreens,
  ...StudySessionFlowScreens,
  ...ProfileFlowScreens,
];

/**
 * Helper function to get a specific screen by ID
 */
export function getScreenById(screenId: string): WireframeScreen | undefined {
  return AllWireframeScreens.find(screen => screen.screenId === screenId);
}

/**
 * Helper function to get all screens in a specific flow
 */
export function getScreensByFlow(flowType: 'onboarding' | 'dashboard' | 'study' | 'profile'): WireframeScreen[] {
  switch (flowType) {
    case 'onboarding':
      return OnboardingFlowScreens;
    case 'dashboard':
      return DashboardFlowScreens;
    case 'study':
      return StudySessionFlowScreens;
    case 'profile':
      return ProfileFlowScreens;
    default:
      return [];
  }
}

/**
 * Helper function to validate wireframe completeness
 * Checks that all navigation targets reference existing screens
 */
export function validateWireframeNavigation(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const allScreenIds = AllWireframeScreens.map(s => s.screenId);

  for (const screen of AllWireframeScreens) {
    for (const element of screen.elements) {
      if (element.navigationTarget && !allScreenIds.includes(element.navigationTarget)) {
        // Allow external targets (auth, settings, courses, etc.)
        if (!element.navigationTarget.startsWith('AUTH') &&
            !element.navigationTarget.startsWith('SETTINGS') &&
            !element.navigationTarget.startsWith('COURSE') &&
            !element.navigationTarget.startsWith('SEARCH')) {
          errors.push(
            `Screen ${screen.screenId}: Element ${element.id} references non-existent target ${element.navigationTarget}`
          );
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
