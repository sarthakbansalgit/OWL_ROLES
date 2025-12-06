// middlewares/cacheMiddleware.js
import redisClient from '../utils/cache.js';

const cacheMiddleware = (duration) => async (req, res, next) => {
    const key = req.originalUrl;

    const cachedData = await redisClient.get(key);
    if (cachedData) {
        console.log("Serving from Redis Cache");
        return res.status(200).json(JSON.parse(cachedData));
    }

    res.sendResponse = res.json;
    res.json = async (body) => {
        await redisClient.setEx(key, duration, JSON.stringify(body));
        res.sendResponse(body);
    };

    next();
};

export default cacheMiddleware;
