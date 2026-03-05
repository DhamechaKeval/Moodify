const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
  token: {
    type: String,
    required: [true, "token required for blacklisting."],
  },
});

const Blacklist = mongoose.model("Blacklist", blacklistSchema);

module.exports = Blacklist;
