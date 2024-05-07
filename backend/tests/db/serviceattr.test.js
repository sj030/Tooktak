const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("../../app");
const { ServiceAttrModel } = require("../../db/schemas/serviceattrs");

const attributes = [
    {
        "name": "한양대병원 신경과",
        "attributes": [
            {
                "name": "S-NO",
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
            }
        ]
    },
    {
        "name": "전주",
        "attributes": [
            {
                "name": "No.",
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
            }
        ]
    }
];

let mongoServer;

beforeAll(async () => {
    await mongoose.connection.close();
    mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri(), { dbName: "voinosis" });
})

afterAll(async () => {
    if (mongoose.connection) {
        await mongoose.connection.dropDatabase();
        await mongoose.disconnect();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe("addservice'", () => {
    afterEach(async () => {
        await ServiceAttrModel.deleteMany({});
    });

    it("one by one", async () => {
        const service = await ServiceAttrModel(attributes[0]);
        await service.save();
        const result = await ServiceAttrModel.find({});
        expect(result.length).toBe(1);
    });

    it("all at once", async () => {
        await ServiceAttrModel.insertMany(attributes);
        const result = await ServiceAttrModel.find({});
        expect(result.length).toBe(attributes.length);
    });
});

describe("getAllServicesName", () => {
    afterEach(async () => {
        await ServiceAttrModel.deleteMany({});
    });

    it("returns all services' name", async () => {
        await ServiceAttrModel.insertMany(attributes);
        const result = await ServiceAttrModel.find({}, { name: 1 });
        expect(result.length).toBe(attributes.length);
    });
});

describe("getServiceByName", () => {
    afterEach(async () => {
        await ServiceAttrModel.deleteMany({});
    });

    it("returns service by name", async () => {
        await ServiceAttrModel.insertMany(attributes);
        const result = await ServiceAttrModel.findOne({ name: attributes[0].name });
        expect(result.name).toBe(attributes[0].name);
    });

    it("returns service by name 2", async () => {
        await ServiceAttrModel.insertMany(attributes);
        const result = await ServiceAttrModel.findOne({ name: attributes[1].name });
        expect(result.name).toBe(attributes[1].name);
    });

    it("returns null if no service found", async () => {
        await ServiceAttrModel.insertMany(attributes);
        const result = await ServiceAttrModel.findOne({ name: "서비스가 없습니다." });
        expect(result).toBeNull();
    });
});