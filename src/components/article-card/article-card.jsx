import { useNavigate } from "react-router-dom";
import "./article-card.css";


function ArticleCard(params) {
  const { id, image, author, date, title, topic, votes } = params;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/articles/${id}`);
  };

  return (
    <div className="article-card" onClick={handleCardClick}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>
        {topic} by {author}
      </p>
      <p>Votes: {votes}</p>
      <p>{new Date(date).toLocaleDateString()}</p>
    </div>
  );
}

export default ArticleCard;
