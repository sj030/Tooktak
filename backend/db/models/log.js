const { LogModel } = require("../schemas/log");

class LogRepository {

    static async getLogs(queryParams, page, limit = 10) {
        const { username, role, ip, f_name, date } = queryParams;
        const filter = {};
        const skip = (page - 1) * limit;

        if (username) filter["meta.username"] = username;
        if (role) filter["meta.role"] = role;
        if (ip) filter["meta.ip"] = ip;
        if (f_name) filter["meta.f_name"] = f_name;

        if (date) {
            const [startDate, endDate] = date.split("_to_").map(d => new Date(d));
            filter.timestamp = { $gte: startDate, $lte: endDate };
        }

        try {
            const logs = await LogModel.find(filter)
                .skip(skip)
                .limit(limit)
                .exec();
            if (logs.length === 0) {  // Check if the logs array is empty
                return JSON.stringify({
                    status: 400,  // "Not Found" might be more appropriate
                    message: "No logs matched the query."
                });
            }
            return JSON.stringify({
                status: 200,
                data: logs,
                message: "Logs fetched successfully."
            });
        } catch (error) {
            console.error("Error fetching logs: ", error);
            return JSON.stringify({
                status: 500,
                message: "Server error: " + error.message
            });
        }
    }
}

module.exports = { LogRepository };
