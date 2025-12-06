// utils/cache.js
import { createClient } from 'redis';

// Only create Redis client if REDIS_URL is configured
let redisClient = null;

if (process.env.REDIS_URL) {
    redisClient = createClient({ url: process.env.REDIS_URL });

    redisClient.on('error', (err) => {
        // Silently log errors in development
        if (process.env.NODE_ENV === 'development') {
            // Don't spam logs with connection errors
        }
    });

    // Only connect to Redis in non-test environment
    if (process.env.NODE_ENV !== 'test') {
        (async () => {
            try {
                await redisClient.connect();
                console.log("Redis connected successfully!");
            } catch (err) {
                console.log("Redis not available - running without caching");
            }
        })();
    }
}

export default redisClient;
