const ApiError = require("../utils/errors/ApiError");
const { verifyJWTToken } = require("./../utils/commons/jwt");
const { User } = require("./../models/index");
const { errors, statusCodes } = require("./../utils/errors/errors");
const verifyToken = async (req, res, next) => {
  if (!req.headers["x-auth-token"])
    return next(
      new ApiError(
        "token is required",
        statusCodes.UnauthorizedRequest,
        errors.UnauthorizedRequest
      )
    );

  try {
    const decoded = verifyJWTToken(req.headers["x-auth-token"]);
    const user = await User.findOne({
      where: {
        id: decoded.id,
      },
    });
    if (!user)
      return next(
        new ApiError(
          "invalid token",
          statusCodes.UnauthorizedRequest,
          errors.UnauthorizedRequest
        )
      );
    delete user.dataValues.password;
    req.user = user;
    next();
  } catch (err) {
    return next(err);
  }
};
module.exports = verifyToken;
