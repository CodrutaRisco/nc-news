import { useState, useEffect } from "react";
import { getArticles } from "../../utils/api";
import ArticleCard from "../article-card/article-card";
import "./articles-list.css";
import { useSearchParams } from "react-router";
import { SearchByTopic } from "../topics/SearchByTopic";


// eslint-disable-next-line react/prop-types
function ArticlesList({ loadingLottie }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const topic = searchParams.get("topic") || "";
  const sort_by = searchParams.get("sort_by") || "created_at";
  const order_by = searchParams.get("order_by") || "DESC";
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setIsError(null);
    getArticles(topic, sort_by, order_by)
      .then((articlesFromApi) => {
        setArticles(Array.isArray(articlesFromApi) ? articlesFromApi : []);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError("Failed to load articles: " + error.message);
        setIsLoading(false);
      });
  }, [topic, sort_by, order_by]);

  if (isLoading) {
    return (
      <>
        <p>articles loading...</p>
        {loadingLottie}
      </>
    );
  }
  const handleBackButton = () => {
    setSearchParams({});
    setIsError(null);
  };
  if (isError) {
    return (
      <>
        <p>{isError}</p>
        <p> Try searching another topic... </p>
        <button onClick={handleBackButton}> Back to articles </button>
      </>
    );
  }
  const handleSortByChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev); // Ensure it's iterable
      params.set(name, value);
      return params;
    });
  };

  const handleOrderChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev); // Ensure it's iterable
      params.set(name, value);
      return params;
    });
  };

  return (
    <>
      <h1>
        {" "}
        {topic.length === 0
          ? "Looking at all articles"
          : `Looking at articles on ${topic}`}
      </h1>
      <SearchByTopic setSearchParams={setSearchParams} />
      <select
        id="sortBy-dropdown"
        onChange={handleSortByChange}
        name="sort_by"
        value={sort_by}
      >
        <option disabled>Sort By</option>
        <option value="created_at">Date</option>
        <option value="comment_count">Comment Count NOT WORKING</option>
        <option value="votes">Votes</option>
      </select>
      <select
        id="order-dropdown"
        onChange={handleOrderChange}
        name="order_by"
        value={order_by}
      >
        <option disabled>Order</option>
        <option value="DESC"> Desc</option>
        <option value="ASC"> Asc</option>
      </select>
      {topic && (
        <button onClick={handleBackButton}>Back to all articles</button>
      )}

      <div className="list">
        {articles.map((article) => (
          <ArticleCard
            key={article.article_id}
            id={article.article_id}
            image={article.article_img_url}
            author={article.author}
            date={article.created_at}
            title={article.title}
            topic={article.topic}
          />
        ))}
      </div>
    </>
  );
}

export default ArticlesList;
