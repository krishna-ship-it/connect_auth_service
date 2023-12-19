const bcrypt = require("bcrypt");
const hashText = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    next();
  } catch (err) {
    return next(new Error("failed to encrypt password!"));
  }
};
module.exports = hashText;
