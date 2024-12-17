import "./App.css";
import Header from "./components/header/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "./utils/api";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles().then((articlesFromApi) => {
      setArticles(articlesFromApi);
    });
  }, []);
  console.log("articleApi", articles);

  return (
    <div>
      <Header />
      <main>
        <div className="articles-container">
          {articles.map((article) => (
            <div key={article.article_id} className="article-card">
              <h2>{article.title}</h2>
              <p>By: {article.author}</p>
              <p>Topic: {article.topic}</p>
              <p>
                Published: {new Date(article.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
