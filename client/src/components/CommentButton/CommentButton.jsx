import { useState } from "react";
import { CommentSection } from "../CommentSection/CommentSection";

export default function CommentButton({ postId }) {
  const [show, setShow] = useState(false);

  function toggleCommentSection() {
    setShow(!show);
  }

  return (
    <section>
      <button onClick={toggleCommentSection}>Comments</button>
      {show && <CommentSection postId={postId} />}
    </section>
  );
}
