import { Trash } from "lucide-react";
import api from "../../services/api";
import styles from "./DeletePostButton.module.css";

export default function DeletePostButton({ postId }) {
  async function handleClick(e) {
    e.stopPropagation();
    try {
      await api.delete(`/dashboard/post/${postId}`);
    } catch (error) {
      console.error("Failed deleting post. ", error);
    }
  }

  return <Trash onClick={handleClick} className={styles.trash} />;
}
