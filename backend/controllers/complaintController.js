const {
  ComplaintSchema,
  UserSchema,
  AssignedComplaint,
} = require("../models/Schema");

const createComplaint = async (req, res) => {
  const UserId = req.params.id;

  try {
    const user = await UserSchema.findById(UserId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const complaint = new ComplaintSchema(req.body);
    const resultComplaint = await complaint.save();

    res.status(200).send(resultComplaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to register complaint" });
  }
};

const getUserComplaints = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await UserSchema.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const comment = await ComplaintSchema.find({ userId });

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

const getAllComplaints = async (req, res) => {
  try {
    const complaint = await ComplaintSchema.find();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve Complaints" });
  }
};

const assignComplaint = async (req, res) => {
  try {
    const assignedComplaint = req.body;

    await AssignedComplaint.create(assignedComplaint);

    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: "Failed to add assigned complaint" });
  }
};

const getAgentComplaints = async (req, res) => {
  try {
    const agentId = req.params.agentId;

    const complaints = await AssignedComplaint.find({ agentId });

    const complaintIds = complaints.map(
      (complaint) => complaint.complaintId
    );

    const complaintDetails = await ComplaintSchema.find({
      _id: { $in: complaintIds },
    });

    const updatedComplaints = complaints.map((complaint) => {
      const complaintDetail = complaintDetails.find(
        (detail) =>
          detail._id.toString() === complaint.complaintId.toString()
      );

      return {
        ...complaint._doc,
        name: complaintDetail?.name,
        city: complaintDetail?.city,
        state: complaintDetail?.state,
        address: complaintDetail?.address,
        pincode: complaintDetail?.pincode,
        comment: complaintDetail?.comment,
      };
    });

    res.json(updatedComplaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to get complaints" });
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { complaintId } = req.params;
    const { status } = req.body;

    if (!complaintId || !status) {
      return res
        .status(400)
        .json({ error: "Missing complaintId or status" });
    }

    const updatedComplaint =
      await ComplaintSchema.findByIdAndUpdate(
        complaintId,
        { status },
        { new: true }
      );

    await AssignedComplaint.findOneAndUpdate(
      { complaintId },
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res
        .status(404)
        .json({ error: "Complaint not found" });
    }

    res.json(updatedComplaint);
  } catch (error) {
    res.status(500).json({ error: "Failed to update complaint" });
  }
};

module.exports = {
  createComplaint,
  getUserComplaints,
  getAllComplaints,
  assignComplaint,
  getAgentComplaints,
  updateComplaintStatus,
};
