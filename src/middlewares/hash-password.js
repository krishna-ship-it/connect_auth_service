const bcrypt = require("bcrypt");
const ApiError = require("../utils/errors/ApiError");
const { errors, statusCodes } = require("./../utils/errors/errors");
const hashText = async (req, res, next) => {
  try {
    if (!req.body.password)
      return next(
        new ApiError(
          "new password is required",
          errors.BadRequest,
          statusCodes.BadRequest
        )
      );
    req.body.password = await bcrypt.hash(req.body.password, 12);
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = hashText;
