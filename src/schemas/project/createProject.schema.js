import { body, param } from 'express-validator';

export const validateCreateProject = [
    body('name')
        .notEmpty()
        .withMessage('Project name is required')
        .isString()
        .withMessage('Project name must be a string')
        .trim(),

    body('isActive')
        .isBoolean()
        .withMessage('isActive must be a boolean')
        .notEmpty()
        .withMessage('isActive is required'),
];

