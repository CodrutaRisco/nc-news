import "./comments-card.css";
import { deleteCommentById } from "../../utils/api";

function CommentsCard(params) {
  const { comment_id, author, date, body, onCommentDeleted } = params;

  const handleDelete = async (event) => {
    event.stopPropagation();

    try {
      await deleteCommentById(comment_id);

      onCommentDeleted(comment_id);
    } catch (error) {
      console.error("🚨 Failed to delete comment:", error);
    }
  };

  return (
    <article className="card-container" role="link" tabIndex={0}>
      <div className="content">
        <p>{body}</p>
        <div className="comment-details">
          <div>
            <strong>{author}</strong> — {new Date(date).toLocaleDateString()}
          </div>
          <button onClick={handleDelete} className="delete-button">
            🚫 Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default CommentsCard;
