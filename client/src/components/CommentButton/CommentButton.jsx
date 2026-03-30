import { useState } from "react";
import CommentSection from "../CommentSection/CommentSection";
import { MessageCircle } from "lucide-react";

export default function CommentButton({ postId }) {
  const [show, setShow] = useState(false);

  function toggleCommentSection(e) {
    e.stopPropagation();
    setShow(!show);
  }

  return (
    <section>
      <MessageCircle onClick={toggleCommentSection} />
      {show && <CommentSection postId={postId} />}
    </section>
  );
}
