"use strict";
const router = require("express").Router();
const passport = require("passport");

const User = require("../../models/user.model");
const userController = require("../../controller/user");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const users = await User.find().select("_id email nama");
      res.json(users);
    } catch (error) {
      res.status(500).json({
        message: "Unkown error occurs",
        error
      });
    }
  }
);

module.exports = router;
