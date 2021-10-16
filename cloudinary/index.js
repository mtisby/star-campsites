import cloudinary from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    folder: 'CampsiteRater',
    allowedFormats: ['jpeg', 'png', 'jpg']
});

export {cloudinary, storage}