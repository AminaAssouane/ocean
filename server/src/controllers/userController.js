const prisma = require("../lib/prisma");

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
    res.status(500).json({ message: "Failed to fetch user." });
  }
}

module.exports = { getUser };
