export class GetAllProjectsService {
    /**
     * Retrieve all projects with pagination.
     * @param {Object} args - The query parameters.
     * @param {number} args.limit - The maximum number of projects to return.
     * @param {number} args.offset - The number of projects to skip.
     * @param {import("../../database/models").Context} context - The database context.
     * @returns {Promise<Object>} - The list of projects or an error message.
     */
    static async execute(args, context) {
        const { limit = 10, offset = 0 } = args; // Default values for limit and offset
        const { Models: { Project } } = context;

        try {
            const projects = await Project.find()
                .populate('documents')
                .skip(Number(offset))
                .limit(Number(limit));

            const total = await Project.countDocuments(); // Get the total number of projects

            return {
                status: 200,
                data: {
                    rows: projects,
                    count: total
                },
            };
        } catch (error) {
            console.error('Error retrieving projects:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
