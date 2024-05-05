const path = require("path");

// .env 파일과 .env.example 파일을 사용하여 환경 변수를 설정
require("dotenv-safe").config({
    path: path.join(__dirname, "../.env"), // 실제 환경 변수들이 저장된 파일의 위치
    sample: path.join(__dirname, "../.env.example"), // .env 파일의 예제(템플릿) 파일의 위치
    allowEmptyValues: true  // .env 파일 내의 값들 중 비어 있어도 되는 값들을 허용
});

module.exports = {
    env: process.env.NODE_ENV, // 현재 작업 환경을 설정 ("dev", "prod", "test" 등)

    mongo: {
        uri: process.env.NODE_ENV === "test"
            ? process.env.MONGO_URI_TESTS // 테스트 환경일 때 사용할 MongoDB URI
            : process.env.MONGO_URI, // 기타 환경에서 사용할 MongoDB URI
    },

    jwt: {
        secret_key: process.env.JWT_SECRET,
        refresh_secret_key: process.env.JWT_REFRESH_SECRET,
        access_expires: process.env.JWT_ACCESS_EXPIRES,
        refresh_expires: process.env.JWT_REFRESH_EXPIRES,
    },

    admin: {
        id: process.env.ADMIN_ID,
        password: process.env.ADMIN_PW
    }

}

