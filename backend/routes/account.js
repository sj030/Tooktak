const express = require("express");
const router = express.Router();
const {authService} = require("../services/authservice");
const authenticateToken = require('../middleware/authenticateToken'); // Import the middleware
const isAdmin = require("../middleware/isAdmin"); 

router.post("/login", authService.login);

router.get("/logout", authenticateToken, (req, res) => {

});

router.post("/add", authenticateToken, isAdmin, authService.createUser);


router.post("/delete", authenticateToken, (req, res) => {

});

router.get("/list", authenticateToken, (req, res) => {

});

router.post("/reset", authenticateToken, (req, res) => {

});

router.get("/log", authenticateToken, (req, res) => {

});

module.exports = router;