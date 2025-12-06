import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cloudinary.config({
    cloud_name: 'dczj69wck',
    api_key: '337664325489549',
    api_secret: '9KwxeEHZztt9B7h6JAheqXjHUZs',
});

const sampleImagePath = path.join(__dirname, 'test.pdf'); 

cloudinary.uploader.upload(sampleImagePath, {
    folder: 'test_uploads'
}).then(result => {
    console.log('Cloudinary Upload Successful!');
    console.log('🔗 Secure URL:', result.secure_url);
}).catch(err => {
    console.error('Upload Failed:', err);
});
