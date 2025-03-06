import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../../utils/api";
import { capitalizeFirstLetter } from "../../utils/capitalize-first-letter";
import "./nav-bar.css";

// eslint-disable-next-line react/prop-types
const Nav = ({ setTopic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((topicsFromApi) => {
      setTopics(topicsFromApi);
    });
  }, []);

return (
  <nav className="navbar">
    <div className="nav-container">
      <button
        className="menu-icon"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation"
      >
        {isOpen ? "✖️" : "☰"}
      </button>

      <div className={`nav-links ${isOpen ? "active" : ""}`}>
        <Link to="/articles">
          <button className="nav-button">News</button>
        </Link>
        {topics.map((topic) => (
          <Link key={topic.slug} to="/">
            <button className="nav-button" onClick={() => setTopic(topic.slug)}>
              {capitalizeFirstLetter(topic.slug)}
            </button>
          </Link>
        ))}
      </div>

      <Link to="/profile" className="profile-icon" aria-label="Go to profile">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="5" />
          <path d="M4 20c1.5-4 6-7 8-7s6.5 3 8 7" />
        </svg>
      </Link>
    </div>
  </nav>
);
};

export default Nav;