const { UserRepository } = require("../db/models/users");
const logger = require("../config/logger"); // 로거 설정 가져오기

class authService {
    // 로그인 처리 함수
    static async login(req, res) {
        const userData = req.body; // 인증 요청한 사용자
        const ip = req.ip;
        const result = await UserRepository.login(userData);
        const resultobj = JSON.parse(result);

        switch (resultobj.status) {
            case 200:
                // 로그인 성공 시 로그 기록
                logger.info("User login successful", {
                    username: userData.username,
                    ip,
                    role: resultobj.data.user.role,
                    requestUrl: req.originalUrl,
                    f_name: null
                });
                res.status(200).send({ message: resultobj.message, data: resultobj.data });
                break;
            case 401:
                // 인증 실패 시 로그 기록
                logger.error("Authentication failed", {
                    username: userData.username,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message

                });
                res.status(401).send(resultobj.message);
                break;
            case 500:
                // 서버 오류 발생 시 로그 기록
                logger.error("Login process error", {
                    username: userData.username,
                    ip,
                    requestUrl: req.originalUrl,
                    error: resultobj.message,
                    f_name: null
                });
                res.status(500).send(resultobj.message);
                break;
        }
    }

    // 액세스 토큰 갱신 함수
    static async refresh(req, res) {
        const { refreshToken } = req.body; // 재인증 요청한 사용자 이름
        const result = await UserRepository.refreshAccessToken(refreshToken);
        const resultobj = JSON.parse(result);
        const ip = req.ip;

        switch (resultobj.status) {
            case 200:
                // 토큰 갱신 성공 시 로그 기록
                logger.info("Access token refreshed successfully", {
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null
                });
                res.status(200).json(resultobj.data);
                break;
            case 401:
            case 403:
                // 토큰 갱신 실패 시 로그 기록
                logger.error("Invalid refresh token", {
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message
                });
                res.status(resultobj.status).send(resultobj.message);
                break;
            case 500:
                // 토큰 갱신 중 오류 발생 시 로그 기록
                logger.error("Error refreshing access token", {
                    ip,
                    requestUrl: req.originalUrl,
                    error: resultobj.message,
                    f_name: null
                });
                res.status(500).send(resultobj.message);
                break;
        }
    }

    // 사용자 생성 함수
    static async createUser(req, res) {
        const userData = req.body;
        const authUsername = req.user.data.username; // 생성된 사용자 이름
        const result = await UserRepository.addUser(userData);
        const resultobj = JSON.parse(result);
        const ip = req.ip;

        switch (resultobj.status) {
            case 201:
                // 사용자 생성 성공 시 로그 기록
                logger.info("User created successfully", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                });
                res.status(201).send(resultobj.data);
                break;
            case 409:
                // 사용자 이미 존재 시 로그 기록
                logger.error("User creation failed - already exists", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message
                });
                res.status(409).send(resultobj.message);
                break;
            case 400:
            case 500:
                // 사용자 생성 실패 시 로그 기록
                logger.error("User creation failed", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message
                });
                res.status(resultobj.status).send(resultobj.message);
                break;
        }
    }

    // 사용자 삭제 함수
    static async deleteUser(req, res) {
        const username = req.params.username;
        const authUsername = req.user.data.username;
        const result = await UserRepository.deleteUser(username);
        const resultobj = JSON.parse(result);
        const ip = req.ip;

        switch (resultobj.status) {
            case 200:
                // 사용자 삭제 성공 시 로그 기록
                logger.info("User deleted successfully", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                });
                res.status(200).send({ message: resultobj.message });
                break;
            case 404:
                // 사용자를 찾지 못함 시 로그 기록
                logger.error("User not found for deletion", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message
                });
                res.status(404).send({ message: resultobj.message });
                break;
            case 500:
                // 사용자 삭제 중 서버 오류 발생 시 로그 기록
                logger.error("User deletion failed", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message
                });
                res.status(500).send({ message: resultobj.message });
                break;
        }
    }

    // 사용자 목록 조회 함수
    static async listUsers(req, res) {
        const page = parseInt(req.query.page) || 1;
        const authUsername = req.user.data.username;
        const result = await UserRepository.listUsers(page);
        const resultobj = JSON.parse(result);
        const ip = req.ip;

        switch (resultobj.status) {
            case 200:
                logger.info("Users listed successfully", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                });
                res.status(200).json(resultobj);
                break;
            case 500:
                logger.error("Error listing users", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message
                });
                res.status(500).send({ message: resultobj.message });
                break;
        }
    }
}

module.exports = { authService };
