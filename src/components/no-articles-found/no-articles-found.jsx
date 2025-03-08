import "./no-articles-found.css"
import sadFace from "../../assets/sad-face.png"

// eslint-disable-next-line react/prop-types
function NoArticlesFound({ resetSearch }) {
  return (
    <div
      className='no-articles'
    >
      <h2>Oops! No articles found.</h2>
      <p>
        Sorry, we couldn&apos;t find any articles matching your search criteria.
      </p>
      <p>Don&apos;t worry, we can put you back on track!</p>
      <img src={sadFace} alt='sad face' style={{ width: "100px" }} />
      <button onClick={resetSearch} className='no-article-button'>
        Show all articles
      </button>
    </div>
  );
}

export default NoArticlesFound;