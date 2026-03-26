const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");
const passport = require("passport");

async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, email, password: hash },
    });
    res.json({ message: "Registered", userId: user.id });
  } catch (error) {
    console.error("Failed to register ", error);
    res.status(500).json({ message: "Registration failed" });
  }
}

async function login(req, res) {
  try {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    });
  } catch (error) {
    console.error("Failed to login ", error);
    res.status(500).json({ message: "Login failed" });
  }
}

module.exports = { register, login };
