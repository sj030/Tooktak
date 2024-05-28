const { PatientRepository } = require("../db/models/patients");

class PatientService {
    static async addPatients(patients) {
        await PatientRepository.insertMany(patients);
    }

    static async setDummyPatients() {
        await PatientRepository.deleteAll();
        const dummy = [
            {
                "attributes": {
                    "S-NO": 1,
                    "참여날짜": "2023-03-05",
                    "성명": "홍길동",
                    "병록번호": 1,
                    "나이": 78,
                    "성별": "남",
                    "MMSE": 45,
                    "최종학력": "고졸",
                    "CDT": 30
                }
            },
            {
                "attributes": {
                    "S-NO": 2,
                    "참여날짜": "2023-03-07",
                    "성명": "김철수",
                    "병록번호": 2,
                    "나이": 80,
                    "성별": "남",
                    "MMSE": 30,
                    "최종학력": "중졸",
                    "CDT": 20
                }
            },
            {
                "attributes": {
                    "S-NO": 3,
                    "참여날짜": "2024-01-05",
                    "성명": "이영희",
                    "병록번호": 3,
                    "나이": 76,
                    "성별": "여",
                    "MMSE": 40,
                    "최종학력": "대졸",
                    "CDT": 25
                }
            },
            {
                "attributes": {
                    "No.": 4,
                    "데이터 수집 날짜": "2023-03-03",
                    "대상자명": "김영수",
                    "나이": 67,
                    "성별": "남",
                    "최종학력": "고졸",
                    "MMSE": 24,
                    "청력정도": "상"
                }
            },
            {
                "attributes": {
                    "No.": 5,
                    "데이터 수집 날짜": "2023-03-07",
                    "대상자명": "박순자",
                    "나이": 70,
                    "성별": "여",
                    "최종학력": "중졸",
                    "MMSE": 28,
                    "청력정도": "중"
                }
            }
        ];
        await PatientRepository.insertMany(dummy);
    }
}

module.exports = { PatientService };