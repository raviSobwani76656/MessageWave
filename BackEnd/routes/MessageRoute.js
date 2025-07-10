const express = require("express");
const verifyToken = require("../middleware/authMiddleware");
const {
  sendMessage,
  updateMessage,
  deleteMessage,
  getMessage,
} = require("../controllers/MessagesController");
const router = express.Router();

router.post("/sendMessage", verifyToken, sendMessage);
router.get("/getMessage", verifyToken, getMessage);
router.delete("/deleteMessage", verifyToken, deleteMessage);
router.put("/updateMessage", verifyToken, updateMessage);

module.exports = router;
