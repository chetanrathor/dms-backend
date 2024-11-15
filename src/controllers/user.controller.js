import { GetUserDetails } from "../services/user/getUserDetail.service.js";
import sendResponse, { handleServiceResponse } from "../utils/sendResponse.helper.js";

export class UserController {
    static async getUserDetails(req, res, next) {
        try {
            const userId = req.user.userId;
            const response = await GetUserDetails.execute({ userId }, req.context)
            return handleServiceResponse(res, response)
        } catch (error) {
            return sendResponse(res)
        }
    }
}