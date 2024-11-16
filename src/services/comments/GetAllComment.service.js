export class GetAllCommentsService {
    /**
     * Retrieve all comments with pagination.
     * @param {Object} args - The query parameters.
     * @param {number} args.limit - The maximum number of comments to return.
     * @param {number} args.offset - The number of comments to skip.
     * @param {String} args.documentId - The ID of the document to filter comments (optional).
     * @param {import("../../database/models").Context} context - The database context.
     * @returns {Promise<Object>} - The list of comments or an error message.
     */
    static async execute(args, context) {
        const { limit = 10, offset = 0, documentId } = args; // Default values for limit and offset
        const { Models: { Comment } } = context;

        try {
            // Build query filter (optional filter by documentId)
            const filter = documentId ? { document: documentId } : {};

            // Fetch comments with pagination
            const comments = await Comment.find(filter)
                .skip(Number(offset))
                .limit(Number(limit));

            // Get the total number of comments (considering filters)
            const total = await Comment.countDocuments(filter);

            return {
                status: 200,
                data: {
                    rows: comments,
                    count: total
                },
            };
        } catch (error) {
            console.error('Error retrieving comments:', error);
            return { status: 500, message: 'Internal Server Error' };
        }
    }
}
