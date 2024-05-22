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

function getSearchQuery(serviceAttrs, query) {
    let searchQuery = {};
    searchQuery["serviceName"] = serviceAttrs["name"];
    for (const key in query) {
        const searchKey = standardFileAttrs.includes(key) ? key : "patient.attributes." + key;
        searchQuery[searchKey] = makeQueryWithAttr(serviceAttrs["attributes"], query[key], key);
    }
    console.log(searchQuery);
    return searchQuery;
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
        return await FileRepository.findAllByQuery(getSearchQuery(serviceAttrs, query));
    }

    static async getNthPageMetaDataByQuery(serviceAttrs, query, page, limit) {
        return await FileRepository.findNthPageByQuery(getSearchQuery(serviceAttrs, query), page, limit);
    }

    static async addFiles(files) {
        await FileRepository.insertMany(files);
    }

    static async setDummyFiles() {
        await FileRepository.deleteAll();
        const dummy = [
            {
                "serviceName": "한양대병원 신경과",
                "f_name": "chapter1",
                "f_path": "/upload/5c0fd1c54e394jg.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-05",
                "chapter": 1,
                "p_no": "1"
            },
            {
                "serviceName": "한양대병원 신경과",
                "f_name": "chapter2",
                "f_path": "/upload/5c0fd1c54e395jg.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-05",
                "chapter": 2,
                "p_no": "1"
            },
            {
                "serviceName": "한양대병원 신경과",
                "f_name": "chapter3",
                "f_path": "/upload/5c0fd1c54e396jg.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-05",
                "chapter": 3,
                "p_no": "1"
            },
            {
                "serviceName": "한양대병원 신경과",
                "f_name": "chapter4",
                "f_path": "/upload/5c0fd1c54e397jg.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-05",
                "chapter": 4,
                "p_no": "1"
            },
            {
                "serviceName": "한양대병원 신경과",
                "f_name": "chapter5",
                "f_path": "/upload/5c0fd1c54e398jg.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-05",
                "chapter": 5,
                "p_no": "1"
            },
            {
                "serviceName": "한양대병원 신경과",
                "f_name": "chapter1",
                "f_path": "/upload/fj1.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-07",
                "chapter": 1,
                "p_no": "2"
            },
            {
                "serviceName": "한양대병원 신경과",
                "f_name": "chapter1",
                "f_path": "/upload/fj1.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-07",
                "chapter": 1,
                "p_no": "2"
            },
            {
                "serviceName": "한양대병원 신경과",
                "f_name": "chapter2",
                "f_path": "/upload/fj2.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-07",
                "chapter": 2,
                "p_no": "2"
            },
            {
                "serviceName": "한양대병원 신경과",
                "f_name": "chapter1",
                "f_path": "/upload/fa921.mp3",
                "f_extension": ".mp4",
                "f_date": "2024-01-05",
                "chapter": 1,
                "p_no": "3"
            },
            {
                "serviceName": "한양대병원 신경과",
                "f_name": "chapter2",
                "f_path": "/upload/fa922.mp3",
                "f_extension": ".mp4",
                "f_date": "2024-01-05",
                "chapter": 2,
                "p_no": "3"
            },
            {
                "serviceName": "한양대병원 신경과",
                "f_name": "chapter3",
                "f_path": "/upload/fa932.mp3",
                "f_extension": ".mp4",
                "f_date": "2024-01-05",
                "chapter": 3,
                "p_no": "3"
            },
            {
                "serviceName": "전주",
                "f_name": "chapter1",
                "f_path": "/upload/cv91.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-03",
                "chapter": 1,
                "p_no": "4"
            },
            {
                "serviceName": "전주",
                "f_name": "chapter2",
                "f_path": "/upload/cv92.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-03",
                "chapter": 2,
                "p_no": "4"
            },
            {
                "serviceName": "전주",
                "f_name": "chapter3",
                "f_path": "/upload/cv93.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-03",
                "chapter": 3,
                "p_no": "4"
            },
            {
                "serviceName": "전주",
                "f_name": "chapter4",
                "f_path": "/upload/cv94.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-03",
                "chapter": 4,
                "p_no": "4"
            },
            {
                "serviceName": "전주",
                "f_name": "chapter1",
                "f_path": "/upload/bd1.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-07",
                "chapter": 1,
                "p_no": "5"
            },
            {
                "serviceName": "전주",
                "f_name": "chapter2",
                "f_path": "/upload/bd2.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-07",
                "chapter": 2,
                "p_no": "5"
            },
            {
                "serviceName": "전주",
                "f_name": "chapter3",
                "f_path": "/upload/bd3.mp3",
                "f_extension": ".mp4",
                "f_date": "2023-03-07",
                "chapter": 3,
                "p_no": "5"
            }
        ];
        await FileRepository.insertMany(dummy);
    }
}

module.exports = { FileService };