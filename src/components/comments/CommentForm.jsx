import { useState } from "react";
import { postComment } from "../../utils/api";
import "./comments.css";

// eslint-disable-next-line react/prop-types
export const CommentForm = ({ article_id, onCommentAdded }) => {
  const [body, setBody] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!body) {
      setError("Comment field is required.");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage("");

    try {
      const response = await postComment(article_id, {
        username: "cooljmessy",

        body,
      });

      if (response && response.comment) {
        setSuccessMessage("Comment posted successfully!");
        setBody("");
        onCommentAdded(response.data.comment);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to post comment. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="comment-form">
      <h3>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="comment-input"
          placeholder="Write your comment here..."
          value={body}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="submit-button" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};
