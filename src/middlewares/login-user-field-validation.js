const ApiError = require("../utils/errors/ApiError");

const loginValidation = (req, res, next) => {
  if (
    !req.body ||
    !req.body.email ||
    !req.body.email.includes("@") ||
    !req.body.email.includes(".")
  )
    return next(
      new ApiError("please enter a valid email", 400, "validationError")
    );
  if (!req.body.password)
    return next(new ApiError("password is required", 400, "validationError"));
  next();
};

module.exports = loginValidation;
