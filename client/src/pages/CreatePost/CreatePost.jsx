import { useState } from "react";
import api from "../../services/api";

export default function CreatePost() {
  const [content, setContent] = useState("");

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
  return (
    <section>
      <textarea
        name="content"
        id=""
        placeholder="What's happening?"
        required
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button onClick={handlePost}>
        <SendHorizontal />
      </button>
    </section>
  );
}
