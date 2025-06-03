const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/User");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const verifyEmail = await userModel.findOne({ email: email });
  try {
    if (verifyEmail) {
      return res.status(403).json({
        message: "Email already used",
      });
    } else {
      const userId = uuidv4();

      bcrypt.hash(password, 10).then((hash) => {
        const user = new userModel({
          userId: userId,
          firstName,
          lastName,
          email,
          password: hash,
        });

        user
          .save()
          .then((response) => {
            return res.status(201).json({
              message: "User successfully created!",
              result: response,
              success: true,
            });
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            });
          });
      });
    }
  } catch (error) {
    return res.status(412).send({
      success: false,
      message: error.message,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  let getUser;

  userModel
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      }

      getUser = user;

      return bcrypt.compare(password, user.password);
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      } else {
        const jwtToken = jwt.sign(
          {
            email: getUser.email,
            firstName: getUser.firstName,
            userId: getUser.userId,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          accessToken: jwtToken,
          userId: getUser.userId,
        });
      }
    })
    .catch((err) => {
      return res.status(401).json({
        message: err.message,
        success: false,
      });
    });
});

const userProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findOne({ userId: id });
    if (!user) {
      return res.status(403).json({
        message: "User not found",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: `User: ${user.firstName} ${user.lastName}`,
        data: user,
        success: true,
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

const users = asyncHandler(async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(200).json({
      data: users,
      success: true,
      message: "Users list",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = {
  register,
  login,
  userProfile,
  users,
};
