// Express 기본 모듈
const createError = require("http-errors");
const express = require("express");
const path = require("path");
// Express 미들웨어 
const cookieParser = require("cookie-parser");
const cors = require("cors");
// 라우터
const accountRouter = require("./routes/account");
const fileRouter = require("./routes/file");
const hospitalRouter = require("./routes/hospitals");
// 로깅
const morgan = require("morgan");
const { logs } = require("./config/vars");
const mongoose = require("./config/mongoose");
const logger = require("./config/logger");
//jwt
const jwt = require('jsonwebtoken');

// MongoDB 연결
mongoose.connect();
const app = express();

// morgan을 사용한 요청 로깅 설정, 환경별 로그 다르게 설정
app.use(morgan(logs));

// CORS 미들웨어 활성화
app.use(cors());
// JSON 요청 파싱
app.use(express.json());
// URL 인코딩된 데이터 파싱
app.use(express.urlencoded({ extended: false }));
// 쿠키 파서 활성화
app.use(cookieParser());
// 정적 파일 제공을 위한 디렉토리 설정
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

// JWT 검증 미들웨어
app.use(function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (err) {
                req.user = undefined; // 인증 실패
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = decoded; // 인증 성공, 사용자 정보 저장
            next();
        });
    } else {
        req.user = undefined; // 토큰 없음
        next();
    }
});

// 라우트 핸들러 설정
app.use("/account", accountRouter);
app.use("/file", fileRouter);
app.use("/hospitals", hospitalRouter);

// 404 에러 핸들링
app.use(function (req, res, next) {
    next(createError(404));
});

// 기본 에러 핸들링 미들웨어
app.use(function (err, req, res, next) {
    // 모든 환경에서 에러 로그를 기록
    logger.error(`Status: ${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    // 에러 정보를 JSON 형식으로 클라이언트에 응답
    res.status(err.status || 500).json({
        message: err.message,
        error: req.app.get("env") === "dev" ? err : {}
    });
});




// 모듈 외부로 app 객체 공개
module.exports = app;
