import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import config from '../config.js';
import db from '../database/models/index.js';

dotenv.config();

class JwtService {
  /**
   * Generate a JWT token
   * @param {Object} payload - The payload data to encode into the JWT.
   * @param {string} [expiresIn='1h'] - The expiration time for the token (default is 1 hour).
   * @returns {string} - The generated JWT token.
   */
  static generateToken(payload, expiresIn = '1h') {
    try {
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn });
      return token;
    } catch (error) {
      console.error('Error generating token:', error);
      throw new Error('Error generating token');
    }
  }

  /**
   * Verify the validity of a JWT token
   * @param {string} token - The JWT token to verify.
   * @returns {Object|null} - The decoded token payload if valid, or null if invalid.
   */
  static verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded; // Returns the decoded payload
    } catch (error) {
      console.error('Error verifying token:', error);
      return null; // If the token is invalid or expired, return null
    }
  }

  /**
   * Decode a JWT token without verification (for reading the payload)
   * @param {string} token - The JWT token to decode.
   * @returns {Object|null} - The decoded payload or null if invalid.
   */
  static decodeToken(token) {
    try {
      const decoded = jwt.decode(token);
      return decoded; // Returns the decoded payload without verifying the token
    } catch (error) {
      console.error('Error decoding token:', error);
      return null; // If decoding fails, return null
    }
  }


  static generateUserToken(user) {

      const token = this.generateToken({ userId: user.id,role:user.role.type }, '1d');
      db.models.User.updateOne({
        _id: user._id
      },
        {
          token
        }
      )
      return token
    }
 


}

export default JwtService;
