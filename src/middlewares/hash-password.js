const bcrypt = require("bcrypt");
const ApiError = require("../utils/errors/ApiError");

const hashText = async (req, res, next) => {
  try {
    if (!req.body.password)
      return next(new ApiError("new password is required", 400, "BadRequest"));
    req.body.password = await bcrypt.hash(req.body.password, 12);
    next();
  } catch (err) {
    return next(new ApiError("internal server error", 500, "serverError"));
  }
};
module.exports = hashText;
