const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  status: { type: Boolean, default: false },
  role: { type: String, default: "user" },
});

exports.User = mongoose.model("User", userSchema);
