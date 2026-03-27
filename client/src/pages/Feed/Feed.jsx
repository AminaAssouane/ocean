import { useState } from "react";
import api from "../../services/api";

export default function Feed() {
  const [content, setContent] = useState("");
  async function handlePost() {
    try {
      if (!content.trim()) return;
      await api.post("/dashboard/createPost", { content });
      console.log("Posting:", content);
      setContent("");
    } catch (error) {
      console.log("Failed to create post ", error);
    }
  }
  return (
    <>
      <h1>Feed</h1>
      <textarea
        name="content"
        id=""
        placeholder="What's happening?"
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handlePost}>Post</button>
    </>
  );
}
