import S3Service from "../../libs/awsClient.js";

export class UpdateDocumentService {
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
        const { Models: { Project, Document } } = context;

        try {
            const { documentId, name, isActive, file, projectId } = args;

            /**
             * @type {import("../../database/models/Document").Document}
             */
            const existingDocument = await Document.findById(documentId)

            if (!existingDocument) {
                return {
                    status: 404,
                    
                    message: "Document not found"
                }
            }

            const project = await Project.findById(projectId)
            if (!project) {
                return { status: 404, message: 'Project not found.' };
            }

            if (existingDocument.documentUrl) {
                await S3Service.removeFile(existingDocument.documentUrl)


            }
            const key = `document/${Date.now()}-${file.originalname}`
            const { Location } = await S3Service.uploadFile(file.buffer, key)

            const document = await Document.updateOne({ _id: documentId }, { name, isActive, documentUrl: Location }, { new: true });

            return { status: 200, data: document, message: 'Project updated successfully.' };
        } catch (error) {
            console.error('Error updating project:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
