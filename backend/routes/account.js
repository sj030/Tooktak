const express = require("express");
const router = express.Router();
const {authService} = require("../services/authservice");
const authenticateToken = require('../middleware/authenticateToken'); // Import the middleware
const isAdmin = require("../middleware/isAdmin"); 

router.post("/login", authService.login);
router.post("/refresh", authService.refresh);
// router.get("/logout", authenticateToken, (req, res) => {
// }); -> client쪽에서 세션 혹은 로컬스토리지에서 jwt 삭제

router.post("/add", authenticateToken, isAdmin, authService.createUser);
router.delete("/:username", authenticateToken, isAdmin, authService.deleteUser);
router.get("/list", authenticateToken, isAdmin, (req, res) => {

});

// router.post("/reset", authenticateToken, (req, res) => {
// }); -> 환경변수로 관리자 ID, PW 관리

router.get("/log", authenticateToken, (req, res) => {

});

module.exports = router;