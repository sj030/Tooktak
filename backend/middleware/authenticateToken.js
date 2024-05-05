const jwt = require("jsonwebtoken");
const config = require("../config/vars");
const { UserRepository } = require("../db/models/users");

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization; // 요청 헤더에서 'authorization' 값을 읽어옴
    const token = authHeader && authHeader.split(' ')[1]; // 'Bearer [token]' 형식에서 토큰만 분리

    if (!token) {
        return res.sendStatus(401); // 토큰이 제공되지 않았을 경우 401 상태 코드 반환
    }

    jwt.verify(token, config.jwt.secret_key, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: `Invalid token: ${err.message}` }); // 토큰이 유효하지 않으면 401 상태와 메시지 반환
        }

        try {
            const user = await UserRepository.findById(decoded.id); // 토큰에 저장된 ID로 사용자 조회
            if (!user) {
                return res.status(401).json({ message: "Authentication Error" }); // 사용자가 데이터베이스에 없으면 인증 에러 메시지 반환
            }
            req.user = user; // req.user에 사용자 정보 저장
            next(); // 다음 미들웨어 함수로 이동
        } catch (error) {
            return res.status(500).json({ message: "Server Error" }); // 서버 오류 처리
        }
    });
}

module.exports = authenticateToken; // 모듈로 내보내기
