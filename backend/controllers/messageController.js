
const { MessageSchema } = require("../models/Schema");

const sendMessage = async (req, res) => {
  try {
    const { name, message, complaintId } = req.body;

    const messageData = new MessageSchema({
      name,
      message,
      complaintId,
    });

    const messageSaved = await messageData.save();

    res.status(200).json(messageSaved);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

const getMessages = async (req, res) => {
  try {
    const { complaintId } = req.params;

    const messages = await MessageSchema.find({
      complaintId,
    }).sort("-createdAt");

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve messages" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
