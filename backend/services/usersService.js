const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel, saltRounds } = require("../db/schemas/users");
const config = require("../config/vars");
const { Literals } = require("../literal/literals");

class UserService {
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
                return JSON.stringify({
                    status: 404,
                    message: Literals.ACCOUNT.NOT_FOUND
                });
            } else {
                return JSON.stringify({
                    status: 200,
                    data: user
                });
            }
        } catch (err) {
            return JSON.stringify({
                status: 500,
                message: Literals.SERVER_ERROR + err.message
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
                    message: Literals.ACCOUNT.AUTHENTICATION_ERROR
                });
            } else {
                const accessToken = jwt.sign(
                    {
                        id: findUser._id,
                        username: findUser.username,
                        role: findUser.role
                    },
                    config.jwt.secret_key,
                    {
                        expiresIn: config.jwt.access_expires
                    }
                );
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
                    message: Literals.ACCOUNT.AUTHENTICATION_SUCCESS
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
                return JSON.stringify({ status: 401, message: Literals.ACCOUNT.REFRESH_REQUIRED });
            }

            let decoded = jwt.verify(refreshToken, config.jwt.refresh_secret_key);
            const user = await UserModel.findById(decoded.id);

            if (!user || user.refreshToken !== refreshToken) {
                return JSON.stringify({ status: 403, message: Literals.ACCOUNT.INVALID_REFRESH_TOKEN });
            }

            const newAccessToken = jwt.sign(
                { id: user._id, username: user.username, role: user.role },
                config.jwt.secret_key,
                { expiresIn: config.jwt.access_expires }
            );

            return JSON.stringify({ status: 200, data: { accessToken: newAccessToken } });

        } catch (err) {
            if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
                return JSON.stringify({ status: 403, message: Literals.ACCOUNT.INVALID_REFRESH_TOKEN });
            } else {
                console.error("Error in refreshing token: ", err);
                return JSON.stringify({ status: 500, message: Literals.ACCOUNT.INTERNAL_SERVER_ERROR });
            }
        }
    }

    static async addUser(userData) {
        try {
            const existingUser = await UserModel.findOne({ username: userData.username });
            if (existingUser) {
                return JSON.stringify({
                    status: 409,
                    message: Literals.ACCOUNT.CREATE_ERROR_EXISTS
                });
            }

            const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
            userData.password = hashedPassword;

            const newUser = await UserModel.create(userData);
            if (newUser) {
                return JSON.stringify({
                    status: 201,
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
                    message: Literals.ACCOUNT.NOT_FOUND
                });
            } else {
                console.log(`User ${param} deleted successfully.`);
                return JSON.stringify({
                    status: 200,
                    message: Literals.ACCOUNT.DELETE_SUCCESS
                });
            }
        } catch (error) {
            console.error(`Delete error for user ${param}: ${error.message}`);
            return JSON.stringify({
                status: 500,
                message: Literals.SERVER_ERROR + error.message
            });
        }
    }

    static async listUsers(page, limit = 5) {
        const skip = (page - 1) * limit;
        try {
            const users = await UserModel.find({ username: { $ne: config.admin.id } })
                .skip(skip)
                .limit(limit)
                .exec();
            const totalUsers = await UserModel.countDocuments({ username: { $ne: config.admin.id } });
            return JSON.stringify({
                status: 200,
                data: users,
                total_count: totalUsers,
                items_per_page: limit,
                current_page: page,
                message: Literals.ACCOUNT.FETCH_SUCCESS
            });
        } catch (error) {
            console.error("Error fetching users: ", error);
            return JSON.stringify({
                status: 500,
                message: Literals.SERVER_ERROR + error.message
            });
        }
    }
}

module.exports = { UserService };
