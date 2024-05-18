const express = require("express");
const router = express.Router();

const { ServiceAttrService } = require("../services/serviceattrservice");
const { Literals } = require("../literal/literals");

// 서비스를 추가합니다.
router.post("/", async (req, res) => {
    await ServiceAttrService.addServices(req.body)
        .then(() => {
            res.status(200).send(Literals.SERVICE.ADD_SERVICE_SUCCESS);
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

// 모든 서비스 이름을 가져옵니다. 
router.get("/attributes", async (req, res) => {
    await ServiceAttrService.getAllServicesWithAttributes()
        .then((result) => {
            if (result.length === 0) {
                res.status(400).send(Literals.SERVICE.NO_SERVICE_ERROR);
            }
            else {
                res.status(200).send(result);
            }
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

/**
 * 이름이 :name인 서비스의 속성을 가져옵니다.
 * 현재는 버전별로 이름이 다르다고 가정하고 있으나, 
 * 추후에는 이름이 같은 서비스들의 속성을 합쳐서 가져오도록 수정해야 함
 */
router.get("/attributes/:name", async (req, res) => {
    await ServiceAttrService.getServiceByName(req.params.name)
        .then((result) => {
            if (!result) {
                res.status(400).send(Literals.SERVICE.NO_SERVICE_ERROR);
            }
            else {
                res.status(200).send(result);
            }
        })
        .catch((error) => {
            res.status(500).send(error.message);
        });
});

module.exports = router;