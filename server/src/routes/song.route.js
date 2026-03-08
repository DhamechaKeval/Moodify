const { Router } = require("express");
const upload = require("../middlewares/upload.middleware");
const {
  songUploadController,
  getSongController,
} = require("../controller/song.controller");

const songRouter = Router();

/**
 * @route   POST /api/songs/
 * @desc    for create songs
 */
songRouter.post("/", upload.single("song"), songUploadController);

/**
 * @route   GET  /api/songs/
 * @desc    fetch song
 */
songRouter.get("/", getSongController);

module.exports = songRouter;
