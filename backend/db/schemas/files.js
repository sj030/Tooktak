const mongoose = require("mongoose");

/**
 * 파일 스키마 정의.
 * 병원 별로 구현 할 때 병원 정보도 추가시킬 예정
 */
let fileSchema = mongoose.Schema({
    f_name: {
        type: String,
        required: true
    },
    f_extension: {
        type: String,
        required: true
    },
    f_root: {
        type: String,
        required: true
    },
    testDate: {
        type: String,
        required: true
    },
    chapter:{
        type: Number,
        required: true
    },
    p_no: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

let Files = mongoose.model("File", fileSchema);
module.exports = Files;