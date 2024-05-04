const mongoose = require("mongoose");

/**
 * 환자 스키마 정의.
 * p_no를 기준으로 파일 모델이 환자를 찾기에 unique
 */
const patientSchema = mongoose.Schema({
    p_no: {
        type: String,
        required: true,
        unique: true
    },
    p_name: {
        type: String,
        required: true
    },
    p_age: {
        type: Number,
        required: true
    },
    p_gender: {
        type: String,
        required: true
    },
    p_MMSE: {
        type: String
    },
    p_note: {
        type: String
    }
});

const PatientModel = mongoose.model("Patient", patientSchema);

module.exports = { PatientModel };