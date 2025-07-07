const express = require("express");
const {
  sendMessage,
  updateMessage,
  deleteMessage,
  getMessage,
} = require("../controllers/MessagesController");
const router = express.Router();

router.post("/sendMessage", sendMessage);
router.get("/getMessage", getMessage);
router.delete("/deleteMessage", deleteMessage);
router.put("/updateMessage", updateMessage);

module.exports = router;
