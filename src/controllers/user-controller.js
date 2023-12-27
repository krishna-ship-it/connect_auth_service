const ApiError = require("../utils/errors/ApiError");
const { UserService } = require("./../services/index");
const { v2: cloudinary } = require("cloudinary");
const { FORGET_PASSWORD_OTP_ATTEMPTS } = require("./../config/index");
const { errors, statusCodes } = require("../utils/errors/errors");
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
      otp_expires_in: Date.now(),
      forget_pass_attempts: FORGET_PASSWORD_OTP_ATTEMPTS,
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
    next(err);
  }
};
const changePassword = async (req, res, next) => {
  if (!req.body.oldPassword)
    return next(
      new ApiError(
        "old password is required",
        statusCodes.BadRequest,
        errors.BadRequest
      )
    );
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
    next(err);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    if (!req.body.email)
      return next(
        new ApiError(
          "email is required",
          statusCodes.BadRequest,
          errors.BadRequest
        )
      );
    await UserService.forgetPassword(req.body.email);
    res.status(200).json({
      message: "otp successfully sent to your email",
    });
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  if (!req.body.email || !req.body.otp)
    return next(
      new ApiError(
        "otp,email both are required",
        statusCodes.BadRequest,
        errors.BadRequest
      )
    );

  try {
    await UserService.resetPassword(
      req.body.email,
      req.body.password,
      req.body.otp
    );
    res.status(200).json({
      message:
        "successfully changed password, now login with your email and password",
    });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await UserService.getUserById(id);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

const getMyProfile = async (req, res, next) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (err) {
    next(err);
  }
};
const getAllUser = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers(req.query);
    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  signup,
  login,
  deleteUser,
  updateProfilePicture,
  changePassword,
  forgetPassword,
  resetPassword,
  getUserById,
  getMyProfile,
  getAllUser,
};
