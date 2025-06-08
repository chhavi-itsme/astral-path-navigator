
import { useState, useEffect } from 'react';

interface CacheConfig {
  key: string;
  ttl?: number; // Time to live in milliseconds
}

export const usePageCache = <T,>(config: CacheConfig) => {
  const [cachedData, setCachedData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getCachedData = (): T | null => {
    try {
      const cached = localStorage.getItem(`page_cache_${config.key}`);
      if (!cached) return null;
      
      const parsedCache = JSON.parse(cached);
      const now = Date.now();
      
      // Check if cache is expired (default TTL: 10 minutes)
      const ttl = config.ttl || 10 * 60 * 1000;
      if (now - parsedCache.timestamp > ttl) {
        localStorage.removeItem(`page_cache_${config.key}`);
        return null;
      }
      
      return parsedCache.data;
    } catch {
      return null;
    }
  };

  const setCacheData = (data: T) => {
    try {
      const cacheItem = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(`page_cache_${config.key}`, JSON.stringify(cacheItem));
      setCachedData(data);
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  };

  useEffect(() => {
    const cached = getCachedData();
    if (cached) {
      setCachedData(cached);
    }
    setIsLoading(false);
  }, [config.key]);

  return {
    cachedData,
    setCacheData,
    isLoading,
    clearCache: () => {
      localStorage.removeItem(`page_cache_${config.key}`);
      setCachedData(null);
    }
  };
};
