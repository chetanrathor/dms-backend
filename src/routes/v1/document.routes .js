import express from 'express';
import { validateRegister } from '../../schemas/authentication/register.schema.js';
import validationErrorHandler from '../../middlewares/validationHandler.middleware.js';
import { AuthenticationController } from '../../controllers/authentication.controller.js';
import { validateLogin } from '../../schemas/authentication/login.schema.js';
import { UserController } from '../../controllers/user.controller.js';
import authenticateToken from '../../middlewares/authentication.middleware.js';
import { DocumentController } from '../../controllers/document.controller.js';
import upload from '../../libs/upload.js';

const documentRouter = express.Router();

documentRouter.post('/', upload.single('file'),  authenticateToken(['admin','editor','viewer']), DocumentController.uploadDocument);
documentRouter.get('/',  authenticateToken(['admin','editor','viewer']), DocumentController.getDocuments);
documentRouter.put('/',  authenticateToken(['admin','editor','viewer']), DocumentController.updateDocument);
documentRouter.get('/:documentId',  authenticateToken(['admin','editor','viewer']), DocumentController.deleteDocument);


export default documentRouter;
