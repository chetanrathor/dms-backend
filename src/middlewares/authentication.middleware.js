import jwt from 'jsonwebtoken'
import config from '../config.js';

// The secret key should be kept safe and secure
const JWT_SECRET_KEY = config.jwtSecret // Replace with a secure key

// Authentication middleware function
/**
 * @typedef {('admin' | 'viewer' | 'editor')} Role
 */

/**
 * Middleware for authenticating and authorizing users based on allowed roles.
 * 
 * @param {Array<Role>} allowedRoles - The roles allowed to access the route.
 * @returns {Function} - The Express middleware function.
 */
const authenticateToken = (allowedRoles) => {
  return (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'

    if (!token) {
      return res.status(401).json({ message: 'Token is required' });
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
      }

      // Check if the user's role is allowed
      if (!allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }

      // Attach user info to the request object for access in route handler
      req.user = user;
      next();  // Proceed to the next middleware or route handler
    });
  };
};

export default authenticateToken;

