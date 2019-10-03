const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user.model");
const keys = require("../../config/keys");

async function register(req, res) {
  try {
    const { email, password, nama } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({ email, password: hashPassword, nama });
    return res.json(newUser);
  } catch (error) {
    console.log(error);
    res.json({
      message: "failed to create user",
      error
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ message: `User with email: "${email}" does not exist` });
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password"
      });
    }

    const payload = { id: user._id, email: user.email };

    const accessToken = await jwt.sign(payload, keys.secretOrKey, {
      expiresIn: 36000000
    });
    return res.json({
      accessToken: `Bearer ${accessToken}`
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Failed login", error });
  }
}

module.exports = {
  register,
  login
};
