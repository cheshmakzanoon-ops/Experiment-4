module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/screens/(.*)$': '<rootDir>/src/screens/$1',
    '^@/hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@/utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@/services/(.*)$': '<rootDir>/src/services/$1',
    '^@/store/(.*)$': '<rootDir>/src/store/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@/entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@/features/(.*)$': '<rootDir>/src/features/$1',
    '^@/widgets/(.*)$': '<rootDir>/src/widgets/$1',
    '^@/pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@/assets/(.*)$': '<rootDir>/src/assets/$1'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testMatch: ['**/tests/unit/**/*.test.(ts|tsx|js)'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};
