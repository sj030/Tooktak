const winston = require("winston");
require("winston-mongodb");
const { combine, printf, errors, metadata } = winston.format;
const config = require("../config/vars");
const moment = require("moment-timezone");

const timestamp = winston.format((info) => {
    info.timestamp = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
    return info;
});

// MongoDB 저장을 위한 메타 데이터 포맷
const mongoDBFormat = printf((info) => {
    return `${info.timestamp} [${info.level}]: ${info.message} | file: ${info.file}, username: ${info.username}, role: ${info.role}, requestUrl: ${info.requestUrl}, ip: ${info.ip}`;
});

// 로거의 전송 설정
const loggerTransports = [
    new winston.transports.Console({
        level: "info",
        format: combine(
            timestamp(),
            printf(info => `${info.timestamp} [${info.level}]: ${info.message} |  file: ${info.file}, username: ${info.username}, role: ${info.role}, requestUrl: ${info.requestUrl}, ip: ${info.ip}`)
        )
    }),
    new winston.transports.MongoDB({
        db: config.mongo.uri,
        collection: "logs",
        options: { useUnifiedTopology: true },
        level: "info",
        format: combine(
            timestamp(),
            errors({ stack: true }), // 스택 추적 정보 포함
            metadata({ fillExcept: ["message", "level", "timestamp", "label"] }) // 메타데이터 추출 설정
        )
    }),
    new winston.transports.File({
        filename: "error.log",
        level: "error",
        format: combine(
            timestamp(),
            errors({ stack: true }),
            mongoDBFormat
        )
    }),
];

// 로거 설정
const logger = winston.createLogger({
    level: "info",
    transports: loggerTransports
});

module.exports = logger;
