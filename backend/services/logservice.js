const { LogRepository } = require('../db/models/log');
const logger = require("../config/logger"); // 로거 설정 가져오기

class LogService {
    static async fetchLogs(req, res) {
        const result = await LogRepository.getLogs(req.query, parseInt(page));
        const resultobj = JSON.parse(result);
        
        switch (resultobj.status) {
            case 200:
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
                logger.error("filter no match", {
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
