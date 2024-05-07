const { ServiceAttrRepository } = require("../db/models/serviceattrs");

class ServiceAttrService {
    /**
     * 서비스를 추가합니다.
     * @param {*} attributes 
     */
    static async addService(attributes) {
        await ServiceAttrRepository.addService(attributes);
    }

    /**
     * @returns {Array} 모든 서비스 이름을 가져옵니다.
     */
    static async getAllServicesName() {
        return await ServiceAttrRepository.getAllServicesName();
    }

    /**
     * @param {String} name 
     * @returns {*} 이름이 `name`인 서비스의 속성을 가져옵니다.
     */
    static async getServiceByName(name) {
        return await ServiceAttrRepository.getServiceByName(name);
    }

    /**
     * @returns {Array} 모든 서비스의 속성을 가져옵니다.
     */
    static async getAllServiceWithAttributes() {
        return await ServiceAttrRepository.getAllServicesAttributes();
    }
}

module.exports = { ServiceAttrService };