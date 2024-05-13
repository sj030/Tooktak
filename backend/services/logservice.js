const { LogRepository } = require('../db/models/log');

class LogService {
    static async fetchLogs(req, res) {
        const page = parseInt(req.query.page) || 1;
        const result = await LogRepository.getLogs(page);
        const resultobj = JSON.parse(result);
        switch (resultobj.status) {
            case 200:
                res.status(200).json(resultobj.data);
                break;
            case 500:
                res.status(500).send({ message: resultobj.message });
                break;
        }
    }
}


module.exports = { LogService };
