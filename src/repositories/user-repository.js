const { Op } = require("sequelize");
const ApiError = require("../utils/errors/ApiError");
const { User } = require("./../models/index");
const { statusCodes, errors } = require("./../utils/errors/errors");
class UserRepository {
  static async signup(userData) {
    try {
      const user = await User.create(userData);
      delete user.dataValues.password;
      return user;
    } catch (err) {
      throw err;
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
  static async findUserById(id) {
    try {
      const user = await User.findOne({
        where: {
          id,
        },
      });
      if (!user)
        throw new ApiError(
          "user does not exists",
          statusCodes.BadRequest,
          errors.BadRequest
        );
      return user;
    } catch (err) {
      throw err;
    }
  }
  static async update(userInstance) {
    try {
      await userInstance.save();
      delete userInstance.dataValues.password;
      return userInstance;
    } catch (err) {
      throw err;
    }
  }
  static async findUserByEmail(email) {
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user)
        throw new ApiError(
          "invalid email",
          statusCodes.NotFound,
          errors.NotFound
        );
      return user;
    } catch (err) {
      throw err;
    }
  }
  static async getMany(filter, pagination) {
    try {
      const users = await User.findAll({ where: filter, ...pagination });
      return users;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = UserRepository;
