import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  console.log("Header loaded");
  return (
    <nav className="navBar">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="nav-link">
            Logo
          </Link>
        </div>

        <div className="nav-right">
          <Link to="/topics" className="nav-link">
            Topics
          </Link>
          <Link to="/login" className="nav-link login-button">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default Header;
