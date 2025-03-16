import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, getArticleComments } from "../../utils/api";
import { Link } from "react-router-dom";
import "./article-page.css";
import Votes from "../votes/votes";
import { CommentForm } from "../comments/CommentForm";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({ votes: 0 });
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
  const handleVoteChange = (inc_votes) => {
    setArticle((prev) => ({ ...prev, votes: prev.votes + inc_votes }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <section className="wrapper">
        <div className="inner">
          <div className="iagContainer">
            <img src={article.article_img_url} alt={article.title} />
          </div>
          <hr aria-orientation="horizontal" className="divider"></hr>
          <div className="articleContent">
            <Link to="/">
              <p className="tagText">Topic: {article.topic}</p>
            </Link>
            <h1>{article.title}</h1>
            <p>
              <strong>Author:</strong> {article.author}
            </p>
            <p>{article.body}</p>
          </div>
          <div className="articleCommentsAndVotes">
            <Link className="comments" to={`/articles/${article_id}/comments`}>
              Comments: {comments.length}
            </Link>

            <Votes
              vote={article.votes}
              article_id={article_id}
              onVoteChange={handleVoteChange}
            />
          </div>
          <CommentForm
            article_id={article_id}
            onCommentAdded={handleNewComment}
          />
        </div>
      </section>
    </>
  );
}

export default ArticlePage;
