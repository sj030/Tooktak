const { UserRepository } = require("../db/models/users");

class authService {
    static async login(req, res) {
        const userData = req.body;
        const ip = req.ip;
        const result = await UserRepository.login(userData, ip);
        const resultobj = JSON.parse(result);
        switch (resultobj.status) {
            case 200:
                res.status(200).send({ message: resultobj.message, data: resultobj.data });
                break;
            case 401:
                res.status(401).send(resultobj.message);
                break;
            case 500:
                res.status(500).send(resultobj.message);
                break;
        }
    }

    static async refresh(req, res) {
        const { refreshToken } = req.body;
        const result = await UserRepository.refreshAccessToken(refreshToken);
        const resultobj = JSON.parse(result);

        switch (resultobj.status) {
            case 200:
                res.status(200).json(resultobj.data);
                break;
            case 401:
            case 403:
                res.status(resultobj.status).send(resultobj.message);
                break;
            case 500:
                res.status(500).send(resultobj.message);
                break;
        }
    }


    static async createUser(req, res) {
        const userData = req.body;
        const result = await UserRepository.addUser(userData);
        const resultobj = JSON.parse(result);
        switch (resultobj.status) {
            case 200:
                res.status(200).send(resultobj.data);
                break;
            case 409:
                res.status(409).send(resultobj.message);
                break;
            case 400:
                res.status(400).send(resultobj.message);
                break;
            case 500:
                res.status(500).send(resultobj.message);
                break;
        }
    }

    static async deleteUser(req, res) {
        const username = req.params.username;
        const result = await UserRepository.deleteUser(username);
        const resultObj = JSON.parse(result);

        switch (resultObj.status) {
            case 200:
                res.status(200).send({ message: resultObj.message });
                break;
            case 404:
                res.status(404).send({ message: resultObj.message });
                break;
            case 500:
                res.status(500).send({ message: resultObj.message });
                break;
        }
    }




}

module.exports = { authService };