const jwt = require("jsonwebtoken");
const { UserRepository } = require("../db/models/users");

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // No token provided
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: `Invalid token: ${err.message}` });        
        }

        try {
            const user = await UserRepository.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: "Authentication Error" });
            }
            req.user = user; // Save the user to req.user
            next();
        } catch (error) {
            return res.status(500).json({ message: "Server Error" });
        }
    });
}

module.exports = authenticateToken;
