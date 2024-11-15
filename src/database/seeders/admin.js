import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Role from '../models/Role.js';
import { ROLES } from '../../libs/constant.js';

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/DMS';

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB for seeding roles');

    // Find the admin role
    const adminRole = await Role.findOne({ type: ROLES.ADMIN }); // Adjust according to your constant definition
    if (!adminRole) {
      console.error('Admin role not found. Ensure roles are seeded correctly.');
      return;
    }

    // Check if an admin user already exists
    const existingAdminUser = await User.findOne({ role: adminRole._id });
    if (existingAdminUser) {
      console.log('Admin user already exists.');
      return;
    }

    // Create a new admin user with a hashed password
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@admin.com',
      password: 'admin',
      role: adminRole._id,
    });

    await adminUser.save();
    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedAdmin();
