const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());

//router module require
const authRouter = require("./routes/auth.route");

//router use
app.use("/api/auth", authRouter);

module.exports = app;
