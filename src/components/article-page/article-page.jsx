import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../utils/api";
import { Link } from "react-router-dom";
import "./article-page.css";
import Votes from "../votes/votes";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then((articleFromApi) => {
        setArticle(articleFromApi);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching article:", err);
        setError("Failed to load article. Please try again.");
        setLoading(false);
      });
  }, [article_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="wrapper">
        <h1>{article.title}</h1>
        <img src={article.article_img_url} alt={article.title} />
        <p>
          <strong>Author:</strong> {article.author}
        </p>
        <p>{article.body}</p>
        <p>
          <strong>Comments:</strong> {article.comments_count}
        </p>
        <div className="votes">
          <Votes vote={article.votes} article_id={article_id} />
        </div>
      </div>
      <Link to={`/articles/${article_id}/comments`} className="comments">
        View Comments
      </Link>
    </>
  );
}

export default ArticlePage;
