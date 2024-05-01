var mongoose = require('mongoose'); // mongoose 모듈 가져오기
var logger = require('./../config/logger'); // 로거 설정 파일 가져오기
var { mongo, env } = require('./vars'); // 환경 변수 파일에서 MongoDB 설정과 환경 정보 가져오기
var { ensureAdminUser } = require('../models/users.model'); // Admin 사용자 생성 함수 가져오기

// mongoose의 Promise를 Bluebird로 설정
mongoose.Promise = Promise;

// MongoDB 연결 에러 발생 시 처리
mongoose.connection.on('error', (err) => {
    logger.error(`MongoDB connection error: ${err}`); // 로그에 에러 메시지 기록
    process.exit(-1); // 에러 발생 시 애플리케이션 종료
});

// 개발 환경에서는 mongoose 로그를 출력
if (env === 'dev') {
    mongoose.set('debug', true); // mongoose 디버그 모드 활성화
}

/**
 * MongoDB에 연결하는 함수
 *
 * @returns {object} Mongoose 연결 객체
 * @public
 */
exports.connect = () => {
    mongoose.connect(mongo.uri); // 설정된 URI를 사용하여 MongoDB에 연결
    ensureAdminUser(); // 연결 후 관리자 사용자가 있는지 확인하고 없으면 생성
    return mongoose.connection; // mongoose 연결 객체 반환
};
