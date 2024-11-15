import express from 'express';
import { validateRegister } from '../../schemas/authentication/register.schema.js';
import validationErrorHandler from '../../middlewares/validationHandler.middleware.js';
import { AuthenticationController } from '../../controllers/authentication.controller.js';
import { validateLogin } from '../../schemas/authentication/login.schema.js';

const authenticationRouter = express.Router();

authenticationRouter.post('/register', validateRegister, validationErrorHandler, AuthenticationController.register);
authenticationRouter.post('/login', validateLogin, validationErrorHandler, AuthenticationController.login);

// User Login Route with validation
// router.post('/login', validateLogin, validationErrorHandler, AuthenticationController.login);

export default authenticationRouter;
