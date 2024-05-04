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
                // 사용자 정보로 JWT 생성
                const token = jwt.sign(
                    {
                        id: findUser._id, // MongoDB에서 사용자의 고유 ID
                        username: findUser.username,
                        role: findUser.role
                    },
                    process.env.JWT_SECRET, // 비밀키, 환경 변수나 설정 파일에서 가져오기
                    {
                        expiresIn: "2 days" // 토큰 유효 기간 설정
                    }
                );
                logger.info(`User ${userData.username} logged in successfully. from IP: ${ip}`);
                return JSON.stringify({
                    status: 200,
                    data: {
                        token: token, // 생성된 JWT
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

    static async addUser(userData) {
        try {
            const newUser = await UserModel.create(userData);
            if (!newUser) {
                return JSON.stringify({
                    status: 400,
                    message: "Required Valid JSON"
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