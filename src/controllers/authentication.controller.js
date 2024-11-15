import { RegisterUserService } from '../services/authentication/register.service.js'; // Import the register service
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendResponse, { handleServiceResponse } from '../utils/sendResponse.helper.js';

export class AuthenticationController {
    /**
     * Registers a new user
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async register(req, res) {
        try {
            const { name, email, password } = req.body;
            const response = await RegisterUserService.execute({ name, email, password }, req.context);
            return handleServiceResponse(res, response)
        } catch (error) {
            return sendResponse(res)
        }

    }

    /**
     * Logs in a user
     * @param {Object} req - Express request object
     * @param {Object} res - Express response object
     */
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            // Find the user by email
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            // Compare the provided password with the stored hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            // Generate JWT token for the user
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Return the token and user data (without password)
            const userResponse = user.toObject();
            delete userResponse.password;

            return res.status(200).json({
                message: 'Login successful',
                data: { user: userResponse, token },
            });
        } catch (error) {
            return res.status(500).json({
                message: `Error during login: ${error.message}`,
            });
        }
    }
}
