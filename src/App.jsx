import "./App.css";
import Header from "./components/header/Header";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticles } from "./utils/api";

function App() {
  const [items, setItems] = useState([]);
  const { items_types } = useParams();

  useEffect(() => {
    getArticles(items_types).then((articlesFromApi) => {
      setItems(articlesFromApi);
    });
  }, [items_types]);
  console.log("articleApi", items);

  return (
    <div>
      <Header></Header>
    </div>
  );
}

export default App;
