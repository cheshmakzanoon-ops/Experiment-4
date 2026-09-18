import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from '../../types';

/**
 * Navigation service for programmatic navigation
 */
export class NavigationService {
  private static instance: NavigationService;
  private navigationRef = createNavigationContainerRef<RootStackParamList>();

  private constructor() {}

  public static getInstance(): NavigationService {
    if (!NavigationService.instance) {
      NavigationService.instance = new NavigationService();
    }
    return NavigationService.instance;
  }

  /**
   * Get the navigation container ref
   */
  getRef() {
    return this.navigationRef;
  }

  /**
   * Check if navigation is ready
   */
  isReady(): boolean {
    return this.navigationRef.isReady();
  }

  /**
   * Navigate to a screen
   */
  navigate<RouteName extends keyof RootStackParamList>(
    routeName: RouteName,
    params?: RootStackParamList[RouteName]
  ): void {
    if (this.navigationRef.isReady()) {
      this.navigationRef.navigate(routeName, params);
    } else {
      console.warn('Navigation is not ready');
    }
  }

  /**
   * Go back to previous screen
   */
  goBack(): void {
    if (this.navigationRef.isReady()) {
      this.navigationRef.goBack();
    }
  }

  /**
   * Reset navigation stack
   */
  resetStack<RouteName extends keyof RootStackParamList>(
    routeName: RouteName,
    params?: RootStackParamList[RouteName]
  ): void {
    if (this.navigationRef.isReady()) {
      this.navigationRef.reset({
        index: 0,
        routes: [{ name: routeName, params }],
      });
    }
  }

  /**
   * Replace current screen
   */
  replace<RouteName extends keyof RootStackParamList>(
    routeName: RouteName,
    params?: RootStackParamList[RouteName]
  ): void {
    if (this.navigationRef.isReady()) {
      this.navigationRef.dispatch({
        ...require('@react-navigation/native').CommonActions.reset({
          index: 0,
          routes: [{ name: routeName, params }],
        }),
      });
    }
  }

  /**
   * Push a new screen onto the stack
   */
  push<RouteName extends keyof RootStackParamList>(
    routeName: RouteName,
    params?: RootStackParamList[RouteName]
  ): void {
    if (this.navigationRef.isReady()) {
      this.navigationRef.dispatch(
        require('@react-navigation/native').StackActions.push(routeName, params)
      );
    }
  }

  /**
   * Pop screens from the stack
   */
  pop(count: number = 1): void {
    if (this.navigationRef.isReady()) {
      this.navigationRef.dispatch(require('@react-navigation/native').StackActions.pop(count));
    }
  }

  /**
   * Pop to top screen
   */
  popToTop(): void {
    if (this.navigationRef.isReady()) {
      this.navigationRef.dispatch(require('@react-navigation/native').StackActions.popToTop());
    }
  }

  /**
   * Set navigation state persistence
   */
  setPersistence(persistenceKey: string): void {
    // This would be configured in the NavigationContainer
    console.log('Setting persistence key:', persistenceKey);
  }
}

// Export singleton instance
export const navigationService = NavigationService.getInstance();
