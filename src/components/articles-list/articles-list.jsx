import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getArticles, getArticleByTopic } from "../../utils/api";
import "./articles-list.css";
import Votes from "../votes/votes";
import capitalizeFirstLetter from "../../utils/capitalize-first-letter";

// eslint-disable-next-line react/prop-types
function ArticlesList({ topic }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (!topic) {
      getArticles().then((articlesFromApi) => {
        setArticles(articlesFromApi);
      });
    } else {
      getArticleByTopic(topic).then((articlesFromApi) => {
        setArticles(articlesFromApi);
      });
    }
  }, [topic]);
  const handleVoteChange = (article_id, inc_votes) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.article_id === article_id
          ? { ...article, votes: article.votes + inc_votes }
          : article
      )
    );
  };

  return (
    <div className="articles-container">
      <h1>{topic ? capitalizeFirstLetter(topic) : "All News"}</h1>
      <ul className="articles-list">
        {articles.map((article) => (
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
                <p className="article-tag">{`topic: ${article.topic}`}</p>
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
        ))}
      </ul>
    </div>
  );
}

export default ArticlesList;
