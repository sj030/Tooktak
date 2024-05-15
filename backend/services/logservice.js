const { LogRepository } = require("../db/models/log");
const logger = require("../config/logger"); // 로거 설정 가져오기

class LogService {
    // 로그 조회 요청 처리 함수
    static async fetchLogs(req, res) {
        const result = await LogRepository.getLogs(req.query, parseInt(req.query.page));
        const resultobj = JSON.parse(result);

        // 결과 상태에 따른 처리
        switch (resultobj.status) {
            case 200:
                // 로그 조회 성공 시 로깅 및 응답 전송
                logger.info("Log fetch successful", {
                    username: req.user.data.username,
                    ip: req.ip,
                    role: req.user.data.role,
                    requestUrl: req.originalUrl,
                    f_name: null
                });
                res.status(200).json(resultobj.data);
                break;
            case 400:
                // 쿼리 매칭 실패 시 로깅 및 400 에러 응답
                logger.error("No Log matched", {
                    username: req.user.data.username,
                    ip: req.ip,
                    role: req.user.data.role,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message,
                });
                res.status(400).send({ message: resultobj.message });
                break;
            case 500:
                // 서버 오류 시 로깅 및 500 에러 응답
                logger.error("Server error during log fetch", {
                    username: req.user.data.username,
                    ip: req.ip,
                    role: req.user.data.role,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message,
                });
                res.status(500).send({ message: resultobj.message });
                break;
        }
    }
}

module.exports = { LogService };
