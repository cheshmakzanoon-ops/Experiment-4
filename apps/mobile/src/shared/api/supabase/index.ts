import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase configuration
 */
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Database types for type-safe queries
 */
export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          major: string;
          difficulty_level: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          major: string;
          difficulty_level: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          major?: string;
          difficulty_level?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      modules: {
        Row: {
          id: string;
          course_id: string;
          title: string;
          order_index: number;
          estimated_duration: number;
        };
        Insert: {
          id?: string;
          course_id: string;
          title: string;
          order_index: number;
          estimated_duration: number;
        };
        Update: {
          id?: string;
          course_id?: string;
          title?: string;
          order_index?: number;
          estimated_duration?: number;
        };
      };
      lessons: {
        Row: {
          id: string;
          module_id: string;
          title: string;
          content_type: string;
          order_index: number;
          content?: string;
          video_url?: string;
        };
        Insert: {
          id?: string;
          module_id: string;
          title: string;
          content_type: string;
          order_index: number;
          content?: string;
          video_url?: string;
        };
        Update: {
          id?: string;
          module_id?: string;
          title?: string;
          content_type?: string;
          order_index?: number;
          content?: string;
          video_url?: string;
        };
      };
      questions: {
        Row: {
          id: string;
          lesson_id: string;
          type: string;
          difficulty: string;
          text: string;
          metadata?: any;
        };
        Insert: {
          id?: string;
          lesson_id: string;
          type: string;
          difficulty: string;
          text: string;
          metadata?: any;
        };
        Update: {
          id?: string;
          lesson_id?: string;
          type?: string;
          difficulty?: string;
          text?: string;
          metadata?: any;
        };
      };
      user_progress: {
        Row: {
          user_id: string;
          lesson_id: string;
          status: string;
          score?: number;
          completed_at?: string;
        };
        Insert: {
          user_id: string;
          lesson_id: string;
          status: string;
          score?: number;
          completed_at?: string;
        };
        Update: {
          user_id?: string;
          lesson_id?: string;
          status?: string;
          score?: number;
          completed_at?: string;
        };
      };
      spaced_repetition: {
        Row: {
          user_id: string;
          question_id: string;
          interval: number;
          ease_factor: number;
          next_review: string;
          last_reviewed: string;
        };
        Insert: {
          user_id: string;
          question_id: string;
          interval: number;
          ease_factor: number;
          next_review: string;
          last_reviewed: string;
        };
        Update: {
          user_id?: string;
          question_id?: string;
          interval?: number;
          ease_factor?: number;
          next_review?: string;
          last_reviewed?: string;
        };
      };
      achievements: {
        Row: {
          id: string;
          name: string;
          description: string;
          criteria: any;
          reward_xp: number;
          icon_url?: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          criteria: any;
          reward_xp: number;
          icon_url?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          criteria?: any;
          reward_xp?: number;
          icon_url?: string;
        };
      };
      user_achievements: {
        Row: {
          user_id: string;
          achievement_id: string;
          unlocked_at: string;
        };
        Insert: {
          user_id: string;
          achievement_id: string;
          unlocked_at?: string;
        };
        Update: {
          user_id?: string;
          achievement_id?: string;
          unlocked_at?: string;
        };
      };
      leaderboards: {
        Row: {
          period: string;
          user_id: string;
          rank: number;
          xp_earned: number;
        };
        Insert: {
          period: string;
          user_id: string;
          rank: number;
          xp_earned: number;
        };
        Update: {
          period?: string;
          user_id?: string;
          rank?: number;
          xp_earned?: number;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

/**
 * Supabase service class
 */
export class SupabaseService {
  private static instance: SupabaseService;
  private client: SupabaseClient<Database> | null = null;
  private isInitialized: boolean = false;

  private constructor() {}

  public static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  /**
   * Initialize Supabase client
   */
  initialize(): void {
    if (this.isInitialized) {
      console.log('Supabase already initialized');
      return;
    }

    try {
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Missing Supabase configuration');
      }

      this.client = createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
      });

      this.isInitialized = true;
      console.log('Supabase initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Supabase:', error);
      throw error;
    }
  }

  /**
   * Get Supabase client instance
   */
  getClient(): SupabaseClient<Database> {
    if (!this.client) {
      throw new Error('Supabase not initialized. Call initialize() first.');
    }
    return this.client;
  }

  /**
   * Check if Supabase is initialized
   */
  isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Get current session
   */
  async getSession() {
    if (!this.client) {
      throw new Error('Supabase not initialized');
    }
    return await this.client.auth.getSession();
  }

  /**
   * Get current user
   */
  async getUser() {
    if (!this.client) {
      throw new Error('Supabase not initialized');
    }
    return await this.client.auth.getUser();
  }

  /**
   * Sign out
   */
  async signOut() {
    if (!this.client) {
      throw new Error('Supabase not initialized');
    }
    return await this.client.auth.signOut();
  }
}

// Export singleton instance
export const supabaseService = SupabaseService.getInstance();

// Export client for direct use
export const supabase = () => supabaseService.getClient();
