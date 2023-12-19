const { User } = require("./../models/index");
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
      throw err;
    }
  }
  static async login(email, password) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      if (!user) throw new Error("invalid credentials");
      return user;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = UserRepository;
