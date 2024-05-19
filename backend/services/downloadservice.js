const fs = require("fs");
const JSZip = require("jszip");
const path = require("path");
const ftp = require("basic-ftp")
const { FileRepository } = require("../db/models/files");
const { Literals } = require("../literal/literals");

let subscriber = null;
const ftpInfo = {
    host: process.env.FTP_HOST,         // FTP 호스트
    user: process.env.FTP_USER,         // FTP 사용자명
    password: process.env.FTP_PASSWORD  // FTP 비밀번호
};

async function getFilepathsFromBody(body){
    const { objectIDs } = body;
    const files = await FileRepository.findByIds(objectIDs);
    const filePaths = files.map(file => file.f_path);
    return filePaths;
}

// 다운로드 대상 파일 경로의 공통 폴더 루트 반환 함수
function findCommonTopFolder(filePaths) {
    if (filePaths.length === 0) return "";

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

function buildStream(filePaths){
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
    const stream = zip.generateNodeStream({ type: "nodebuffer", streamFiles: true });
    return stream;
}

async function connectToFtp(){
    const client = new ftp.Client();
    await client.access(ftpInfo);
    return client;
}

async function uploadAndTrack(client, stream){
    let lastProgressSentTime = Date.now();
    client.trackProgress(info => {
        const now = Date.now();
        const progress = {
            type: 'ftpUpload',
            filename: Literals.FTP.REMOTE_FILE_NAME,
            transferred: info.bytesOverall,
            total: info.bytesOverall,
            percentage: (info.bytesOverall / info.bytesOverall) * 100
        };
        subscriber.write(`data: ${JSON.stringify(progress)}\n\n`);
        if(now - lastProgressSentTime >= 100){  //0.1초 마다 진행도 발송
            if(subscriber) subscriber.write(`data: ${JSON.stringify(progress)}\n\n`);
            lastProgressSentTime = now;
        }
        if(progress.percentage === 100) {
            subscriber.write(`data: ${JSON.stringify(progress)}\n\n`);
            subscriber.end();
        }
    });
    // FTP 서버로 파일을 업로드
    await client.uploadFrom(stream, Literals.FTP.REMOTE_FILE_NAME);
}

class DownloadService {
    static async DownloadZip(body){
        //const { filePaths } = body;
        const filePaths = await getFilepathsFromBody(body);
        const stream = buildStream(filePaths);
        const client = await connectToFtp();
        await uploadAndTrack(client, stream);
        return ftpInfo;
    }

    static async sendDownloadProgress(req, res) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        subscriber = res;
        req.on('close', () => {
            subscriber = null;
            //req.end();
        });
    }
}

module.exports = { DownloadService };