const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    enum: {
      values: ["happy", "sad", "surprised"],
    },
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
