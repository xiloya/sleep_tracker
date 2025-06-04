const express = require("express");
const router = express.Router();
const sleepDataController = require("../controllers/sleepDataController");
const checkAuth = require("../middleware/auth.middleware");

module.exports = router;

router.post("/", checkAuth, sleepDataController.createSleepData);

router.get("/:userId", checkAuth, sleepDataController.getUserSleepData);
/**
 * @swagger
 * tags:
 *   name: SleepData
 *   description: Sleep data tracking
 */

/**
 * @swagger
 * /api/sleepdata:
 *   post:
 *     summary: Create new sleep data
 *     tags: [SleepData]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - sleepTime
 *               - wakeTime
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               sleepTime:
 *                 type: string
 *               wakeTime:
 *                 type: string
 */

/**
 * @swagger
 * /api/sleepdata/{userId}:
 *   get:
 *     summary: Get sleep data for a user
 *     tags: [SleepData]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of sleep records
 */
