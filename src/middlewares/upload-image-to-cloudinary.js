const { v2: cloudinary } = require("cloudinary");
const imageUploader = async (req, res, next) => {
  try {
    console.log("uploading");
    const uploadedImage = await cloudinary.uploader.upload(
      req.files.avatar.tempFilePath
    );
    console.log(uploadedImage);
    req.body.avatar_public_id = uploadedImage.public_id;
    req.body.avatar_public_url = uploadedImage.secure_url;
    next();
  } catch (err) {
    return next(new Error("failed to upload image , please try again letter"));
  }
};

module.exports = imageUploader;
