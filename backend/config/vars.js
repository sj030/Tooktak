const path = require("path");

// .env 파일과 .env.example 파일을 사용하여 환경 변수를 설정
require("dotenv-safe").config({
    path: path.join(__dirname, "../.env"), // 실제 환경 변수들이 저장된 파일의 위치
    sample: path.join(__dirname, "../.env.example"), // .env 파일의 예제(템플릿) 파일의 위치
    allowEmptyValues: true  // .env 파일 내의 값들 중 비어 있어도 되는 값들을 허용
});

module.exports = {
    env: process.env.NODE_ENV, // 현재 작업 환경을 설정 ("dev", "prod", "test" 등)
    logs: process.env.NODE_ENV === "prod" ? "combined" : "dev", // 로그 설정, 프로덕션 환경에서는 "combined" 로그, 개발 환경에서는 "dev" 로그 사용

    mongo: {
        uri: process.env.NODE_ENV === "test"
            ? process.env.MONGO_URI_TESTS // 테스트 환경일 때 사용할 MongoDB URI
            : process.env.MONGO_URI, // 기타 환경에서 사용할 MongoDB URI
    },

    // jwt 설정 등 추가적인 구성 정보가 필요할 경우 여기에 포함
}

