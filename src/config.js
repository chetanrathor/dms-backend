import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
  mongoDBURL: process.env.MONGO_DB_URL,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || '',
  aws:{
    host:process.env.AWS_HOST,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION || '',
    bucket: process.env.AWS_BUCKET,
    s3Url: `https://${process.env.AWS_BUCKET}.s3.amazonaws.com`,
    baseUrl: process.env.AWS_BASE_URL || ''
  }
};

export default config;
