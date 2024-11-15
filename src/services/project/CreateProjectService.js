export class CreateProjectService {
    /**
     * Create a new project.
     * @param {Object} args - The project details.
     * @param {string} args.name - The name of the project.
     * @param {boolean} args.isActive - The active status of the project.
     * @param {import("../../database/models").Context} context - The database context.
     * @returns {Promise<Object>} - The created project or an error message.
     */
    static async execute(args, context) {
        const { Models: { Project } } = context;
        try {
            const { name, isActive } = args
            const project = await Project.create({
                name,
                isActive
            });
            return { status: 201, data: project, message: 'Project created successfully.' };
        } catch (error) {
            console.error('Error creating project:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
