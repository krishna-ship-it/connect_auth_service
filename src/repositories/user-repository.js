const { User } = require("./../models/index");
class UserRepository {
  static async create(userData) {
    try {
      const user = await User.create(userData);
      return user;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = UserRepository;
