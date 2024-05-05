// bcrypt 모듈 불러오기
const bcrypt = require("bcrypt");
// jwt 모듈 불러오기
const jwt = require('jsonwebtoken');
// 로깅을 위한 winston 로거 구성 불러오기
const logger = require("../../config/logger");
const { UserModel, saltRounds } = require("../schemas/users");


class UserRepository {
    /**
     * 관리자 사용자 확인 및 생성 함수. 설정된 관리자 ID로 사용자 검색,
     * 없으면 새 관리자 생성
     */
    static async ensureAdminUser() {
        try {
            const user = await UserModel.findOne({ username: process.env.ADMIN_ID });
            if (!user) {
                const hash = await bcrypt.hash(process.env.ADMIN_PW, saltRounds);
                const newUser = new UserModel({
                    username: process.env.ADMIN_ID,
                    password: hash,
                    role: "admin"
                });
                await newUser.save();
                logger.info("Admin user created");
            } else {
                logger.info("Admin user already exists");
            }
        } catch (err) {
            logger.error("Error checking for admin user:", err);
        }
    }

    static async findById(id) {
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                // 사용자를 찾지 못했을 경우
                return JSON.stringify({
                    status: 404,
                    message: "User not found."
                });
            } else {
                // 사용자를 찾았을 경우
                return JSON.stringify({
                    status: 200,
                    data: user
                });
            }
        } catch (err) {
            // 데이터베이스 조회 중 에러 발생
            return JSON.stringify({
                status: 500,
                message: "Server error: " + err.message
            });
        }
    }
    static async login(userData, ip) {
        try {
            const findUser = await UserModel.findOne({ username: userData.username });
            if (!findUser || !bcrypt.compareSync(userData.password, findUser.password)) {
                logger.error(`Login failed: Authentication failed. Invalid user or password: ${userData.username} from IP: ${ip}`);
                return JSON.stringify({
                    status: 401,
                    message: "Authentication failed. Invalid user or password."
                });
            } else {
                // generate access token
                const accessToken = jwt.sign(
                    {
                        id: findUser._id, // MongoDB에서 사용자의 고유 ID
                        username: findUser.username,
                        role: findUser.role
                    },
                    process.env.JWT_SECRET, // 비밀키, 환경 변수나 설정 파일에서 가져오기
                    {
                        expiresIn: process.env.JWT_ACCESS_EXPIRES // 토큰 유효 기간 설정
                    }
                );
                // generatae refresh token
                const refreshToken = jwt.sign(
                    {
                        id: findUser._id
                    },
                    process.env.JWT_REFRESH_SECRET,
                    {
                        expiresIn: process.env.JWT_REFRESH_EXPIRES
                    }
                );
                await UserModel.updateOne({ _id: findUser._id }, { refreshToken: refreshToken });

                logger.info(`User ${userData.username} logged in successfully. from IP: ${ip}`);
                return JSON.stringify({
                    status: 200,
                    data: {
                        accessToken: accessToken, 
                        refreshToken: refreshToken,
                        user: {
                            id: findUser._id,
                            username: findUser.username,
                            role: findUser.role
                        }
                    },
                    message: "Authentication successful."
                });
            }
        } catch (error) {
            logger.error(`Login error for user ${userData.username}: ${error.message} from IP: ${ip}`);
            return JSON.stringify({
                status: 500,
                message: error.message
            });
        }
    }

    static async refreshAccessToken(refreshToken) {
        try {
            if (!refreshToken) {
                return JSON.stringify({ status: 401, message: "Refresh Token is required" });
            }

            let decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const user = await UserModel.findById(decoded.id);

            if (!user || user.refreshToken !== refreshToken) {
                return JSON.stringify({ status: 403, message: "Invalid Refresh Token" });
            }

            const newAccessToken = jwt.sign(
                { id: user._id, username: user.username, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_ACCESS_EXPIRES}
            );

            return JSON.stringify({ status: 200, data: { accessToken: newAccessToken } });

        } catch (err) {
            if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
                return JSON.stringify({ status: 403, message: "Invalid Refresh Token" });
            } else {
                logger.error("Error in refreshing token: ", err);
                return JSON.stringify({ status: 500, message: "Internal server error" });
            }
        }
    }

    static async addUser(userData) {
        try {

            const existingUser = await UserModel.findOne({ username: userData.username })
            if (existingUser) {
                return JSON.stringify({
                    status: 409,
                    message: "User already exists with the same username"
                });
            }

            // Encrypt the password
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
            userData.password = hashedPassword;

            const newUser = await UserModel.create(userData);
            if (!newUser) {
                return JSON.stringify({
                    status: 400,
                    message: "Failed to create new user"
                });
            } else {
                return JSON.stringify({
                    status: 200,
                    data: newUser
                });
            }
        } catch (error) {
            return JSON.stringify({
                status: 500,
                message: error.message
            });
        }
    }

}

// UserRepository 클래스 외부 공개
module.exports = { UserRepository };