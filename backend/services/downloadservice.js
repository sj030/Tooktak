const fs = require("fs");
const JSZip = require("jszip");
const path = require("path");
const { FileRepository } = require("../db/models/files");
const { Literals } = require("../literal/literals");
const { v4: uuidv4 } = require('uuid');
const config = require("../config/vars");


// 다운로드 대상 파일 경로의 공통 폴더 루트 반환 함수
async function getFilePathsFromIDs(IDs) {
    const files = await FileRepository.findByIds(IDs);
    const filePaths = files.map(file => file.f_path);
    return filePaths
}

// 다운로드 대상 파일 경로의 공통 폴더 루트 반환 함수
function findCommonTopFolder(filePaths) {
    if (!Array.isArray(filePaths)) {
        throw new Error("The filePaths must be an array.");
    }
    if (filePaths.length === 0) {
        throw new Error("The filePaths array is empty.");
    }
    let commonTopFolder = path.dirname(filePaths[0]);
    for (let i = 1; i < filePaths.length; i++) {
        const currentPath = filePaths[i];
        const currentFolder = path.dirname(currentPath);

        while (!currentFolder.startsWith(commonTopFolder)) {
            commonTopFolder = path.dirname(commonTopFolder);
        }
    }
    return commonTopFolder;
}

async function buildZip(filePaths){
    const zip = new JSZip();
    const commonTopPath = findCommonTopFolder(filePaths);       // 파일 경로 리스트에서 최상위 경로 추출
    const topLevelFolderName = path.basename(commonTopPath);    // 최상위 경로에서 폴더 이름 추출
    const topLevelFolder = zip.folder(topLevelFolderName);      // 공통된 최상위 폴더 생성

    for (const filePath of filePaths) {
        const fileData = fs.readFileSync(filePath);
        const relativePath = path.relative(commonTopPath, filePath);
        const folders = relativePath.split(path.sep);

        let currentZipFolder = topLevelFolder;

        for (let i = 0; i < folders.length - 1; i++) {
            const folderName = folders[i];
            currentZipFolder = currentZipFolder.folder(folderName);
        }
        const fileName = folders[folders.length - 1];
        currentZipFolder.file(fileName, fileData);
    }

    const zipId = uuidv4();
    const outputFilePath = path.join(config.path.zip, `${zipId}.zip`);

    const content = await zip.generateAsync({ type: "nodebuffer" });
    fs.writeFileSync(outputFilePath, content);

    const stats = fs.statSync(outputFilePath);
    const fileSize = stats.size;
    return { zipId, fileSize };
}

class DownloadService {
    static async createZip(req, res){
        //const { filePaths } = req.body;
        const { IDs } = req.body;
        const filePaths = getFilePathsFromIDs(IDs)
        const { zipId, fileSize } = await buildZip(filePaths);
        const sendInfo = { zipId, fileSize }
        return sendInfo;
    }

    // path 관련 및 모듈화에 대해 추가 수정 들어갈 예정
    static async downloadZip(req, res){
        const {zipId} = req.params.zipId;
        const filePath = path.join(config.path.zip, zipId)+".zip";
        console.log("filepath: ",filePath);
        
        if (!fs.existsSync(filePath)) {
            res.status(404).send('File not found');
            return;
        }
        const fileSize = fs.statSync(filePath).size;
        console.log("fileSize: ",fileSize);
        
        const range = req.headers.range;
        res.set({
            'Content-Type': 'application/zip',
            'Content-Length': fileSize,
            'Content-Disposition': `attachment; zipId="${zipId}"`,
            'a': 'public, max-age=31536000'
        });
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            console.log('start: ', start);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            console.log('end: ', end);
            if (start >= fileSize || end > fileSize) {
                res.status(416).header('Content-Range', `bytes */${fileSize}`).send("range is invalid");
                return;
            }
            const chunksize = (end - start) + 1;
            res.writeHead(206, {
                'Content-Type': 'application/zip',
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Content-Length': chunksize,
            });
            const file = fs.createReadStream(filePath, { start, end });
            let downloadedBytes = 0;
            file.on('data', function (chunk) {
                downloadedBytes += chunk.length;
                res.write(chunk);
            });
            file.on('end', function () {
                console.log('Download completed');
                res.end();
            });
            file.on('error', function (err) {
                console.log('Error while downloading file:', err);
                res.status(500).send('Error while downloading file');
            });
        } else {
            const file = fs.createReadStream(filePath);
            file.pipe(res);
        }
    }
}

module.exports = { DownloadService };