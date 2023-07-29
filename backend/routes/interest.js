const express = require("express");
const router = express.Router();
const interestController = require("../controllers/interest");

router.post("/", interestController.addInterest);
router.get("/", interestController.getAllInterests);
module.exports = router;
