const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { MetaTransferService, DataTransferService } = require("../services/filetransferservice");
const { PatientService } = require("../services/patientservice");
const { FileService } = require("../services/fileservice");
const { ServiceAttrService } = require("../services/serviceattrservice");

// Multer 객체 생성 및 파일 업로드 미들웨어 설정 (TEST 용도입니다)
const upload = MetaTransferService.initMulter();
const uploadMiddleware = upload.single("filekey"); // filekey는 클라이언트에서 전송한 파일의 키 값, single()은 하나의 파일만 업로드할 때 사용 (array()는 여러 파일 업로드)

router.post("/upload/meta", async (req, res) => {     
    const { name, attributes } = req.body;
    // new collection 생성
    try {
        const document = await ServiceAttrService.addServices({ name, attributes });
        res.status(200).send("meta upload");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post("/upload/data", uploadMiddleware, (req, res) => {
    // .wav 파일 받음 -> uploads 파일에 올려둠 (Middle ware)
    try {
        const headerData = req.headers['custom-header'];;

        if (!req.body) {
            return res.status(400).json({ success: false });
        }

        console.log('File Info:', fileInfo);
        console.log('Header Data:', headerData);

        // try{
        //     // db 객체 불러오기 find one
        //     res.status(200).json({ success: true });
        // }catch(err){
        //     res.status(400).json({ sucess : false });
        // }

    } catch (error) {
        console.error('Error processing upload:', error);
        res.status(400).send('Internal Server Error');
    }

});

// ZIP 파일 생성 및 다운로드, 
router.post("/download", async (req, res) => {
    try {
        await DataTransferService.downloadZip(req.body)
        res.status(200).send("Zip file created and sended successfully")
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 중복 필터 검색 용 API(기본형, 병원 추가예정)
router.post("/search", async (req, res) => {
    try {
        const result = await FileService.getAllMetaDataByQuery(await ServiceAttrService.getServiceByName(req.body.name), req.body.attributes);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 임시 DB 채우기 용 API(추후 삭제예정)
router.post("/addPatients", async (req, res) => {
    try {
        await PatientService.addPatients(req.body);
        res.status(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.post("/addFiles", async (req, res) => {
    try {
        await FileService.addFiles(req.body);
        res.status(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

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