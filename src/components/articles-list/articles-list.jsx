import { useState, useEffect } from "react";
import { Link } from "react-router";
import { getArticles, getArticleByTopic } from "../../utils/api";
import "./articles-list.css";
import Votes from "../votes/votes";
import SearchBar from "../search-bar/search-bar";
// import {capitalizeFirstLetter} from "../../utils/capitalize-first-letter";

// eslint-disable-next-line react/prop-types
function ArticlesList({ topic }) {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = topic
          ? await getArticleByTopic(topic)
          : await getArticles("created_at", sortOrder);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, [topic, sortOrder]);

  const handleVoteChange = (article_id, inc_votes) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.article_id === article_id
          ? { ...article, votes: article.votes + inc_votes }
          : article
      )
    );
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="articles-container">
      <h1>{topic ? topic : "All News"}</h1>
      {!topic && (
        <div className="controls">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      )}
      <ul className="articles-list">
        {filteredArticles.map((article) => (
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
