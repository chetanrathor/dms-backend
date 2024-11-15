import express from 'express';
import authenticationRouter from './authentication.routes.js';

const v1Router = express.Router();

v1Router.use('/auth', authenticationRouter);

// User Login Route with validation
// router.post('/login', validateLogin, validationErrorHandler, AuthenticationController.login);

export default v1Router;
