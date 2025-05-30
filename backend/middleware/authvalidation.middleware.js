const { Validator } = require("node-input-validator");

const regsiterValidation = async (req, res, next) => {
  const validateRule = {
    firstName: "required|string",
    lastName: "required|string",
    email: "required|email",
    password: "required|min:3",
  };

  const v = new Validator(req.body, validateRule);

  const matched = await v.check();

  if (!matched) {
    return res.status(412).send({
      success: false,
      message: "Validation failed",
      data: v.errors,
    });
  } else {
    next();
  }
};

const loginValidation = async (req, res, next) => {
  const validateRule = {
    email: "required|email",
    password: "required|min:3",
  };

  const v = new Validator(req.body, validateRule);

  const matched = await v.check();

  if (!matched) {
    return res.status(412).send({
      success: false,
      message: "Validation failed",
      data: v.errors,
    });
  } else {
    next();
  }
};

module.exports = {
  regsiterValidation,
  loginValidation,
};
