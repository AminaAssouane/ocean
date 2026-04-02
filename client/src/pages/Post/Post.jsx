import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../services/api";
import LikeButton from "../../components/LikeButton/LikeButton";
import CommentButton from "../../components/CommentButton/CommentButton";
import CommentSection from "../../components/CommentSection/CommentSection";
import styles from "./Post.module.css";
import { RingLoader } from "react-spinners";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function getPostById() {
      try {
        const res = await api.get(`/dashboard/post/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.error("Failed to fetch post by id. ", error);
      }
    }
    getPostById(postId);
  }, []);

  if (!post)
    return (
      <div className={styles.spinner}>
        <RingLoader color="#0f488e" />;
      </div>
    );

  return (
    <article className={styles.postContainer}>
      <Link
        to={`/dashboard/users/${post.authorId}`}
        onClick={(e) => e.stopPropagation()}
        className={styles.userInfo}
      >
        <img src={post.author.avatar} alt="" className={styles.avatar} />
        <div className={styles.username}>{post.author.username}</div> •
        <div className={styles.date}>
          {new Date(post.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </Link>
      <p className={styles.content}>{post.content}</p>
      {post.image && (
        <img src={post.image} alt="" className={styles.postImage} />
      )}
      <div className={styles.buttons}>
        <LikeButton postId={postId} className={styles.likeBtn} />
        <CommentButton postId={postId} className={styles.commentBtn} />
      </div>

      <CommentSection postId={postId} />
    </article>
  );
}
