import S3Service from "../../libs/awsClient.js";

export class UploadDocumentService {
    static async execute(args, context) {
        try {
            const { file } = args;
            const { Models: { Document } } = context;
            const key  = `document/${Date.now()}-${file.originalname}`
            const data = await S3Service.uploadFile(file.buffer, key)
            return {
                status: 200,
                message: 'File uploaded successfully.',
                data: data,
            }
            // // Create a new document instance
            // const document = new Document({
            //     title: file.originalname,
            //     fileName: file.filename,
            //     fileUrl: `${config.aws.s3Url}/${file.filename}`,
            //     fileSize: file.size,
            //     userId: context.user.userId,
            // });

            // // Save the document to the database
            // await document.save();

            return {
                status: 200,
                message: 'Document uploaded successfully.',
                data: document,
            };
        } catch (error) {
            return {
                status: 500,
                message: 'Internal Server Error'
            }
        }
    }
}