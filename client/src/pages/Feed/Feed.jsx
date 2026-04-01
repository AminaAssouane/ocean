import { useEffect, useState, useCallback } from "react";
import PostPreview from "../../components/PostPreview/PostPreview";
import AddPost from "../../components/AddPost/AddPost";
import api from "../../services/api";
import styles from "./Feed.module.css";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  const getPosts = useCallback(async () => {
    try {
      const res = await api.get("/dashboard");
      setPosts(res.data);
    } catch (error) {
      console.error("Failed to fetch posts. ", error);
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className={styles.feedContainer}>
      <h1 className={styles.title}>Your feed</h1>
      <AddPost onPostCreated={getPosts} />
      <section>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
