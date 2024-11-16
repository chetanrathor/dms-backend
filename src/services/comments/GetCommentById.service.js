export class GetCommentByIdService {
    /**
     * Retrieve a comment by ID.
     * @param {string} commentId - The ID of the comment to retrieve.
     * @param {import("../../database/models").Context} context - The database context.
     * @returns {Promise<Object>} - The comment or an error message.
     */
    static async execute(commentId, context) {
        const { Models: { Comment } } = context;

        try {
            // Find the comment by ID
            const comment = await Comment.findById(commentId)

            if (!comment) {
                return { status: 404, message: 'Comment not found.' };
            }

            return { status: 200, data: comment };
        } catch (error) {
            console.error('Error retrieving comment:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
