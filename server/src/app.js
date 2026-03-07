const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
//router module require
const authRouter = require("./routes/auth.route");

//router use
app.use("/api/auth", authRouter);

module.exports = app;
