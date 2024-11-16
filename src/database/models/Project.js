import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  isActive:{ type: Boolean, required: true},
  createdAt: { type: Date, default: Date.now },
  documents: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Documents'
  }],
});



const Project = mongoose.model('Project', projectSchema);

export default Project;


/**
 * Schema representing a project.
 * @typedef {Object} Project
 * @property {string} name - The name of the project.
 * @property {boolean} isActive - Whether the project is active.
 * @property {Date} [createdAt] - The date and time the project was created. Defaults to the current date and time.
 * @property {import('mongoose').ObjectId} _id - Id of the project
 */
