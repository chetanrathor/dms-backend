export class GetDocumentByIdService {
    /**
     * Retrieve a project by ID.
     * @param {string} projectId - The ID of the project to retrieve.
     * @param {import("../../database/models").Context} context - The database context.
     * @returns {Promise<Object>} - The project or an error message.
     */
    static async execute(projectId, context) {
        const { Models: { Document } } = context;
        try {
            const document = await Document.findById(projectId)
            if (!document) {
                return { status: 404, message: 'Project not found.' };
            }
            return { status: 200, data: document };
        } catch (error) {
            console.error('Error retrieving project:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
