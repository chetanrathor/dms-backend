export class DeleteProjectService {
    /**
     * Delete a project by ID.
     * @param {Object} args - The ID of the project to delete.
     * @param {String} args.projectId - The ID of the project to delete.
     * @param {import("../../database/models").Context} context - The database context.
     * @returns {Promise<Object>} - Success or error message.
     */
    static async execute(args, context) {
        const { Models: { Project } } = context;
        const { projectId} = args
        try {
            const project = await Project.findByIdAndDelete(projectId);
            if (!project) {
                return { status: 404, message: 'Project not found.' };
            }
            return { status: 200, message: 'Project deleted successfully.' };
        } catch (error) {
            console.error('Error deleting project:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
