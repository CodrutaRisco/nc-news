import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
