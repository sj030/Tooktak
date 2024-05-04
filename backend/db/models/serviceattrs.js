const { ServiceAttrModel } = require("../schemas/serviceattrs");

class ServiceAttrRepository {
    /**
     * 서비스를 추가합니다.
     * @param {ServiceAttrModel} attributes 
     */
    static async addService(attributes) {
        const service = new ServiceAttrModel(attributes);
        await service.save();
    }

    /**
     * @returns {Array} 모든 서비스 이름을 가져옵니다.
     */
    static async getAllServicesName() {
        return await ServiceAttrModel.find({}, { name: 1 });
    }

    /**
     * @param {String} name 
     * @returns {*} 이름이 `name`인 서비스의 속성을 가져옵니다.
     */
    static async getServiceByName(name) {
        return await ServiceAttrModel.findOne({ name: name });
    }
}

module.exports = { ServiceAttrRepository };