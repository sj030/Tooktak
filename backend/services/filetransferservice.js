const multer = require('multer');

/**
 * 파일 전송 서비스 클래스
 */
class FileTransferService {
    /**
     * csv, xlsx 파일만 업로드 가능한 multer 객체 생성
     * @returns {object} multer 객체
     */
    static initMulter() {
        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, 'uploads/');
            },
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            },
        });
        const fileFilter = (req, file, callback) => {
            const fileExtension = file.originalname.split('.').reverse()[0];
            if (fileExtension === "csv" || fileExtension === "xlsx") { // CSV 파일 혹은 엑셀 파일만 허용 .. 추가 가능
                callback(null, true);
            }
            else {
                req.fileValidationError = "Only Excel files are allowed!";
                callback(null, false);
            }
        }
        return multer({
            storage: storage,
            fileFilter: fileFilter,
        });
    }
}

module.exports = { FileTransferService };