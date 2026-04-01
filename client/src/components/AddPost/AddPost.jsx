import { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { SendHorizontal, Smile, Image } from "lucide-react";
import api from "../../services/api";
import styles from "./AddPost.module.css";

export default function AddPost({ onPostCreated = null }) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const fileInputRef = useRef(null);
  const pickerRef = useRef(null);

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }

  function onEmojiClick(emojiData) {
    setContent(content + emojiData.emoji);
    setShowPicker(false);
  }

  async function handlePost() {
    try {
      console.log("I enter");
      if (!content.trim()) return;
      const formData = new FormData();
      formData.append("content", content);
      if (image) formData.append("image", image);
      console.log("I walk");
      await api.post("/dashboard/createPost", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("I get out");
      setContent("");
      setImage(null);
      setPreview(null);
      if (onPostCreated) onPostCreated();
    } catch (error) {
      console.error("Failed to create post. ", error);
    }
  }

  return (
    <section className={styles.addPostContainer}>
      <div className={styles.textareaWrapper}>
        <textarea
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`${styles.textarea}
            ${onPostCreated ? styles.smallTextArea : styles.bigTextArea}`}
        />
        {preview && (
          <img src={preview} alt="preview" className={styles.preview} />
        )}
        <div ref={pickerRef}>
          <button
            onClick={() => setShowPicker(!showPicker)}
            className={styles.emojiBtn}
          >
            <Smile size={25} className={styles.smile} />
          </button>
          {showPicker && (
            <div className={styles.pickerWrapper}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className={styles.imageBtn}
        >
          <Image size={25} className={styles.imageIcon} />
        </button>
      </div>
      <button onClick={handlePost} className={styles.postBtn}>
        <SendHorizontal />
      </button>
    </section>
  );
}
