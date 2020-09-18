import 'dotenv/config';
// Streamifier package has no types.
import streamifier from 'streamifier';
import cloudinary from 'cloudinary';
import { config } from '../config';

cloudinary.v2.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryKey,
  api_secret: config.cloudinarySecret,
});

export const uploadFromBuffer = (file: Express.Multer.File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const cld_upload_stream = cloudinary.v2.uploader.upload_stream(
      {},
      (error: any, result: any) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
  });
};
