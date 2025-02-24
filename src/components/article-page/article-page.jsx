import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getArticleById,
  getArticleComments,
  deleteCommentById,
} from "../../utils/api";
import { Link } from "react-router-dom";
import "./article-page.css";
import Votes from "../votes/votes";
import { CommentForm } from "../comments/CommentForm";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleFromApi = await getArticleById(article_id);
        const commentsFromApi = await getArticleComments(article_id);
        setArticle(articleFromApi);
        setComments(commentsFromApi);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to load article. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [article_id]);
  const handleNewComment = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

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
          <strong>Comments:</strong> {comments.length}
        </p>
        <div className="votes">
          <Votes vote={article.votes} article_id={article_id} />
        </div>
        <CommentForm
          article_id={article_id}
          onCommentAdded={handleNewComment}
        />
      </div>
      <Link to={`/articles/${article_id}/comments`} className="comments">
        View Comments
      </Link>
    </>
  );
}

export default ArticlePage;
