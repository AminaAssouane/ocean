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

async function like(req, res) {
  const userId = parseInt(req.user.id);
  const postId = parseInt(req.params.id);
  try {
    const like = await prisma.like.create({ data: { postId, userId } });
    res.json(like);
  } catch (error) {
    console.error("Failed liking post. ", error);
    res.status(500).json({ message: "Failed liking post." });
  }
}

async function dislike(req, res) {
  const userId = parseInt(req.user.id);
  const postId = parseInt(req.params.id);
  try {
    const dislike = await prisma.like.delete({
      where: { postId_userId: { postId, userId } },
    });
    res.json(dislike);
  } catch (error) {
    console.error("Failed disliking post. ", error);
    res.status(500).json({ message: "Failed disliking post." });
  }
}

module.exports = { getLikedPosts, like, dislike };
