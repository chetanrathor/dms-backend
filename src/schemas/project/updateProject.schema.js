
import { body, param } from 'express-validator';

export const validateUpdateProject = [
    param('projectId')
        .isMongoId()
        .withMessage('Invalid projectId format'),

    body('name')
        .optional()
        .isString()
        .withMessage('Project name must be a string')
        .trim(),

    body('isActive')
        .optional()
        .isBoolean()
        .withMessage('isActive must be a boolean'),
];
