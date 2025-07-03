import { useState, useCallback } from 'react';

// Storage utility functions with error handling
export class StorageManager {
  private static readonly MAX_STORAGE_SIZE = 5 * 1024 * 1024; // 5MB limit
  private static readonly STORAGE_KEY_PREFIX = 'sharehub_';

  static setItem(key: string, value: any): boolean {
    try {
      const serializedValue = JSON.stringify(value);
      const fullKey = this.STORAGE_KEY_PREFIX + key;
      
      // Check if storage is available and has space
      if (!this.isStorageAvailable()) {
        console.warn('Storage not available');
        return false;
      }

      // Check storage size
      if (this.getStorageSize() + serializedValue.length > this.MAX_STORAGE_SIZE) {
        console.warn('Storage quota exceeded, clearing old data');
        this.clearOldData();
      }

      localStorage.setItem(fullKey, serializedValue);
      return true;
    } catch (error) {
      console.error('Failed to save to storage:', error);
      
      // Try to clear some space and retry
      if (error instanceof DOMException && error.code === 22) {
        this.clearOldData();
        try {
          localStorage.setItem(this.STORAGE_KEY_PREFIX + key, JSON.stringify(value));
          return true;
        } catch (retryError) {
          console.error('Retry failed:', retryError);
          return false;
        }
      }
      return false;
    }
  }

  static getItem<T>(key: string, defaultValue: T | null = null): T | null {
    try {
      const fullKey = this.STORAGE_KEY_PREFIX + key;
      const item = localStorage.getItem(fullKey);
      
      if (item === null) {
        return defaultValue;
      }
      
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('Failed to read from storage:', error);
      return defaultValue;
    }
  }

  static removeItem(key: string): boolean {
    try {
      const fullKey = this.STORAGE_KEY_PREFIX + key;
      localStorage.removeItem(fullKey);
      return true;
    } catch (error) {
      console.error('Failed to remove from storage:', error);
      return false;
    }
  }

  static clear(): boolean {
    try {
      // Only clear ShareHub-related items
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.STORAGE_KEY_PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Failed to clear storage:', error);
      return false;
    }
  }

  private static isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  private static getStorageSize(): number {
    let total = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith(this.STORAGE_KEY_PREFIX)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  }

  private static clearOldData(): void {
    try {
      // Clear non-essential data first
      const nonEssentialKeys = ['chat_history', 'temp_data', 'cache_'];
      
      for (const key of Object.keys(localStorage)) {
        if (key.startsWith(this.STORAGE_KEY_PREFIX)) {
          const shortKey = key.replace(this.STORAGE_KEY_PREFIX, '');
          if (nonEssentialKeys.some(pattern => shortKey.includes(pattern))) {
            localStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      console.error('Failed to clear old data:', error);
    }
  }

  // Chat-specific methods
  static saveChatMessage(message: any): boolean {
    const messages = this.getChatMessages();
    messages.push({
      ...message,
      timestamp: Date.now(),
      id: crypto.randomUUID?.() || Date.now().toString()
    });
    
    // Keep only last 100 messages to prevent storage overflow
    const trimmedMessages = messages.slice(-100);
    
    return this.setItem('chat_messages', trimmedMessages);
  }

  static getChatMessages(): any[] {
    return this.getItem('chat_messages', []) || [];
  }

  static clearChatMessages(): boolean {
    return this.removeItem('chat_messages');
  }
}

// Error boundary for storage operations
export class StorageError extends Error {
  constructor(message: string, public readonly operation: string) {
    super(message);
    this.name = 'StorageError';
  }
}

// Hook for React components
export const useStorage = () => {
  const [storageError, setStorageError] = useState<string | null>(null);

  const safeSetItem = useCallback((key: string, value: any) => {
    const success = StorageManager.setItem(key, value);
    if (!success) {
      setStorageError('Failed to save data. Storage may be full.');
      // Clear error after 5 seconds
      setTimeout(() => setStorageError(null), 5000);
    }
    return success;
  }, []);

  const safeGetItem = useCallback(<T>(key: string, defaultValue: T | null = null) => {
    return StorageManager.getItem(key, defaultValue);
  }, []);

  const clearError = useCallback(() => {
    setStorageError(null);
  }, []);

  return {
    setItem: safeSetItem,
    getItem: safeGetItem,
    removeItem: StorageManager.removeItem,
    clear: StorageManager.clear,
    storageError,
    clearError
  };
};