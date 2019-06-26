const cloudinary = require('cloudinary').v2;
import * as dotenv from 'dotenv';
import { Promise } from 'bluebird';

const env = dotenv.config();

if (env.error) throw env.error;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = (file: string, code: number) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { folder: 'siqr', resource_type: 'image', public_id: code },
      (error: any, result: any) => {
        if (error) reject(error);
        resolve(result);
      }
    );
  });
