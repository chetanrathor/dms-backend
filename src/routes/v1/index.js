import express from 'express';
import authenticationRouter from './authentication.routes.js';
import userRouter from './user.routes.js';
import authenticateToken from '../../middlewares/authentication.middleware.js';
import documentRouter from './document.routes .js';
import projectRouter from './project.routes.js.js';
import commentRouter from './comment.router.js';

const v1Router = express.Router();

v1Router.use('/auth', authenticationRouter);
v1Router.use('/user', userRouter);
v1Router.use('/document', documentRouter);
v1Router.use('/project', projectRouter);
v1Router.use('/comment', commentRouter);


export default v1Router;
