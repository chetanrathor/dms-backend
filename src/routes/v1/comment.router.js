import express from 'express';
import authenticateToken from '../../middlewares/authentication.middleware.js';
import { CommentController } from '../../controllers/comment.controller.js';

const commentRouter = express.Router();

commentRouter.post('/',  authenticateToken(['admin','editor','viewer']), CommentController.createComment);
commentRouter.get('/',  authenticateToken(['admin','editor','viewer']), CommentController.getComments);
commentRouter.put('/',  authenticateToken(['admin','editor','viewer']), CommentController.updateComment);
commentRouter.put('/:commentId',  authenticateToken(['admin','editor','viewer']), CommentController.deleteComment);


export default commentRouter;
