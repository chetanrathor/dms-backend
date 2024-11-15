import { RegisterUserService } from '../services/authentication/register.service.js'; // Import the register service
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendResponse, { handleServiceResponse } from '../utils/sendResponse.helper.js';
import { LoginService } from '../services/authentication/login.service.js';

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
        try {
            const {  email, password } = req.body;
            const response = await LoginService.execute({ email, password }, req.context);
            return handleServiceResponse(res, response)
        } catch (error) {
            console.log('error :>> ', error);
            return sendResponse(res)
        }
    }
}
