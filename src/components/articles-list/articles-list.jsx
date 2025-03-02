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
  const order = searchParams.get("order") || "DESC";
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    console.log("Fetching articles with sort_by:", sort_by, order);
    setIsLoading(true);
    setIsError(null);

    getArticles(topic, sort_by, order)
      .then((articlesFromApi) => {
        // console.log("Received articles:", articlesFromApi);
        setArticles(Array.isArray(articlesFromApi) ? articlesFromApi : []);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError("Failed to load articles: " + error.message);
        setIsLoading(false);
      });
  }, [topic, sort_by, order]);

  if (isLoading) {
    return (
      <>
        <p>articles loading...</p>
        {loadingLottie}
      </>
    );
  }
  const sortedArticles = [...articles];

  if (sort_by === "comment_count") {
    sortedArticles.sort((a, b) => b.comment_count - a.comment_count);
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
        <option value="comment_count">Comment Count</option>
        <option value="votes">Votes</option>
      </select>
      <select
        id="order-dropdown"
        onChange={handleOrderChange}
        name="order"
        value={order}
      >
        <option disabled>Order</option>
        <option value="DESC"> Desc</option>
        <option value="ASC"> Asc</option>
      </select>
      {topic && (
        <button onClick={handleBackButton}>Back to all articles</button>
      )}

      <div className="list">
        {sortedArticles.length > 0 ? (
          sortedArticles.map((article) => (
            <ArticleCard
              key={article.article_id}
              article={article}
              id={article.article_id}
              image={article.article_img_url}
              author={article.author}
              date={article.created_at}
              title={article.title}
              topic={article.topic}
            />
          ))
        ) : (
          <p>No articles found for this topic.</p>
        )}
      </div>
    </>
  );
}

export default ArticlesList;
