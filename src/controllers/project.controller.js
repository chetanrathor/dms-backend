
import { CreateProjectService } from '../services/project/CreateProjectService.js';
import { DeleteProjectService } from '../services/project/DeleteProjectService.js';
import { GetAllProjectsService } from '../services/project/GetAllProjectsService.js';
import { UpdateProjectService } from '../services/project/UpdateProjectService.js';
import sendResponse, { handleServiceResponse } from '../utils/sendResponse.helper.js';

export class ProjectController {
    /**
     * Retrieve all projects with pagination.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async getAllProjects(req, res) {
        try {
            const { limit, offset } = req.query; // Pagination parameters
            const response = await GetAllProjectsService.execute({ limit, offset }, req.context);
            return handleServiceResponse(res, response);
        } catch (error) {
            console.error('Error in getAllProjects:', error);
            return sendResponse(res, { status: 500, message: 'Internal Server Error' });
        }
    }

    /**
     * Create a new project.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async createProject(req, res) {
        try {
            const { name, isActive } = req.body;
            const response = await CreateProjectService.execute({ name, isActive }, req.context);
            return handleServiceResponse(res, response);
        } catch (error) {
            console.error('Error in createProject:', error);
            return sendResponse(res, { status: 500, message: 'Internal Server Error' });
        }
    }

    /**
     * Update a project by ID.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async updateProject(req, res) {
        try {
            const { projectId,name, isActive } = req.body;
            const response = await UpdateProjectService.execute({ projectId, name, isActive }, req.context);
            return handleServiceResponse(res, response);
        } catch (error) {
            console.error('Error in updateProject:', error);
            return sendResponse(res, { status: 500, message: 'Internal Server Error' });
        }
    }

    /**
     * Delete a project by ID.
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async deleteProject(req, res) {
        try {
            const { projectId } = req.params;
            const response = await DeleteProjectService.execute({ projectId }, req.context);
            return handleServiceResponse(res, response);
        } catch (error) {
            console.error('Error in deleteProject:', error);
            return sendResponse(res, { status: 500, message: 'Internal Server Error' });
        }
    }
}
