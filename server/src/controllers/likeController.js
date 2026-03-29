const prisma = require("../lib/prisma");

async function getLikedPosts(req, res) {
  const id = parseInt(req.user.id);
  try {
    const posts = await prisma.like.findMany({
      where: { userId: id },
      include: { post: true },
      orderBy: { post: { createdAt: "desc" } },
    });
    res.json(posts);
  } catch (error) {
    console.error("Failed fetching liked posts. ", error);
    res.status(500).json({ message: "Failed fetching liked posts." });
  }
}

module.exports = { getLikedPosts };
