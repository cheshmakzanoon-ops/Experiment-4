# Engineering Study Guide - React Native App

<div align="center">

![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue)
![React Native](https://img.shields.io/badge/React%20Native-0.72%2B-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-3178C6?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green)

**A comprehensive mobile learning platform designed for engineering undergraduate and graduate students**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Target Audience](#-target-audience)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [Architecture](#-architecture)
- [API Documentation](#-api-documentation)
- [Testing](#-testing)
- [Build & Deployment](#-build--deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [Code of Conduct](#-code-of-conduct)
- [License](#-license)
- [Contact & Support](#-contact--support)

---

## 🎯 Overview

**Engineering Study Guide** is a feature-rich React Native mobile application specifically designed to support engineering students throughout their academic journey—from bachelor's degrees to master's programs. The app provides comprehensive study materials, practice problems, interactive visualizations, and collaborative learning tools across multiple engineering disciplines.

### Key Value Propositions

- **Multi-Discipline Support**: Covers Mechanical, Civil, Electrical, Computer, Chemical, and Industrial Engineering
- **Level-Appropriate Content**: Differentiated materials for undergraduate and graduate-level studies
- **Interactive Learning**: 3D visualizations, simulations, and interactive problem-solving
- **Offline Capability**: Download and access study materials without internet connection
- **Progress Tracking**: Monitor your learning journey with detailed analytics
- **Collaborative Features**: Study groups, peer discussions, and resource sharing

---

## ✨ Features

### 📚 Study Materials

- **Comprehensive Notes**: Curated lecture notes organized by subject and topic
- **Video Tutorials**: Integrated video lectures from top engineering educators
- **Formula Sheets**: Quick-reference formula databases with search functionality
- **Textbook Solutions**: Step-by-step solutions to common textbook problems
- **Research Papers**: Access to curated research articles for graduate students

### 🧮 Practice & Assessment

- **Problem Banks**: Thousands of practice problems with varying difficulty levels
- **Quizzes & Mock Tests**: Timed assessments with instant feedback
- **GATE/GRE/FE Exam Prep**: Specialized preparation modules for competitive exams
- **Adaptive Learning**: AI-powered problem recommendations based on performance
- **Solution Explanations**: Detailed walkthroughs for every problem

### 🔬 Interactive Tools

- **3D Visualizations**: Interactive models for mechanics, structures, and circuits
- **Simulations**: Virtual labs for experiments and demonstrations
- **Calculator Suite**: Engineering calculators for common computations
- **Unit Converter**: Comprehensive unit conversion tool
- **Graph Plotter**: Visualize mathematical functions and data

### 📊 Progress & Analytics

- **Learning Dashboard**: Visual overview of completed topics and scores
- **Performance Metrics**: Detailed statistics on strengths and weaknesses
- **Study Streaks**: Gamified motivation with daily goals
- **Time Tracking**: Monitor time spent on different subjects
- **Achievement Badges**: Earn recognition for milestones

### 👥 Social & Collaborative

- **Study Groups**: Create or join groups with classmates
- **Discussion Forums**: Ask questions and share knowledge
- **Resource Sharing**: Upload and share study materials
- **Peer Tutoring**: Connect with tutors and mentors
- **Live Sessions**: Participate in group study sessions

### ⚙️ App Features

- **Offline Mode**: Download content for offline access
- **Dark Mode**: Eye-friendly dark theme option
- **Notifications**: Reminders for exams, deadlines, and study goals
- **Bookmarks**: Save important content for quick access
- **Search**: Powerful search across all content and resources
- **Multi-language Support**: Available in multiple languages
- **Accessibility**: WCAG compliant with screen reader support

---

## 🎓 Target Audience

### Primary Users

- **Bachelor's Degree Students**: First-year through final-year undergraduates in engineering programs
- **Master's Degree Students**: Graduate students pursuing MS, ME, MTech, or equivalent degrees
- **PhD Candidates**: Research scholars needing quick reference and teaching aids

### Engineering Disciplines Supported

| Discipline | Undergraduate | Graduate |
|------------|--------------|----------|
| Mechanical Engineering | ✅ | ✅ |
| Civil Engineering | ✅ | ✅ |
| Electrical Engineering | ✅ | ✅ |
| Computer Science & Engineering | ✅ | ✅ |
| Electronics & Communication | ✅ | ✅ |
| Chemical Engineering | ✅ | ✅ |
| Industrial Engineering | ✅ | ✅ |
| Aerospace Engineering | ✅ | ✅ |
| Biomedical Engineering | ✅ | ✅ |
| Environmental Engineering | ✅ | ✅ |

---

## 🛠 Tech Stack

### Frontend

- **React Native**: 0.72+ (Cross-platform mobile framework)
- **TypeScript**: 5.0+ (Type-safe JavaScript)
- **Redux Toolkit**: State management
- **React Navigation**: Navigation and routing
- **React Query**: Server state management and caching

### UI Components

- **React Native Paper**: Material Design components
- **NativeWind**: Tailwind CSS for React Native
- **Lottie React Native**: Animations
- **React Native Reanimated**: Smooth animations
- **Victory Native**: Charts and graphs

### Backend & Services

- **Firebase**: Authentication, database, and cloud functions
- **GraphQL**: API querying (optional)
- **AWS S3**: Media storage and CDN
- **WebSocket**: Real-time features (chat, live sessions)

### Development Tools

- **Expo**: Development workflow (optional)
- **Jest**: Unit testing
- **Detox**: E2E testing
- **ESLint & Prettier**: Code quality
- **Husky**: Git hooks

### Third-Party Libraries

```json
{
  "dependencies": {
    "@react-navigation/native": "^6.x",
    "@reduxjs/toolkit": "^1.9.x",
    "react-native-video": "^5.x",
    "react-native-pdf": "^6.x",
    "react-native-math-view": "^3.x",
    "react-native-svg": "^13.x",
    "react-native-gesture-handler": "^2.x",
    "axios": "^1.x",
    "dayjs": "^1.x"
  }
}
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js**: v18.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn**: Latest version
- **React Native CLI**: `npm install -g react-native-cli`
- **Watchman**: (macOS only) `brew install watchman`

### Platform-Specific Requirements

#### For iOS Development
- **macOS**: Required for iOS development
- **Xcode**: Latest version from Mac App Store
- **CocoaPods**: `sudo gem install cocoapods`
- **iOS Simulator**: Included with Xcode

#### For Android Development
- **Java Development Kit (JDK)**: v11 or higher
- **Android Studio**: Latest version
- **Android SDK**: API level 21 or higher
- **Android Emulator** or physical device

### Recommended Tools

- **VS Code**: With React Native extensions
- **React Native Debugger**: For debugging
- **Flipper**: Mobile app debugger
- **Git**: Version control

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/engineering-study-guide.git
cd engineering-study-guide
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the variables in `.env`:

```env
# API Configuration
API_BASE_URL=https://api.engineeringstudyguide.com
API_VERSION=v1

# Firebase Configuration
FIREBASE_API_KEY=your_api_key
FIREBASE_APP_ID=your_app_id
FIREBASE_PROJECT_ID=your_project_id

# AWS Configuration
AWS_BUCKET_NAME=your-bucket-name
AWS_REGION=us-east-1

# Feature Flags
ENABLE_OFFLINE_MODE=true
ENABLE_PUSH_NOTIFICATIONS=true
```

### Step 4: iOS Setup

```bash
cd ios
pod install
cd ..
```

### Step 5: Android Setup

Ensure you have configured the Android SDK and emulator. No additional steps required for basic setup.

### Step 6: Run the Application

#### Run on iOS

```bash
# Using npm
npm run ios

# Or using yarn
yarn ios

# Specific simulator
yarn ios --simulator="iPhone 14 Pro"
```

#### Run on Android

```bash
# Using npm
npm run android

# Or using yarn
yarn android

# Specific device/emulator
yarn android --deviceId=emulator-5554
```

#### Run on Both Platforms Simultaneously

```bash
yarn start
# Then in separate terminals
yarn ios
yarn android
```

---

## 📁 Project Structure

```
engineering-study-guide/
├── .github/                    # GitHub workflows and templates
│   ├── workflows/
│   └── ISSUE_TEMPLATE/
├── .husky/                     # Git hooks
├── android/                    # Android native code
├── ios/                        # iOS native code
├── src/
│   ├── assets/                 # Images, fonts, icons
│   │   ├── images/
│   │   ├── fonts/
│   │   └── icons/
│   ├── components/             # Reusable UI components
│   │   ├── common/
│   │   ├── forms/
│   │   ├── layout/
│   │   └── subject/
│   ├── config/                 # App configuration
│   │   ├── constants.ts
│   │   ├── env.ts
│   │   └── navigation.ts
│   ├── features/               # Feature-based modules
│   │   ├── auth/
│   │   ├── subjects/
│   │   ├── practice/
│   │   ├── progress/
│   │   ├── social/
│   │   └── settings/
│   ├── hooks/                  # Custom React hooks
│   ├── navigation/             # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   └── types.ts
│   ├── screens/                # Screen components
│   │   ├── HomeScreen.tsx
│   │   ├── SubjectScreen.tsx
│   │   └── ...
│   ├── services/               # API and external services
│   │   ├── api.ts
│   │   ├── firebase.ts
│   │   └── storage.ts
│   ├── store/                  # Redux store and slices
│   │   ├── store.ts
│   │   └── slices/
│   ├── styles/                 # Global styles and themes
│   │   ├── theme.ts
│   │   └── global.ts
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   └── App.tsx                 # Main app component
├── __tests__/                  # Test files
├── .env.example                # Environment variables template
├── .eslintrc.js                # ESLint configuration
├── .prettierrc                 # Prettier configuration
├── app.json                    # App configuration
├── babel.config.js             # Babel configuration
├── index.js                    # Entry point
├── jest.config.js              # Jest configuration
├── metro.config.js             # Metro bundler configuration
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

---

## 📱 Usage

### First-Time Setup

1. **Launch the App**: After installation, open the app on your device/emulator
2. **Create Account**: Sign up with email or social login (Google, Apple)
3. **Select Discipline**: Choose your engineering field and degree level
4. **Personalize**: Select subjects and topics of interest
5. **Start Learning**: Begin exploring study materials and practice problems

### Navigation

The app uses a bottom tab navigation with the following main sections:

| Tab | Description |
|-----|-------------|
| 🏠 Home | Dashboard, recent activity, quick access |
| 📚 Subjects | Browse and access subject materials |
| ✏️ Practice | Problem banks, quizzes, and tests |
| 👥 Community | Study groups, forums, and discussions |
| 👤 Profile | Settings, progress, and achievements |

### Key Workflows

#### Accessing Study Materials

```
Home → Subjects → Choose Discipline → Select Subject → Choose Topic → View Content
```

#### Taking a Quiz

```
Practice → Select Subject → Choose Quiz Type → Start Quiz → Submit → View Results
```

#### Joining a Study Group

```
Community → Study Groups → Browse/ Search → Request to Join → Participate
```

#### Downloading Content for Offline Use

```
Any Content Page → Tap Download Icon → Select Quality → Confirm → Access Offline
```

---

## 🏗 Architecture

### State Management

The app follows a **Redux Toolkit** pattern for global state management:

```typescript
// Example: Subject slice
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SubjectState {
  subjects: Subject[];
  selectedSubject: Subject | null;
  loading: boolean;
  error: string | null;
}

const subjectSlice = createSlice({
  name: 'subjects',
  initialState: {
    subjects: [],
    selectedSubject: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchSubjectsStart(state) {
      state.loading = true;
    },
    fetchSubjectsSuccess(state, action: PayloadAction<Subject[]>) {
      state.subjects = action.payload;
      state.loading = false;
    },
    // ... more reducers
  },
});
```

### Component Architecture

Components follow a **Container-Presenter** pattern:

- **Container Components**: Handle business logic and data fetching
- **Presenter Components**: Pure UI components that receive data via props

### API Layer

All API calls are abstracted through a service layer:

```typescript
// services/api.ts
import axios from 'axios';
import { ENV } from '../config/env';

const api = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const subjectAPI = {
  getAll: () => api.get('/subjects'),
  getById: (id: string) => api.get(`/subjects/${id}`),
  // ... more methods
};
```

---

## 📡 API Documentation

### Base URL

```
Production: https://api.engineeringstudyguide.com/v1
Development: https://dev-api.engineeringstudyguide.com/v1
```

### Authentication

All authenticated endpoints require a Bearer token in the Authorization header:

```http
Authorization: Bearer <your_jwt_token>
```

### Key Endpoints

#### Subjects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/subjects` | Get all subjects |
| GET | `/subjects/:id` | Get subject details |
| GET | `/subjects/:id/topics` | Get topics for subject |
| POST | `/subjects/:id/bookmark` | Bookmark a subject |

#### Practice Problems

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/problems` | Get problems (filterable) |
| GET | `/problems/:id` | Get problem with solution |
| POST | `/problems/:id/attempt` | Submit answer attempt |
| GET | `/problems/recommended` | Get personalized recommendations |

#### User Progress

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/progress` | Get user progress overview |
| GET | `/progress/:subjectId` | Get subject-specific progress |
| POST | `/progress/sync` | Sync local progress with server |

### Rate Limiting

- **Free Tier**: 100 requests/hour
- **Premium**: 1000 requests/hour
- **Institutional**: Unlimited

For complete API documentation, visit: [API Docs Portal](https://docs.engineeringstudyguide.com)

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- src/features/auth/__tests__/auth.test.ts

# Run E2E tests
npm run test:e2e
```

### Test Structure

```typescript
// Example unit test
import { renderHook } from '@testing-library/react-hooks';
import { useSubjectProgress } from '../hooks/useSubjectProgress';

describe('useSubjectProgress', () => {
  it('should calculate progress percentage correctly', () => {
    const { result } = renderHook(() =>
      useSubjectProgress({ completed: 5, total: 10 })
    );
    
    expect(result.current.percentage).toBe(50);
  });
  
  it('should handle edge cases', () => {
    // ... test cases
  });
});
```

### E2E Testing with Detox

```bash
# Build for testing
npm run build:ios:debug

# Run E2E tests
npm run test:e2e:ios
```

---

## 📦 Build & Deployment

### Building for Production

#### iOS

```bash
# Build archive
cd ios
xcodebuild -workspace EngineeringStudyGuide.xcworkspace \
  -scheme EngineeringStudyGuide \
  -configuration Release \
  -archivePath build/EngineeringStudyGuide.xcarchive \
  archive

# Export IPA
xcodebuild -exportArchive \
  -archivePath build/EngineeringStudyGuide.xcarchive \
  -exportPath build \
  -exportOptionsPlist exportOptions.plist
```

#### Android

```bash
# Generate release APK
cd android
./gradlew assembleRelease

# Generate AAB for Play Store
./gradlew bundleRelease
```

### Deployment

#### App Store (iOS)

1. Upload IPA to App Store Connect
2. Complete app metadata and screenshots
3. Submit for review

#### Google Play Store (Android)

1. Upload AAB to Google Play Console
2. Complete store listing
3. Submit for review

### CI/CD Pipeline

The project includes GitHub Actions workflows for:

- Automated testing on PR
- Building release artifacts
- Deploying to beta channels
- Publishing to stores (manual approval required)

---

## 🔧 Troubleshooting

### Common Issues

#### Issue: Metro Bundler Not Starting

```bash
# Clear cache and restart
npm start -- --reset-cache

# Or manually clear
watchman watch-del-all
rm -rf node_modules
npm install
```

#### Issue: iOS Build Fails

```bash
cd ios
pod deintegrate
pod install
cd ..
npm run ios
```

#### Issue: Android Build Fails

```bash
cd android
./gradlew clean
./gradlew build
cd ..
npm run android
```

#### Issue: TypeScript Errors

```bash
# Regenerate TypeScript types
npm run generate:types

# Check configuration
npx tsc --noEmit
```

### Debugging Tips

1. **Use React Native Debugger**: Download from [releases](https://github.com/jhen0409/react-native-debugger/releases)
2. **Enable Remote Debugging**: Shake device → Debug → Debug remotely
3. **Check Logs**: 
   ```bash
   # iOS
   npx react-native log-ios
   
   # Android
   npx react-native log-android
   ```

### Getting Help

- 📖 Check the [Wiki](https://github.com/your-repo/wiki)
- 💬 Join our [Discord Community](https://discord.gg/engineering-study)
- 🐛 Report bugs on [GitHub Issues](https://github.com/your-repo/issues)

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🎨 Design UI improvements
- 💻 Submit code contributions
- 🌍 Translate content to other languages

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Run tests**
   ```bash
   npm test
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Style Guidelines

- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure TypeScript types are properly defined

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Tests added/passing
- [ ] Documentation updated
```

---

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project and community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, nationality, level of experience, education, socio-economic status, race, religion, or sexual identity and orientation.

### Expected Behavior

- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Publishing others' private information
- Other unethical conduct

Report violations to: conduct@engineeringstudyguide.com

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Engineering Study Guide

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact & Support

### Project Team

- **Lead Developer**: Your Name - [email@example.com](mailto:email@example.com)
- **UI/UX Designer**: Designer Name - [design@example.com](mailto:design@example.com)
- **Content Manager**: Manager Name - [content@example.com](mailto:content@example.com)

### Support Channels

- 📧 **Email**: support@engineeringstudyguide.com
- 💬 **Discord**: [Join our server](https://discord.gg/engineering-study)
- 🐦 **Twitter**: [@EngStudyGuide](https://twitter.com/EngStudyGuide)
- 📘 **Facebook**: [Engineering Study Guide](https://facebook.com/EngStudyGuide)
- 📱 **Instagram**: [@engstudyguide](https://instagram.com/engstudyguide)

### Website

Visit our official website: [www.engineeringstudyguide.com](https://www.engineeringstudyguide.com)

### Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the React Native community
- Educational content reviewed by engineering professors from partner universities

---

<div align="center">

**Made with ❤️ for engineering students worldwide**

⭐ Star this repo if you find it helpful!

[Back to Top](#-table-of-contents)

</div>