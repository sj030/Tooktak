const mongoose = require("mongoose");

const options = ["checkbox", "range", "text"];
const types = ["Number", "String", "Date"];

const serviceAttrSchema = new mongoose.Schema({
    name: { // 병원 혹은 서비스의 이름
        type: String,
        required: true
    },
    attributes: [{
        name: {
            type: String,
            required: true
        },
        option: {
            type: String,
            enum: options,
            required: true
        },
        type: {
            type: String,
            enum: types,
            required: true
        },
        list: { // option이 checkbox일 때만 사용 (checkbox에서 사용될 리스트)
            type: [String],
            required: false
        }
    }]
});

const ServiceAttrModel = mongoose.model("ServiceAttr", serviceAttrSchema);

module.exports = { ServiceAttrModel };