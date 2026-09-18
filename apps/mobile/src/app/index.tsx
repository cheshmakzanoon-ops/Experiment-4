/**
 * App entry point
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { navigationService } from '../shared/lib/navigation';

// Placeholder for main app component
export default function App() {
  const navigationRef = navigationService.getRef();

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="auto" />
        {/* Main navigation stack will be added in Phase 4 */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
