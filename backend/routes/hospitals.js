const express = require("express");
const router = express.Router();

const { ServiceAttrService } = require("../services/serviceattrservice");
const { Literals } = require("../literal/literals");

// 서비스를 추가합니다.
router.post("/addservice", async (req, res) => {
    try {
        await ServiceAttrService.addService(req.body);
        res.status(200);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// 모든 서비스 이름을 가져옵니다. 
router.get("/", async (req, res) => {
    const result = await ServiceAttrService.getAllServiceWithAttributes();
    if (!result) {
        res.status(400).send(Literals.NO_SERVICE);
    }
    else {
        res.status(200).send(result);
    }
});

/**
 * 이름이 :name인 서비스의 속성을 가져옵니다.
 * 현재는 버전별로 이름이 다르다고 가정하고 있으나, 
 * 추후에는 이름이 같은 서비스들의 속성을 합쳐서 가져오도록 수정해야 함
 */
router.get("/:name/attribute", async (req, res) => {
    const name = req.params.name;
    const result = await ServiceAttrService.getServiceByName(name);
    if (!result) {
        res.status(400).send(Literals.NO_SERVICE);
    }
    else {
        res.status(200).send(result);
    }
});

module.exports = router;