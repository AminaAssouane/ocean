import { Trash2 } from "lucide-react";
import api from "../../services/api";
import styles from "./DeletePostButton.module.css";

export default function DeletePostButton({ postId, onDelete }) {
  async function handleClick(e) {
    e.stopPropagation();
    onDelete(postId);
    try {
      await api.delete(`/dashboard/post/${postId}`);
    } catch (error) {
      console.error("Failed deleting post. ", error);
    }
  }

  return <Trash2 onClick={handleClick} className={styles.trash} />;
}
