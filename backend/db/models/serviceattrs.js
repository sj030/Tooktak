const { ServiceAttrModel } = require("../schemas/serviceattrs");

class ServiceAttrRepository {
    /**
     * 서비스를 추가합니다.
     * @param {ServiceAttrModel} attributes 
     */
    static async insertMany(attributes) {
        await ServiceAttrModel.insertMany(attributes);
    }

    /**
     * @param {String} name 
     * @returns {*} 이름이 `name`인 서비스의 속성을 가져옵니다.
     */
    static async findByName(name) {
        return await ServiceAttrModel.findOne({ name: name });
    }

    /**
     * @returns {Array} 모든 서비스의 속성을 가져옵니다.
     */
    static async findAll() {
        return await ServiceAttrModel.find({});
    }

    static async deleteAll() {
        await ServiceAttrModel.deleteMany({});
    }
}

module.exports = { ServiceAttrRepository };