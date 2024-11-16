import S3Service from "../../libs/awsClient.js";
export class CreateDocumentService {
    /**
     * Create a new project.
     * @param {Object} args - The project details.
     * @param {string} args.name - The name of the project.
     * @param {boolean} args.isActive - The active status of the project.
     * @param {Object} args.file - The active status of the project.
     * @param {import("../../database/models").Context} context - The database context.
     * @returns {Promise<Object>} - The created project or an error message.
     */
    static async execute(args, context) {
        const { Models: { Document, Project } } = context;
        try {
            const { name, isActive, file, projectId,userId } = args

            const project = await Project.findById(projectId)
            if (!project) return {
                status: 404,
                message: 'Project not found.'
            }

            const key = `document/${Date.now()}-${file.originalname}`
            const { Location } = await S3Service.uploadFile(file.buffer, key)
            const document = await Document.create({
                documentUrl:Location,
                name,
                isActive,
                project:project._id,
                user:userId,
            });
            await Project.findByIdAndUpdate(projectId, {
                $push: { documents: document._id },
            });
            return { status: 201, data: document, message: 'Project created successfully.' };
        } catch (error) {
            console.error('Error creating project:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
