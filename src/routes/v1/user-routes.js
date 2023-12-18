const express = require("express");
const router = express.Router();
const { UserController } = require("./../../controllers/index");
const {
  UserFieldValidation,
  UploadImageToCloudinary,
} = require("./../../middlewares/index");
router
  .route("/")
  .post(UserFieldValidation, UploadImageToCloudinary, UserController.create);
module.exports = router;
