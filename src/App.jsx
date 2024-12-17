import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Routes, Route } from "react-router-dom";
import ArticlesList from "./components/articles-list/articles-list";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ArticlesList />} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
