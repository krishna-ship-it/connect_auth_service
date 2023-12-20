const ApiError = require("../utils/errors/ApiError");
const { UserService } = require("./../services/index");
const { v2: cloudinary } = require("cloudinary");

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const data = await UserService.login(email, password);
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

const signup = async (req, res, next) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar_public_id: req.body.avatar_public_id,
      avatar_public_url: req.body.avatar_public_url,
    };

    const data = await UserService.signup(userData);
    res.status(200).json({
      data,
    });
  } catch (err) {
    cloudinary.uploader.destroy(req.avatar_public_id);
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await UserService.delete(req.id);
  } catch (err) {
    next(err);
  }
};
const updateProfilePicture = async (req, res, next) => {
  try {
    const user = await UserService.updateProfilePicture(
      req.user.id,
      req.body.avatar_public_id,
      req.body.avatar_public_url
    );
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      err,
    });
  }
};
const changePassword = async (req, res, next) => {
  if (!req.body.oldPassword)
    return next(new ApiError("old password is required", 400, "BadRequest"));
  try {
    const user = await UserService.changePassword(
      req.user.id,
      req.body.oldPassword,
      req.body.password
    );
    res.status(200).json({
      user,
    });
  } catch (err) {
    if (
      err.name === "serverError" ||
      err.name === "UnauthorizedAccess" ||
      err.name === "BadRequest"
    )
      return next(err);

    console.log(err);
    next(
      new ApiError(
        `failed to change password,try again letter`,
        500,
        "serverError"
      )
    );
  }
};

module.exports = {
  signup,
  login,
  deleteUser,
  updateProfilePicture,
  changePassword,
};
