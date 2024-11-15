import express from 'express';
import authenticationRouter from './authentication.routes.js';
import userRouter from './user.routes.js';
import authenticateToken from '../../middlewares/authentication.middleware.js';
import documentRouter from './document.routes .js';

const v1Router = express.Router();

v1Router.use('/auth', authenticationRouter);
v1Router.use('/user', userRouter);
v1Router.use('/document', documentRouter);


export default v1Router;
