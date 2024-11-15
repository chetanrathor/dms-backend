import bcrypt from 'bcryptjs'
import JwtService from '../../libs/jwt.service.js';
export class LoginService {


    /**
     * 
     * @param {*} args 
     * @param {import("../../database/models").Context} context 
     * @returns 
     */
    static async execute(args, context) {
        const { email, password } = args
        const { Models: { User } } = context
        try {
            // Find the user by email
            const user = await User.findOne({ email }).populate('role');
            if (!user) {
                return { status: 404, message: 'User not found.' };
            }

            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return { status: 404, message: 'Incorrect Password' };
            }
            // Generate JWT token for the user
            const token = JwtService.generateUserToken(user)
            // Return the token and user data (without password)
            const userResponse = user.toObject();
            delete userResponse.password;

            return {
                status: 200,
                data: { user: userResponse, token },
            }
        } catch (error) {
            console.log('error :>> ', error);
            return {
                status: 501,
                data: null,
                message: 'Internal Server Error',
            }
        }
    }
}