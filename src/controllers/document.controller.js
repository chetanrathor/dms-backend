import { CreateDocumentService } from "../services/document/CreateDocument.service.js";
import { DeleteDocumentService } from "../services/document/DeletDocument.service.js";
import { GetAllDocumentsService } from "../services/document/GetAllDocuments.service.js";
import { UpdateDocumentService } from "../services/document/updateDocument.service.js";
import { GetUserDetails } from "../services/user/getUserDetail.service.js";
import sendResponse, { handleServiceResponse } from "../utils/sendResponse.helper.js";

export class DocumentController {
    static async uploadDocument(req, res, next) {
        try {
            const file = req.file
            const { projectId, name } = req.body
            const  isActive  = req.body.isActive  === 'true'? true : false
            const {userId} = req.user
            const response = await CreateDocumentService.execute({ file, projectId, name,userId,isActive }, req.context)
            return handleServiceResponse(res, response)
        } catch (error) {
            return sendResponse(res)
        }
    }
    static async getDocuments(req, res, next) {
        try {
          
            const response = await GetAllDocumentsService.execute({  }, req.context)
            return handleServiceResponse(res, response)
        } catch (error) {
            return sendResponse(res)
        }
    }

    static async updateDocument(req, res, next) {
        try {
            const file = req.file
            const { projectId, name } = req.body
            const  isActive  = req.body.isActive  === 'true'? true : false
            const {userId} = req.user
            const response = await UpdateDocumentService.execute({ file, projectId, name,userId,isActive }, req.context)
            return handleServiceResponse(res, response)
        } catch (error) {
            return sendResponse(res)
        }
    }

    static async deleteDocument(req, res, next) {
        try {
          
            const response = await DeleteDocumentService.execute({  }, req.context)
            return handleServiceResponse(res, response)
        } catch (error) {
            return sendResponse(res)
        }
    }
}