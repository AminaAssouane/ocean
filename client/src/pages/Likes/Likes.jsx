import { useEffect, useState } from "react";
import api from "../../services/api";
import PostPreview from "../../components/PostPreview/PostPreview";
import styles from "./Likes.module.css";

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
      <h1 className={styles.title}>Liked posts</h1>
      <div>
        {posts.map((post) => (
          <PostPreview
            key={post.id}
            post={post}
            onDelete={(id) => setPosts(posts.filter((p) => p.id !== id))}
          />
        ))}
      </div>
    </section>
  );
}
