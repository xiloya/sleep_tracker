const express = require("express");
const router = express.Router();
const sleepDataController = require("../controllers/sleepDataController");

router.post("/", sleepDataController.createSleepData);
router.get("/:userId", sleepDataController.getUserSleepData);

module.exports = router;
