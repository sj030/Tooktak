const Patients = require("../db/schemas/patients.js");
const Files = require("../db/schemas/files.js");


const searchFiles = async (req, res) => {
    try {
        let { p_no, startAge, endAge, p_name, p_gender, startDate, endDate, f_name, f_extension } = req.body;
        let validFiles = null;
  
        // 검색 쿼리를 위한 조건 객체 생성
        let searchQuery = {};
  
        if (p_no) {                                 // 환자 번호 검색 (동치)
            searchQuery.p_no = { "$eq": p_no };
        }
        if (startAge && endAge) {                   // 나이 구간 검색 (범위)
            searchQuery.p_age = { "$gte": startAge, "$lte": endAge };
        }
        if (p_name) {                               // 환자명 검색 (문자열 포함 여부)
            searchQuery.p_name = { "$regex": p_name };
        }
        if (p_gender) {                             // 환자 성별 검색 (동치)
            searchQuery.p_gender = { "$eq": p_gender };
        }
  
        if (startDate && endDate) {                 // 날짜 구간 검색 (범위)
            searchQuery.testDate = { "$gte": startDate, "$lte": endDate };
        }
        if (f_name) {                               // 파일명 검색 (문자열 포함 여부)
            searchQuery.f_name = { "$regex": f_name };
        }
        if (f_extension) {                          // 파일확장자 검색, JSON Array 형식으로 받은 값에 포함되는지 판단
            searchQuery.f_extension = { "$in": f_extension };
        }
  
        // JOIN 대신 lookup을 통해 환자 컬렉션과 파일 컬렉션을 연관시켜 검색 진행
        validFiles = await Files.aggregate([
            {
                $lookup:{
                    from : 'patients',
                    localField : 'p_no',
                    foreignField : 'p_no',
                    as: 'patient'
                }
            },
            {
                $unwind: '$patient'                 // 배열 형태로 묶인 상태 해제
            },
            {
                $match: searchQuery                 // 생성한 검색 쿼리 적용
            }
        ]);

        if (!validFiles || validFiles.length === 0) {
          res.status(400).json({ message: "일치하는 파일이 없습니다." });
        } else {
          res.status(200).json(validFiles);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addPatients = async (req, res) => {
    try {
        const newPatients = await Patients.create(req.body);
        if (!newPatients) {
          res.status(400).json({ message: "Required Valid JSON" });
        } else {
          res.status(200).json(newPatients);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addFiles = async (req, res) => {
    try {
        const newFiles = await Files.create(req.body);
        if (!newFiles) {
          res.status(400).json({ message: "Required Valid JSON" });
        } else {
          res.status(200).json(newFiles);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    searchFiles,
    addPatients,
    addFiles
};