/* eslint-disable react/prop-types */
import "./article-card.css";
import { Link } from "react-router-dom";
import Votes from "../votes/votes";

function ArticleCard({ article, handleVoteChange }) {
  return (
    <li key={article.article_id} className="article-card">
      <div className="article-content">
        <div className="article-image">
          <Link to={`/articles/${article.article_id}`}>
            <img src={article.article_img_url} alt="article" />
          </Link>
        </div>

        <div className="article-details">
          <Link to={`/articles/${article.article_id}`}>
            <h2>{article.title}</h2>
          </Link>
          <Link to={`/articles/${article.article_id}`}>
            <p className="article-tag">{`topic: ${article.topic}`}</p>
          </Link>
          <div className="article-meta">
            <span>
              <strong>Author:</strong> {article.author} —{" "}
              {article.created_at.substring(0, 10)}
            </span>
          </div>
          <div className="article-actions">
            <Link to={`/articles/${article.article_id}/comments`}>
              <button className="comment-button">{`Comments: ${article.comment_count}`}</button>
            </Link>
            <Votes
              vote={article.votes}
              article_id={article.article_id}
              onVoteChange={(inc_votes) =>
                handleVoteChange(article.article_id, inc_votes)
              }
            />
          </div>
        </div>
      </div>
    </li>
  );
}

export default ArticleCard;
