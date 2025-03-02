import { useState } from "react";
import { postComment } from "../../utils/api";
import "./comment-form.css";

// eslint-disable-next-line react/prop-types
export const CommentForm = ({ article_id, onCommentAdded }) => {
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    setBody(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const newComment = await postComment(article_id, {
        username: "cooljmessy",
        body,
      });

      if (newComment) {
        setBody("");
        onCommentAdded(newComment);
      }
    } catch (err) {
      console.error("Eroare la trimiterea comentariului:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          className="comment-input"
          placeholder="Write your comment here..."
          value={body}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "..." : "➡️"}
        </button>
      </form>
    </section>
  );
};
