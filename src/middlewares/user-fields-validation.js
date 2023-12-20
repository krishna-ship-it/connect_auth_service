const ApiError = require("../utils/errors/ApiError");

const userFieldValidation = (req, res, next) => {
  console.log(req.body);
  if (!req.body || !req.body.name || req.body.name.length < 2)
    return next(new ApiError("name is required", 400, "validationError"));
  if (!req.body.password || req.body.length < 8 || req.body.length > 16)
    return next(new ApiError("password is required", 400, "validationError"));
  if (
    !req.body.email ||
    req.body.email.length < 5 ||
    !req.body.email.includes("@") ||
    !req.body.email.includes(".")
  )
    return next(
      new ApiError(
        "email is required,please enter valid email",
        400,
        "validationError"
      )
    );
  if (!req.files || !req.files.avatar)
    return next(new ApiError("image is required", 400, "validationError"));
  next();
};

module.exports = userFieldValidation;
