const prisma = require("../lib/prisma");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { username, password: hash } });
  res.json({ message: "Registered", userId: user.id });
}

async function login(req, res) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  });
}

module.exports = { register, login };
