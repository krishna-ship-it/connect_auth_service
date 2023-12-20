const { UserService } = require("./../services/index");
const { v2: cloudinary } = require("cloudinary");

const login = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const data = await UserService.login(email, password);
    res.status(200).json({ data });
  } catch (err) {
    res.status(400).json({
      err,
      message: "something went wrong",
    });
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
module.exports = {
  signup,
  login,
  deleteUser,
  updateProfilePicture,
};
