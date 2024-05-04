const mongoose = require("mongoose");

const numberAttrSchema = new mongoose.Schema({
    name: { // 속성 이름
        type: String,
        required: true,
    },
    min: { // 속성값으로 들어올 수 있는 최소값
        type: Number,
        required: false,
    },
    max: { // 속성값으로 들어올 수 있는 최대값
        type: Number,
        required: false,
    },
});

const stringAttrSchema = new mongoose.Schema({
    name: { // 속성 이름
        type: [String],
        required: true,
    },
});

const serviceAttrSchema = new mongoose.Schema({
    name: { // 병원 혹은 서비스의 이름
        type: String,
        required: true
    },
    attributes: [ // 들어갈 수 있는 속성값들
        {
            type: mongoose.Schema.Types.Mixed,
            enum: [numberAttrSchema, stringAttrSchema],
        }
    ]
});

const ServiceAttrModel = mongoose.model("ServiceAttr", serviceAttrSchema);

module.exports = { ServiceAttrModel };