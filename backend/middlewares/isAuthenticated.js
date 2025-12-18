import jwt from "jsonwebtoken";

class AuthMiddleware {
  async isAuthenticated(req, res, next) {
    try {
      const token = req.cookies.token;  

      if (!token) {
        return res.status(401).json({
          message: "User not authenticated",
          success: false,
        });
      }

      // Use try-catch to handle token verification
      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
      } catch (tokenError) {
        if (tokenError.name === 'TokenExpiredError') {
          return res.status(401).json({ 
            message: 'Token expired, please login again',
            success: false 
          });
        }
        return res.status(401).json({ 
          message: 'Invalid token',
          success: false 
        });
      }

      if (!decoded || !decoded.userId) {
        return res.status(401).json({
          message: "Invalid token",
          success: false,
        });
      }
      
      req.id = decoded.userId;
      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  }
}

export default new AuthMiddleware().isAuthenticated;
