const { FileRepository } = require("../db/models/files");

class FileService {
    static async searchFiles(req, res) {
        const query = req.query;
        const result = await JSON.parse(FileRepository.findByFullInfo(query));
        switch (result.status) {
            case 200:
                res.status(200).send(result.data);
                break;
            case 400:
                res.status(400).send(result.message);
                break;
        }
    }
    static async addFile(req, res) {
        const fileData = req.body;
        const result = await JSON.parse(FileRepository.addFile(fileData));
        switch (result.status) {
            case 200:
                res.status(200).send(result.data);
                break;
            case 400:
                res.status(400).send(result.message);
                break;
            case 500:
                res.status(500).send(result.message);
                break;
        }
    }
}

module.exports = { FileService };