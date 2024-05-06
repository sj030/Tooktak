// bcrypt 모듈 불러오기
const bcrypt = require("bcrypt");
// jwt 모듈 불러오기
const jwt = require('jsonwebtoken');
// 로깅을 위한 winston 로거 구성 불러오기
const { UserModel, saltRounds } = require("../schemas/users");
const config = require("../../config/vars");


class UserRepository {
    /**
     * 관리자 사용자 확인 및 생성 함수. 설정된 관리자 ID로 사용자 검색,
     * 없으면 새 관리자 생성
     */
    static async ensureAdminUser() {
        try {
            const user = await UserModel.findOne({ username: config.admin.id });
            if (!user) {
                const hash = await bcrypt.hash(config.admin.password, saltRounds);
                const newUser = new UserModel({
                    username: config.admin.id,
                    password: hash,
                    role: "admin"
                });
                await newUser.save();
                console.log("Admin user created");
            } else {
                console.error("Admin user already exists");
            }
        } catch (err) {
            console.error("Error checking for admin user:", err);
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
    static async login(userData) {
        try {
            const findUser = await UserModel.findOne({ username: userData.username });
            if (!findUser || !bcrypt.compareSync(userData.password, findUser.password)) {
                console.error(`Login failed: Authentication failed. Invalid user or password: ${userData.username}`);
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
                    config.jwt.secret_key, // 비밀키, 환경 변수나 설정 파일에서 가져오기
                    {
                        expiresIn: config.jwt.access_expires // 토큰 유효 기간 설정
                    }
                );
                // generatae refresh token
                const refreshToken = jwt.sign(
                    {
                        id: findUser._id
                    },
                    config.jwt.refresh_secret_key,
                    {
                        expiresIn: config.jwt.refresh_expires
                    }
                );
                await UserModel.updateOne({ _id: findUser._id }, { refreshToken: refreshToken });

                console.log(`User ${userData.username} logged in successfully.`);
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
            console.error(`Login error for user ${userData.username}: ${error.message}`);
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

            let decoded = jwt.verify(refreshToken, config.jwt.refresh_secret_key);
            const user = await UserModel.findById(decoded.id);

            if (!user || user.refreshToken !== refreshToken) {
                return JSON.stringify({ status: 403, message: "Invalid Refresh Token" });
            }

            const newAccessToken = jwt.sign(
                { id: user._id, username: user.username, role: user.role },
                config.jwt.secret_key,
                { expiresIn: config.jwt.access_expires}
            );

            return JSON.stringify({ status: 200, data: { accessToken: newAccessToken } });

        } catch (err) {
            if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
                return JSON.stringify({ status: 403, message: "Invalid Refresh Token" });
            } else {
                console.error("Error in refreshing token: ", err);
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

    static async deleteUser(param) {
        try {
            const user = await UserModel.findOneAndDelete({ username: param });
            if (!user) {
                return JSON.stringify({
                    status: 404,
                    message: "User not found."
                });
            } else {
                console.log(`User ${param} deleted successfully.`);
                return JSON.stringify({
                    status: 200,
                    message: "User deleted successfully."
                });
            }
        } catch (error) {
            console.error(`Delete error for user ${param}: ${error.message}`);
            return JSON.stringify({
                status: 500,
                message: "Server error: " + error.message
            });
        }
    }

    static async listUsers(page, limit = 5) {
        const skip = (page - 1) * limit; // 페이지 계산을 위해 건너뛸 아이템 수
        try {
            const users = await UserModel.find({ username: { $ne: config.admin.id } })
                .skip(skip)
                .limit(limit)
                .exec();
            return JSON.stringify({
                status: 200,
                data: users,
                message: "Users fetched successfully."
            });
        } catch (error) {
            console.error("Error fetching users: ", error);
            return JSON.stringify({
                status: 500,
                message: "Server error: " + error.message
            });
        }
    }
}

// UserRepository 클래스 외부 공개
module.exports = { UserRepository };