const express = require("express");
const router = express.Router();
const { UserController } = require("./../../controllers/index");
const {
  UserFieldValidation,
  UploadImageToCloudinary,
  LoginUserFieldValidation,
  VerifyToken,
  HashText,
  DestroyImageFromCloudinary,
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
router
  .route("/update-profile-picture")
  .patch(
    VerifyToken,
    DestroyImageFromCloudinary,
    UploadImageToCloudinary,
    UserController.updateProfilePicture
  );
module.exports = router;
