import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();
          
cloudinary.config({ 
cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function saveImageService(req, callback) {
    cloudinary.uploader.upload(
        req.file.path,
        { 
            public_id: req.body.id
        }, 
        (error, result) => {
            return callback(null, result);
        }
    );
}