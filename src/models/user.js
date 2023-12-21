"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        len: [8, 16],
      },
      role: {
        type: DataTypes.STRING,
        isIn: ["user", "admin"],
        defaultValue: "user",
      },
      avatar_public_id: DataTypes.STRING,
      avatar_public_url: DataTypes.STRING,

      otp: {
        type: DataTypes.STRING,
      },

      otp_expires_in: {
        allowNull: false,
        type: DataTypes.BIGINT,
      },
      forget_pass_attempts: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 3,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
