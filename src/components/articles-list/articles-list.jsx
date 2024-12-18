import { useState, useEffect } from "react";
import { getArticles } from "../../utils/api";
import ArticleCard from "../article-card/article-card";
import "./articles-list.css";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then((articlesFromApi) => {
        setArticles(articlesFromApi);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        error;
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>articles page</h1>
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
