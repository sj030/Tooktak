const { FileRepository } = require("../db/models/files");
const JSZip = require("jszip");
const path = require("path");
const fs = require("fs");
const ftp = require("basic-ftp")

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
    const serviceAttr = serviceAttrs.find(serviceAttr => serviceAttr.name === key);
    if (serviceAttr) {
        return getSubQuery(serviceAttr.option, query[key]);
    }
    return {};
}

class FileService {
    /**
     * 파일을 검색합니다.
     * @param {*} serviceAttrs - 서비스의 속성 배열입니다. 
     * `{ name: String, attributes: [ { name: String, option: String, type: String, list: [ Mixed ] } ] }` 에서 `attributes`에 해당하는 배열입니다.
     * @param {*} query - `{ name: { text: String } }` 또는 `{ name: { min: Number | Date, max: Number | Date } }` 또는 `{ name: { list: [ Mixed ] }`의 배열입니다.
     * @returns {Array} query에 해당하는 파일들을 반환합니다.
     */
    static async getAllMetaDataByQuery(serviceAttrs, query) {
        let searchQuery = {};
        for (const key in query) {
            searchQuery[key] = makeQueryWithAttr(serviceAttrs, query[key], key);
        }
        return await FileRepository.findAllByQuery(searchQuery);
    }

    static async addFiles(files) {
        await FileRepository.insertMany(files);
    }
}

module.exports = { FileService };