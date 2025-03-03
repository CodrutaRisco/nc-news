import "./App.css";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import ArticlesList from "./components/articles-list/articles-list";
import ArticlePage from "./components/article-page/article-page";
import Comments from "./components/comments/comments";
import { Profile } from "./components/profile/Profile";
import Lottie from "react-lottie-player";
import { useEffect, useState } from "react";
import Nav from "./components/nav-bar/nav-bar";

function App() {
  const [animationData, setAnimationData] = useState(null);
  const [topic, setTopic] = useState("");

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

  if (!animationData) return <p>Loading...</p>;

  const loadingLottie = (
    <Lottie options={defaultOptions} height={150} width={300} />
  );
  return (
    <>
      <Nav setTopic={setTopic}></Nav>
      <Routes>
        <Route path="/" element={<ArticlesList topic={topic} />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:article_id" element={<ArticlePage />}></Route>
        <Route path="/articles/:article_id/comments" element={<Comments />} />
        <Route
          path="/profile"
          element={<Profile loadingLottie={loadingLottie} />}
        />
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;
