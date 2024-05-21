const { ServiceAttrRepository } = require("../db/models/serviceattrs");

class ServiceAttrService {
    /**
     * 서비스를 추가합니다.
     * @param {*} attributes 
     */
    static async addServices(attributes) {
        await ServiceAttrRepository.insertMany(attributes);
    }

    /**
     * @param {String} name 
     * @returns {*} 이름이 `name`인 서비스의 속성을 가져옵니다.
     */
    static async getServiceByName(name) {
        return await ServiceAttrRepository.findByName(name);
    }

    /**
     * @returns {Array} 모든 서비스의 속성을 가져옵니다.
     */
    static async getAllServicesWithAttributes() {
        return await ServiceAttrRepository.findAll();
    }

    static async setDummyServices() {
        await ServiceAttrRepository.deleteAll();
        const dummy = [
            {
                "name": "한양대병원 신경과",
                "version": "1",
                "attributes": [
                    {
                        "name": "patientNo",
                        "option": "range",
                        "type": "Number"
                    },
                    {
                        "name": "참여날짜",
                        "option": "range",
                        "type": "Date"
                    },
                    {
                        "name": "성명",
                        "option": "text",
                        "type": "String"
                    },
                    {
                        "name": "병록번호",
                        "option": "range",
                        "type": "Number"
                    },
                    {
                        "name": "나이",
                        "option": "range",
                        "type": "Number"
                    },
                    {
                        "name": "성별",
                        "option": "checkbox",
                        "type": "String",
                        "list": ["남", "여"]
                    },
                    {
                        "name": "MMSE",
                        "option": "range",
                        "type": "Number"
                    },
                    {
                        "name": "최종학력",
                        "option": "checkbox",
                        "type": "String",
                        "list": ["초졸", "중졸", "고졸", "대졸", "대학원졸"]
                    },
                    {
                        "name": "CDT",
                        "option": "range",
                        "type": "Number"
                    },
                    {
                        "name": "f_name",
                        "option": "checkbox",
                        "type": "String",
                        "list": ["chapter1", "chapter2", "chapter3", "chapter4", "chapter5"]
                    },
                    {
                        "name": "f_extension",
                        "option": "checkbox",
                        "type": "String",
                        "list": ["mp4"]
                    },
                    {
                        "name": "f_date",
                        "option": "range",
                        "type": "Date"
                    },
                    {
                        "name": "chapter",
                        "option": "range",
                        "type": "Number"
                    }
                ]
            },
            {
                "name": "전주",
                "version": "1",
                "attributes": [
                    {
                        "name": "patientNo",
                        "option": "range",
                        "type": "Number"
                    },
                    {
                        "name": "데이터 수집 날짜",
                        "option": "range",
                        "type": "Date"
                    },
                    {
                        "name": "대상자명",
                        "option": "text",
                        "type": "String"
                    },
                    {
                        "name": "나이",
                        "option": "range",
                        "type": "Number"
                    },
                    {
                        "name": "성별",
                        "option": "checkbox",
                        "type": "String",
                        "list": ["남", "여"]
                    },
                    {
                        "name": "최종학력",
                        "option": "checkbox",
                        "type": "String",
                        "list": ["초졸", "중졸", "고졸", "대졸", "대학원졸", "해당없음"]
                    },
                    {
                        "name": "MMSE",
                        "option": "range",
                        "type": "Number"
                    },
                    {
                        "name": "청력 정도",
                        "option": "checkbox",
                        "type": "String",
                        "list": ["하", "중", "상"]
                    },
                    {
                        "name": "f_name",
                        "option": "checkbox",
                        "type": "String",
                        "list": ["chapter1", "chapter2", "chapter3", "chapter4"]
                    },
                    {
                        "name": "f_extension",
                        "option": "checkbox",
                        "type": "String",
                        "list": ["mp4"]
                    },
                    {
                        "name": "f_date",
                        "option": "range",
                        "type": "Date"
                    },
                    {
                        "name": "chapter",
                        "option": "range",
                        "type": "Number"
                    }
                ]
            }
        ];
        await ServiceAttrRepository.insertMany(dummy);
    }
}

module.exports = { ServiceAttrService };