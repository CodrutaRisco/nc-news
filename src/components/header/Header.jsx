import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  console.log("Header loaded");
  return (
    <nav>
      <ul>
        <li className="nav-bar">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-bar">
          <Link to="/articles">All Articles</Link>
        </li>
        <li className="nav-bar">
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Header;
