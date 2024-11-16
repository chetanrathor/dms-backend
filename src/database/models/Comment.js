import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  comment: { type: String, required: true, trim: true },
  isActive: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  document: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Documents', required: true }]
});



const Comment = mongoose.model('Comments', commentSchema);

export default Comment;

/**
 * Defines the schema for a comment.
 * @typedef {Object} Comment
 * @property {string} comment - The content of the comment. It is required and trimmed.
 * @property {boolean} isActive - Indicates whether the comment is active. It is required.
 * @property {Date} createdAt - The date the comment was created. Defaults to the current date.
 * @property {import('./User').User} user - The ID of the user who made the comment. It references the 'User' collection and is required.
 * @property {import('./Document').Document} document - The ID of the document the comment is associated with. It references the 'Documents' collection and is required.
 */