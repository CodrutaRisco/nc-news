import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import ArticlesList from "./components/articles-list/articles-list";
import ArticlePage from "./components/article-page/article-page";
import Comments from "./components/comments/comments";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
        <Route path="/articles/:article_id" element={<ArticlePage />}></Route>
        <Route path="/articles/:article_id" element={<Comments />} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
