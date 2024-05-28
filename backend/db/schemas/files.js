const mongoose = require("mongoose");
const moment = require('moment-timezone');

/**
 * 파일 스키마 정의.
 * 병원 별로 구현 할 때 병원 정보도 추가시킬 예정
 */
const fileSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    f_name: {
        type: String,
        required: true
    },
    f_extension: {
        type: String,
        required: true
    },
    f_path: {
        type: String,
        required: true
    },
    f_date: {
        type: String,
        required: true
    },
    chapter: {
        type: Number,
        required: true
    },
    p_no: {
        type: String,
        required: true,
    }
}, {
    timestamps: { currentTime: () => moment().tz('Asia/Seoul').toDate() } // timestamps 옵션을 사용하여 createdAt과 updatedAt을 자동으로 설정
});

const FileModel = mongoose.model("File", fileSchema);

module.exports = { FileModel };