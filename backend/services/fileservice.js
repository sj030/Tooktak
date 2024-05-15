const { FileRepository } = require("../db/models/files");

const standardFileAttrs = ["f_name", "f_extension", "f_path", "f_date", "chapter", "p_no"];

/**
 * option에 따라 subQuery를 생성합니다.
 * @param {*} option - range, checkbox, text 중 하나
 * @param {*} query - `{ text: String }` 또는 `{ min: Number | Date, max: Number | Date }` 또는 `{ list: [ Mixed ] }` 중 하나
 * @returns subQuery를 반환합니다.
 */
function getSubQuery(option, query) {
    let subQuery = {};
    switch (option) {
        case "range":
            subQuery = { "$gte": query["min"], "$lte": query["max"] };
            break;
        case "checkbox":
            subQuery = { "$in": query["list"] };
            break;
        case "text":
            subQuery = { "$regex": query["text"] };
            break;
    }
    return subQuery;
}

function makeQueryWithAttr(serviceAttrs, query, key) {
    let attr = null;
    for (attr of serviceAttrs) {
        if (attr.name === key) {
            break;
        }
    }
    if (attr) {
        return getSubQuery(attr.option, query);
    }
    return {};
}

class FileService {
    /**
     * 파일을 검색합니다.
     * @param {*} serviceAttrs - 서비스의 속성 배열입니다. 
     * `{ serviceName: String, attributes: [ { name: String, option: String, type: String, list: [ Mixed ] } ] }` 형식입니다.
     * @param {*} query - `{ name: { text: String } }` 또는 `{ name: { min: Number | Date, max: Number | Date } }` 또는 `{ name: { list: [ Mixed ] }`의 배열입니다.
     * @returns {Array} query에 해당하는 파일들을 반환합니다.
     */
    static async getAllMetaDataByQuery(serviceAttrs, query) {
        let searchQuery = {};
        for (const key in query) {
            const searchKey = standardFileAttrs.includes(key) ? key : "patient.attributes." + key;
            searchQuery[searchKey] = makeQueryWithAttr(serviceAttrs["attributes"], query[key], key);
        }
        return await FileRepository.findAllByQuery(searchQuery);
    }

    static async addFiles(files) {
        await FileRepository.insertMany(files);
    }
}

module.exports = { FileService };