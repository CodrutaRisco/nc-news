import { useNavigate } from "react-router-dom";
import "./comments-card.css";

function CommentsCard(params) {
  const { id, author, date, body } = params;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/articles/${id}`);
  };

  return (
    <article key={id} className="card-container" onClick={handleCardClick}>
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
