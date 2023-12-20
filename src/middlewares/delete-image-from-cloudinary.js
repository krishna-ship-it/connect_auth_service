const { v2: cloudinary } = require("cloudinary");
const ApiError = require("../utils/errors/ApiError");

const imageDestroyer = async (req, res, next) => {
  try {
    if (!req.user.avatar_public_id)
      return next(new ApiError("nothing to delete", 400, "BadRequest"));
    await cloudinary.uploader.destroy(req.user.avatar_public_id);
    next();
  } catch (err) {
    return next(
      new ApiError(
        `failed to delete image , please try again letter,${err.message}`,
        500,
        "serverError"
      )
    );
  }
};

module.exports = imageDestroyer;
