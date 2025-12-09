// middlewares/cacheMiddleware.js
import redisClient from '../utils/cache.js';

const cacheMiddleware = (duration) => async (req, res, next) => {
    // If Redis client is not available, skip caching
    if (!redisClient) {
        return next();
    }

    const key = req.originalUrl;

    try {
        const cachedData = await redisClient.get(key);
        if (cachedData) {
            console.log("Serving from Redis Cache");
            return res.status(200).json(JSON.parse(cachedData));
        }
    } catch (error) {
        console.log("Cache read error, continuing without cache:", error.message);
    }

    res.sendResponse = res.json;
    res.json = async (body) => {
        try {
            await redisClient.setEx(key, duration, JSON.stringify(body));
        } catch (error) {
            console.log("Cache write error:", error.message);
        }
        res.sendResponse(body);
    };

    next();
};

export default cacheMiddleware;
