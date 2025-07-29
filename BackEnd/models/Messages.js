const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Messages = sequelize.define("Messages", {
  senderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  receiverId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Messages;
