// mongoose 모듈 불러오기
const mongoose = require('mongoose');
// 비밀번호 해싱 시 사용할 라운드 수
const saltRounds = 10;

/**
 * 사용자 역할 정의: 'user', 'admin'
 */
const roles = ['user', 'admin'];

/**
 * 사용자 스키마 정의. 사용자 이름과 비밀번호, 권한 필드 포함
 * 각 필드는 최대 길이 제한과 필수 입력 조건 적용
 * timestamps 옵션으로 생성 및 수정 시간 자동 기록
 */
const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        maxlength: 128,
        required: true,
    },
    password: {
        type: String,
        maxlength: 128,
        required: true,
    },
    role: {
        type: String,
        enum: roles,  // 'user', 'admin' 중 하나 선택
        default: 'user',  // 기본값 'user'
        required: true
    }
}, {
    timestamps: true,
});

// User 모델 스키마로 정의
const UserModel = mongoose.model("User", usersSchema);

// User 모델 외부 공개
module.exports = { UserModel, saltRounds, roles };
