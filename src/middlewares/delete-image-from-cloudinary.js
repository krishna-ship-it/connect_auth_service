const { v2: cloudinary } = require("cloudinary");
const ApiError = require("../utils/errors/ApiError");
const { errors, statusCodes } = require("./../utils/errors/errors");

const imageDestroyer = async (req, res, next) => {
  try {
    if (!req.user.avatar_public_id)
      return next(
        new ApiError(
          "nothing to delete",
          statusCodes.BadRequest,
          errors.BadRequest
        )
      );
    await cloudinary.uploader.destroy(req.user.avatar_public_id);
    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = imageDestroyer;
