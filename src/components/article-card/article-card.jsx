import { useNavigate } from "react-router-dom";

function ArticleCard({
  id,
  image,
  author,
  commentCount,
  date,
  title,
  topic,
  votes,
}) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/articles/${id}`);
  };

  return (
    <div className="card" key={id} onClick={handleCardClick}>
      {image && <img src={image} alt={`${title}`} className="article-image" />}
      <h1>{title}</h1>
    </div>
  );
}

export default ArticleCard;
