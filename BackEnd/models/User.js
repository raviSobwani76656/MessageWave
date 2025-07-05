const { DataTypes, DATEONLY } = require("sequelize");
const sequelize = require("../config/db");
const e = require("express");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
