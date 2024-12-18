import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../../utils/api";
import "./article-page.css";
function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});

  useEffect(() => {
    getArticleById(article_id).then((articleFromApi) => {
      setArticle(articleFromApi);
    });
  }, [article_id]);
  console.log("article--->", article);

  return (
    <div className="wrapper">
      <h1>{article.title}</h1>
      <img src={article.article_img_url} alt="hello" />
      <p>{article.body}</p>
    </div>
  );
}

export default ArticlePage;
