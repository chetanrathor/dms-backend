import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Importing jwt to generate the access token
import User from '../../database/models/User.js';
import { ROLES } from '../../libs/constant.js';
import mongoose from 'mongoose';
import JwtService from '../../libs/jwt.service.js';

export class RegisterUserService {

    /**
     * Registers a new user with given details
     * @param {Object} args - The user details
     * @param {string} args.name - User's name
     * @param {string} args.email - User's email
     * @param {string} args.password - User's plain-text password
     * @param {import('../../database/models').Context} context - Context object (for additional info, if needed)
     * @returns {Promise<Object>} - The created user or an error response with status code
     */
    static async execute(args, context) {
        const { name, email, password } = args;
        const { Models: { Role } } = context;

        try {
            // Check if a user with this email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return { status: 409, message: 'User already exists with this email' };
            }

            /**
             * @type {import('../../database/models/Role').Role}
             */
            const viewerRole = await Role.findOne({ type: ROLES.VIEWER });
            if (!viewerRole) {
                return { status: 404, message: 'Viewer role not found' };
            }

            // Generate a new ObjectId for the user (optional, MongoDB handles _id automatically)
            const userId = new mongoose.Types.ObjectId(); // MongoDB will auto-generate ObjectId for _id, but we generate it here manually.

            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user instance
            const newUser = new User({
                _id: userId,
                name,
                email,
                password: hashedPassword,
                role: viewerRole._id, // Assign the viewer role to the user
            });

            // Save the user to the database
            await newUser.save();

            // Generate JWT token for the newly created user
            const token = JwtService.generateToken({ userId: newUser._id },'1d');

            // Save the token in the user model (optional, you can store tokens in the database if needed)
            newUser.token = token;
            await newUser.save();

            // Optionally, remove the password and token field from the returned user object
            const userResponse = newUser.toObject();
            delete userResponse.password;
            delete userResponse.token;

            // Return success with the created user and access token
            return { status: 201, data: { user: userResponse, token } };

        } catch (error) {
            // Error handling based on error type
            if (error.name === 'ValidationError') {
                return { status: 400, message: 'Invalid data provided' };
            }
            return { status: 500, message: `Error registering user: ${error.message}` };
        }
    }
}
