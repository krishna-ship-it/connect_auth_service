const { UserService } = require("./../services/index");
const { v2: cloudinary } = require("cloudinary");
const create = async (req, res, next) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      avatar_public_id: req.body.avatar_public_id,
      avatar_public_url: req.body.avatar_public_url,
    };
    console.log(userData);
    const user = await UserService.create(userData);
    res.status(200).json({
      user,
    });
  } catch (err) {
    cloudinary.uploader.destroy(req.avatar_public_id);
    next(err);
  }
};

module.exports = {
  create,
};
