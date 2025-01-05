import { useNavigate } from "react-router-dom";
import "./comments-card.css";

function CommentsCard(params) {
  const { author, date, body, article_id } = params;
  const navigate = useNavigate();

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
          <div>
            <strong>{author}</strong> — {date}
          </div>
        </div>
      </div>
    </article>
  );
}

export default CommentsCard;
