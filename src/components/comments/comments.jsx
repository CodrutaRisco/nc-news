import { useState, useEffect } from "react";
import { getArticleComments, getArticleById } from "../../utils/api";

import { useParams } from "react-router-dom";
import "./comments.css";

function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getArticleById(article_id).then((articleFromApi) => {
      setArticle(articleFromApi);
    });

    getArticleComments(article_id)
      .then((commentsFromApi) => {
        setComments(commentsFromApi);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="comments-page">
      <h2>{article.title}</h2>
      <p>
        <strong>Author:</strong> {article.author}
      </p>
      <h3>Comments</h3>
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.comment_id} className="comment-card">
            <p>{comment.body}</p>
            <p>
              <strong>By:</strong> {comment.author} | <strong>Votes:</strong>{" "}
              {comment.votes}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Comments;
