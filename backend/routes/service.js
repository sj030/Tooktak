const express = require("express");
const router = express.Router();

const { ServiceAttrService } = require("../services/serviceattrservice");
const { Literals } = require("../literal/literals");

// 서비스를 추가합니다.
router.post("/", async (req, res) => {
    await ServiceAttrService.addServices(req.body)
        .then(() => {
            logger.info("성공메시지 알아서 적어주세요~",{ // authservice나 logservice에 적은거 참고해주세요
                // username: 나중에 미들웨어 넣으면 로그인한 유저 이름 넣어주세요
                ip: req.ip,
                // role: 나중에 미들웨어 넣으면 로그인한 유저 role 넣어주세요
                requestUrl: req.originalUrl,
                f_name: null
            });
            res.status(200).send(Literals.SERVICE.ADD_SERVICE_SUCCESS);
        })
        .catch((error) => {
            logger.error("에러메시지 알아서 적어주세요~",{ // authservice나 logservice에 적은거 참고해주세요
                // username: 나중에 미들웨어 넣으면 로그인한 유저 이름 넣어주세요
                ip: req.ip,
                // role: 나중에 미들웨어 넣으면 로그인한 유저 role 넣어주세요
                requestUrl: req.originalUrl,
                f_name: null,
                error: error.message  
            });
            res.status(500).send(error.message);
        });
});

// 모든 서비스 이름을 가져옵니다. 
router.get("/attributes", async (req, res) => {
    await ServiceAttrService.getAllServicesWithAttributes()
        .then((result) => {
            if (result.length === 0) {
                logger.error("에러메시지 알아서 적어주세요~",{ // authservice나 logservice에 적은거 참고해주세요
                    // username: 나중에 미들웨어 넣으면 로그인한 유저 이름 넣어주세요
                    ip: req.ip,
                    // role: 나중에 미들웨어 넣으면 로그인한 유저 role 넣어주세요
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: error.message  
                });
                res.status(400).send(Literals.SERVICE.NO_SERVICE_ERROR);
            }
            else {
                logger.info("성공메시지 알아서 적어주세요~",{ // authservice나 logservice에 적은거 참고해주세요
                    // username: 나중에 미들웨어 넣으면 로그인한 유저 이름 넣어주세요
                    ip: req.ip,
                    // role: 나중에 미들웨어 넣으면 로그인한 유저 role 넣어주세요
                    requestUrl: req.originalUrl,
                    f_name: null
                });
                res.status(200).send(result);
            }
        })
        .catch((error) => {
            logger.error("에러메시지 알아서 적어주세요~",{ // authservice나 logservice에 적은거 참고해주세요
                // username: 나중에 미들웨어 넣으면 로그인한 유저 이름 넣어주세요
                ip: req.ip,
                // role: 나중에 미들웨어 넣으면 로그인한 유저 role 넣어주세요
                requestUrl: req.originalUrl,
                f_name: null,
                error: error.message  
            });
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
                logger.error("에러메시지 알아서 적어주세요~",{ // authservice나 logservice에 적은거 참고해주세요
                    // username: 나중에 미들웨어 넣으면 로그인한 유저 이름 넣어주세요
                    ip: req.ip,
                    // role: 나중에 미들웨어 넣으면 로그인한 유저 role 넣어주세요
                    requestUrl: req.originalUrl,
                    f_name: null,
                    error: error.message  
                });
                res.status(400).send(Literals.SERVICE.NO_SERVICE_ERROR);
            }
            else {
                logger.info("성공메시지 알아서 적어주세요~",{ // authservice나 logservice에 적은거 참고해주세요
                    // username: 나중에 미들웨어 넣으면 로그인한 유저 이름 넣어주세요
                    ip: req.ip,
                    // role: 나중에 미들웨어 넣으면 로그인한 유저 role 넣어주세요
                    requestUrl: req.originalUrl,
                    f_name: null
                });
                res.status(200).send(result);
            }
        })
        .catch((error) => {
            logger.error("에러메시지 알아서 적어주세요~",{ // authservice나 logservice에 적은거 참고해주세요
                // username: 나중에 미들웨어 넣으면 로그인한 유저 이름 넣어주세요
                ip: req.ip,
                // role: 나중에 미들웨어 넣으면 로그인한 유저 role 넣어주세요
                requestUrl: req.originalUrl,
                f_name: null,
                error: error.message  
            });
            res.status(500).send(error.message);
        });
});

module.exports = router;