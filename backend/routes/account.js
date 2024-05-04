const express = require("express");
const router = express.Router();
const {authService} = require("../services/authservice");
router.post("/login", authService.login);

router.get("/logout", (req, res) => {

});

router.post("/add", (req, res) => {

});

router.post("/delete", (req, res) => {

});

router.get("/list", (req, res) => {

});

router.post("/reset", (req, res) => {

});

router.get("/log", (req, res) => {

});

module.exports = router;