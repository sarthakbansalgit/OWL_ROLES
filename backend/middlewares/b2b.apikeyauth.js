import { B2B_API_KEY } from '../utils/b2bconstants.js';

const apiKeyAuth = async (req, res, next) => {
  try {
    // Extract API key from header or query parameter
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    
    // Check if API key exists
    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: 'API key is required'
      });
    }
    
    // Validate API key against constant (not environment variable)
    if (apiKey !== B2B_API_KEY) {
      return res.status(401).json({
        success: false,
        message: 'Invalid API key'
      });
    }
    
    // Authentication successful, proceed to the next middleware/route handler
    next();
  } catch (error) {
    console.error('API key authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'API authentication error'
    });
  }
};

export default apiKeyAuth;