import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  documentUrl: { type: String, required: true, unique: true, trim: true, lowercase: true },
  isActive: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  comments: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Comments'
  }],
});



const Document = mongoose.model('Documents', documentSchema);

export default Document;

/**
 * Schema representing a document.
 * @typedef {Object} Document
 * @property {string} name - The name of the document.
 * @property {string} documentUrl - The unique URL of the document.
 * @property {boolean} isActive - Indicates whether the document is active.
 * @property {Date} [createdAt] - The date and time the document was created. Defaults to the current date and time.
 * @property {import('mongoose').ObjectId} _id - The id of the document
 * @property {Array<import('./Comment').Comment>} comments - The id of the document
 */