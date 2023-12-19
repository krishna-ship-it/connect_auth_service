const express = require("express");
const router = express.Router();
const { UserController } = require("./../../controllers/index");
const {
  UserFieldValidation,
  UploadImageToCloudinary,
  LoginUserFieldValidation,
  VerifyToken,
  HashText,
} = require("./../../middlewares/index");
router
  .route("/signup")
  .post(
    UserFieldValidation,
    UploadImageToCloudinary,
    HashText,
    UserController.signup
  );
router.route("/login").post(LoginUserFieldValidation, UserController.login);
router.route("/protected").get(VerifyToken, (req, res, next) => {
  res.status(200).json({
    message: "success",
  });
});
module.exports = router;
