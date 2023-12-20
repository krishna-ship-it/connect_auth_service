const ApiError = require("../utils/errors/ApiError");
const { User } = require("./../models/index");
class UserRepository {
  static async signup(userData) {
    try {
      const user = await User.create(userData);
      delete user.dataValues.password;
      return user;
    } catch (err) {
      throw new ApiError(
        "internal server error while signing up(Repository Layer)",
        500,
        "serverError"
      );
    }
  }
  static async delete(id) {
    try {
      await User.destroy({
        where: {
          id,
        },
      });
    } catch (err) {
      throw new ApiError(
        "internal server error(Repository Layer)",
        500,
        "serverError"
      );
    }
  }
  static async login(email) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!user) throw new ApiError("invalid credentials", 401, "serverError");
      return user;
    } catch (err) {
      throw new ApiError(
        "internal server error while logging in (Repository Layer)",
        500,
        "serverError"
      );
    }
  }
  static async findUserById(id) {
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });
      if (!user) throw new ApiError("user does not exists", 400, "BadRequest");
      return user;
    } catch (error) {
      if (error.name === "BadRequest") throw error;
      throw new ApiError(
        "internal server error while searching the user",
        500,
        "serverError"
      );
    }
  }
  static async updateUserProfile(userInstance) {
    try {
      await userInstance.save();
      delete userInstance.dataValues.password;
      return userInstance;
    } catch (err) {
      throw new ApiError(
        "internal server error while updating the profile picture",
        500,
        "serverError"
      );
    }
  }
}
module.exports = UserRepository;
