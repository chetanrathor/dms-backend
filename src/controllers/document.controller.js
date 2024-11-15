import { UploadDocumentService } from "../services/document/uploadDocument.service.js";
import { GetUserDetails } from "../services/user/getUserDetail.service.js";
import sendResponse, { handleServiceResponse } from "../utils/sendResponse.helper.js";

export class DocumentController {
    static async uploadDocument(req, res, next) {
        try {
            const file = req.file
            const response = await UploadDocumentService.execute({ file }, req.context)
            return handleServiceResponse(res, response)
        } catch (error) {
            return sendResponse(res)
        }
    }
}