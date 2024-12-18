import { useNavigate } from "react-router-dom";
import "./article-card.css";
import { Link } from "react-router-dom";

function ArticleCard(prams) {
  const { id, image, author, date, title, topic } = prams;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/articles/${id}`);
  };

  return (
    <div key={id} className="card-container" onClick={handleCardClick}>
      {image && <img src={image} alt={title} className="image" />}
      <div className="content">
        <div className="badgeContainer">
          <span key={topic} className="badge">
            {topic}
          </span>
        </div>
        <h2 className="title">{title}</h2>
        <div className="footer">
          <div>
            <strong>{author}</strong> — {date}
          </div>
          <Link to={`/articles/${id}`} className="comments">
            Comments
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
