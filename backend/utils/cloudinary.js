import cloudinaryPkg from 'cloudinary';  // Import the entire module
import dotenv from 'dotenv';

dotenv.config();

const { v2: cloudinary } = cloudinaryPkg;  // Access v2 from the default export

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

export default cloudinary;
