const Messages = require("../models/Messages");
const { Op } = require("sequelize");

const sendMessage = async (req, res) => {
  try {
    // Log the incoming request
    console.log(" Request Body:", req.body);

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

    console.log("hehehrh");
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

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      console.log("The message you are looking to delete does not exist");
      return res.status(404).json({
        status: false,
        message: "The message you are looking to delete does not exist",
      });
    }

    const deletedMessage = await Messages.destroy({ where: { id } });

    if (deletedMessage === 0) {
      return res.status(404).json({
        status: false,
        message: "Message not found or already deleted",
      });
    }
    console.log("'jadlgsd");

    return res
      .status(200)
      .json({ status: true, message: "Message deletion sucessfull" });
  } catch (err) {
    console.log("Error Occured While Deleting the Message", err);
    return res.status(500).json({
      status: false,
      message: "Error Occured while deleting the Message",
    });
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id, content } = req.body;

    if (!id || !content) {
      console.log("The message you are looking to update does not exist");
      return res.status(404).json({
        status: false,
        message: "The message you looking to update does not exist",
      });
    }

    const [updatedMessage] = await Messages.update(
      { content },
      { where: { id } }
    );

    if (!updatedMessage) {
      console.log(
        "The message to be update is already upto date or did not found"
      );
      return res.status(400).json({
        status: false,
        message:
          "The message to be update is already upto date or did not found",
      });
    }

    res.status(200).json({
      status: true,
      message: "The Message have been updated succesfully",
    });
  } catch (err) {
    console.log("Error Occured while updating the Message", err);
    res.status(500).json({
      status: false,
      message: "Error Occured while updating the message",
    });
  }
};

module.exports = { sendMessage, getMessage, deleteMessage, updateMessage };
