const ApiError = require("../utils/errors/ApiError");
const { verifyJWTToken } = require("./../utils/commons/jwt");
const { User } = require("./../models/index");
const verifyToken = async (req, res, next) => {
  if (!req.headers["x-auth-token"])
    return next(new ApiError("token is required", 401));

  try {
    const decoded = verifyJWTToken(req.headers["x-auth-token"]);
    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (!user)
      return next(new ApiError("invalid token", 401, "validationError"));
    delete user.dataValues.password;
    req.user = user;
    next();
  } catch (err) {
    return next(new ApiError(err.message, 401, "authanticationError"));
  }
};
module.exports = verifyToken;
