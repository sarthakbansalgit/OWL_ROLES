import DataUriParser from "datauri/parser.js"

import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    const dataUri = parser.format(extName, file.buffer);
    
    // Return object with content property for compatibility
    return {
        content: dataUri,
        // Also return the string directly if accessed as string
        toString: () => dataUri
    };
}

export default getDataUri;