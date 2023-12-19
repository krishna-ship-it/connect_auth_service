const { UserRepository } = require("./../repositories/index");
const bcrypt = require("bcrypt");
const { signJwt } = require("./../utils/commons/jwt");
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
      const user = await UserRepository.login(email, password);
      if (await bcrypt.compare(password, user.password)) {
        delete user.dataValues.password;
        const token = await signJwt({ id: user.id });
        return { user, token };
      } else throw new Error("invalid credentials");
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
