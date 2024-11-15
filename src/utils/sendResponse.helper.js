


/**
 * Utility function to handle API responses based on the response status
 * @param {Object} res - The Express response object
 * @param {Object} response - The response object returned from the service
 */
export const handleServiceResponse = (res, response) => {
    if ([200,201].includes(response.status) ) {
        return res.status(201).json({
            message: 'User registered successfully',
            data: response.data,
        });
    }

    return sendResponse(res,response.status,response.message)
};

/**
 * Utility function to handle API responses
 * @param {Object} res - The Express response object
 * @param {number} statusCode - The status code to return
 * @param {string} message - The message to send in the response
 * @param {Object} [data] - The data to include in the response (optional)
 */
const sendResponse = (res, statusCode=501, message='Internal Server Error', data = null) => {
    const response = {
        message: message,
        ...(data && { data })  // Only add `data` if it's provided
    };
    
    return res.status(statusCode).json(response);
};

export default sendResponse;
