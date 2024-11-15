import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  role: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to Role model
    ref: 'Role',                          // Refers to the 'Role' model
    required: true,                       // Ensures every user must have a role
  },
  token:{
    type: String,
    required: false,
    default: null,
  }
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    console.log('this.password :>> ', this.password);
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;

/**
 * @typedef {Object} User
 * @property {string} name - The name of the user.
 * @property {string} email - The email address of the user (unique, lowercase).
 * @property {string} password - The hashed password of the user.
 * @property {Date} createdAt - The date and time when the user was created (defaults to current date).
 * @property {ObjectId} role - The role assigned to the user, referenced from the Role model.
 * @property {string} token - The token assigned to the user.
 */
