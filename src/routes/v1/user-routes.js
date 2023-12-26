const express = require("express");
const router = express.Router();
const { UserController } = require("./../../controllers/index");
const {
  UserFieldValidation,
  UploadImageToCloudinary,
  LoginUserFieldValidation,
  VerifyToken,
  HashPass,
  DestroyImageFromCloudinary,
} = require("./../../middlewares/index");
router.route("/:id").get(VerifyToken, UserController.getUserById);
router
  .route("/signup")
  .post(
    UserFieldValidation,
    UploadImageToCloudinary,
    HashPass,
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
router.route("/me").get(VerifyToken, UserController.getMyProfile);

router
  .route("/update-password")
  .patch(VerifyToken, HashPass, UserController.changePassword);
router.route("/forget-password").patch(UserController.forgetPassword);
router.route("/reset-password").patch(HashPass, UserController.resetPassword);

module.exports = router;
