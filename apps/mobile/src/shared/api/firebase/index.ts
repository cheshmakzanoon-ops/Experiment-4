import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getFunctions, Functions } from 'firebase/functions';
import { getStorage, Storage } from 'firebase/storage';
import { getAnalytics, Analytics } from 'firebase/analytics';

/**
 * Firebase configuration
 */
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Firebase service class
 */
export class FirebaseService {
  private static instance: FirebaseService;
  private app: FirebaseApp | null = null;
  private auth: Auth | null = null;
  private db: Firestore | null = null;
  private functions: Functions | null = null;
  private storage: Storage | null = null;
  private analytics: Analytics | null = null;
  private isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }

  /**
   * Initialize Firebase services
   */
  initialize(): void {
    if (this.isInitialized) {
      console.log('Firebase already initialized');
      return;
    }

    try {
      // Initialize Firebase app
      this.app = initializeApp(firebaseConfig);

      // Initialize services
      this.auth = getAuth(this.app);
      this.db = getFirestore(this.app);
      this.functions = getFunctions(this.app);
      this.storage = getStorage(this.app);

      // Analytics only on client-side
      if (typeof window !== 'undefined') {
        this.analytics = getAnalytics(this.app);
      }

      this.isInitialized = true;
      console.log('Firebase initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Firebase:', error);
      throw error;
    }
  }

  /**
   * Get Auth instance
   */
  getAuth(): Auth {
    if (!this.auth) {
      throw new Error('Firebase not initialized. Call initialize() first.');
    }
    return this.auth;
  }

  /**
   * Get Firestore instance
   */
  getFirestore(): Firestore {
    if (!this.db) {
      throw new Error('Firebase not initialized. Call initialize() first.');
    }
    return this.db;
  }

  /**
   * Get Cloud Functions instance
   */
  getFunctions(): Functions {
    if (!this.functions) {
      throw new Error('Firebase not initialized. Call initialize() first.');
    }
    return this.functions;
  }

  /**
   * Get Storage instance
   */
  getStorage(): Storage {
    if (!this.storage) {
      throw new Error('Firebase not initialized. Call initialize() first.');
    }
    return this.storage;
  }

  /**
   * Get Analytics instance
   */
  getAnalytics(): Analytics | null {
    return this.analytics;
  }

  /**
   * Check if Firebase is initialized
   */
  isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Get current user from Auth
   */
  getCurrentUser() {
    if (!this.auth) {
      return null;
    }
    return this.auth.currentUser;
  }

  /**
   * Get ID token for authenticated requests
   */
  async getIdToken(): Promise<string | null> {
    if (!this.auth?.currentUser) {
      return null;
    }
    try {
      return await this.auth.currentUser.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      return null;
    }
  }
}

// Export singleton instance
export const firebaseService = FirebaseService.getInstance();

// Export individual instances for direct use
export const auth = () => firebaseService.getAuth();
export const db = () => firebaseService.getFirestore();
export const functions = () => firebaseService.getFunctions();
export const storage = () => firebaseService.getStorage();
export const analytics = () => firebaseService.getAnalytics();
