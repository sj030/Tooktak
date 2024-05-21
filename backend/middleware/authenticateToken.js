const jwt = require("jsonwebtoken");
const config = require("../config/vars");
const { UserService } = require("../services/usersservice");
const logger = require("../config/logger"); // 로거 구성을 가져옴
const { Literals } = require("../literal/literals");


function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization; // 요청 헤더에서 'authorization' 값을 읽어옴
    const token = authHeader && authHeader.split(" ")[1]; // 'Bearer [token]' 형식에서 토큰만 분리

    if (!token) {
        logger.error(Literals.LOG.NO_TOKEN, {
            f_name: null,
            requestUrl: req.originalUrl,
            ip: req.ip,
        });
        return res.sendStatus(401); // 토큰이 제공되지 않았을 경우 401 상태 코드 반환
    }

    jwt.verify(token, config.jwt.secret_key, async (err, decoded) => {
        if (err) {
            logger.error(Literals.LOG.INVALID_TOKEN, {
                f_name: null,
                requestUrl: req.originalUrl,
                ip: req.ip,
            });
            return res.status(401).json({ message: `${Literals.LOG.INVALID_TOKEN}: ${err.message}` }); // 토큰이 유효하지 않으면 401 상태와 메시지 반환
        }

        try {
            const user = await UserService.findById(decoded.id); // 토큰에 저장된 ID로 사용자 조회
            if (!user) {
                logger.error(Literals.LOG.NO_USER, {
                    f_name: null,
                    requestUrl: req.originalUrl,
                    ip: req.ip,
                });
                return res.status(404).json({ message: Literals.LOG.NO_USER_ERROR }); // 사용자가 데이터베이스에 없으면 인증 에러 메시지 반환
            }
            req.user = user; // req.user에 사용자 정보 저장
            next(); // 다음 미들웨어 함수로 이동
        } catch (error) {
            return res.status(500).json({ message: Literals.LOG.SERVER_ERROR }); // 서버 오류 처리
        }
    });
}

module.exports = authenticateToken; // 모듈로 내보내기
