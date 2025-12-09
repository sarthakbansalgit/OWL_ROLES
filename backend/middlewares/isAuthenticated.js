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

      const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
          }
          return res.status(401).json({ message: 'Invalid token' });
        }
        return decoded;
      });

      if (!decoded) {
        return res.status(401).json({
          message: "Invalid token",
          success: false,
        });
      }
      req.id = decoded.userId;
      next();
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
      });
    }
  }
}

export default new AuthMiddleware().isAuthenticated;
