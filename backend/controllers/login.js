const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email or password is missing." });
    }
    const existingUser = await User.findOne({
      where: { email },
    });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const savedPass = existingUser.dataValues.password;

    if (savedPass !== password) {
      return res.status(401).json({ error: "wrong password" });
    }
    res.status(200).json({
      message: "login successful",
      token: generateToken(existingUser.id),
    });
  } catch (error) {
    res.status(500).json({ error: "server side error on login" });
  }
};

function generateToken(id) {
  return jwt.sign({ userId: id }, process.env.TOKEN_SECRET);
}
