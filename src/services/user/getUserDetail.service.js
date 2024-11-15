export class GetUserDetails {
    /**
     * 
     * @param {*} args 
     * @param {import("../../database/models").Context} context 
     * @returns 
     */
    static async execute(args, context) {
        const { userId } = args;
        const { Models: { User } } = context;

        try {
            // Find the user by their ID
            const user = await User.findById(userId);
            if (!user) {
                return { status: 404, message: 'User not found' };
            }

            // Return the user's details
            return { status: 200, data: { user } };
        } catch (error) {
            // Handle any errors that occur during the execution
            return { status: 500, message: 'Internal server error' };
        }
    }
}