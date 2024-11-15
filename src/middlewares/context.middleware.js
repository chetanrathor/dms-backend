// middleware/validationErrorHandler.js

import db from "../database/models/index.js";

/**
 * Middleware to handle validation errors
 */
const contextMiddleware = (req, res, next) => {

    /**
     * @type {import("../database/models").Context}
     */
    const context = {
        Models: db.models
    }
    req.context  = context

    next();
};

export default contextMiddleware;
