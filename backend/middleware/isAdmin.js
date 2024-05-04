function isAdmin(req, res, next) {
    // 이미 인증을 완료했고, 사용자 정보가 req.user에 저장되어 있는지 확인
    if (!req.user) {
        return res.status(401).json({ message: "Authentication required" });
    }

    // 사용자가 admin 역할을 가지고 있는지 확인
    if (req.user.role === "admin") {
        next(); // 사용자가 admin이면 요청을 계속 진행
    } else {
        res.status(403).json({ message: "Access denied. Admins only." }); // admin이 아니면 접근 거부
    }
}

module.exports = isAdmin;
