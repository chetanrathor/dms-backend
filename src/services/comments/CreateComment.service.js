import S3Service from "../../libs/awsClient.js";
import { CommentEmitter } from "../../socket-resource/emitters/comment.emitter.js";
export class CreateCommentService {
    /**
     * Create a new project.
     * @param {Object} args - The project details.
     * @param {string} args.name - The name of the project.
     * @param {boolean} args.isActive - The active status of the project.
     * @param {Object} args.file - The active status of the project.
     * @param {import("../../database/models/index.js").Context} context - The database context.
     * @returns {Promise<Object>} - The created project or an error message.
     */
    static async execute(args, context) {
        const { Models: { Document, Comment } } = context;
        try {
            const { comment, isActive, documentId, userId } = args

            const document = await Document.findById(documentId)
            if (!document) return {
                status: 404,
                message: 'Document not found.'
            }

            const newComment = await Comment.create({
                comment,
                document: document._id,
                isActive,
                user: userId
            });
            await Document.findByIdAndUpdate(document, {
                $push: { comments: document._id },
            });
            CommentEmitter.broadcastComment(newComment)
            return { status: 201, data: newComment, message: 'Comment Created Successfully.' };
        } catch (error) {
            console.error('Error creating project:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
