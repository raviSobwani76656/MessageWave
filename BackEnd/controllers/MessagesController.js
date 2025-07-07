const Messages = require("../models/Messages");
const { Op } = require("sequelize");

const sendMessage = async (req, res) => {
  try {
    // Log the incoming request
    console.log("📥 Request Body:", req.body);

    const { senderId, receiverId, content } = req.body;

    // Check if any field is missing
    if (!senderId || !receiverId || !content) {
      console.log(" Missing data:", { senderId, receiverId, content });
      return res.status(400).json({
        status: false,
        message: "senderId, receiverId, and content are required",
      });
    }

    // Attempt to create message
    const message = await Messages.create({ senderId, receiverId, content });

    return res.status(201).json({
      status: true,
      message: "Message sent successfully",
      data: message,
    });
  } catch (err) {
    console.error(" Error occurred in sendMessage", err);
    return res.status(500).json({
      status: false,
      message: "Server error while sending the message",
      error: err.message,
    });
  }
};

const getMessage = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    if (!senderId || !receiverId) {
      console.log("Either senderId or receiverId is missing");
      return res.status(400).json({
        status: false,
        message: "Either senderId or receiveId is missing",
      });
    }

    const messages = await Messages.findAll({
      where: {
        [Op.or]: [
          { senderId, receiverId },
          { senderId: receiverId, receiverId: senderId },
        ],
      },
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json({
      status: true,
      message: "Messages retreived Successfully",
      data: messages,
    });
  } catch (err) {
    console.log("Error Occured while retrerving  the message");
    return res.status(404).json({
      status: false,
      message: "Error Ourred while retreiving the message",
    });
  }
};

module.exports = { sendMessage, getMessage };
