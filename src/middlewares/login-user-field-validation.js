const loginValidation = (req, res, next) => {
  console.log(req.body);
  if (
    !req.body ||
    !req.body.email ||
    !req.body.email.includes("@") ||
    !req.body.email.includes(".")
  )
    return next(new Error("please enter a valid email"));
  if (!req.body.password) return next(new Error("password is required"));
  console.log("login validator end");
  next();
};

module.exports = loginValidation;
