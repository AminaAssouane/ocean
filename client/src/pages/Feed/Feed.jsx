import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Feed() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  async function handlePost() {
    try {
      if (!content.trim()) return;
      await api.post("/dashboard/createPost", { content });
      console.log("Posting:", content);
      setContent("");
    } catch (error) {
      console.log("Failed to create post. ", error);
    }
  }

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await api.get("/dashboard");
        console.log(res.data);
        setPosts(res.data);
        console.log(posts);
      } catch (error) {
        console.error("Failed to fetch posts. ", error);
      }
    }
    getPosts();
  }, []);

  return (
    <>
      <h1>Feed</h1>
      <section>
        <textarea
          name="content"
          id=""
          placeholder="What's happening?"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={handlePost}>Post</button>
      </section>
      <section>
        <div>Posts : </div>
        {posts.map((post) => (
          <p key={post.id}>{post.content}</p>
        ))}
      </section>
    </>
  );
}
