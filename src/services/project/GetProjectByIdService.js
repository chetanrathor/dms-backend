export class GetProjectByIdService {
    /**
     * Retrieve a project by ID.
     * @param {string} projectId - The ID of the project to retrieve.
     * @param {import("../../database/models").Context} context - The database context.
     * @returns {Promise<Object>} - The project or an error message.
     */
    static async execute(projectId, context) {
        const { Models: { Project } } = context;
        try {
            const project = await Project.findById(projectId).populate('documents');
            if (!project) {
                return { status: 404, message: 'Project not found.' };
            }
            return { status: 200, data: project };
        } catch (error) {
            console.error('Error retrieving project:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
