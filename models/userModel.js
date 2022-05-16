const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "user must have username"],
    unique: true,
  },
  password: { type: String, required: [true, "user must have password"] },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
