const winston = require('winston');
const { combine, timestamp, json, colorize, simple, printf } = winston.format;

// 개발 환경에서는 콘솔에 로그를 출력하는 전송 설정
const loggerTransports = [
    new winston.transports.Console({
        format: combine(
            colorize(),
            simple()
        )
    })
];

// 프로덕션 환경에서는 파일에 로그를 저장하는 전송 설정 추가
if (process.env.NODE_ENV === 'production') {
    loggerTransports.push(
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    );
}

// 로거 설정
const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json() // JSON 형식으로 로그 저장
    ),
    transports: loggerTransports
});

// 로그 스트림 설정
logger.stream = {
    write: (message) => {
        logger.info(message.trim());
    }
};

module.exports = logger;
