const prisma = require("../lib/prisma");

async function getPosts(req, res) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
}

async function getPostById(req, res) {
  try {
    const postId = parseInt(req.params.id);
    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch post" });
  }
}

async function createPost(req, res) {
  try {
    const { content } = req.body;
    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content is required" });
    }
    const authorId = parseInt(req.user.id);
    const post = await prisma.post.create({ data: { authorId, content } });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create post" });
  }
}

async function removePost(req, res) {
  try {
    const postId = parseInt(req.params.id);

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) return res.status(404).json({ message: "Post not found" });

    await prisma.post.delete({ where: { id: postId } });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(404).json({ message: "Post not found" });
  }
}

module.exports = { getPosts, getPostById, createPost, removePost };
