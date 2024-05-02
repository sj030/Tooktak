const winston = require("winston");
const { combine, timestamp, json, colorize, simple } = winston.format;

// 개발 환경에서는 콘솔에 로그를 출력하는 전송 설정
const loggerTransports = [
    new winston.transports.Console({
        format: combine(
            colorize(),  // 로그에 색을 추가하여 콘솔에서 로그를 더 쉽게 구분할 수 있게 함
            simple()     // 간단한 텍스트 형식으로 로그를 출력함
        )
    })
];

// 프로덕션 환경에서는 파일에 로그를 저장하는 전송 설정 추가
if (process.env.NODE_ENV === "prod") {
    loggerTransports.push(
        new winston.transports.File({ filename: "error.log", level: "error" }),  // 오류 로그만을 "error.log" 파일에 저장
        new winston.transports.File({ filename: "combined.log" })                // 모든 로그를 "combined.log" 파일에 저장
    );
}

// 로거 설정
const logger = winston.createLogger({
    level: "info",  // 기본 로그 레벨을 "info"로 설정. info 이상 레벨의 로그만 기록됨
    format: combine(
        timestamp(),  // 각 로그 메시지에 타임스탬프 추가
        json()        // 로그를 JSON 형식으로 저장하여 데이터 구조를 명확하게 함
    ),
    transports: loggerTransports  // 설정된 전송 방법을 로거에 적용
});

// 로그 스트림 설정
// Express.js에서 morgan 로거 등과 함께 사용할 때 유용
logger.stream = {
    write: (message) => {
        logger.info(message.trim());  // 스트림으로 받은 메시지를 info 레벨로 로그에 기록
    }
};

module.exports = logger;  // 이 설정된 로거를 다른 파일에서 사용할 수 있도록 export
