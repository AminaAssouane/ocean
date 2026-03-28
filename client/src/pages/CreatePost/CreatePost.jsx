import { useState } from "react";
import api from "../../services/api";
import styles from "./CreatePost.module.css";
import { SendHorizontal } from "lucide-react";

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
    <>
      <h1 className={styles.title}>Create a post</h1>
      <section className={styles.addPostContainer}>
        <textarea
          name="content"
          id=""
          placeholder="Write your post!"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
        ></textarea>
        <button onClick={handlePost} className={styles.postBtn}>
          <SendHorizontal />
        </button>
      </section>
    </>
  );
}
