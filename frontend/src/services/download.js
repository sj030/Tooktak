import axiosInstance from "./config/axiosInstance";

const CHUNK_SIZE = 512 * 1024; // 512MB 단위 청크 크기
export function getFileZip(filePaths) {
    return axiosInstance.post('file/zip', filePaths)
}

export async function getDownload(writable, zipId, fileSize, setProgress) {
    let downloadedSize = 0;
    if (fileSize <= CHUNK_SIZE) {
        const response = await axiosInstance.get('file/download/' + zipId, {responseType: 'blob'});
        await writable.write(response.data);
        // await writable.write(response.data);
        setProgress(100);
    } else {
        while (downloadedSize < fileSize) {
            const start = downloadedSize;
            const end = Math.min(start + CHUNK_SIZE - 1, fileSize - 1);
            const config = {
                headers: {
                    'Range': `bytes=${start}-${end}`
                },
                responseType: 'blob' // Ensure that the response is treated as a blob
            };
            const response = await axiosInstance.get('file/download/' + zipId, config);
            await writable.write(response.data);
            downloadedSize += response.data.size;
            setProgress((downloadedSize / fileSize) * 100);
        }
    }
}