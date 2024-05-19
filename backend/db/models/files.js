const { FileModel } = require("../schemas/files");

class FileRepository {
    static async findAllByQuery(query) {
        return await FileModel.aggregate([
            {
                $lookup: {
                    from: "patients",
                    localField: "p_no",
                    foreignField: "id",
                    as: "patient"
                }
            },
            {
                $unwind: "$patient"
            },
            {
                $match: query
            }
        ]);
    }

    static async findNthPageByQuery(query, page, limit) {
        return await FileModel.aggregate([
            {
                $lookup: {
                    from: "patients",
                    localField: "p_no",
                    foreignField: "id",
                    as: "patient"
                }
            },
            {
                $unwind: "$patient"
            },
            {
                $match: query
            }
        ]).skip((page - 1) * limit).limit(limit);
    }

    static async insertMany(files) {
        await FileModel.insertMany(files);
    }

    static async findByIds(ids) {
        return await FileModel.find({ _id: { $in: ids } });
    }
}

module.exports = { FileRepository };