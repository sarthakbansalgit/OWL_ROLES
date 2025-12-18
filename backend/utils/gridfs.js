import { MongoClient, GridFSBucket } from 'mongodb';
import mongoose from 'mongoose';
import stream from 'stream';

let gridFSBucket = null;

/**
 * Initialize GridFS bucket - call this after MongoDB connection
 */
export const initializeGridFS = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URI;
        const dbName = 'cubicals'; // Your database name
        
        // Get the native MongoDB connection from mongoose
        if (mongoose.connection.readyState === 1) {
            const db = mongoose.connection.getClient().db(dbName);
            gridFSBucket = new GridFSBucket(db);
            console.log("✓ GridFS bucket initialized");
            return gridFSBucket;
        } else {
            console.error("MongoDB connection not ready");
            return null;
        }
    } catch (error) {
        console.error("GridFS initialization error:", error);
        return null;
    }
};

/**
 * Upload file to GridFS
 * @param {Buffer} fileBuffer - File buffer from multer
 * @param {String} filename - Original filename
 * @param {String} fileType - File type/mimetype
 * @returns {Promise<String>} - File ID in GridFS
 */
export const uploadToGridFS = async (fileBuffer, filename, fileType) => {
    return new Promise((resolve, reject) => {
        if (!gridFSBucket) {
            return reject(new Error("GridFS bucket not initialized"));
        }

        // Create a readable stream from the buffer
        const readStream = new stream.Readable();
        readStream.push(fileBuffer);
        readStream.push(null);

        // Create upload stream with metadata
        const uploadStream = gridFSBucket.openUploadStream(filename, {
            metadata: {
                mimetype: fileType,
                uploadDate: new Date(),
            },
        });

        let fileId = null;

        // Capture the file ID from the uploadStream
        uploadStream.on('finish', () => {
            fileId = uploadStream.id;
            console.log(`✓ File uploaded to GridFS: ${filename} (ID: ${fileId})`);
            resolve(fileId.toString());
        });

        uploadStream.on('error', (error) => {
            console.error("GridFS upload error:", error);
            reject(error);
        });

        // Pipe the buffer to the upload stream
        readStream.pipe(uploadStream);
    });
};

/**
 * Download file from GridFS
 * @param {String} fileId - GridFS file ID
 * @returns {Promise<Buffer>} - File buffer
 */
export const downloadFromGridFS = async (fileId) => {
    return new Promise((resolve, reject) => {
        if (!gridFSBucket) {
            return reject(new Error("GridFS bucket not initialized"));
        }

        const chunks = [];
        const ObjectId = mongoose.Types.ObjectId;
        
        const downloadStream = gridFSBucket.openDownloadStream(new ObjectId(fileId));

        downloadStream.on('data', (chunk) => {
            chunks.push(chunk);
        });

        downloadStream.on('error', (error) => {
            console.error("GridFS download error:", error);
            reject(error);
        });

        downloadStream.on('end', () => {
            const buffer = Buffer.concat(chunks);
            console.log(`✓ File downloaded from GridFS (ID: ${fileId})`);
            resolve(buffer);
        });
    });
};

/**
 * Delete file from GridFS
 * @param {String} fileId - GridFS file ID
 * @returns {Promise<void>}
 */
export const deleteFromGridFS = async (fileId) => {
    return new Promise((resolve, reject) => {
        if (!gridFSBucket) {
            return reject(new Error("GridFS bucket not initialized"));
        }

        const ObjectId = mongoose.Types.ObjectId;
        
        gridFSBucket.delete(new ObjectId(fileId), (error) => {
            if (error) {
                console.error("GridFS delete error:", error);
                reject(error);
            } else {
                console.log(`✓ File deleted from GridFS (ID: ${fileId})`);
                resolve();
            }
        });
    });
};

/**
 * Get file info from GridFS
 * @param {String} fileId - GridFS file ID
 * @returns {Promise<Object>} - File metadata
 */
export const getFileInfo = async (fileId) => {
    return new Promise((resolve, reject) => {
        if (!gridFSBucket) {
            return reject(new Error("GridFS bucket not initialized"));
        }

        const ObjectId = mongoose.Types.ObjectId;
        
        gridFSBucket
            .find({ _id: new ObjectId(fileId) })
            .toArray()
            .then((files) => {
                if (files.length === 0) {
                    reject(new Error("File not found"));
                } else {
                    resolve(files[0]);
                }
            })
            .catch((error) => {
                console.error("GridFS find error:", error);
                reject(error);
            });
    });
};

export const getGridFSBucket = () => gridFSBucket;
