import { useNavigate } from "react-router-dom";
import "./comments-card.css";
import { deleteCommentById } from "../../utils/api";

function CommentsCard(params) {
  const { comment_id, author, date, body, article_id, onCommentDeleted } =
    params;
  const navigate = useNavigate();

  const handleDelete = async (event) => {
    event.stopPropagation();

    try {
      console.log("🗑️ Attempting to delete comment:", comment_id);
      await deleteCommentById(comment_id);

      onCommentDeleted(comment_id);
    } catch (error) {
      console.error("🚨 Failed to delete comment:", error);
    }
  };

  const handleCardClick = () => {
    navigate(`/articles/${article_id}`);
  };

  return (
    <article
      className="card-container"
      onClick={handleCardClick}
      role="link"
      tabIndex={0}
    >
      <div className="content">
        <p>{body}</p>
        <div>
          <strong>{author}</strong> — {date}
          <div>
            {author === "cooljmessy" && (
              <button onClick={handleDelete} className="delete-button">
                Delete comment 🚫
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default CommentsCard;
