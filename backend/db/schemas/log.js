// mongoose 모듈 불러오기
const mongoose = require("mongoose");
const moment = require('moment-timezone');

const logSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        required: true,
        default: () => moment().tz('Asia/Seoul').toDate() // 한국 시간으로 저장
    },
    level: {
        type: String,
        maxlength: 128,
        required: true,
    },
    message: {
        type: String,
        maxlength: 128,
        required: true,
    },
    meta: {
        username: {
            type: String,
            maxlength: 128,
            default: null,
        },
        ip: {
            type: String,
            maxlength: 128,
            required: true,
        },
        role: {
            type: String,
            maxlength: 128,
            default: null,
        },
        requestUrl: {
            type: String,
            maxlength: 128,
            required: true,
        },
        f_name: {
            type: String,
            maxlength: 128,
            default: null,
        },
        error: {
            type: String,
            maxlength: 128,
            default: null,
        }
    }
});

// Log 모델 스키마로 정의
const LogModel = mongoose.model("Log", logSchema, "logs");

// Log 모델 외부 공개
module.exports = { LogModel };