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
}

module.exports = { ServiceAttrService };