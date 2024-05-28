const mongoose = require("mongoose");

/**
 * 환자 스키마 정의.
 * p_no를 기준으로 파일 모델이 환자를 찾기에 unique
 */
const patientSchema = mongoose.Schema({
    attributes: mongoose.Schema.Types.Mixed // 환자의 속성
});

const PatientModel = mongoose.model("Patient", patientSchema);

module.exports = { PatientModel };