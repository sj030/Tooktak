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
const hospitalRouter = require("./routes/service");
// 로깅
const mongoose = require("./config/mongoose");
const logger = require("./config/logger");

// MongoDB 연결
mongoose.connect();
const app = express();

// CORS 미들웨어 활성화
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
// JSON 요청 파싱
app.use(express.json());
// URL 인코딩된 데이터 파싱
app.use(express.urlencoded({ extended: false }));
// 쿠키 파서 활성화
app.use(cookieParser());
// 정적 파일 제공을 위한 디렉토리 설정
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

// 라우트 핸들러 설정
app.use("/account", accountRouter);
app.use("/file", fileRouter);
app.use("/service", hospitalRouter);

// 404 에러 핸들링
app.use(function (req, res, next) {
    next(createError(404));
});

// 기본 에러 핸들링 미들웨어
app.use(function (err, req, res, next) {
    // 모든 환경에서 에러 로그를 기록
    logger.error("error occured", {
        ip: req.ip,
        requestUrl: req.originalUrl,
        error: err.message
    });
    // 에러 정보를 JSON 형식으로 클라이언트에 응답
    res.status(err.status || 500).json({
        message: err.message,
        error: req.app.get("env") === "dev" ? err : {}
    });
});




// 모듈 외부로 app 객체 공개
module.exports = app;
