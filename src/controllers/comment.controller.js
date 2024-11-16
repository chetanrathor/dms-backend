import { CreateCommentService } from "../services/comments/CreateComment.service.js";
import { DeleteCommentService } from "../services/comments/DeletComment.service.js";
import { GetAllCommentsService } from "../services/comments/GetAllComment.service.js";
import { UpdateCommentService } from "../services/comments/updateComment.service.js";
import sendResponse, { handleServiceResponse } from "../utils/sendResponse.helper.js";

export class CommentController {
    static async createComment(req, res, next) {
        try {
            const { documentId, comment, isActive } = req.body
            const { userId } = req.user
            const response = await CreateCommentService.execute({ documentId, comment, isActive, userId }, req.context)
            return handleServiceResponse(res, response)
        } catch (error) {
            return sendResponse(res)
        }
    }
    static async getComments(req, res, next) {
        try {

            const response = await GetAllCommentsService.execute({}, req.context)
            return handleServiceResponse(res, response)
        } catch (error) {
            return sendResponse(res)
        }
    }

    static async updateComment(req, res, next) {
        try {

            const response = await UpdateCommentService.execute({}, req.context)
            return handleServiceResponse(res, response)
        } catch (error) {
            return sendResponse(res)
        }
    }
    static async deleteComment(req, res, next) {
        try {

            const response = await DeleteCommentService.execute({}, req.context)
            return handleServiceResponse(res, response)
        } catch (error) {
            return sendResponse(res)
        }
    }
}