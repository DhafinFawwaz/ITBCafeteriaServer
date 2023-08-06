import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";
import streamifier from "streamifier";
dotenv.config();
          
cloudinary.config({ 
cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

export async function saveImageService(req, callback) {
    const stream = await cloudinary.uploader.upload_stream(
        { 
            public_id: req.query.id
        }, 
        (error, result) => {
            return callback(null, result);
        }
    );
    streamifier.createReadStream(req.file.buffer).pipe(stream);
    return stream;
}