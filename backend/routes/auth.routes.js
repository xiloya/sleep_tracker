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
