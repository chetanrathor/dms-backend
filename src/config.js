import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
  mongoDBURL: process.env.MONGO_DB_URL,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || '',
};

export default config;
