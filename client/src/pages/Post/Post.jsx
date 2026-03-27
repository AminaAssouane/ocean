import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
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

  if (!post) return <p>Loading...</p>;
  return (
    <article>
      <h2>{post.author.username}</h2>
      <p>{post.content}</p>
    </article>
  );
}
