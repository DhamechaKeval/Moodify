const { Router } = require("express");
const {
  userRegisterController,
  userLoginController,
  getMeController,
  logoutController,
} = require("../controller/auth.controller");
const verifyUser = require("../middlewares/auth.middleware");

const authRouter = Router();

/**
 * @route   POST /api/auth/register
 * @desc    API for user reistration
 * @access  Public
 */
authRouter.post("/register", userRegisterController);

/**
 * @route   POST /api/auth/login
 * @desc    API for user login
 * @access  Public
 */
authRouter.post("/login", userLoginController);

/**
 * @route   GET /api/auth/get-me
 * @desc    API for gatting loggedIn user details
 * @access  Private
 */
authRouter.get("/get-me", verifyUser, getMeController);

/**
 * @route   GET /api/auth/logout
 * @desc    API for logout
 * @access  Private
 */
authRouter.get("/logout", verifyUser, logoutController);

module.exports = authRouter;
