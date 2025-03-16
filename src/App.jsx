import "./App.css";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import ArticlesList from "./components/articles-list/articles-list";
import ArticlePage from "./components/article-page/article-page";
import Comments from "./components/comments/comments";
import { Profile } from "./components/profile/Profile";
import Lottie from "react-lottie-player/dist/LottiePlayerLight";
import { useEffect, useState } from "react";
import Nav from "./components/nav-bar/nav-bar";

function App() {
  const [animationData, setAnimationData] = useState(null);
  const [topic, setTopic] = useState("");

  useEffect(() => {
    import("./lotties/LoadingAnimation.json")
      .then((data) => setAnimationData(data.default))
      .catch((err) => console.error("Error loading animation", err));
  }, []);

  if (!animationData) return <p>Loading...</p>;

  const loadingLottie = (
    <Lottie
      loop
      play
      animationData={animationData}
      style={{ width: 300, height: 150 }}
    />
  );
  return (
    <>
      <Nav setTopic={setTopic}></Nav>
      <Routes>
        <Route
          path="/"
          element={<ArticlesList topic={topic} loadingLottie={loadingLottie} />}
        />
        <Route
          path="/articles"
          element={<ArticlesList loadingLottie={loadingLottie} />}
        />
        <Route
          path="/articles/:article_id"
          element={<ArticlePage loadingLottie={loadingLottie} />}
        ></Route>
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
