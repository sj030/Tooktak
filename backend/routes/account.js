const express = require("express");
const router = express.Router();
const { authService } = require("../services/authservice");
const authenticateToken = require("../middleware/authenticateToken");
const isAdmin = require("../middleware/isAdmin");
const { LogService } = require("../services/logservice");

/**
 * @function 로그인 엔드포인트
 * @route POST account/login
 * @param {object} req - 요청 객체 (username과 password를 포함)
 * @param {object} res - 응답 객체 (로그인 결과 반환)
 * @returns {object} 200 - 로그인 성공 시 사용자 정보와 토큰 반환
 * @returns {object} 401 - 인증 실패 시 에러 메시지 반환
 * @returns {object} 500 - 서버 오류 시 에러 메시지 반환
 */
router.post("/login", authService.login);

/**
 * @function 액세스 토큰 갱신 엔드포인트
 * @route POST account/refresh
 * @param {object} req - 요청 객체 (리프레시 토큰을 포함)
 * @param {object} res - 응답 객체 (새로운 액세스 토큰 반환)
 * @returns {object} 200 - 토큰 갱신 성공 시 새로운 액세스 토큰 반환
 * @returns {object} 401 - 리프레시 토큰이 유효하지 않을 때 에러 메시지 반환
 * @returns {object} 403 - 리프레시 토큰이 만료되었을 때 에러 메시지 반환
 * @returns {object} 500 - 서버 오류 시 에러 메시지 반환
 */
router.post("/refresh", authService.refresh);

/**
 * @function 사용자 추가 엔드포인트
 * @route POST account/add
 * @middleware authenticateToken, isAdmin
 * @param {object} req - 요청 객체 (username과 password를 포함)
 * @param {object} res - 응답 객체 (새로운 사용자 정보 반환)
 * @returns {object} 201 - 사용자 생성 성공 시 사용자 정보 반환
 * @returns {object} 400 - 요청 데이터 유효성 검사 실패 시 에러 메시지 반환
 * @returns {object} 409 - 사용자 이미 존재 시 에러 메시지 반환
 * @returns {object} 500 - 서버 오류 시 에러 메시지 반환
 */
router.post("/add", authenticateToken, isAdmin, authService.createUser);

/**
 * @function 사용자 삭제 엔드포인트
 * @route DELETE account/:username
 * @middleware authenticateToken, isAdmin
 * @param {object} req - 요청 객체 (삭제할 사용자의 username을 URL 파라미터로 포함)
 * @param {object} res - 응답 객체 (삭제 결과 반환)
 * @returns {object} 200 - 사용자 삭제 성공 시 성공 메시지 반환
 * @returns {object} 404 - 사용자 찾을 수 없을 때 에러 메시지 반환
 * @returns {object} 500 - 서버 오류 시 에러 메시지 반환
 */
router.delete("/:username", authenticateToken, isAdmin, authService.deleteUser);

/**
 * @function 사용자 목록 조회 엔드포인트
 * @route GET account/
 * @middleware authenticateToken, isAdmin
 * @param {object} req - 요청 객체 (페이지 번호를 쿼리 파라미터로 포함)
 * @param {object} res - 응답 객체 (사용자 목록 반환)
 * @returns {object} 200 - 사용자 목록 조회 성공 시 사용자 목록 반환
 * @returns {object} 500 - 서버 오류 시 에러 메시지 반환
 */
router.get("", authenticateToken, isAdmin, authService.listUsers);

/**
 * @function 로그 조회 엔드포인트
 * @route GET /account/log
 * @middleware authenticateToken, isAdmin
 * @param {object} req - 요청 객체 (로그 조회를 위한 쿼리 파라미터 포함)
 * @param {object} res - 응답 객체 (로그 데이터 반환)
 * @returns {object} 200 - 로그 조회 성공 시 로그 데이터 반환
 * @returns {object} 400 - 쿼리 매칭 실패 시 에러 메시지 반환
 * @returns {object} 500 - 서버 오류 시 에러 메시지 반환
 */
router.get("/log", authenticateToken, isAdmin, LogService.fetchLogs);

module.exports = router;
