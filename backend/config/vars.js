const path = require("path");

// .env 파일과 .env.example 파일을 이용하여 환경 변수 설정
require("dotenv-safe").config({
    path: path.join(__dirname, "../.env"), // 실제 환경 변수 파일 위치
    sample: path.join(__dirname, "../.env.example"), // 환경 변수 예제 파일 위치
    allowEmptyValues: true  // 비어 있는 환경 변수 허용
});

module.exports = {
    env: process.env.NODE_ENV, // 작업 환경 설정 ("dev", "prod", "test" 등)

    mongo: {
        uri: process.env.NODE_ENV === "test"
            ? process.env.MONGO_URI_TESTS // 테스트 환경의 MongoDB URI
            : process.env.MONGO_URI, // 일반 환경의 MongoDB URI
    },

    jwt: {
        secret_key: process.env.JWT_SECRET, // JWT 비밀 키
        refresh_secret_key: process.env.JWT_REFRESH_SECRET, // JWT 갱신 키
        access_expires: process.env.JWT_ACCESS_EXPIRES, // 접근 토큰 만료 시간
        refresh_expires: process.env.JWT_REFRESH_EXPIRES, // 갱신 토큰 만료 시간
    },

    admin: {
        id: process.env.ADMIN_ID, // 관리자 ID
        password: process.env.ADMIN_PW // 관리자 비밀번호
    }

}
