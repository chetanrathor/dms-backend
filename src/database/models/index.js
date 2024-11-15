import fs from 'fs';
import path from 'path';
import mongoose, { Model } from 'mongoose';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * @type {Models}
 */
const models = {};

// Dynamically import all models
const loadModels = async () => {
    const files = fs.readdirSync(__dirname)
        .filter(file => file.endsWith('.js') && file !== 'index.js');

    await Promise.all(
        files.map(async file => {
            const modelName = file.split('.')[0];
            const { default: model } = await import(path.join(__dirname, file));
            models[modelName] = model;
        })
    );

    console.log('models :>> ', models);
};

await loadModels();

export default { models };




/**
 * @typedef {Object} Models
 * @property {import('mongoose').Model<import('./User').User>} User 
 * @property {import('mongoose').Model<import('./Role').Role>} Role 
 */

/**
 * @typedef {Object} Context
 * @property {Models} Models
 */