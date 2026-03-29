import { useEffect, useState } from "react";
import api from "../../services/api";
import PostPreview from "../../components/PostPreview/PostPreview";

export default function Likes() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getLikedPosts() {
      try {
        const res = await api.get("/likes");
        setPosts(res.data.map((like) => like.post));
      } catch (error) {
        console.error("Failed to fetch liked posts. ", error);
      }
    }
    getLikedPosts();
  }, []);

  if (!posts) return <div>Loading...</div>;

  return (
    <section>
      <h1>Liked posts : </h1>
      <div>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
