
const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getUserComplaints,
  getAllComplaints,
  assignComplaint,
  getAgentComplaints,
  updateComplaintStatus,
} = require("../controllers/complaintController");

router.post("/Complaint/:id", createComplaint);

router.get("/status/:id", getUserComplaints);

router.get("/status", getAllComplaints);

router.post("/assignedComplaints", assignComplaint);

router.get("/allcomplaints/:agentId", getAgentComplaints);

router.put("/complaint/:complaintId", updateComplaintStatus);

module.exports = router;
