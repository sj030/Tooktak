function isAdmin(req, res, next) {
    // Make sure req.user is an object
    if (typeof req.user === 'string') {
        try {
            req.user = JSON.parse(req.user);
        } catch (error) {
            return res.status(400).json({ message: "User data is corrupted" });
        }
    }

    if (!req.user || !req.user.data || !req.user.data.role) {
        return res.status(401).json({ message: "Authentication required or incomplete user data" });
    }

    if (req.user.data.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admins only." });
    }
}


module.exports = isAdmin;
