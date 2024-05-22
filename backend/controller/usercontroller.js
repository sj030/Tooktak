const { UserService } = require("../services/userservice")
const logger = require("../config/logger");

class AuthController {
    static async login(req, res) {
        const userData = req.body;
        const ip = req.ip;
        const result = await UserService.login(userData);
        const resultobj = JSON.parse(result);

        switch (resultobj.status) {
            case 200:
                logger.info("User login successful", {
                    username: userData.username,
                    ip,
                    role: resultobj.data.user.role,
                    requestUrl: req.originalUrl,
                    f_name: null
                });
                res.status(200).json({ message: resultobj.message, data: resultobj.data });
                break;
            case 401:
                logger.error("Authentication failed", {
                    username: userData.username,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message
                });
                res.status(401).json({ message: resultobj.message });
                break;
            case 500:
                logger.error("Login process error", {
                    username: userData.username,
                    ip,
                    requestUrl: req.originalUrl,
                    error: resultobj.message,
                    f_name: null
                });
                res.status(500).json({ message: resultobj.message });
                break;
        }
    }

    static async refresh(req, res) {
        const { refreshToken } = req.body;
        const result = await UserService.refreshAccessToken(refreshToken);
        const resultobj = JSON.parse(result);
        const ip = req.ip;

        switch (resultobj.status) {
            case 200:
                logger.info("Access token refreshed successfully", {
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null
                });
                res.status(200).json(resultobj.data);
                break;
            case 401:
            case 403:
                logger.error("Invalid refresh token", {
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message
                });
                res.status(resultobj.status).json({ message: resultobj.message });
                break;
            case 500:
                logger.error("Error refreshing access token", {
                    ip,
                    requestUrl: req.originalUrl,
                    error: resultobj.message,
                    f_name: null
                });
                res.status(500).json({ message: resultobj.message });
                break;
        }
    }

    static async createUser(req, res) {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const authUsername = req.user.data.username;
        const result = await UserService.addUser({ username, password });
        const resultobj = JSON.parse(result);
        const ip = req.ip;

        switch (resultobj.status) {
            case 201:
                logger.info("User created successfully", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                });
                res.status(201).json(resultobj.data);
                break;
            case 409:
                logger.error("User creation failed - already exists", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message
                });
                res.status(409).json({ message: resultobj.message });
                break;
            case 400:
            case 500:
                logger.error("User creation failed", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message
                });
                res.status(resultobj.status).json({ message: resultobj.message });
                break;
        }
    }

    static async deleteUser(req, res) {
        const username = req.params.username;
        const authUsername = req.user.data.username;
        const result = await UserService.deleteUser(username);
        const resultobj = JSON.parse(result);
        const ip = req.ip;

        switch (resultobj.status) {
            case 200:
                logger.info("User deleted successfully", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                });
                res.status(200).json({ message: resultobj.message });
                break;
            case 404:
                logger.error("User not found for deletion", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message
                });
                res.status(404).json({ message: resultobj.message });
                break;
            case 500:
                logger.error("User deletion failed", {
                    username: authUsername,
                    ip,
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: resultobj.message
                });
                res.status(500).json({ message: resultobj.message });
                break;
        }
    }

    static async listUsers(req, res) {
        const page = parseInt(req.query.page) || 1;
        const authUsername = req.user.data.username;
        const result = await UserService.listUsers(page);
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
                res.status(500).json({ message: resultobj.message });
                break;
        }
    }
}

module.exports = { AuthController };
