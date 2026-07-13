const express = require("express");
const router = express.Router();

const {
  signup,
  login,
} = require("../controllers/authController");

router.post("/SignUp", signup);
router.post("/Login", login);

module.exports = router;
