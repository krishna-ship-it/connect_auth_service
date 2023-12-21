const ApiError = require("../utils/errors/ApiError");
const { errors, statusCodes } = require("./../utils/errors/errors");
const loginValidation = (req, res, next) => {
  if (
    !req.body ||
    !req.body.email ||
    !req.body.email.includes("@") ||
    !req.body.email.includes(".")
  )
    return next(
      new ApiError(
        "please enter a valid email",
        statusCodes.BadRequest,
        errors.BadRequest
      )
    );
  if (!req.body.password)
    return next(
      new ApiError(
        "password is required",
        statusCodes.BadRequest,
        errors.BadRequest
      )
    );
  next();
};

module.exports = loginValidation;
