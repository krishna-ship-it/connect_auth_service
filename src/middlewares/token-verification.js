const { verifyJWTToken } = require("./../utils/commons/jwt");
const verifyToken = async (req, res, next) => {
  if (!req.headers["x-auth-token"]) return next(new Error("token is required"));

  try {
    const decoded = verifyJWTToken(req.headers["x-auth-token"]);
    next();
  } catch (err) {
    return next(err);
  }
};
module.exports = verifyToken;
