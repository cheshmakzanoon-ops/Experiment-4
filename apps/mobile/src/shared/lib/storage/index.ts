import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Generic storage utility for persisting data
 */
export class StorageService {
  private static instance: StorageService;

  private constructor() {}

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  /**
   * Store data with a key
   */
  async set<T>(key: string, value: T): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error storing data with key ${key}:`, error);
      throw error;
    }
  }

  /**
   * Retrieve data by key
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) {
        return null;
      }
      return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error retrieving data with key ${key}:`, error);
      throw error;
    }
  }

  /**
   * Remove data by key
   */
  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing data with key ${key}:`, error);
      throw error;
    }
  }

  /**
   * Clear all storage
   */
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  /**
   * Get all keys
   */
  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      throw error;
    }
  }

  /**
   * Multi-get for batch retrieval
   */
  async multiGet(keys: string[]): Promise<Map<string, any>> {
    try {
      const result = await AsyncStorage.multiGet(keys);
      const map = new Map<string, any>();
      
      result.forEach(([key, value]) => {
        if (value !== null) {
          map.set(key, JSON.parse(value));
        }
      });
      
      return map;
    } catch (error) {
      console.error('Error in multi-get:', error);
      throw error;
    }
  }

  /**
   * Multi-set for batch storage
   */
  async multiSet(keyValuePairs: [string, any][]): Promise<void> {
    try {
      const serializedPairs = keyValuePairs.map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]);
      await AsyncStorage.multiSet(serializedPairs);
    } catch (error) {
      console.error('Error in multi-set:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const storageService = StorageService.getInstance();
