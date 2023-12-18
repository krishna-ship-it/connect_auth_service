const { UserRepository } = require("./../repositories/index");
const bcrypt = require("bcrypt");
class UserService {
  static async create(userData) {
    try {
      userData.password = await bcrypt.hash(userData.password, 12);
      const user = await UserRepository.create(userData);
      return user;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserService;
