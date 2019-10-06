"use strict";
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

const keys = require("./config/keys");
const userRoute = require("./routes/user");
const kasubRoute = require("./routes/kasub");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./config/passport")(passport);

app.use("/api/user", userRoute);
app.use("/api/kasub", kasubRoute);

mongoose
  .connect(keys.db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000
  })
  .then(() => console.log("connect to db server"))
  .catch(() => console.log("failed to connect to db server"));

module.exports = app;
