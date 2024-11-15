export class UpdateProjectService {
    /**
     * Update a project by ID.
     * @param {Object} args - The fields to update.
     * @param {String} args.projectId - The fields to update.
     * @param {String} args.name - The fields to update.
     * @param {Boolean} args.isActive - The fields to update.
     * @param {import("../../database/models").Context} context - The database context.
     * @returns {Promise<Object>} - The updated project or an error message.
     */
    static async execute(args, context) {
        const { Models: { Project } } = context;

        try {
            const { projectId, name, isActive } = args;
            const project = await Project.findByIdAndUpdate(projectId, { name, isActive }, { new: true });
            if (!project) {
                return { status: 404, message: 'Project not found.' };
            }
            return { status: 200, data: project, message: 'Project updated successfully.' };
        } catch (error) {
            console.error('Error updating project:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
