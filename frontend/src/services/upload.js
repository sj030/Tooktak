import axiosInstance from "./config/axiosInstance";

/**
 * Uploads a file with additional attributes as metadata.
 * @param {File} file - The file to upload.
 * @param {Object} attributes - The metadata attributes for the file.
 */
export  function upload(file, attributes) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("attributes", JSON.stringify(attributes));  // Append attributes as a JSON string
    return axiosInstance.post("file/upload", formData, {
        headers: {
            'Content-Type': 'multipart/form-data' // This is necessary for file uploads
        }
    });
}
