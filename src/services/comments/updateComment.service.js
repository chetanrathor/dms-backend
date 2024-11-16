
export class UpdateCommentService {
    /**
     * Update a comment by ID.
     * @param {Object} args - The fields to update.
     * @param {String} args.commentId - The ID of the comment to update.
     * @param {String} args.comment - The updated comment text.
     * @param {Boolean} args.isActive - The updated active status.
     * @param {import("../../database/models").Context} context - The database context.
     * @returns {Promise<Object>} - The updated comment or an error message.
     */
    static async execute(args, context) {
        const { Models: { Comment, Document } } = context;

        try {
            const { commentId, comment, isActive, documentId } = args;

            /**
             * Check if the comment exists.
             * @type {import("../../database/models/Comment").Comment}
             */
            const existingComment = await Comment.findById(commentId);

            if (!existingComment) {
                return {
                    status: 404,
                    message: "Comment not found",
                };
            }

            /**
             * Check if the associated document exists.
             */
            const document = await Document.findById(documentId);
            if (!document) {
                return { status: 404, message: "Associated document not found." };
            }

            // Update the comment
            const updatedComment = await Comment.findByIdAndUpdate(
                commentId,
                { comment, isActive },
                { new: true } // Return the updated document
            );

            return { status: 200, data: updatedComment, message: "Comment updated successfully." };
        } catch (error) {
            console.error("Error updating comment:", error);
            return { status: 500, message: "Internal Server Error" };
        }
    }
}
