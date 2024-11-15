import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Role from '../models/Role.js';
import config from '../../config.js';

dotenv.config();

const roles = [
  { type: 'admin' },
  { type: 'editor' },
  { type: 'viewer' },
];

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/DMS';
console.log('mon :>> ', mongoURI);

async function seedRoles() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding roles');

    // Remove existing roles to avoid duplicates
    await Role.deleteMany({});
    console.log('Cleared existing roles');

    // Insert new roles
    await Role.insertMany(roles);
    console.log('Roles seeded successfully:', roles);
  } catch (error) {
    console.error('Error seeding roles:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

seedRoles();
