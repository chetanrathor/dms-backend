export class DeleteCommentService {
    /**
     * Delete a comment by ID.
     * @param {Object} args - The arguments for deletion.
     * @param {String} args.commentId - The ID of the comment to delete.
     * @param {import("../../database/models").Context} context - The database context.
     * @returns {Promise<Object>} - Success or error message.
     */
    static async execute(args, context) {
        const { Models: { Comment, Document } } = context;
        const { commentId } = args;

        try {
            // Find the comment by ID
            const comment = await Comment.findById(commentId);
            if (!comment) {
                return { status: 404, message: "Comment not found." };
            }

            // Remove the comment reference from the associated document
            await Document.updateOne(
                { _id: comment.document },
                { $pull: { comments: comment._id } }
            );

            // Delete the comment
            await Comment.findByIdAndDelete(commentId);

            return { status: 200, message: "Comment deleted successfully." };
        } catch (error) {
            console.error("Error deleting comment:", error);
            return { status: 500, message: "Internal Server Error" };
        }
    }
}
