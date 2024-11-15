import express from 'express';
import v1Router from './v1/index.js';

const routes = express.Router();

routes.use('/v1', v1Router);

// User Login Route with validation
// router.post('/login', validateLogin, validationErrorHandler, AuthenticationController.login);

export default routes;
