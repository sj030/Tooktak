const { LogModel } = require("../db/schemas/log");

class LogService {
    static async getLogs(queryParams, page, limit = 5) {
        const { username, role, ip, f_name, date } = queryParams;
        const filter = {};
        const skip = (page - 1) * limit;  // 페이지 계산을 위해 건너뛸 아이템 수

        // 필터 설정
        if (username) filter["meta.username"] = username;
        if (role) filter["meta.role"] = role;
        if (ip) filter["meta.ip"] = ip;
        if (f_name) filter["meta.f_name"] = f_name;

        // 날짜 범위 필터
        if (date) {
            const [startDate, endDate] = date.split("_to_").map(d => new Date(d));
            filter.timestamp = { $gte: startDate, $lte: endDate };
        }

        try {
            const totalLogs = await LogModel.countDocuments(filter); // 총 항목 수 계산
            const logs = await LogModel.find(filter)
                .skip(skip)
                .limit(limit)
                .exec();
            // 로그 데이터가 없을 경우
            if (logs.length === 0) {
                return JSON.stringify({
                    status: 204,
                    total_count: totalLogs,
                    items_per_page: limit,
                    current_page: page,
                    data: [],
                    message: "No logs matched the query."
                });
            }
            // 로그 데이터 반환
            return JSON.stringify({
                status: 200,
                total_count: totalLogs,
                items_per_page: limit,
                current_page: page,
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

module.exports = { LogService };
