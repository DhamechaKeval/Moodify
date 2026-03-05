const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: [true, "username should be unique."],
      required: [true, "username should be required."],
    },
    email: {
      type: String,
      unique: [true, "email should be unique."],
      required: [true, "email should be required."],
    },
    password: {
      type: String,
      required: [true, "password should be required."],
      select: false,
    },
  },
  { timestamp: true },
);

const User = mongoose.model("user", userSchema);

module.exports = User;
