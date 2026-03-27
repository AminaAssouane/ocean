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

async function login(req, res, next) {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: info?.message });
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.json({ message: "Logged in", user: { id: user.id } });
      });
    })(req, res, next);
  } catch (error) {
    console.error("Failed to login ", error);
    res.status(500).json({ message: "Login failed" });
  }
}

async function logout(req, res) {
  try {
    req.logout((error) => {
      if (error) {
        console.error("Failed to logout.", error);
        return res.status(500).json({ message: "Logout failed." });
      }
      res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (error) {
    console.error("Failed to logout. ", error);
    res.status(500).json({ message: "Logout failed." });
  }
}

module.exports = { register, login, logout };
