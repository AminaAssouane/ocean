import { Trash2 } from "lucide-react";
import api from "../../services/api";
import styles from "./DeleteCommentButton.module.css";

export default function DeleteCommentButton({ commentId, onDelete }) {
  async function handleClick(e) {
    e.stopPropagation();
    onDelete(commentId);
    try {
      await api.delete(`/comments/${commentId}`);
    } catch (error) {
      console.error("Failed deleting comment. ", error);
    }
  }

  return <Trash2 onClick={handleClick} className={styles.trash} />;
}
