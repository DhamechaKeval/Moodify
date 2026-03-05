const User = require("../models/user.model");
//const Blacklist = require("../models/blacklist.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

const userRegisterController = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserAlradyExists = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlradyExists) {
    return res.status(409).json({
      message: `User is alrady exist with this ${isUserAlradyExists.email === email ? "email" : "username"}`,
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "2d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: `User register successfully.`,
    user: {
      username: user.username,
      email: user.email,
    },
  });
};

const userLoginController = async (req, res) => {
  const { username, email, password } = req.body;

  const isUserExists = await User.findOne({
    $or: [{ username }, { email }],
  }).select("+password");

  if (!isUserExists) {
    return res.status(404).json({
      message: `Invalid credentials`,
    });
  }

  const isMatched = await bcrypt.compare(password, isUserExists.password);

  if (!isMatched) {
    return res.status(404).json({
      message: `Invalid credentials`,
    });
  }

  const token = jwt.sign(
    {
      id: isUserExists._id,
      username: isUserExists.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: `Logged In successfulyy.`,
    user: {
      username: isUserExists.username,
      email: isUserExists.email,
    },
  });
};

const getMeController = async (req, res) => {
  const id = req.user.id;

  const user = await User.findById(id);

  res.status(200).json({
    message: `User details fetched`,
    user,
  });
};

const logoutController = async (req, res) => {
  const token = req.cookies.token;

  res.clearCookie("token");

  await redis.set(token, Date.now().toString());

  res.status(200).json({
    message: `User logged out successfully.`,
  });
};

module.exports = {
  userRegisterController,
  userLoginController,
  getMeController,
  logoutController,
};
