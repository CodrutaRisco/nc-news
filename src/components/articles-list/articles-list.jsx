import { useState, useEffect } from "react";
import { fetchArticles } from "../../utils/api";
import "./articles-list.css";
import SearchBar from "../search-bar/search-bar";
import SortDropdown from "../sort-dropdown/sort-dropdown";
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter";
import ArticleCard from "../article-card/article-card";
import NoArticlesFound from "../no-articles-found/no-articles-found";

// eslint-disable-next-line react/prop-types
function ArticlesList({ loadingLottie, topic }) {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchSortBy = sortBy === "comment_count" ? "created_at" : sortBy;
        const fetchedArticles = await fetchArticles(
          topic,
          fetchSortBy,
          sortOrder
        );
        let sortedArticles = fetchedArticles;

        if (sortBy === "comment_count") {
          sortedArticles = [...fetchedArticles].sort((a, b) =>
            sortOrder === "ASC"
              ? a.comment_count - b.comment_count
              : b.comment_count - a.comment_count
          );
        }

        setArticles(sortedArticles);
        setLoading(false);
      } catch {
        setError("Error loading articles");
        setLoading(false);
      }
    };

    fetchData();
  }, [topic, sortBy, sortOrder]);

  const handleVoteChange = (article_id, inc_votes) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.article_id === article_id
          ? { ...article, votes: article.votes + inc_votes }
          : article
      )
    );
  };

  if (loading) {
    return <p>Loading articles... {loadingLottie}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="articles-container">
      <section className="articles-header">
        <h1 className="articleListTitle">
          {topic ? capitalizeFirstLetter(topic) : "All News"}
        </h1>

        <div className="controls">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <SortDropdown
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>
      </section>
      <ul className="articles-list">
        {filteredArticles.length > 0
          ? filteredArticles.map((article) => (
              <ArticleCard
                key={article.article_id}
                article={article}
                handleVoteChange={handleVoteChange}
              />
            ))
          : searchTerm && (
              <NoArticlesFound resetSearch={() => setSearchTerm("")} />
            )}
      </ul>
    </div>
  );
}

export default ArticlesList;
