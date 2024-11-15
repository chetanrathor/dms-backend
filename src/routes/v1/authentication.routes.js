import express from 'express';
import { validateRegister } from '../../schemas/authentication/register.schema.js';
import validationErrorHandler from '../../middlewares/validationHandler.middleware.js';
import { AuthenticationController } from '../../controllers/authentication.controller.js';

const authenticationRouter = express.Router();

authenticationRouter.post('/register', validateRegister, validationErrorHandler, AuthenticationController.register);

// User Login Route with validation
// router.post('/login', validateLogin, validationErrorHandler, AuthenticationController.login);

export default authenticationRouter;
