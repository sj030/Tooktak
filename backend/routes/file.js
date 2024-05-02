const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

router.get("/upload", (req, res) => {

});

router.get("/download", (req, res) => {

});

router.get("/search", (req, res) => {

});

// Get the header of the CSV file (TEST)
router.get("/get-csv-header/:hospital", (req, res) => {
    var FILE_NAME = `${req.params.hospital}.csv`;
    var filePath = path.join(__dirname, "..", "public", "csv", FILE_NAME);
    var file = fs.readFileSync(filePath, "utf-8");
    var lines = file.split("\r\n" || "\n" || "\r");
    var header = lines[0].split(", ").map((item) => item.replace(/"/g, ""));
    res.json({ header: header });
});

module.exports = router;