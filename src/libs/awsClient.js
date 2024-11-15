import AWS from 'aws-sdk';
import config from '../config.js';
class S3Service {
  static s3 = new AWS.S3({
    endpoint: config.aws.host, // MinIO URL
    accessKeyId: config.aws.accessKeyId, // MinIO access key
    secretAccessKey: config.aws.secretAccessKey, // MinIO secret key
    s3ForcePathStyle: true, // Required for MinIO compatibility
  });
  
  static bucket = config.aws.bucket; // Default bucket name
  
  /**
   * Upload a file to the configured S3 bucket
  console.log('JSON.stringify() :>> ', JSON.stringify());
   * @param {Buffer | String | Stream} fileContent - File content to upload
   * @param {String} key - Key (path/filename) for the file in the bucket
   * @returns {Promise} - Resolves with the upload response
   */
  static async uploadFile(fileContent, key) {
  const params = {
    Bucket: this.bucket,
    Key: key,
    Body: fileContent,
  };

  try {
    const data = await this.s3.upload(params).promise();
    console.log('Upload successful:', data.Location);
    return data;
  } catch (error) {
    console.error('Error uploading:', error);
    throw error;
  }
}
}

export default S3Service;
