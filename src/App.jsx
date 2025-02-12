import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import ArticlesList from "./components/articles-list/articles-list";
import ArticlePage from "./components/article-page/article-page";
import Comments from "./components/comments/comments";
import Home from "./components/home-page/HomePage";
import { Profile } from "./components/profile/Profile";
import Lottie from "react-lottie-player";
import { useEffect, useState } from "react";
import { SearchByTopic } from "./components/topics/SearchByTopic";
import TopicPage from "./components/topics/TopicPage";

function App() {
  const [animationData, setAnimationData] = useState(null);
  useEffect(() => {
    import("./lotties/lottie.json")
      .then((data) => setAnimationData(data.default))
      .catch((err) => console.error("Error loading animation", err));
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (!animationData) return <p>Loading...</p>; // Prevents errors before loading

  const loadingLottie = (
    <Lottie options={defaultOptions} height={150} width={300} />
  );
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:article_id" element={<ArticlePage />}></Route>
        <Route path="/articles/:article_id/comments" element={<Comments />} />
        <Route path="/search" element={<SearchByTopic />} />
        <Route path="/search/:topic" element={<SearchByTopic />} />
        <Route path="/topics/:slug" element={<TopicPage />} />
        <Route
          path="/profile"
          element={<Profile loadingLottie={loadingLottie} />}
        />
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
