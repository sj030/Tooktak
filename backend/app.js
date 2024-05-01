var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require("cors");
var morgan = require('morgan');
var accountRouter = require('./routes/account');
var fileRouter = require('./routes/file');
var { logs } = require('./config/vars');
var mongoose = require('./config/mongoose');
var logger = require('./config/logger');

// MongoDB 연결
mongoose.connect();
var app = express();

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
app.use(express.static(path.join(__dirname, 'public')));

// 라우트 핸들러 설정
app.use('/account', accountRouter);
app.use('/file', fileRouter);

// 404 에러 핸들링
app.use(function (req, res, next) {
    next(createError(404));
});

// 기본 에러 핸들링 미들웨어
app.use(function (err, req, res, next) {
    // 개발 환경에서는 에러 정보를 로컬 변수에 저장
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    // 모든 환경에서 에러 로그를 기록
    logger.error(`Status: ${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

    // 에러 페이지를 클라이언트에 응답
    res.status(err.status || 500);
    res.render('error');
});

// 모듈 외부로 app 객체 공개
module.exports = app;
