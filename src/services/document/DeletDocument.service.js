import S3Service from "../../libs/awsClient.js";

export class DeleteDocumentService {
    /**
     * Delete a project by ID.
     * @param {Object} args - The ID of the project to delete.
     * @param {String} args.projectId - The ID of the project to delete.
     * @param {import("../../database/models").Context} context - The database context.
     * @returns {Promise<Object>} - Success or error message.
     */
    static async execute(args, context) {
        const { Models: { Document } } = context;
        const { documentId } = args
        try {
            /**
             * @type {import("../../database/models/Document").Document}
             */
            const document = await Document.findByIdAndDelete(documentId);
            if (!document) {
                return { status: 404, message: 'Project not found.' };
            }
            await S3Service.removeFile(document.documentUrl)
            return { status: 200, message: 'Project deleted successfully.' };
        } catch (error) {
            console.error('Error deleting project:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
