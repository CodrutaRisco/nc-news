import { useState, useEffect } from "react";
import { getArticleComments, getArticleById } from "../../utils/api";
import { Link, useParams } from "react-router-dom";
import CommentsCard from "../comments-card/comments-card";
import "./comments.css";

function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleById(article_id)
      .then((articleFromApi) => {
        setArticle(articleFromApi);
      })

      .catch((error) => {
        console.error("Error fetching article:", error);
      });

    getArticleComments(article_id)
      .then((commentsFromApi) => {
        setComments(commentsFromApi);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [article_id]);

  const handleCommentDeleted = (comment_id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.comment_id !== comment_id)
    );
  };

  return (
    <section className="comments-page">
      <div className="article-wrapper">
        <Link className="title" to={`/articles/${article_id}`}>
          <h2> {article.title}</h2>
        </Link>
        <p>
          <strong>Author:</strong> {article.author}
        </p>
        <p className="text">{article.body}</p>
      </div>
      <div className="comments-wrapper">
        <h3 className="comment-title">Comments</h3>
        <ul className="comments-list">
          {comments.map((comment) => (
            <CommentsCard
              key={comment.comment_id}
              {...comment}
              onCommentDeleted={handleCommentDeleted}
              id={comment.comment_id}
              author={comment.author}
              date={comment.created_at}
              body={comment.body}
              article_id={comment.article_id}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
export default Comments;
