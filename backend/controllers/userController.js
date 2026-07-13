
const { UserSchema, ComplaintSchema } = require("../models/Schema");

const getAgentUsers = async (req, res) => {
  try {
    const agentUsers = await UserSchema.find({ userType: "Agent" });

    if (agentUsers.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(agentUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrdinaryUsers = async (req, res) => {
  try {
    const users = await UserSchema.find({ userType: "Ordinary" });

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAgentById = async (req, res) => {
  try {
    const { agentId } = req.params;

    const user = await UserSchema.findOne({ _id: agentId });

    if (user.userType === "Agent") {
      return res.status(200).json(user);
    }

    return res.status(404).json({ error: "User not found" });
  } catch {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteOrdinaryUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserSchema.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await UserSchema.deleteOne({ _id: id });
    await ComplaintSchema.deleteOne({ userId: id });

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, email, phone } = req.body;

    const user = await UserSchema.findByIdAndUpdate(
      _id,
      { name, email, phone },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: "Failed to update the user",
    });
  }
};

module.exports = {
  getAgentUsers,
  getOrdinaryUsers,
  getAgentById,
  deleteOrdinaryUser,
  updateUser,
};
