import dotenv from "dotenv";
dotenv.config();

export const config = {
    db:{
        URI:process.env.DB_URI
    },
    jwt:{
        secret: process.env.JWT_SECRET
    },
    email:{
        user_email: process.env.EMAIL_USER,
        user_pass: process.env.EMAIL_PASS
    },
    cloudinary:{
        cloudinary_name:process.env.CLOUDINARY_CLOUD_NAME,
        cloudinary_api_key:process.env.CLOUDINARY_API_KEY,
        cloudinary_api_secret:process.env.CLOUDINARY_API_SECRET
    }
}