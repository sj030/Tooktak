const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { FileTransferService } = require("../services/filetransferservice");
const { PatientService } = require("../services/patientservice");
const { FileService } = require("../services/fileservice");

// Multer 객체 생성 및 파일 업로드 미들웨어 설정 (TEST 용도입니다)
const upload = FileTransferService.initMulter();
const uploadMiddleware = upload.single("filekey"); // filekey는 클라이언트에서 전송한 파일의 키 값, single()은 하나의 파일만 업로드할 때 사용 (array()는 여러 파일 업로드)

router.post("/upload", uploadMiddleware, (req, res) => {
    console.log(req.file);
    res.json({ header: req.file });
});

router.get("/download", (req, res) => {

});

// 중복 필터 검색 용 API(기본형, 병원 추가예정)
router.post('/search', FileService.searchFiles);

// 임시 DB 채우기 용 API(추후 삭제예정)
router.post('/addPatients', PatientService.addPatient);
router.post('/addFiles', FileService.addFile);

// Get the header of the CSV file (TEST)
router.get("/get-csv-header/:hospital", (req, res) => {
    var FILE_NAME = `${req.params.hospital}.csv`;
    var filePath = path.join(__dirname, "..", "public", "csv", FILE_NAME);
    var file = fs.readFileSync(filePath, "utf-8");
    var lines = file.split("\r\n" || "\n" || "\r");
    var header = lines[0].split(", ").map((item) => item.replace(/"/g, ""));
    res.json({ header: header });
});

module.exports = router;