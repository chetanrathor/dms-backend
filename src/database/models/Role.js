import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    // enum: ['admin, editor, viewer'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Role = mongoose.model('Role', roleSchema);

export default Role;

/**
 * @typedef {Object} Role
 * @property {import('mongoose').ObjectId} _id - The type of role (e.g., 'admin', 'user', etc.)
 * @property {('admin' | 'editor' | 'viewer')} type - The type of role (e.g., 'admin', 'user', etc.)
 * @property {Date} createdAt - The date and time when the role was created
 */
