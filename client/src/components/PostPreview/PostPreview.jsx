import { useNavigate } from "react-router-dom";
export default function PostPreview({ post }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/dashboard/post/${post.id}`);
  }
  return (
    <article onClick={handleClick}>
      <div>{post.author.username}</div>
      <div>{post.content}</div>
    </article>
  );
}
