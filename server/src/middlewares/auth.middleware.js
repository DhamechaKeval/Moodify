const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklist.model");

const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: `Invalid Token`,
    });
  }

  const isTokenBlaclisted = await Blacklist.findOne({ token });
  if (isTokenBlaclisted) {
    return res.status(401).json({
      message: `Invalid Token`,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: `Invalid Token`,
    });
  }
};

module.exports = verifyUser;
