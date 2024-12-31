import { LRUCache } from 'lru-cache';

// Rate limiting options
const ratelimitOptions = {
  max: 5, // Maximum number of requests per window
  windowMs: 60 * 1000, // Window size in milliseconds (1 minute)
  message: 'Too many requests, please try again later.',
};

// Create a cache to store rate limit data
const tokenCache = new LRUCache({
  max: 500,
  ttl: ratelimitOptions.windowMs,
});

/**
 * Rate limiting implementation using token bucket algorithm
 */
export const rateLimit = {
  check: async (identifier) => {
    const tokenCount = tokenCache.get(identifier) || 0;
    
    if (tokenCount >= ratelimitOptions.max) {
      return { success: false, message: ratelimitOptions.message };
    }

    tokenCache.set(identifier, tokenCount + 1);
    return { success: true };
  }
};
