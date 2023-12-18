const userFieldValidation = (req, res, next) => {
  console.log("validaion");
  if (!req.body.name || req.body.name.length < 2)
    return next(new Error("something went wrong"));
  if (!req.body.password || req.body.length < 8 || req.body.length > 16)
    return next(new Error("something went wrong"));
  if (
    !req.body.email ||
    req.body.email.length < 5 ||
    !req.body.email.includes("@") ||
    !req.body.email.includes(".")
  )
    return next(new Error("something went wrong"));
  if (!req.files || !req.files.avatar)
    return next(new Error("image is required"));
  console.log("passed");
  next();
};

module.exports = userFieldValidation;
