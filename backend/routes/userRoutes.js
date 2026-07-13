
const express = require("express");
const router = express.Router();

const {
  getAgentUsers,
  getOrdinaryUsers,
  getAgentById,
  deleteOrdinaryUser,
  updateUser,
} = require("../controllers/userController");

router.get("/AgentUsers", getAgentUsers);

router.get("/OrdinaryUsers", getOrdinaryUsers);

router.get("/AgentUsers/:agentId", getAgentById);

router.delete("/OrdinaryUsers/:id", deleteOrdinaryUser);

router.put("/user/:_id", updateUser);

module.exports = router;
