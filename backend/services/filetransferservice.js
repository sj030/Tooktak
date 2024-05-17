const multer = require("multer");
const fs = require("fs");
const JSZip = require("jszip");
const path = require("path");
const ftp = require("basic-ftp")

const allowedFileTypes = ["wav"]; // 허용된 파일 확장자

/**
 * 파일 전송 서비스 클래스
 */
class MetaTransferService {
    /**
     * xlsx 파일만 업로드 가능한 multer 객체 생성
     * @returns {object} multer 객체
     */
    static initMulter() {
        const uploadDir = "./uploads";
        // uploads 폴더가 없다면 폴더 생성
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        const storage = multer.diskStorage({
            destination: (req, file, callback) => { // file 저장 경로 설정
                callback(null, "uploads/");
            },
            filename: (req, file, callback) => { // file 저장 이름 설정 (추후 UUID로 설정 예정)
                callback(null, file.originalname);
            },
        });
        const fileFilter = (req, file, callback) => {
            const fileExtension = file.originalname.split(".").reverse()[0]; // 파일 확장자 추출
            if (fileExtension in allowedFileTypes) { // 허용된 파일 확장자인지 확인
                callback(null, true);
            }
            else {
                req.fileValidationError = "Only wav files are allowed!";
                callback(null, false);
            }
        }
        return multer({ // multer 객체 생성
            storage: storage,
            fileFilter: fileFilter,
        });
    }
}

class DataTransferService {
    static async downloadZip(body) {
        const { objectIDs, downloadFileRoot } = body; // 요청에서 ObjectID 리스트 가져오기
        const files = await FileModel.find({ _id: { $in: objectIDs } });
        const filePaths = files.map(file => file.f_root);
        //const { filePaths, downloadFileRoot } = body;           // 파일 루트 리스트 받았을 때 사용했었음

        const zip = new JSZip();
        const commonTopPath = findCommonTopFolder(filePaths);       // 파일 경로 리스트에서 최상위 경로 추출
        const topLevelFolderName = path.basename(commonTopPath);    // 최상위 경로에서 폴더 이름 추출

        const topLevelFolder = zip.folder(topLevelFolderName);      // 공통된 최상위 폴더 생성

        // 파일 경로를 기반으로 동적으로 폴더 구조를 만들고 파일을 해당 구조에 추가
        for (const filePath of filePaths) {
            const fileData = fs.readFileSync(filePath);
            const relativePath = path.relative(commonTopPath, filePath); // 파일 경로에서 상대 경로 추출
            const folders = relativePath.split(path.sep); // 상대 경로의 폴더를 추출하고 분할합니다. 

            let currentZipFolder = topLevelFolder; // 최상위 폴더 설정

            // 폴더 구조를 따라가면서 Zip 폴더 제작
            for (let i = 0; i < folders.length - 1; i++) {
                const folderName = folders[i];
                currentZipFolder = currentZipFolder.folder(folderName);
            }

            const fileName = folders[folders.length - 1]; // 파일명을 추출합니다.
            currentZipFolder.file(fileName, fileData); // 파일을 Zip에 추가합니다.
        }

        const stream = await zip.generateNodeStream({ type: "nodebuffer", streamFiles: true });

        const client = new ftp.Client();
        await client.access({               // 서버에 로컬로 지정한 user와 password에 맞춰줘야 함
            host: process.env.FTP_HOST,         // FTP 호스트
            user: process.env.FTP_USER,         // FTP 사용자명
            password: process.env.FTP_PASSWORD  // FTP 비밀번호
        });

        const remoteFileName = "output.zip";    // FTP 서버에 업로드되는 이름

        // FTP 서버로 파일을 업로드
        await client.uploadFrom(stream, remoteFileName);

        // FTP 서버에서 클라이언트로 파일 다운로드
        await client.downloadTo(downloadFileRoot, remoteFileName);  // JSON에 있던 파일 경로 사용

        //console.log("파일을 성공적으로 다운로드했습니다.");
    }
}

function findCommonTopFolder(filePaths) {
    // 경로 리스트가 비어있으면 빈 문자열 반환
    if (filePaths.length === 0) return "";

    // 경로 리스트에서 첫 번째 경로를 기준으로 설정
    let commonTopFolder = path.dirname(filePaths[0]);

    // 나머지 경로들과 공통된 최상위 경로를 찾음
    for (let i = 1; i < filePaths.length; i++) {
        const currentPath = filePaths[i];
        const currentFolder = path.dirname(currentPath);

        // 현재 경로와 공통된 최상위 경로를 비교하여 더 작은 범위로 설정
        while (!currentFolder.startsWith(commonTopFolder)) {
            commonTopFolder = path.dirname(commonTopFolder);
        }
    }
    //console.log(commonTopFolder);
    return commonTopFolder;
}

module.exports = { MetaTransferService, DataTransferService };