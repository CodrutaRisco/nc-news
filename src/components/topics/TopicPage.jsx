import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getArticles } from "../../utils/api";
import ArticleCard from "../article-card/article-card/";

const TopicPage = () => {
  const { slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    const getArticlesByTopic = async () => {
      setLoading(true);
      setError(null);

      try {
        const articleFromApi = await getArticles(slug, sortBy, order);

        setArticles(articleFromApi);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getArticlesByTopic();
  }, [slug, sortBy, order]);

  const handleSortByChange = (event) => {
    const newSortBy = event.target.value;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("sort_by", newSortBy);
      params.set("order", order);
      return params;
    });
  };

  const handleOrderChange = () => {
    const newOrder = order === "desc" ? "asc" : "desc";
    setSearchParams({ sort_by: sortBy, order: newOrder }); // Update URL params
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="topic-page">
      <h2>Articles on {slug.charAt(0).toUpperCase() + slug.slice(1)}:</h2>
      <div className="filter-sort-container">
        <div className="sort-controls">
          <label htmlFor="sort-by">Sort by:</label>
          <select id="sort-by" value={sortBy} onChange={handleSortByChange}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment Count</option>
            <option value="votes">Votes</option>
          </select>

          <button onClick={handleOrderChange} className="order-toggle-button">
            {order === "desc" ? "Descending" : "Ascending"}
          </button>
        </div>
      </div>

      <div className="articles-container">
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))
        ) : (
          <p>No articles found for this topic.</p>
        )}
      </div>
    </main>
  );
};

export default TopicPage;
