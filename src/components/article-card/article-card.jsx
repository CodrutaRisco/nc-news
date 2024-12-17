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
  return (
    <div className="card" key={id}>
      {image && <img src={image} alt={`${title}`} className="article-image" />}
      <h1>{title}</h1>
    </div>
  );
}

export default ArticleCard;
