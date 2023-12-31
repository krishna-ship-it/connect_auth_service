const { v2: cloudinary } = require("cloudinary");
const ApiError = require("../utils/errors/ApiError");
const { errors, statusCodes } = require("./../utils/errors/errors");
const imageUploader = async (req, res, next) => {
  try {
    if (!req.files || !req.files.avatar)
      return next(
        new ApiError(
          "image is required",
          statusCodes.BadRequest,
          errors.BadRequest
        )
      );
    const uploadedImage = await cloudinary.uploader.upload(
      req.files.avatar.tempFilePath
    );
    req.body.avatar_public_id = uploadedImage.public_id;
    req.body.avatar_public_url = uploadedImage.secure_url;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = imageUploader;
