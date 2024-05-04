// bcrypt 모듈 불러오기
const bcrypt = require("bcrypt");
// 로깅을 위한 winston 로거 구성 불러오기
const logger = require("../../config/logger");
const { UserModel, saltRounds } = require("../schemas/users");

class UserRepository {
    /**
     * 관리자 사용자 확인 및 생성 함수. 설정된 관리자 ID로 사용자 검색,
     * 없으면 새 관리자 생성
     */
    static async ensureAdminUser() {
        UserModel.findOne({ username: process.env.ADMIN_ID })
            .then(user => {
                if (!user) {
                    bcrypt.hash(process.env.ADMIN_PW, saltRounds, function (err, hash) {
                        if (err) {
                            logger.error("Error hashing password:", err);
                            return;
                        }
                        // 새 사용자 생성, "role"에 "admin" 할당
                        const newUser = new UserModel({
                            username: process.env.ADMIN_ID,
                            password: hash,
                            role: "admin"  // 관리자 권한 부여
                        });
                        newUser.save()
                            .then(() => logger.info("Admin user created"))
                            .catch(err => logger.error("Error creating admin user:", err));
                    });
                } else {
                    logger.info("Admin user already exists");
                }
            })
            .catch(err => {
                logger.error("Error checking for admin user:", err);
            });
    }
}

// UserRepository 클래스 외부 공개
module.exports = { UserRepository };