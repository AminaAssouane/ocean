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

async function getUserById(req, res) {
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

async function searchUser(req, res) {
  try {
    const { username } = req.query;
    const results = await prisma.user.findMany({
      where: {
        username: { contains: username, mode: "insensitive" },
        NOT: { id: req.user.id },
      },
      select: { id: true, username: true, avatar: true },
      take: 10,
    });
    res.json(results);
  } catch (error) {
    console.error("Failed to search users. ", error);
    res.status(500).json({ message: "Failed to search users." });
  }
}

async function getAllUsers(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
      skip,
    });

    const total = await prisma.user.count();
    res.json({ users, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    console.error("Failed to fetch all users. ", error);
    res.status(500).json({ message: "Failed to fetch all users." });
  }
}

module.exports = { getMe, getUserById, updateUser, searchUser, getAllUsers };
