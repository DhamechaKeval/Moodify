const id3 = require("node-id3");
const { uploadFile } = require("../services/storage.service");
const Song = require("../models/song.model");

const songUploadController = async (req, res) => {
  const songBuffer = req.file.buffer;
  const { mood } = req.body;

  const tags = id3.read(songBuffer);

  //console.log(tags);

  const [songFile, posterFile] = await Promise.all([
    uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/moodify/songs",
    }),
    uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "/moodify/poster",
    }),
  ]);

  const song = await Song.create({
    url: songFile.url,
    posterUrl: posterFile.url,
    title: tags.title,
    mood,
  });

  res.status(201).json({
    message: "Song uploaded successfully",
    song,
  });
};

const getSongController = async (req, res) => {
  const { mood } = req.query;

  const song = await Song.findOne({ mood });

  res.status(200).json({
    message: "song fetched successfully.",
    song,
  });
};

module.exports = { songUploadController, getSongController };
