
const express = require("express");
const router = express.Router();

const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");

router.post("/messages", sendMessage);
router.get("/messages/:complaintId", getMessages);

module.exports = router;
