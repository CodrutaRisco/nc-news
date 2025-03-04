import { useState, useEffect } from "react";
import "./search-bar.css";

// eslint-disable-next-line react/prop-types
function SearchBar({ searchTerm, setSearchTerm }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    return () => setSearchTerm("");
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="search-container">
   
      {!isMobile && !isSearchOpen && (
        <button
          className="search-button"
          onClick={() => setIsSearchOpen(true)}
        >
          🔍 
        </button>
      )}
      
      {(isMobile || isSearchOpen) && (
        <div className="search-bar-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          {!isMobile && (
            <button
              className="clear-search"
              onClick={() => {
                setSearchTerm("");
                setIsSearchOpen(false); 
              }}
            >
              ✖️
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;