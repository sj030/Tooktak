const logger = require("../config/logger"); // 로거 구성을 가져옴
const { Literals } = require("../literal/literals");

function isAdmin(req, res, next) {
    // req.user가 문자열이면 JSON 객체로 변환
    if (typeof req.user === "string") {
        try {
            req.user = JSON.parse(req.user);
        } catch (error) {
            return res.status(400).json({ message: Literals.LOG.USER_DATA_CORRUPTED }); // 사용자 데이터가 손상되었음을 알림
        }
    }

    // req.user가 존재하지 않거나 필요한 데이터가 없을 경우 인증 오류 처리
    if (!req.user || !req.user.data || !req.user.data.role) {
        return res.status(401).json({ message: Literals.LOG.AUTHENTICATION_ERROR });
    }

    // 관리자 권한을 확인
    if (req.user.data.role === "admin") {
        next(); // 다음 미들웨어로 진행
    } else {
        // 접근 권한 오류 로그 기록
        logger.error(Literals.LOG.ACCESS_DENIED, {
            username: req.user.data.username,
            role: req.user.data.role,
            f_name: null,
            requestUrl: req.originalUrl
        });
        res.status(403).json({ message: Literals.LOG.ACCESS_DENIED }); // 관리자만 접근 가능함을 알림
    }
}

module.exports = isAdmin; // 모듈로 내보내기
