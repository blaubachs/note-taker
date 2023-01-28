const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/notes", (req, res) => res.send("you dun it look at the url"));

module.exports = router;
