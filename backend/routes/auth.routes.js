const express = require("express");
const router = express.Router();

const {
  regsiterValidation,
  loginValidation,
} = require("../middleware/authvalidation.middleware");
const {
  login,
  register,
  userProfile,
  users,
} = require("../controllers/auth.controller");

const verifyToken = require("../middleware/auth.middleware");

router.post("/register", regsiterValidation, register);

router.post("/login", loginValidation, login);

router.get("/profile/:id", verifyToken, userProfile);

router.get("/users", verifyToken, users);

module.exports = router;
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 */

/**
 * @swagger
 * /api/auth/profile/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all users
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 */
