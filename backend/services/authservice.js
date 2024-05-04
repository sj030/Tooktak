const { UserRepository } = require("../db/models/users");

class authService {
    static async login(req, res) {
        const userData = req.body;
        const ip = req.ip;
        const result = await UserRepository.login(userData, ip);
        const resultobj = JSON.parse(result);
        switch (resultobj.status) {
            case 200:
                res.status(200).send({message : resultobj.message, data : resultobj.data});
                break;
            case 401:
                res.status(401).send(resultobj.message);
                break;
            case 500:
                res.status(500).send(resultobj.message);
                break;
        }
    }
}

module.exports = { authService };