const { UserRepository } = require("./../repositories/index");
const bcrypt = require("bcrypt");
const { signJwt } = require("./../utils/commons/jwt");
const ApiError = require("../utils/errors/ApiError");
class UserService {
  static async signup(userData) {
    try {
      const user = await UserRepository.signup(userData);
      const token = await signJwt({ id: user.id });
      return { user, token };
    } catch (err) {
      throw err;
    }
  }
  static async delete(id) {
    try {
      await UserRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
  static async login(email, password) {
    try {
      const user = await UserRepository.login(email);
      if (await bcrypt.compare(password, user.password)) {
        delete user.dataValues.password;
        const token = await signJwt({ id: user.id });
        return { user, token };
      } else throw new ApiError("invalid credentials", 401, "serverError");
    } catch (err) {
      throw err;
    }
  }
  static async updateProfilePicture(
    user_id,
    avatar_public_id,
    avatar_public_url
  ) {
    try {
      const user = await UserRepository.findUserById(user_id);
      user.avatar_public_id = avatar_public_id;
      user.avatar_public_url = avatar_public_url;
      return UserRepository.updateUserProfile(user);
    } catch (err) {
      throw new ApiError(
        "internal server error while updating the profile picture (service Layer)",
        500,
        "serverError"
      );
    }
  }
}

module.exports = UserService;
