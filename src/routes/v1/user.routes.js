import express from 'express';
import { validateRegister } from '../../schemas/authentication/register.schema.js';
import validationErrorHandler from '../../middlewares/validationHandler.middleware.js';
import { AuthenticationController } from '../../controllers/authentication.controller.js';
import { validateLogin } from '../../schemas/authentication/login.schema.js';
import { UserController } from '../../controllers/user.controller.js';
import authenticateToken from '../../middlewares/authentication.middleware.js';

const userRouter = express.Router();

userRouter.get('/', authenticateToken(['admin','editor','viewer']), UserController.getUserDetails);

// User Login Route with validation
// router.post('/login', validateLogin, validationErrorHandler, AuthenticationController.login);

export default userRouter;
