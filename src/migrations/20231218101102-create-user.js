"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        len: [8, 16],
      },
      avatar_public_id: {
        type: Sequelize.STRING,
      },
      avatar_public_url: {
        type: Sequelize.STRING,
        isUrl: true,
      },
      role: {
        type: Sequelize.STRING,
        isIn: ["user", "admin"],
        defaultValue: "user",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
