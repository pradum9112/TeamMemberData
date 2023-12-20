const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

const FORGOTPASSWORDOTP = new mongoose.model("FORGOTPASSWORDOTP", otpSchema);

module.exports = FORGOTPASSWORDOTP;
