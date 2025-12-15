import multer from "multer";

const storage = multer.memoryStorage(); 
const upload = multer({ storage });

export const singleUpload = upload.single("file");
export const multiUpload = upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'file', maxCount: 1 },
    { name: 'demoVideo', maxCount: 1 }
]); 
