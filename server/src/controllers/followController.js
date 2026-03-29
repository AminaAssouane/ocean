const prisma = require("../lib/prisma");

async function getFollowers(req, res) {
  const userId = parseInt(req.params.id);
  try {
    const followers = await prisma.follower.findMany({
      where: { followingId: userId },
      include: { follower: true },
    });
    res.json(followers);
  } catch (error) {
    console.error("Failed fetching followers. ", error);
    res.status(500).json({ message: "Failed fetching followers." });
  }
}

async function getFollowing(req, res) {
  const userId = parseInt(req.params.id);
  try {
    const following = await prisma.follower.findMany({
      where: { followerId: userId },
      include: { following: true },
    });
    res.json(following);
  } catch (error) {
    console.error("Failed fetching following users. ", error);
    res.status(500).json({ message: "Failed fetching following users." });
  }
}

async function follow(req, res) {
  const myId = parseInt(req.user.id);
  const userId = parseInt(req.params.id);
  try {
    const follow = await prisma.follower.create({
      data: { followerId: myId, followingId: userId },
    });
    res.json(follow);
  } catch (error) {
    console.error("Failed following user. ", error);
    res.status(500).json({ message: "Failed following user." });
  }
}

module.exports = { getFollowers, getFollowing, follow };
