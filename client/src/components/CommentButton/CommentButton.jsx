import { useEffect, useState } from "react";
import CommentSection from "../CommentSection/CommentSection";
import { MessageCircle } from "lucide-react";
import api from "../../services/api";
import styles from "./CommentButton.module.css";

export default function CommentButton({ postId, onClick }) {
  const [nbComments, setNbComments] = useState(0);

  useEffect(() => {
    async function getNbComments() {
      try {
        const nb = await api.get(`/comments/${postId}/nb`);
        setNbComments(nb.data);
      } catch (error) {
        console.error("Failed fetching number of comments. ", error);
      }
    }
    getNbComments();
  }, []);

  return (
    <section>
      <div className={styles.nbComments} onClick={onClick}>
        <div>
          <MessageCircle className={styles.comment} />
        </div>
        <div>{nbComments}</div>
      </div>
    </section>
  );
}
