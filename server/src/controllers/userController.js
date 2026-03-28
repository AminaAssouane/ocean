const prisma = require("../lib/prisma");

async function getMe(req, res) {
  try {
    const userId = parseInt(req.user.id);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    res.json(user);
  } catch (error) {
    console.error("Failed to fetch self. ", error);
    res.status(500).json({ message: "Failed to fetch self." });
  }
}

async function getUser(req, res) {
  try {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Failed to fetch user. ", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
}

async function updateUser(req, res) {
  try {
    const userId = parseInt(req.params.id);
    if (userId !== req.user.id)
      return res
        .status(403)
        .json({ message: "Forbidden: cannot update another user" });
    const bio = req.body.bio ?? req.user.bio;
    const avatar = req.body.avatar ?? req.user.avatar;
    const cover = req.body.cover ?? req.user.cover;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { bio, avatar, cover },
    });
    res.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    console.error("Failed to update user. ", error);
    res.status(500).json({ message: "Failed to update user." });
  }
}

module.exports = { getMe, getUser, updateUser };
