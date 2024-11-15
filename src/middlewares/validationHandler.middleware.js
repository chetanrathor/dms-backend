// middleware/validationErrorHandler.js

import { validationResult } from 'express-validator';

/**
 * Middleware to handle validation errors
 */
const validationErrorHandler = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); // If no validation errors, continue to the next middleware or route handler
};

export default validationErrorHandler;
