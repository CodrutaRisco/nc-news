import { useState, useEffect } from "react";
import { getArticleComments, getArticleById } from "../../utils/api";
import { useParams } from "react-router-dom";
import CommentsCard from "../comments-card/comments-card";
import "./comments.css";

function Comments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleById(article_id).then((articleFromApi) => {
      setArticle(articleFromApi);
    });
    getArticleComments(article_id).then((commentsFromApi) => {
      setComments(commentsFromApi);
    });
  }, [article_id]);
  console.log("comments>>>>", comments);
  console.log("article>>>", article);

  return (
    <section className="comments-page">
      <div className="article-wrapper">
        <h2>{article.title}</h2>
        <p>
          <strong>Author:</strong> {article.author}
        </p>
        <p>{article.body}</p>
      </div>
      <div>
        <h3 className="comment-title">Comments</h3>
        <ul className="comments-list">
          {comments.map((comment) => (
            <CommentsCard
              key={comment.comment_id}
              id={comment.comment_id}
              author={comment.author}
              date={comment.created_at}
              body={comment.body}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
export default Comments;
