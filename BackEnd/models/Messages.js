const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Messages = sequelize.define("Messages", {
  senderId: {
    type: DataTypes.INTEGER,
  },

  receiverId: {
    type: DataTypes.INTEGER,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Messages;
