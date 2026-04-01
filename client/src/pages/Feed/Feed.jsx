import { useEffect, useState } from "react";
import PostPreview from "../../components/PostPreview/PostPreview";
import api from "../../services/api";
import styles from "./Feed.module.css";
import EmojiPicker from "emoji-picker-react";
import { SendHorizontal, Smile } from "lucide-react";

export default function Feed() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [showPicker, setShowPicker] = useState(false);

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

  function onEmojiClick(emojiData) {
    setContent(content + emojiData.emoji);
    setShowPicker(false);
  }

  useEffect(() => {
    async function getPosts() {
      try {
        const res = await api.get("/dashboard");
        setPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch posts. ", error);
      }
    }
    getPosts();
  }, []);

  return (
    <div className={styles.feedContainer}>
      <h1 className={styles.title}>Your feed</h1>
      <section className={styles.addPostContainer}>
        <div className={styles.textareaWrapper}>
          <textarea
            name="content"
            id=""
            placeholder="What's happening?"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.textarea}
          ></textarea>

          <button
            onClick={() => setShowPicker(!showPicker)}
            className={styles.emojiBtn}
          >
            <Smile size={25} className={styles.smile} />
          </button>

          {showPicker && (
            <div className={styles.pickerWrapper}>
              <EmojiPicker onEmojiClick={onEmojiClick} />{" "}
            </div>
          )}
        </div>
        <button onClick={handlePost} className={styles.postBtn}>
          <SendHorizontal />
        </button>
      </section>
      <section>
        {posts.map((post) => (
          <PostPreview key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}
