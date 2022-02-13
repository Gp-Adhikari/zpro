//imports
const mongoose = require("mongoose");

//mongoose schema
const otpSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now(),
    index: {
      expireAfterSeconds: 300,
    },
  },
});

mongoose.model("Otp", otpSchema);
