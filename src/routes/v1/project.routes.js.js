import express from 'express';
import authenticateToken from '../../middlewares/authentication.middleware.js';
import { ProjectController } from '../../controllers/project.controller.js';
import { validateCreateProject } from '../../schemas/project/createProject.schema.js';
import { validateUpdateProject } from '../../schemas/project/updateProject.schema.js';
import validationErrorHandler from '../../middlewares/validationHandler.middleware.js';

const projectRouter = express.Router();

projectRouter.route('/')
.get(authenticateToken(['admin','editor','viewer']), validationErrorHandler, ProjectController.getAllProjects)
.post(authenticateToken(['admin']),validateCreateProject , validationErrorHandler, ProjectController.createProject)
.put(authenticateToken(['admin']),validateUpdateProject, ProjectController.updateProject);

projectRouter.route('/:projectId').delete(authenticateToken(['admin']), ProjectController.deleteProject)

export default projectRouter;
