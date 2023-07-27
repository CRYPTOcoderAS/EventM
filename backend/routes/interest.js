const express = require("express");
const router = express.Router();
const interestController = require("../controllers/interest");

router.post("/", interestController.addInterest);

module.exports = router;
